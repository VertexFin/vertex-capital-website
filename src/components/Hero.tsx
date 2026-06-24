"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-24 lg:pt-20">

      <div className="absolute inset-0 bg-gradient-to-br from-[#071426] via-[#0E223D] to-black" />

      <div className="absolute top-20 left-20 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-[120px]" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
              Trusted Wealth Management
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-6 leading-tight">
              Grow Your Wealth Through Strategic Investing
            </h1>

            <p className="text-gray-300 mt-8 text-lg md:text-xl leading-8">
              Professional investment solutions designed for long-term growth,
              stability and wealth creation.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/register"
                className="bg-[#D4AF37] text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                Start Investing
              </Link>

              <Link
                href="/investments"
                className="border border-white/20 px-8 py-4 rounded-xl text-white hover:bg-white/5 transition"
              >
                View Plans
              </Link>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <p className="text-gray-400">
                    Portfolio Value
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    $2.4M
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Annual ROI
                  </p>
                  <h3 className="text-3xl font-bold text-[#D4AF37]">
                    15%
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Investors
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    10,000+
                  </h3>
                </div>

                <div>
                  <p className="text-gray-400">
                    Active Plans
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    8
                  </h3>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}