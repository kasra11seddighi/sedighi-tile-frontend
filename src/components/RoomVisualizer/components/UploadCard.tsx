import { useRef, useState } from "react";
import { Camera } from "lucide-react";

interface Props {
  onFileSelect: (file: File) => void;
}

const MAX_SIZE_MB = 10;

// اعتبارسنجی فقط بر اساس file.type/پسوند کافی نیست: مقدار MIME توسط
// مرورگر از روی پسوند فایل حدس زده می‌شه و به‌راحتی قابل جعله (مثلاً یه
// فایل دلخواه رو با پسوند .jpg سیو کنی). این یه لایه‌ی محافظتی سمت
// کلاینته (فقط برای تجربه‌ی کاربری بهتر و رد سریع فایل‌های واضحاً غلط)؛
// اعتبارسنجی واقعی و قطعی باید سمت بک‌اند روی بایت‌های واقعی فایل انجام
// بشه، نه اینجا.
const SIGNATURES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
};
const ACCEPTED_TYPES = Object.keys(SIGNATURES);

async function hasValidImageSignature(file: File): Promise<boolean> {
  const expectedBytes = SIGNATURES[file.type];
  if (!expectedBytes) return false;

  try {
    const header = await file.slice(0, expectedBytes.length).arrayBuffer();
    const bytes = new Uint8Array(header);
    return expectedBytes.every((byte, index) => bytes[index] === byte);
  } catch {
    // اگه به هر دلیلی نتونیم بایت‌ها رو بخونیم، به نفع کاربر رد نمی‌کنیم؛
    // بک‌اند در نهایت خودش این فایل رو رد یا قبول می‌کنه
    return true;
  }
}

export default function UploadCard({ onFileSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("فقط فایل JPG یا PNG قابل قبول است");
      return;
    }

    if (file.size === 0) {
      setError("فایل انتخاب‌شده خالی است");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`حجم فایل نباید بیشتر از ${MAX_SIZE_MB}MB باشد`);
      return;
    }

    setIsValidating(true);
    const isValidImage = await hasValidImageSignature(file);
    setIsValidating(false);

    if (!isValidImage) {
      setError("فایل انتخاب‌شده یک تصویر معتبر JPG یا PNG نیست");
      return;
    }

    setError("");
    onFileSelect(file);
  }

  return (
    <div dir="rtl">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`
          flex cursor-pointer flex-col items-center justify-center gap-4
          rounded-[1.75rem] border border-dashed px-6 py-10 text-center
          transition-colors duration-200
          ${
            isDragging
              ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
              : "border-white/15 bg-white/[0.03] hover:border-white/25"
          }
        `}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F46E5]/20 to-[#8B5CF6]/20">
          <Camera size={28} className="text-[#8B9CFF]" />
        </span>

        <div>
          <p className="text-base font-bold text-white">
            {isValidating ? "در حال بررسی فایل..." : "عکس اتاق خود را بارگذاری کنید"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            فایل PNG، JPG با حداکثر حجم {MAX_SIZE_MB}MB
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => {
            void handleFile(e.target.files?.[0]);
            // ریست کردن مقدار input تا اگه کاربر دوباره همون فایل (حتی اگه رد
            // شده بود) رو انتخاب کنه، رویداد onChange دوباره فایر بشه
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
    </div>
  );
}
