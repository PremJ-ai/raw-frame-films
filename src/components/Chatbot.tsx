import { useState } from "react";
import { askStudio } from "../lib/api";
import { faqs } from "../data/site";

// Chatbot is the first-response layer: it answers common questions and can be connected to an LLM through /api/chat.
export default function Chatbot(){
  const [open,setOpen]=useState(false); const [input,setInput]=useState(""); const [loading,setLoading]=useState(false);
  const [messages,setMessages]=useState<{role:"user"|"assistant";content:string}[]>([{role:"assistant",content:"Hey. Ask me about the work, services, timelines—or tell me what you need made."}]);
  async function send(text=input){
    if(!text.trim()||loading)return;
    const next=[...messages,{role:"user" as const,content:text.trim()}]; setMessages(next); setInput(""); setLoading(true);
    try { const result=await askStudio(text,next); setMessages([...next,{role:"assistant",content:result.reply}]); }
    catch { const lower=text.toLowerCase(); const match=faqs.find(f=>lower.includes(f.q.toLowerCase().slice(0,12))); setMessages([...next,{role:"assistant",content:match?.a||"I can help with services, work, planning, editing and booking. For a custom question, send an enquiry."}]); }
    finally {setLoading(false);}
  }
  return <div className={"chatbot "+(open?"chatbot--open":"")}>{open&&<div className="chat-window"><div className="chat-head"><b>RAW/FRAME AI</b><button onClick={()=>setOpen(false)}>×</button></div><div className="chat-log">{messages.map((m,i)=><div key={i} className={"chat-msg chat-msg--"+m.role}>{m.content}</div>)}{loading&&<div className="chat-msg chat-msg--assistant">Thinking…</div>}</div><div className="chat-suggestions">{["What do you make?","Can I book a shoot?","How does editing work?"].map(x=><button key={x} onClick={()=>send(x)}>{x}</button>)}</div><form onSubmit={e=>{e.preventDefault();send()}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask the studio…"/><button>→</button></form></div>}<button className="chat-launch" onClick={()=>setOpen(v=>!v)}>{open?"Close":"Ask AI"}<span>✦</span></button></div>;
}