import Image from "next/image";
export default function About() {
  return (
    <section
      id="about"
      className="py-28 bg-[#071426]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
  <Image
    src="/images/boardroom.jpg"
    alt="Boardroom Meeting"
    width={700}
    height={500}
    className="w-full h-[500px] object-cover rounded-3xl"
  />
</div>

          <div>

            <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
              About Vertex Capital
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Helping Investors Build Sustainable Wealth
            </h2>

            <p className="text-gray-300 mt-6 leading-8">
              Vertex Capital Finance Ltd provides structured savings and
              investment opportunities designed to help individuals,
              professionals and businesses grow wealth through disciplined
              financial planning and professionally managed investment products.
            </p>

            <p className="text-gray-300 mt-4 leading-8">
              Our focus is transparency, security, consistency and long-term
              value creation for every investor.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div>
                <h3 className="text-[#D4AF37] text-3xl font-bold">
                  10+
                </h3>
                <p className="text-gray-400">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-[#D4AF37] text-3xl font-bold">
                  $10B+
                </h3>
                <p className="text-gray-400">
                  Assets Managed
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-20">

  <h2 className="text-4xl font-bold text-white">
    Why Choose Vertex Capital
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mt-10">

    <div className="bg-white/5 p-6 rounded-2xl">
      <h3 className="font-bold text-[#D4AF37]">
        Secure Investments
      </h3>
      <p className="mt-3 text-gray-400">
        Structured investment opportunities with professional oversight.
      </p>
    </div>

    <div className="bg-white/5 p-6 rounded-2xl">
      <h3 className="font-bold text-[#D4AF37]">
        Consistent Returns
      </h3>
      <p className="mt-3 text-gray-400">
        Investment plans designed for long-term growth.
      </p>
    </div>

    <div className="bg-white/5 p-6 rounded-2xl">
      <h3 className="font-bold text-[#D4AF37]">
        Dedicated Support
      </h3>
      <p className="mt-3 text-gray-400">
        Our team is available to guide investors at every stage.
      </p>
    </div>

  </div>

</div>

<div className="mt-24">

  <h2 className="text-4xl font-bold text-white text-center">
    What Our Investors Say
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mt-12">

    <div className="bg-white/5 p-6 rounded-2xl">
      <p>
        Vertex Capital has helped me build a disciplined investment strategy.
      </p>
      <h4 className="mt-4 font-bold text-white">
        Michael Johnson
      </h4>
    </div>

    <div className="bg-white/5 p-6 rounded-2xl">
      <p>
        Professional service and transparent investment opportunities.
      </p>
      <h4 className="mt-4 font-bold text-white">
        Sarah Williams
      </h4>
    </div>

    <div className="bg-white/5 p-6 rounded-2xl">
      <p>
        One of the best investment experiences I've had.
      </p>
      <h4 className="mt-4 font-bold text-white">
        David Roberts
      </h4>
    </div>

  </div>

</div>
    </section>
  );
}