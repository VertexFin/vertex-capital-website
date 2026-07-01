"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function WithdrawPage(){

const router = useRouter();

const [balance,setBalance] = useState(0);
const [amount,setAmount] = useState("");
const [coin,setCoin] = useState("BTC");
const [wallet,setWallet] = useState("");
const [loading,setLoading] = useState(false);



useEffect(()=>{

loadUser();

},[]);



const loadUser = async()=>{

const {
data:{session}
}=await supabase.auth.getSession();


if(!session){
router.push("/login");
return;
}


const {data}=await supabase
.from("profile")
.select("balance")
.eq("id",session.user.id)
.single();


setBalance(Number(data?.balance || 0));

};





const submitWithdrawal = async(e:any)=>{

e.preventDefault();


const amountNumber = Number(amount);


if(amountNumber <= 0){

alert("Enter a valid amount");
return;

}


if(amountNumber > balance){

alert("Insufficient balance");
return;

}


if(!wallet){

alert("Enter wallet address");
return;

}


setLoading(true);



const {
data:{session}
}=await supabase.auth.getSession();



const {error}=await supabase
.from("withdrawals")
.insert({

user_id: session?.user.id,

amount: amountNumber,

coin,

wallet_address: wallet,

status:"pending"

});



setLoading(false);



if(error){

alert(error.message);

}else{

alert(
"Withdrawal request submitted. Awaiting approval."
);

router.push("/dashboard");

}


};




return (

<main className="pt-32 px-6 min-h-screen bg-[#071426]">


<div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">


<h1 className="text-4xl font-bold text-white mb-6">
Withdraw Funds
</h1>



<p className="text-gray-300 mb-6">

Available Balance:

<span className="text-[#D4AF37] ml-2 font-bold">

${balance}

</span>

</p>




<form
onSubmit={submitWithdrawal}
className="space-y-5"
>



<select

value={coin}

onChange={(e)=>setCoin(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D] text-white"

>

<option>BTC</option>
<option>ETH</option>
<option>USDT</option>
<option>LTC</option>

</select>





<input

type="number"

placeholder="Amount"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D] text-white"

/>





<input

placeholder="Wallet Address"

value={wallet}

onChange={(e)=>setWallet(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D] text-white"

/>





<button

disabled={loading}

className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"

>

{loading ? "Submitting..." : "Request Withdrawal"}

</button>



</form>


</div>


</main>

);

}