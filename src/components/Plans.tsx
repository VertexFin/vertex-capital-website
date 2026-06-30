"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/SectionHeader";

export default function Plans() {
  const router = useRouter();

  const handleInvest = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  return (
    <section
      id="plans"
      className="py-28 bg-[#081726]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          badge="Investment Packages"
          title="Choose Your Investment Plan"
          description="Select an investment strategy that aligns with your financial goals and risk profile."
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {/* Starter */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-white">
              Starter Plan
            </h3>

            <p className="text-[#D4AF37] text-5xl font-bold mt-6">
              5%
            </p>

            <p className="text-gray-300">
              Weekly ROI
            </p>

            <ul className="space-y-4 mt-8 text-gray-300">
              <li>$100 - $4,999</li>
              <li>7 Days Duration</li>
              <li>Weekly Reports</li>
            </ul>

            <button
              onClick={handleInvest}
              className="w-full mt-8 bg-[#D4AF37] text-black py-4 rounded-xl font-semibold"
            >
              Invest Now
            </button>

          </div>

          {/* Premium */}
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37] rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-white">
              Premium Plan
            </h3>

            <p className="text-[#D4AF37] text-5xl font-bold mt-6">
              10%
            </p>

            <p className="text-gray-300">
              Bi-Weekly ROI
            </p>

            <ul className="space-y-4 mt-8 text-gray-300">
              <li>$5,000 - $9,999</li>
              <li>14 Days Duration</li>
              <li>Priority Support</li>
            </ul>

            <button
              onClick={handleInvest}
              className="w-full mt-8 bg-[#D4AF37] text-black py-4 rounded-xl font-semibold"
            >
              Invest Now
            </button>

          </div>

          {/* Wealth */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

            <h3 className="text-3xl font-bold text-white">
              Wealth Builder
            </h3>

            <p className="text-[#D4AF37] text-5xl font-bold mt-6">
              15%
            </p>

            <p className="text-gray-300">
              Monthly ROI
            </p>

            <ul className="space-y-4 mt-8 text-gray-300">
              <li>$10,000 - $19,999</li>
              <li>30 Days Duration</li>
              <li>Dedicated Advisor</li>
            </ul>

            <button
              onClick={handleInvest}
              className="w-full mt-8 bg-[#D4AF37] text-black py-4 rounded-xl font-semibold"
            >
              Invest Now
            </button>

          </div>

        </div>

      </div>

      {/* HOW IT WORKS */}

      <div className="max-w-7xl mx-auto px-6 mt-24">

        <h2 className="text-4xl font-bold text-center text-white">
          How It Works
        </h2>

        <p className="text-center text-gray-300 mt-4">
          Start your investment journey in four simple steps.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-5xl font-bold text-[#D4AF37]">
              01
            </h3>

            <h4 className="text-white text-2xl font-bold mt-6">
              Create an Account
            </h4>

            <p className="mt-4 text-gray-300 leading-7">
              Register your investment account and complete your profile securely.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-5xl font-bold text-[#D4AF37]">
              02
            </h3>

            <h4 className="text-white text-2xl font-bold mt-6">
              Choose a Plan
            </h4>

            <p className="mt-4 text-gray-300 leading-7">
              Select the investment package that best suits your financial goals.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-5xl font-bold text-[#D4AF37]">
              03
            </h3>

            <h4 className="text-white text-2xl font-bold mt-6">
              Fund Your Account
            </h4>

            <p className="mt-4 text-gray-300 leading-7">
              Deposit funds into your account and submit your transaction for approval.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-5xl font-bold text-[#D4AF37]">
              04
            </h3>

            <h4 className="text-white text-2xl font-bold mt-6">
              Track Your Returns
            </h4>

            <p className="mt-4 text-gray-300 leading-7">
              Monitor your investment growth, earnings and portfolio directly from your dashboard.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}