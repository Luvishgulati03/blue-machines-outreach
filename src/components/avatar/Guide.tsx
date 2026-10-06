import {motion} from 'framer-motion';
export default function Guide({state='idle',size=92}:{state?:'idle'|'walking'|'pointing'|'thinking'|'celebrating';size?:number}){
  const arm=state==='pointing'?-45:state==='celebrating'?-55:state==='thinking'?18:8;
  return <motion.svg className="guide" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="a small explorer avatar representing luvish" animate={state==='walking'?{y:[0,-3,0],rotate:[0,-2,0]}:{y:[0,-2,0]}} transition={{duration:state==='walking'?.65:2.8,repeat:Infinity,ease:'easeInOut'}}>
    <path d="M25 74 Q14 60 24 43 L34 33 Q50 24 65 35 L74 48 L68 75 Z" fill="var(--surface-raised)" stroke="var(--cyan)" strokeWidth="2"/>
    <path d="M70 48 Q91 39 91 57 L77 70" fill="none" stroke="var(--amber)" strokeWidth="5" strokeLinecap="round"/>
    <path d="M39 68 L35 88 M62 68 L65 88" stroke="var(--text)" strokeWidth="7" strokeLinecap="round"/>
    <path d="M31 44 L18 55" stroke="var(--text)" strokeWidth="6" strokeLinecap="round"/>
    <motion.path d="M65 44 L79 56" stroke="var(--text)" strokeWidth="6" strokeLinecap="round" style={{transformOrigin:'65px 44px'}} animate={{rotate:arm}}/>
    <rect x="31" y="15" width="38" height="31" rx="16" fill="var(--amber)"/>
    <path d="M27 30 Q28 7 50 8 Q72 7 73 29 L65 22 L36 22 Z" fill="var(--blue)"/>
    <circle cx="42" cy="31" r="2" fill="var(--bg)"/><circle cx="57" cy="31" r="2" fill="var(--bg)"/>
    <path d="M44 39 Q50 42 56 39" fill="none" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M74 41 Q88 38 87 60" fill="none" stroke="var(--green)" strokeWidth="3"/>
  </motion.svg>;
}
