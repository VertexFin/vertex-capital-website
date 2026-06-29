"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 bg-[#071426]"
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16">


          <div>

            <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
              Contact Us
            </span>


            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
              Let's Build Your Financial Future
            </h2>


            <p className="text-gray-400 mt-6 text-lg leading-8">
              Speak with our team about investment opportunities tailored to your goals.
            </p>


          </div>





          <form
            action="https://formsubmit.co/supportvertexcapital@gmail.com"
            method="POST"
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >


            <input
              type="hidden"
              name="_subject"
              value="New message from Vertex Capital website"
            />


            <input
              type="hidden"
              name="_captcha"
              value="false"
            />

            <input
  type="hidden"
  name="_next"
  value="https://vertex-capital-website.vercel.app/"
/>



            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-4 mb-4 rounded-xl bg-[#0E223D] text-white"
            />



            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-4 mb-4 rounded-xl bg-[#0E223D] text-white"
            />



            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full p-4 mb-4 rounded-xl bg-[#0E223D] text-white"
            />



            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              required
              className="w-full p-4 rounded-xl bg-[#0E223D] text-white"
            />



            <button
              type="submit"
              className="w-full mt-6 bg-[#D4AF37] text-black py-4 rounded-xl font-bold"
            >
              Send Message
            </button>



          </form>


        </div>

      </div>

    </section>
  );
}