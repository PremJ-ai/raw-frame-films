import { useEffect, useState } from "react";
import StudioShell,{PageTransition} from "./components/StudioShell";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home"; import Work from "./pages/Work"; import Services from "./pages/Services"; import Team from "./pages/Team"; import Clients from "./pages/Clients"; import Contact from "./pages/Contact"; import Book from "./pages/Book";

// App owns the tiny hash router so the multi-page experience works on static hosting as well as Vercel.
export default function App(){
  const [route,setRoute]=useState(window.location.hash.replace("#/","")||"");
  useEffect(()=>{const onHash=()=>{setRoute(window.location.hash.replace("#/",""));window.scrollTo({top:0,behavior:"smooth"})};window.addEventListener("hashchange",onHash);return()=>window.removeEventListener("hashchange",onHash)},[]);
  const pages:Record<string,React.ReactNode>={work:<Work/>,services:<Services/>,team:<Team/>,clients:<Clients/>,contact:<Contact/>,book:<Book/>};
  return <StudioShell><PageTransition>{pages[route]||<Home/>}</PageTransition><Chatbot/></StudioShell>;
}