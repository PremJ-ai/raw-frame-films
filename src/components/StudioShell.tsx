import type { ReactNode } from "react";
import { motion } from "framer-motion";

// StudioShell provides navigation, a persistent footer and a consistent frame around every page.
export default function StudioShell({children}:{children:ReactNode}) {
  const nav=[["work","Work"],["services","Services"],["team","Team"],["clients","Clients"],["contact","Contact"]];
  return <div className="site-shell"><header className="site-nav"><a className="brand" href="#/">RAW<span>/</span>FRAME</a><nav>{nav.map(([key,label])=><a key={key} href={"#/"+key}>{label}</a>)}</nav><a className="nav-book" href="#/book">Book a meeting ↗</a></header><main>{children}</main><footer className="footer"><div><strong>RAW/FRAME</strong><p>Independent creative production + digital craft.</p></div><div><span>BASED IN INDIA / WORKING ANYWHERE</span><a href="#/contact">Start a project →</a></div></footer></div>;
}
// PageTransition turns route changes into a short cinematic reveal instead of an abrupt swap.
export function PageTransition({children}:{children:ReactNode}) { return <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.45,ease:[.22,1,.36,1]}}>{children}</motion.div>; }