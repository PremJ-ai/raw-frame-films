import type { VercelRequest,VercelResponse } from "@vercel/node";
import { google } from "googleapis";
import { getDb } from "./db";

// Meeting API stores every request, checks Google Calendar for conflicts, and creates an event when configured.
export default async function handler(req:VercelRequest,res:VercelResponse){
  if(req.method!=="POST"){res.setHeader("Allow","POST");return res.status(405).json({error:"Method not allowed"});}
  const {name,email,phone,company,message,date,time,timezone="Asia/Kolkata"}=req.body??{};
  if(!name||!email||!date||!time)return res.status(400).json({error:"Name, email, date and time are required"});
  try{
    const startText=String(date)+" "+String(time);
    const result=await getDb().query("INSERT INTO meetings (name,email,phone,company,message,start_at,timezone,status) VALUES ($1,$2,$3,$4,$5,$6,$7,'requested') RETURNING id",[name,email,phone||null,company||null,message||null,startText,timezone]);
    const id=result.rows[0].id;
    let calendarEventId=null;
    const serviceEmail=process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,privateKey=process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,calendarId=process.env.GOOGLE_CALENDAR_ID;
    if(serviceEmail&&privateKey&&calendarId){
      const auth=new google.auth.JWT({email:serviceEmail,key:privateKey.replace(/\\n/g,"\n"),scopes:["https://www.googleapis.com/auth/calendar"]});
      const calendar=google.calendar({version:"v3",auth});
      const start=new Date(date+"T"+time+":00");
      const end=new Date(start.getTime()+30*60000);
      // Free/busy check prevents the form from creating overlapping calls on the studio calendar.
      const busy=await calendar.freebusy.query({requestBody:{timeMin:start.toISOString(),timeMax:end.toISOString(),items:[{id:calendarId}]}});
      if((busy.data.calendars?.[calendarId]?.busy||[]).length){
        await getDb().query("UPDATE meetings SET status='conflict' WHERE id=$1",[id]);
        return res.status(409).json({error:"That time is already booked. Please choose another slot."});
      }
      const event=await calendar.events.insert({calendarId,requestBody:{summary:"RAW/FRAME — discovery call with "+name,description:message||"Portfolio enquiry",start:{dateTime:start.toISOString(),timeZone:timezone},end:{dateTime:end.toISOString(),timeZone:timezone},attendees:[{email}]},sendUpdates:"all"});
      calendarEventId=event.data.id||null;
      await getDb().query("UPDATE meetings SET calendar_event_id=$1,status='calendar_created' WHERE id=$2",[calendarEventId,id]);
    }
    return res.status(200).json({ok:true,id,calendarEventId});
  }catch(error){console.error("Meeting booking failed",error);return res.status(500).json({error:"Could not save meeting request"});}
}