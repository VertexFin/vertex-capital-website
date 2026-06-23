"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function DepositPage(){

const router = useRouter();


const [amount,setAmount] = useState("");
const [coin,setCoin] = useState("USDT");
const [txHash,setTxHash] = useState("");
const [loading,setLoading] = useState(false);



const submitDeposit = async(e:any)=>{

e.preventDefault();

setLoading(true);



const {
 data:{session}
}= await supabase.auth.getSession();



if(!session){

router.push("/login");
return;

}




const {error}= await supabase
.from("deposits")
.insert({

user_id:session.user.id,
amount:Number(amount),
coin,
tx_hash:txHash,
status:"pending"

});





if(error){

alert(error.message);

}else{

alert("Deposit submitted. Awaiting approval.");

router.push("/dashboard");

}



setLoading(false);


};





return (

<main className="pt-32 px-6 min-h-screen bg-[#071426]">


<div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">


<h1 className="text-4xl font-bold mb-8">
Deposit Funds
</h1>



<form
onSubmit={submitDeposit}
className="space-y-5"
>



<input

type="number"

placeholder="Amount"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D]"

/>




<select

value={coin}

onChange={(e)=>setCoin(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D]"

>

<option>USDT</option>
<option>BTC</option>
<option>ETH</option>


</select>





<input

placeholder="Transaction Hash"

value={txHash}

onChange={(e)=>setTxHash(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D]"

/>





<button

disabled={loading}

className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"

>

{loading ? "Submitting..." : "Submit Deposit"}

</button>




</form>


</div>


</main>

);


}