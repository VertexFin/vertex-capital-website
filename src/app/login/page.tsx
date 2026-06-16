"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);


    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    if (error) {

      setLoading(false);

      alert(error.message);

      return;
    }


    const user = data.user;


    if (!user) {

      setLoading(false);

      alert("Login failed");

      return;
    }



    // Get user profile
    const {
      data: profile,
      error: profileError
    } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single();



    setLoading(false);



    if (profileError) {

      alert(
        "Profile not found. Contact admin."
      );

      return;
    }



    // Admin redirect
    if (profile?.is_admin === true) {

      router.push("/admin");

      return;

    }



    // Normal investor
    router.push("/dashboard");

  };



  return (

    <main className="min-h-screen bg-[#071426] pt-32 px-6">


      <div className="max-w-md mx-auto">


        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">


          <h1 className="text-4xl font-bold mb-2">
            Login
          </h1>


          <p className="text-gray-400 mb-8">
            Access your investment account.
          </p>



          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >


            <input

              type="email"

              placeholder="Email Address"

              value={email}

              onChange={(e)=>
                setEmail(e.target.value)
              }

              className="w-full p-4 rounded-xl bg-[#0E223D]"

              required

            />



            <input

              type="password"

              placeholder="Password"

              value={password}

              onChange={(e)=>
                setPassword(e.target.value)
              }

              className="w-full p-4 rounded-xl bg-[#0E223D]"

              required

            />



            <button

              type="submit"

              disabled={loading}

              className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"

            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>



          </form>


        </div>


      </div>


    </main>

  );
}