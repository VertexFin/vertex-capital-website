"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }


    const { data: profile } =
      await supabase
        .from("profile")
        .select("*")
        .eq("id", session.user.id)
        .single();


    if (profile?.is_admin === true) {
      setIsAdmin(true);
    }

    setBalance(profile?.balance || 0);

    setLoading(false);
  };


  if (loading) {
    return (
      <main className="pt-32 text-center">
        Loading...
      </main>
    );
  }


  if (isAdmin) {
    return (
      <main className="pt-32 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>


        <Link
          href="/admin"
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl"
        >
          Open Admin Panel
        </Link>


      </main>
    );
  }



  return (
    <main className="pt-32 px-6">


      <h1 className="text-4xl font-bold mb-8">
        Investor Dashboard
      </h1>


      <div className="bg-white/5 p-6 rounded-xl mb-6">

        <p className="text-gray-400">
          Available Balance
        </p>

        <h2 className="text-3xl font-bold">
          ${balance}
        </h2>

      </div>


      <Link
        href="/deposit"
        className="bg-[#D4AF37] text-black px-6 pb-32 py-3 rounded-xl"
      >
        Deposit Funds
      </Link>


    </main>
  );
}