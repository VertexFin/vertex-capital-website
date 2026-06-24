export default function Testimonials() {
  return (
    <section className="py-28 bg-[#081726]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Trusted By Investors
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-300 leading-8">
              Vertex Capital has completely transformed how I invest.
              The platform is transparent and easy to use.
            </p>

            <h4 className="mt-6 font-bold text-white">
              Michael Johnson
            </h4>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-300 leading-8">
              Exceptional returns and excellent support.
              I highly recommend their investment plans.
            </p>

            <h4 className="mt-6 font-bold text-white">
              Sarah Williams
            </h4>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <p className="text-gray-300 leading-8">
              The best investment experience I have had.
              Professional and reliable.
            </p>

            <h4 className="mt-6 font-bold text-white">
              David Roberts
            </h4>
          </div>

        </div>

      </div>

    </section>
  );
}