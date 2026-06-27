"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function AdminPage() {

const router = useRouter();

const [users,setUsers]=useState<any[]>([]);
const [deposits,setDeposits]=useState<any[]>([]);
const [loading,setLoading]=useState(true);



useEffect(()=>{
checkAdmin();
},[]);



const checkAdmin = async()=>{


const {
data:{session}
}=await supabase.auth.getSession();



if(!session){

router.push("/login");
return;

}




const {data:profile}=await supabase
.from("profile")
.select("is_admin")
.eq("id",session.user.id)
.single();



if(!profile?.is_admin){

router.push("/dashboard");
return;

}



loadData();

};





const loadData = async()=>{


const {data:userData}=await supabase
.from("profile")
.select("*");



const {data:depositData}=await supabase
.from("deposits")
.select("*");



setUsers(userData || []);
setDeposits(depositData || []);

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


loadData();

};





const logout = async()=>{

await supabase.auth.signOut();

router.push("/login");

};





if(loading){

return (
<main className="pt-32 text-white text-center">
Loading Admin...
</main>
)

}





const pendingDeposits =
deposits.filter(
(item)=>item.status==="pending"
).length;




return (

<main className="pt-32 px-6 min-h-screen bg-[#071426] pb-20">



<div className="flex justify-between items-center mb-10">


<h1 className="text-4xl font-bold text-white">
Admin Dashboard
</h1>



<button
onClick={logout}
className="border border-red-400 text-red-400 px-5 py-2 rounded-xl"
>
Logout
</button>



</div>






<div className="grid md:grid-cols-3 gap-6 mb-10">



<div className="bg-white/5 p-6 rounded-3xl border border-white/10">

<p className="text-gray-400">
Total Users
</p>

<h2 className="text-4xl text-white font-bold">
{users.length}
</h2>

</div>





<div className="bg-white/5 p-6 rounded-3xl border border-white/10">

<p className="text-gray-400">
Total Deposits
</p>

<h2 className="text-4xl text-[#D4AF37] font-bold">
${deposits.reduce((a,b)=>a+Number(b.amount),0)}
</h2>

</div>





<div className="bg-white/5 p-6 rounded-3xl border border-white/10">

<p className="text-gray-400">
Pending Deposits
</p>

<h2 className="text-4xl text-white font-bold">
{pendingDeposits}
</h2>

</div>



</div>






<div className="flex gap-4 mb-10">


<Link
href="/admin/deposits"
className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold"
>
Manage Deposits
</Link>


<Link
href="/admin/withdrawals"
className="border border-white/20 text-white px-6 py-3 rounded-xl"
>
Withdrawals
</Link>



</div>








<div className="space-y-5">


{users.map((user)=>(


<div
key={user.id}
className="bg-white/5 border border-white/10 p-6 rounded-2xl"
>


<h2 className="text-xl text-white font-bold">
{user.full_name || "User"}
</h2>



<p className="text-gray-400">
{user.email}
</p>




<p className="mt-3 text-white">
Balance:
${user.balance || 0}
</p>





<input

type="number"

placeholder="Add new balance"

onBlur={(e)=>
updateBalance(
user.id,
Number(e.target.value)
)
}

className="mt-4 w-full bg-[#0E223D] p-3 rounded-xl text-white"

 />



</div>


))}



</div>





</main>

)

}