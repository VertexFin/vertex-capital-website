"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm the Vertex Capital AI Assistant. How can I help you today?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior:"smooth"
    });
  },[messages]);



  const sendMessage = async()=>{

    if(!input.trim()) return;


    const text = input;


    setMessages(prev=>[
      ...prev,
      {
        role:"user",
        content:text
      }
    ]);


    setInput("");
    setLoading(true);



    try{

      const res = await fetch("/api/chat",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:text
        })
      });


      const data = await res.json();


      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:data.reply
        }
      ]);


    }catch{


      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:"Sorry, I am unavailable right now."
        }
      ]);

    }


    setLoading(false);

  };



return (

<>

<div className="fixed top-24 left-5 z-[9999999] bg-red-500 text-white p-3">
CHAT WORKING
</div>

{!open && (

<button

onClick={()=>setOpen(true)}

className="
fixed
bottom-6
right-5
z-[999999]
w-16
h-16
rounded-full
bg-[#D4AF37]
text-black
shadow-2xl
flex
items-center
justify-center
"

>

<FiMessageCircle size={30}/>

</button>

)}



{open && (

<div

className="
fixed
bottom-4
right-3
z-[999999]
w-[calc(100vw-24px)]
max-w-[390px]
h-[75vh]
bg-[#071426]
border
border-white/10
rounded-3xl
shadow-2xl
overflow-hidden
flex
flex-col
"

>



<div className="
bg-[#0E223D]
p-5
flex
justify-between
items-center
">


<div>

<h3 className="text-white font-bold">

Vertex AI Assistant

</h3>


<p className="text-green-400 text-xs">

Online 24/7

</p>

</div>



<button
onClick={()=>setOpen(false)}
className="text-white"
>

<FiX size={22}/>

</button>


</div>




<div className="
flex-1
overflow-y-auto
p-4
space-y-4
">


{messages.map((msg,i)=>(


<div

key={i}

className={`
p-3
rounded-2xl
text-sm
${
msg.role==="user"
?
"bg-[#D4AF37] text-black ml-8"
:
"bg-[#0E223D] text-white mr-8"
}
`}

>

{msg.content}

</div>


))}



{loading && (

<div className="
bg-[#0E223D]
text-gray-300
p-3
rounded-2xl
mr-8
">

Typing...

</div>

)}



<div ref={bottomRef}/>


</div>





<div className="
border-t
border-white/10
p-3
flex
gap-2
">


<input

value={input}

onChange={(e)=>setInput(e.target.value)}

onKeyDown={(e)=>{
if(e.key==="Enter") sendMessage()
}}

placeholder="Ask me anything..."

className="
flex-1
bg-[#0E223D]
rounded-xl
p-3
text-white
outline-none
"

/>



<button

onClick={sendMessage}

className="
bg-[#D4AF37]
text-black
rounded-xl
px-4
"

>

<FiSend/>

</button>


</div>


</div>

)}


</>

);

}