export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create An Account",
      description:
        "Register and complete your investor profile in a few simple steps.",
    },
    {
      number: "02",
      title: "Choose An Investment Plan",
      description:
        "Select the investment package that matches your financial goals.",
    },
    {
      number: "03",
      title: "Fund Your Account",
      description:
        "Securely deposit funds into your investment portfolio.",
    },
    {
      number: "04",
      title: "Grow Your Wealth",
      description:
        "Track performance and earn returns over your selected tenure.",
    },
  ];

  return (
    <section className="py-28 bg-[#071426]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
            How It Works
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Start Investing In Four Simple Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#D4AF37] transition"
            >
              <h3 className="text-5xl font-bold text-[#D4AF37]">
                {step.number}
              </h3>

              <h4 className="text-2xl font-semibold mt-6">
                {step.title}
              </h4>

              <p className="text-gray-400 mt-4 leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}