import {useState} from 'react';
import {Check, RotateCcw} from 'lucide-react';
const questions=[
  {text:'verify an OTP before showing account information',right:'graph',why:'id keep this deterministic. the authorisation boundary should not depend on a model guess.'},
  {text:'understand why a frustrated customer is calling',right:'llm',why:'this is where id let the llm reason, within a bounded goal.'},
  {text:'approve a refund above ₹20,000',right:'graph',why:'a hard rule plus explicit authorisation belongs in the workflow.'},
  {text:'find what product a customer wants and collect missing details',right:'llm',why:'the customer can say this a dozen ways. give the node a goal and required fields.'}
];
export default function Challenge(){const [index,setIndex]=useState(0),[answer,setAnswer]=useState<string|null>(null),[score,setScore]=useState(0);const q=questions[index];const done=index===questions.length;
  function choose(value:string){if(answer)return;setAnswer(value);if(value===q.right)setScore(s=>s+1)}
  function next(){setIndex(i=>i+1);setAnswer(null)}
  return <section className="challenge-panel" aria-label="graph or llm interactive challenge">
    {done?<div className="challenge-done"><Check size={26}/><h2>you probably want both.</h2><p>control at the edges. reasoning inside a bounded step. {score}/4 matched my call.</p><button className="btn secondary" onClick={()=>{setIndex(0);setScore(0)}}><RotateCcw size={15}/> try again</button></div>:<><div className="eyebrow">decision {index+1} / 04</div><h2>{q.text}</h2><div className="choice-row"><button className={answer==='graph'?'choice chosen':'choice'} onClick={()=>choose('graph')}>put it in the graph <span>deterministic</span></button><button className={answer==='llm'?'choice chosen':'choice'} onClick={()=>choose('llm')}>give it to an llm node <span>bounded reasoning</span></button></div>{answer&&<div className="feedback" role="status"><span>{answer===q.right?'yep.':'id make a different call.'}</span> {q.why}<button className="btn primary" onClick={next}>{index===3?'see the result':'next decision'} →</button></div>}</>}
  </section>
}
