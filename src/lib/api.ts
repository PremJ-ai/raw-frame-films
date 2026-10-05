// API helpers keep network calls in one place so components only need to know what data they submit.
export type Lead = { name:string; email?:string; phone?:string; company?:string; message:string; source?:string };
export type Meeting = Lead & { date:string; time:string; timezone?:string };
export async function submitLead(lead:Lead) {
  const response = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(lead) });
  if (!response.ok) throw new Error((await response.json().catch(()=>({}))).error || "Could not send enquiry");
  return response.json();
}
export async function bookMeeting(meeting:Meeting) {
  const response = await fetch("/api/meetings", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(meeting) });
  if (!response.ok) throw new Error((await response.json().catch(()=>({}))).error || "Could not book meeting");
  return response.json();
}
export async function askStudio(message:string, history:{role:"user"|"assistant";content:string}[]) {
  const response = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({message,history}) });
  if (!response.ok) throw new Error("Chat is temporarily unavailable");
  return response.json() as Promise<{reply:string; action?:string}>;
}