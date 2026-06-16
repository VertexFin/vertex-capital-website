"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function InvestmentCalculator() {

  const router = useRouter();

  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(1);


  const roi = 10;


  const profit = (amount * roi * years) / 100;

  const total = amount + profit;



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
    <section className="py-28 bg-[#071426]">


      <div className="max-w-7xl mx-auto px-6">


        <div className="text-center">


          <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm">
            Investment Calculator
          </span>


          <h2 className="text-5xl font-bold mt-4">
            Estimate Your Returns
          </h2>


          <p className="text-gray-400 mt-4">
            Calculate your expected returns based on investment amount and duration.
          </p>


        </div>





        <div className="grid lg:grid-cols-2 gap-10 mt-16">



          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">


            <label className="block text-gray-300 mb-3">
              Investment Amount ($)
            </label>


            <input

              type="number"

              value={amount}

              onChange={(e)=>
                setAmount(Number(e.target.value))
              }

              className="w-full bg-[#0E223D] border border-white/10 rounded-xl p-4 text-white"

            />



            <label className="block text-gray-300 mt-8 mb-3">

              Duration (Years)

            </label>



            <input

              type="range"

              min="1"

              max="5"

              value={years}

              onChange={(e)=>
                setYears(Number(e.target.value))
              }

              className="w-full"

            />


            <p className="mt-3 text-[#D4AF37] font-semibold">

              {years} Year(s)

            </p>


          </div>





          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">



            <div className="mb-8">

              <p className="text-gray-400">
                Investment Amount
              </p>


              <h3 className="text-4xl font-bold mt-2">
                ${amount.toLocaleString()}
              </h3>

            </div>





            <div className="mb-8">

              <p className="text-gray-400">
                Estimated Profit
              </p>


              <h3 className="text-4xl font-bold text-[#D4AF37] mt-2">

                ${profit.toLocaleString()}

              </h3>


            </div>





            <div>

              <p className="text-gray-400">
                Maturity Value
              </p>


              <h3 className="text-5xl font-bold mt-2">

                ${total.toLocaleString()}

              </h3>


            </div>


          </div>


        </div>


      </div>





      <section className="py-24 bg-[#0E223D]">


        <div className="max-w-5xl mx-auto text-center px-6">


          <h2 className="text-5xl font-bold">

            Start Building Wealth Today

          </h2>



          <p className="text-gray-400 mt-6">

            Join thousands of investors growing their portfolios with Vertex Capital.

          </p>





          <button

            onClick={handleInvest}

            className="inline-block bg-[#D4AFGold] text-black px-8 py-4 rounded-xl font-bold mt-8"

          >

            Start Investing

          </button>



        </div>


      </section>


    </section>
  );
}