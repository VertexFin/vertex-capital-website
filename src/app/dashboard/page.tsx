"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function DashboardPage(){

const router = useRouter();

const [balance,setBalance]=useState(0);
const [deposits,setDeposits]=useState<any[]>([]);
const [withdrawals,setWithdrawals]=useState<any[]>([]);
const [plan,setPlan]=useState("No Plan");
const [loading,setLoading]=useState(true);



useEffect(()=>{
loadDashboard();
},[]);



const loadDashboard = async()=>{


const {
data:{session}
}=await supabase.auth.getSession();



if(!session){
router.push("/login");
return;
}




const {data:profile}=await supabase
.from("profile")
.select("*")
.eq("id",session.user.id)
.single();




if(profile?.is_admin){

router.push("/admin");
return;

}




setBalance(profile?.balance || 0);
setPlan(profile?.plan || "No Plan");





const {data:depositData}=await supabase
.from("deposits")
.select("*")
.eq("user_id",session.user.id);



setDeposits(depositData || []);





const {data:withdrawData}=await supabase
.from("withdrawals")
.select("*")
.eq("user_id",session.user.id);



setWithdrawals(withdrawData || []);



setLoading(false);


};





if(loading){

return (
<main className="pt-32 text-center text-white">
Loading...
</main>
)

}



const totalDeposits =
deposits
.filter(x=>x.status==="approved")
.reduce(
(total,item)=>total+Number(item.amount),
0
);



const totalWithdrawals =
withdrawals
.filter(x=>x.status==="approved")
.reduce(
(total,item)=>total+Number(item.amount),
0
);




return (

<main className="pt-32 px-6 min-h-screen bg-[#071426] pb-32">



<h1 className="text-4xl font-bold text-white mb-10">
Investor Dashboard
</h1>





<div className="grid md:grid-cols-4 gap-6 mb-10">



<div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

<p className="text-gray-400">
Available Balance
</p>

<h2 className="text-3xl font-bold text-[#D4AF37]">
${balance.toLocaleString()}
</h2>

</div>





<div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

<p className="text-gray-400">
Total Deposits
</p>

<h2 className="text-3xl font-bold text-white">
${totalDeposits.toLocaleString()}
</h2>

</div>





<div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

<p className="text-gray-400">
Withdrawals
</p>

<h2 className="text-3xl font-bold text-white">
${totalWithdrawals.toLocaleString()}
</h2>

</div>





<div className="bg-white/5 border border-white/10 p-6 rounded-3xl">

<p className="text-gray-400">
Current Plan
</p>

<h2 className="text-2xl font-bold text-white">
{plan}
</h2>

</div>




</div>





<Link
href="/deposit"
className="inline-block bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold"
>
Deposit Funds
</Link>

<Link href="/withdraw"
className="inline-block bg-[#D4AF37] text-black px-6 py-3 pl-4 rounded-xl font-bold"
>
Withdraw
</Link>


<h2 className="text-2xl font-bold text-white mt-12 mb-6">
Deposit History
</h2>



<div className="space-y-4">

{deposits.map((item)=>(

<div
key={item.id}
className="bg-white/5 border border-white/10 p-5 rounded-xl"
>

<p className="text-white">
${item.amount}
</p>

<p className="text-gray-400">
{item.coin}
</p>

<p className="text-[#D4AF37]">
{item.status}
</p>


</div>

))}


</div>



</main>

)

}