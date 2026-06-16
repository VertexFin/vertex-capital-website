"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/SectionHeader";


export default function Plans() {

  const router = useRouter();


  const handleInvest = async () => {

    const {
      data: { session }
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

            <h3 className="text-3xl font-bold">
              Starter Plan
            </h3>


            <p className="text-[#D4AF37] text-5xl font-bold mt-6">
              10%
            </p>

            <p className="text-gray-400">
              Annual ROI
            </p>


            <ul className="space-y-4 mt-8 text-gray-300">
              <li>Minimum $100</li>
              <li>12 Months Tenure</li>
              <li>Quarterly Reports</li>
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


            <h3 className="text-3xl font-bold">
              Premium Plan
            </h3>


            <p className="text-[#D4AF37] text-5xl font-bold mt-6">
              12%
            </p>


            <p className="text-gray-400">
              Annual ROI
            </p>


            <ul className="space-y-4 mt-8 text-gray-300">
              <li>Minimum $500</li>
              <li>18 Months Tenure</li>
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


            <h3 className="text-3xl font-bold">
              Wealth Builder
            </h3>


            <p className="text-[#D4AF37] text-5xl font-bold mt-6">
              15%
            </p>


            <p className="text-gray-400">
              Annual ROI
            </p>


            <ul className="space-y-4 mt-8 text-gray-300">
              <li>Minimum $1000</li>
              <li>24 Months Tenure</li>
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





      <div className="mt-24">


        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>



        <div className="grid md:grid-cols-4 gap-6 mt-12">



          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-[#D4AF37] text-3xl font-bold">
              01
            </h3>
            <p className="mt-4">
              Create an account
            </p>
          </div>



          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-[#D4AF37] text-3xl font-bold">
              02
            </h3>
            <p className="mt-4">
              Choose a plan
            </p>
          </div>



          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-[#D4AF37] text-3xl font-bold">
              03
            </h3>
            <p className="mt-4">
              Fund your account
            </p>
          </div>



          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-[#D4AF37] text-3xl font-bold">
              04
            </h3>

            <p className="mt-4">
              Track your returns
            </p>

          </div>



        </div>


      </div>


    </section>
  );
}