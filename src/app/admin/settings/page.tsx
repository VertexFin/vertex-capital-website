"use client";

import {useEffect,useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";


export default function AdminSettings(){

const router = useRouter();

const [id,setId]=useState("");
const [btc,setBtc]=useState("");
const [eth,setEth]=useState("");
const [usdt,setUsdt]=useState("");
const [ltc,setLtc]=useState("");
const [loading,setLoading]=useState(true);



useEffect(()=>{
checkAdmin();
},[]);



const checkAdmin=async()=>{

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


loadWallets();

};




const loadWallets=async()=>{


const {data}=await supabase
.from("wallet_settings")
.select("*")
.limit(1)
.single();


if(data){

setId(data.id);
setBtc(data.btc_wallet || "");
setEth(data.eth_wallet || "");
setUsdt(data.usdt_wallet || "");
setLtc(data.ltc_wallet || "");

}

setLoading(false);

};




const save=async()=>{


const {error}=await supabase
.from("wallet_settings")
.update({

btc_wallet:btc,
eth_wallet:eth,
usdt_wallet:usdt,
ltc_wallet:ltc

})
.eq("id",id);



if(error){

alert(error.message);

}else{

alert("Wallets updated");

}


};




if(loading){
return <p className="pt-32 text-center">Loading...</p>
}



return (

<main className="pt-32 px-6 bg-[#071426] min-h-screen">


<div className="max-w-xl mx-auto bg-white/5 p-8 rounded-3xl">


<h1 className="text-4xl text-white font-bold mb-8">
Wallet Settings
</h1>



<input
value={btc}
onChange={(e)=>setBtc(e.target.value)}
placeholder="BTC Wallet"
className="w-full mb-4 p-4 bg-[#0E223D] text-white rounded-xl"
/>


<input
value={eth}
onChange={(e)=>setEth(e.target.value)}
placeholder="ETH Wallet"
className="w-full mb-4 p-4 bg-[#0E223D] text-white rounded-xl"
/>



<input
value={usdt}
onChange={(e)=>setUsdt(e.target.value)}
placeholder="USDT Wallet"
className="w-full mb-4 p-4 bg-[#0E223D] text-white rounded-xl"
/>



<input
value={ltc}
onChange={(e)=>setLtc(e.target.value)}
placeholder="LTC Wallet"
className="w-full mb-4 p-4 bg-[#0E223D] text-white rounded-xl"
/>



<button
onClick={save}
className="bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-bold"
>
Save Wallets
</button>



</div>

</main>

)

}