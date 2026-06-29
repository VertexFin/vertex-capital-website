"use client";

import {useEffect,useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";


export default function DepositPage(){

const router=useRouter();


const [coin,setCoin]=useState("BTC");
const [wallet,setWallet]=useState("");

const [amount,setAmount]=useState("");
const [txHash,setTxHash]=useState("");
const [loading,setLoading]=useState(false);


const [wallets,setWallets]=useState<any>({});



useEffect(()=>{

loadWallets();

},[]);



useEffect(()=>{

if(wallets){

setWallet(wallets[coin.toLowerCase()+"_wallet"] || "");

}

},[coin,wallets]);




const loadWallets=async()=>{

const {data}=await supabase
.from("wallet_settings")
.select("*")
.limit(1)
.single();


setWallets(data || {});

};





const submitDeposit=async(e:any)=>{

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

alert("Deposit submitted");

router.push("/dashboard");

}


setLoading(false);

};




return (

<main className="pt-32 px-6 min-h-screen bg-[#071426]">


<div className="max-w-xl mx-auto bg-white/5 p-8 rounded-3xl">


<h1 className="text-4xl text-white font-bold mb-8">
Deposit Funds
</h1>



<select
value={coin}
onChange={(e)=>setCoin(e.target.value)}
className="w-full p-4 bg-[#0E223D] text-white rounded-xl mb-5"
>

<option>BTC</option>
<option>ETH</option>
<option>USDT</option>
<option>LTC</option>

</select>




<div className="bg-[#0E223D] p-5 rounded-xl mb-5">

<p className="text-gray-400">
{coin} Wallet
</p>

<p className="text-[#D4AF37] break-all">
{wallet || "Wallet not set"}
</p>

</div>




<input
placeholder="Amount"
type="number"
value={amount}
onChange={(e)=>setAmount(e.target.value)}
className="w-full p-4 mb-5 bg-[#0E223D] text-white rounded-xl"
/>



<input
placeholder="Transaction Hash"
value={txHash}
onChange={(e)=>setTxHash(e.target.value)}
className="w-full p-4 mb-5 bg-[#0E223D] text-white rounded-xl"
/>




<button
disabled={loading}
onClick={submitDeposit}
className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold"
>

{loading ? "Submitting..." : "Submit Deposit"}

</button>



</div>

</main>

)

}