"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";


export default function WithdrawPage(){

const router=useRouter();


const [amount,setAmount]=useState("");
const [coin,setCoin]=useState("BTC");
const [wallet,setWallet]=useState("");
const [loading,setLoading]=useState(false);



const submit=async(e:any)=>{

e.preventDefault();

setLoading(true);


const {
data:{session}
}=await supabase.auth.getSession();



if(!session){
router.push("/login");
return;
}




const {error}=await supabase
.from("withdrawals")
.insert({

user_id:session.user.id,
amount:Number(amount),
coin,
wallet_address:wallet,
status:"pending"

});



if(error){

alert(error.message);

}else{

alert("Withdrawal request submitted");

router.push("/dashboard");

}


setLoading(false);

};




return (

<main className="pt-32 px-6 min-h-screen bg-[#071426]">


<div className="max-w-xl mx-auto bg-white/5 p-8 rounded-3xl">


<h1 className="text-4xl text-white font-bold mb-8">
Withdraw Funds
</h1>



<form
onSubmit={submit}
className="space-y-5"
>


<select
value={coin}
onChange={(e)=>setCoin(e.target.value)}
className="w-full p-4 bg-[#0E223D] text-white rounded-xl"
>

<option>BTC</option>
<option>ETH</option>
<option>USDT</option>
<option>LTC</option>

</select>




<input
placeholder="Amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="w-full p-4 bg-[#0E223D] text-white rounded-xl"
/>




<input
placeholder="Wallet Address"
value={wallet}
onChange={(e)=>setWallet(e.target.value)}
className="w-full p-4 bg-[#0E223D] text-white rounded-xl"
/>



<button
className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"
>

Submit Withdrawal

</button>


</form>


</div>


</main>

)

}