"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function DashboardPage() {

  const router = useRouter();

  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [plan, setPlan] = useState("No Plan");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    loadDashboard();
  }, []);



  const loadDashboard = async () => {

    const {
      data: { session }
    } = await supabase.auth.getSession();



    if (!session) {
      router.push("/login");
      return;
    }



    const { data: profile } = await supabase
      .from("profile")
      .select("*")
      .eq("id", session.user.id)
      .single();



    if (profile?.is_admin) {
      router.push("/admin");
      return;
    }



    setBalance(profile?.balance || 0);
    setPlan(profile?.plan || "No Plan");



    const { data } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", {
        ascending: false
      });



    setDeposits(data || []);

    setLoading(false);

  };




  if (loading) {

    return (
      <main className="pt-32 text-center">
        Loading...
      </main>
    );

  }




  return (

    <main className="pt-32 px-6 min-h-screen bg-[#071426] pb-32">



      <h1 className="text-4xl font-bold mb-8">
        Investor Dashboard
      </h1>





      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8">


        <p className="text-gray-400">
          Available Balance
        </p>


        <h2 className="text-5xl font-bold text-[#D4AF37] mt-3">
          ${balance.toLocaleString()}
        </h2>


      </div>





      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-10">


        <h2 className="text-2xl font-bold mb-6">
          My Investment
        </h2>



        <div className="grid md:grid-cols-3 gap-6">


          <div>

            <p className="text-gray-400">
              Current Plan
            </p>

            <h3 className="text-xl font-bold">
              {plan}
            </h3>

          </div>




          <div>

            <p className="text-gray-400">
              Expected ROI
            </p>

            <h3 className="text-xl font-bold text-[#D4AF37]">
              10%
            </h3>

          </div>





          <div>

            <p className="text-gray-400">
              Status
            </p>

            <h3 className="text-xl font-bold">
              Active
            </h3>

          </div>



        </div>


      </div>







      <Link
        href="/deposit"
        className="inline-block bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold mb-12"
      >
        Deposit Funds
      </Link>






      <h2 className="text-2xl font-bold mb-6">
        Deposit History
      </h2>





      <div className="space-y-5">


        {
          deposits.map((item) => (


            <div
              key={item.id}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >


              <p>
                Amount:
                <b>
                  ${item.amount}
                </b>
              </p>



              <p>
                Coin: {item.coin}
              </p>




              <p>
                Status:

                <span className="text-[#D4AF37] ml-2">
                  {item.status}
                </span>

              </p>




              <p className="text-gray-500 text-sm mt-2">

                {new Date(
                  item.created_at
                ).toLocaleString()}

              </p>




            </div>


          ))
        }





        {
          deposits.length === 0 && (

            <p className="text-gray-400">
              No deposits yet.
            </p>

          )
        }



      </div>




    </main>

  );

}