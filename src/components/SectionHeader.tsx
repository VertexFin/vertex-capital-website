type Props = {
  badge: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  badge,
  title,
  description,
}: Props) {
  return (
    <div className="text-center max-w-3xl mx-auto">

      <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
        {badge}
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
        {title}
      </h2>

      {description && (
        <p className="text-gray-400 mt-6 text-lg leading-8">
          {description}
        </p>
      )}

    </div>
  );
}