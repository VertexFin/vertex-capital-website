"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();


  useEffect(() => {

    const getUser = async () => {

      const {
        data: { session }
      } = await supabase.auth.getSession();


      if (!session) {
        setUser(null);
        return;
      }


      setUser(session.user);


      const { data: profile, error } =
  await supabase
    .from("profile")
    .select("is_admin")
    .eq("id", session.user.id)
    .maybeSingle();


if (!error && profile?.is_admin === true) {
  setIsAdmin(true);
} else {
  setIsAdmin(false);
}


      if (profile?.is_admin === true) {
        setIsAdmin(true);
      }

    };


    getUser();


    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      () => {
        getUser();
      }
    );


    return () => {
      listener.subscription.unsubscribe();
    };


  }, []);



  const handleInvest = () => {

    if (user) {

      router.push("/dashboard");

    } else {

      router.push("/register");

    }

  };



  const handleLogout = async () => {

    await supabase.auth.signOut();

    setUser(null);
    setIsAdmin(false);

    router.push("/");

  };



  return (

<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#071426]/80 border-b border-white/10">


<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">


<Link href="/">
<h1 className="text-2xl font-bold">
Vertex <span className="text-[#D4AF37]">Capital</span>
</h1>
</Link>



<nav className="hidden xl:flex gap-6 text-white">

<Link href="/">Home</Link>
<Link href="/about">About</Link>
<Link href="/investments">Investments</Link>
<Link href="/faq">FAQ</Link>
<Link href="/contact">Contact</Link>


{user && (
<Link href="/dashboard">
Dashboard
</Link>
)}


{isAdmin && (
<Link href="/admin">
Admin
</Link>
)}


</nav>



<div className="hidden xl:flex items-center gap-4">


{!user ? (

<Link
href="/login"
className="border border-white/20 px-5 py-3 rounded-full"
>
Login
</Link>

) : (

<button
onClick={handleLogout}
className="border border-white/20 px-5 py-3 rounded-full"
>
Logout
</button>

)}



<button
onClick={handleInvest}
className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-semibold"
>
Start Investing
</button>


</div>




<button
onClick={()=>setOpen(!open)}
className="xl:hidden text-3xl"
>
{open ? <FiX/> : <FiMenu/>}
</button>


</div>




{open && (

<div className="xl:hidden bg-[#071426] p-6 text-white flex flex-col gap-5">


<Link href="/">Home</Link>
<Link href="/about">About</Link>
<Link href="/investments">Investments</Link>
<Link href="/faq">FAQ</Link>
<Link href="/contact">Contact</Link>


{user && (
<Link href="/dashboard">
Dashboard
</Link>
)}


{isAdmin && (
<Link href="/admin">
Admin
</Link>
)}



<button
onClick={handleInvest}
className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl"
>
Start Investing
</button>



{user ? (

<button
onClick={handleLogout}
className="text-red-400 text-left"
>
Logout
</button>

) : (

<Link href="/login">
Login
</Link>

)}



</div>

)}



</header>

  );
}