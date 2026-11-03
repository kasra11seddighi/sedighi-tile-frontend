interface Props {
  text?: string;
}

function LoadingScreen({ text = "در حال بارگذاری..." }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07111f] text-white">
      {/* انیمیشن لوگو / اسپینر طلایی */}
      <div className="relative flex items-center justify-center">
        {/* هاله نور پس‌زمینه */}
        <div className="absolute h-28 w-28 rounded-full bg-[#D8B28B]/20 blur-xl animate-pulse" />

        {/* حلقه چرخنده بیرون */}
        <div className="h-20 w-20 rounded-full border-2 border-[#D8B28B]/20 border-t-[#D8B28B] animate-spin" />

        {/* دایره نشان برند در مرکز */}
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to text-xl font-black text-white shadow-lg shadow-brand-gradient-via/30">
          ک
        </div>
      </div>

      {/* عنوان برند */}
      <h2 className="mt-6 text-2xl font-black tracking-tight text-[#D8B28B]">
        کاشی سرامیک صدیقی
      </h2>

      {/* متن لودینگ با انیمیشن ملایم */}
      <p className="mt-2 text-xs text-white/50 animate-pulse">{text}</p>
    </div>
  );
}

export default LoadingScreen;
