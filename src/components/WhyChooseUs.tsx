export default function WhyChooseUs() {
  const features = [
    {
      title: "Secure Investments",
      description:
        "Your investments are managed with transparency, security, and professional oversight.",
    },
    {
      title: "Competitive Returns",
      description:
        "Earn attractive returns through structured investment opportunities.",
    },
    {
      title: "Expert Management",
      description:
        "Our experienced team carefully manages and monitors investment performance.",
    },
    {
      title: "Flexible Tenures",
      description:
        "Choose investment durations that align with your financial goals.",
    },
    {
      title: "Transparent Reporting",
      description:
        "Regular updates and clear reporting on your investment portfolio.",
    },
    {
      title: "Dedicated Support",
      description:
        "Access personalized assistance whenever you need guidance.",
    },
  ];

  return (
    <section className="py-28 bg-[#081726]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
            Why Choose Vertex
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Built Around Investor Success
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}