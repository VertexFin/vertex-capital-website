"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {

  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    checkAdmin();
  }, []);



  const checkAdmin = async () => {

    const {
      data:{session}
    } = await supabase.auth.getSession();


    if(!session){
      router.push("/login");
      return;
    }



    const {data:profile} = await supabase
      .from("profile")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();



    if(!profile?.is_admin){

      router.push("/dashboard");
      return;

    }


    loadUsers();

  };





  const loadUsers = async () => {

    const {data} = await supabase
      .from("profile")
      .select("*")
      .order("created_at",{ascending:false});


    setUsers(data || []);

    setLoading(false);

  };






  const updateBalance = async(
    id:string,
    value:number
  )=>{


    await supabase
      .from("profile")
      .update({
        balance:value
      })
      .eq("id",id);



    loadUsers();

  };






  const handleLogout = async()=>{

    await supabase.auth.signOut();

    router.push("/login");

  };





  if(loading){

    return (
      <main className="pt-32 text-center">
        Loading admin...
      </main>
    );

  }






  return (

<main className="pt-32 px-6 min-h-screen bg-[#071426]">


<div className="flex flex-col md:flex-row md:justify-between gap-6 mb-10">


<div>

<h1 className="text-4xl font-bold">
Admin Dashboard
</h1>

<p className="text-gray-400 mt-2">
Manage users, balances and deposits.
</p>

<div className="grid md:grid-cols-3 gap-6 mt-8 mb-10">

<div className="bg-white/5 p-6 rounded-2xl">
<p className="text-gray-400">
Users
</p>

<h2 className="text-4xl font-bold">
{users.length}
</h2>
</div>


<div className="bg-white/5 p-6 rounded-2xl">
<p className="text-gray-400">
Admins
</p>

<h2 className="text-4xl font-bold">
1
</h2>
</div>



<div className="bg-white/5 p-6 rounded-2xl">

<p className="text-gray-400">
System
</p>

<h2 className="text-4xl font-bold text-[#D4AF37]">
Active
</h2>

</div>


</div>

</div>





<div className="flex gap-4">


<Link
href="/admin/deposits"
className="bg-[#D4AF37] text-black px-4 py-2 rounded-xl text-sm font-semibold w-auto"
>
Manage Deposits
</Link>



<button
onClick={handleLogout}
className="border border-white/20 px-4 py-2 rounded-xl text-sm w-auto"
>
Logout
</button>


</div>


</div>






<div className="grid gap-6">


{
users.map((user)=>(


<div
key={user.id}
className="bg-white/5 border border-white/10 p-6 rounded-2xl"
>


<h2 className="text-xl font-bold">
{user.full_name || "No Name"}
</h2>



<p className="text-gray-400">
{user.email}
</p>




<p className="mt-4">
Balance:

<span className="text-[#D4AF37] font-bold">
 ${user.balance || 0}
</span>

</p>





<input
type="number"
placeholder="New balance"
onBlur={(e)=>
 updateBalance(
 user.id,
 Number(e.target.value)
 )
}
className="mt-4 w-full bg-[#0E223D] p-3 rounded-xl"
/>





{
user.is_admin && (

<p className="mt-3 text-[#D4AF37]">
ADMIN ACCOUNT
</p>

)

}



</div>


))

}


</div>


</main>

  );

}