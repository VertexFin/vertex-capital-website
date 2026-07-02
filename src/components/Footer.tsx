"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Vertex
              <span className="text-[#D4AF37]"> Capital</span>
            </h2>

            <p className="text-gray-400 mt-4">
              Professional investment solutions focused on wealth creation,
              capital preservation and long-term financial growth.
            </p>

          </div>

          <div>

            <h3 className="font-bold mb-4 text-white">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link href="/about">About</Link>
              <Link href="/investments">Investments</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/contact">Contact</Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4 text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <Link href="/privacy">
                Privacy Policy
              </Link>

              <Link href="/terms">
                Terms & Conditions
              </Link>

              <Link href="/risk-disclosure">
                Risk Disclosure
              </Link>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4 text-white">
              Contact
            </h3>

            <div className="text-gray-400 space-y-3">

             <h3 className="text-white font-bold mb-4">
Live Support
</h3>

<p className="text-gray-400">
Need help with your investment?
</p>

<Link
  href="/support"
  className="inline-block mt-5 bg-[#D4AF37] text-black px-5 py-3 rounded-xl font-bold"
>
  Chat With An Advisor
</Link>

              <p>
                Address: Mark Richards, 18 Haast Close, Kelson, Lower Hutt, 5010 , New Zealand.
              </p>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500">

          © 2026 Vertex Capital Finance Ltd.
          All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}