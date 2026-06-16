"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function InvestButton() {

  const router = useRouter();


  const handleClick = async () => {

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

    <button
      onClick={handleClick}
      className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
    >

      Start Investing

    </button>

  );
}