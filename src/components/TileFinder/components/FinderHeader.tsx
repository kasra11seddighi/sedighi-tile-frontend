interface Props {
  title?: string;
  description?: string;
}

export default function FinderHeader({
  title = "کاشی مناسب خودت را پیدا کن",
  description = "با چند انتخاب ساده بهترین محصول را پیدا کنید",
}: Props) {
  return (
    <div className="mb-10 text-center" dir="rtl">
      <h1 className="text-3xl font-bold text-[#2A241D] md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-[#8C8174]">{description}</p>
    </div>
  );
}
