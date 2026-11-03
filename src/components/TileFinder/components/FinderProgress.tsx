interface Props {
  current: number;
  total: number;
}

export default function FinderProgress({ current, total }: Props) {
  const percent = ((current + 1) / total) * 100;

  return (
    <div className="mb-10" dir="rtl">
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-[#8C8174]">
        <span>
          مرحله {current + 1} از {total}
        </span>
        <span className="font-semibold text-[#2A241D]">
          {Math.round(percent)}٪
        </span>
      </div>

      {/* ردیف کاشی‌ها به عنوان نشانگر پیشرفت — هر کاشی یک مرحله */}
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, index) => {
          const isDone = index <= current;

          return (
            <span
              key={index}
              className={`
                h-2.5 flex-1 rounded-[3px] transition-colors duration-300
                ${isDone ? "bg-[#AD5A34]" : "bg-[#E7DECD]"}
              `}
            />
          );
        })}
      </div>
    </div>
  );
}
