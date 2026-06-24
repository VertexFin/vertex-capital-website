"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function DepositPage(){

const router = useRouter();


const [amount,setAmount] = useState("");
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
coin:"BTC",
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



<h1 className="text-4xl font-bold text-white mb-8">
Deposit Bitcoin
</h1>




<div className="bg-[#0E223D] p-6 rounded-2xl mb-8">


<h3 className="text-xl font-bold text-white mb-4">
Bitcoin Deposit Address
</h3>



<p className="text-[#D4AF37] break-all font-medium">

bc1qvetmpa2d5ftxg60g3yt8mh2tk26yfty9hrpfka

</p>



<p className="text-gray-400 mt-3 text-sm">

Send only Bitcoin (BTC) to this address.
After sending your payment, enter the transaction hash below.

</p>



</div>





<form
onSubmit={submitDeposit}
className="space-y-5"
>





<input

type="number"

placeholder="Amount"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D] text-white"

/>






<input

placeholder="Transaction Hash"

value={txHash}

onChange={(e)=>setTxHash(e.target.value)}

className="w-full p-4 rounded-xl bg-[#0E223D] text-white"

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