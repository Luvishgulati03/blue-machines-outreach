import {useEffect,useMemo,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {ReactFlow,Background,Controls,Handle,MarkerType,Position,type Node,type Edge,type NodeProps} from '@xyflow/react';
import {ArrowLeft,ArrowRight,Check,Play,RotateCcw,TriangleAlert,X} from 'lucide-react';

type FlowData={title:string;category:string;detail:string};
type Step={id:string;speaker:'customer'|'agent'|'system';line:string;variables?:Record<string,string>;outcome?:string};
const definitions:Record<string,FlowData>={
  inbound:{title:'incoming call',category:'trigger',detail:'a customer calls about a missing order. the call starts a new journey.'},
  greet:{title:'greet + consent',category:'voice',detail:'introduce the agent and ask whether the customer wants help tracking an order.'},
  collect:{title:'understand the issue',category:'llm goal',detail:'collect the order id and what went wrong. the conversation can flex, but the required fields are explicit.'},
  verify:{title:'verify order',category:'rule',detail:'a deterministic check before account details or order state are read.'},
  fetch:{title:'look up order',category:'tool',detail:'fetch order state from a connected service. success and failure are separate branches.'},
  explain:{title:'explain status',category:'voice',detail:'translate structured order data into a plain-language response.'},
  failure:{title:'service unavailable',category:'fallback',detail:'if the lookup fails, do not invent an answer. log the failure and offer a safe next step.'},
  handoff:{title:'human follow-up',category:'handoff',detail:'create a reviewable follow-up with the collected facts, rather than ending in a dead end.'},
  close:{title:'confirm + close',category:'end',detail:'confirm the next action and end the call.'}
};
const positions:Record<string,{x:number;y:number}>={inbound:{x:0,y:180},greet:{x:230,y:180},collect:{x:460,y:180},verify:{x:690,y:180},fetch:{x:920,y:180},explain:{x:1150,y:90},failure:{x:1150,y:330},handoff:{x:1380,y:330},close:{x:1380,y:90}};
const pairs:[string,string,string?][]=[['inbound','greet'],['greet','collect'],['collect','verify'],['verify','fetch'],['fetch','explain','success'],['fetch','failure','error'],['explain','close'],['failure','handoff']];
const happy:Step[]=[
  {id:'inbound',speaker:'system',line:'sample customer call connected.'},
  {id:'greet',speaker:'agent',line:'hi, i can help with your order. what happened?'},
  {id:'collect',speaker:'customer',line:'my headphones have not arrived. order 4821.',variables:{intent:'track missing order',order_id:'4821'}},
  {id:'verify',speaker:'system',line:'order id captured. verification passed.',variables:{verified:'yes'}},
  {id:'fetch',speaker:'system',line:'order lookup returned: delayed in transit.',variables:{order_status:'delayed in transit'}},
  {id:'explain',speaker:'agent',line:'your order is delayed in transit. i can arrange an update when it moves.'},
  {id:'close',speaker:'system',line:'call resolved with an update request.',outcome:'resolved · update requested'}
];
const broken:Step[]=[
  ...happy.slice(0,4),
  {id:'fetch',speaker:'system',line:'order lookup timed out. no order status was returned.',variables:{order_status:'unknown'}},
  {id:'failure',speaker:'agent',line:'i cannot confirm the order status right now. i can ask a person to follow up.'},
  {id:'handoff',speaker:'system',line:'follow-up queued with order id 4821 and the timeout reason.',outcome:'handoff · no status invented'}
];
function FlowCard({data,selected}:NodeProps<Node<FlowData>>){return <div className={`flow-card ${selected?'selected':''} cat-${data.category.replace(' ','-')}`}><Handle type="target" position={Position.Left}/><span>{data.category}</span><strong>{data.title}</strong><Handle type="source" position={Position.Right}/></div>}
const nodeTypes={card:FlowCard};
export default function FlowStudio(){
  const [selected,setSelected]=useState('collect');
  const [active,setActive]=useState('');
  const [mode,setMode]=useState<'idle'|'running'|'done'>('idle');
  const [failureMode,setFailureMode]=useState(false);
  const [trace,setTrace]=useState<Step[]>([]);
  const [mobileInspector,setMobileInspector]=useState(false);
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const scenario=failureMode?broken:happy;
  const nodes=useMemo<Node<FlowData>[]>(()=>Object.entries(definitions).map(([id,data])=>({id,type:'card',position:positions[id],data,className:active===id?'is-active':''})),[active]);
  const edges=useMemo<Edge[]>(()=>pairs.map(([source,target,label])=>({id:`${source}-${target}`,source,target,label,animated:active===target,style:{stroke:active===target?'#71e4f2':'#3b5369',strokeWidth:active===target?2.5:1.7},labelStyle:{fill:'#a8bbca',fontSize:12},markerEnd:{type:MarkerType.ArrowClosed,color:active===target?'#71e4f2':'#3b5369'}})),[active]);
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  function reset(){timers.current.forEach(clearTimeout);timers.current=[];setMode('idle');setActive('');setTrace([])}
  function run(){reset();setMode('running');scenario.forEach((step,i)=>{timers.current.push(setTimeout(()=>{setActive(step.id);setSelected(step.id);setTrace(old=>[...old,step]);if(i===scenario.length-1)setMode('done')},350+i*780))})}
  const variables=Object.assign({},...trace.map(step=>step.variables||{})) as Record<string,string>;
  const latest=trace.at(-1);
  return <main className="studio-page">
    <div className="studio-intro"><Link className="back-link" to="/stage/5"><ArrowLeft size={16}/> the story</Link><p className="eyebrow">06 / interactive product thought</p><div className="studio-heading"><div><h1>flow studio<span>.</span></h1><p>an illustrative workspace for designing and inspecting a voice-agent journey. not a Blue Machines product or internal screenshot.</p></div><span className="prototype-label">clickable concept · sample data</span></div></div>
    <div className="studio-toolbar"><div className="toolbar-title"><span className="status-dot"/> order support / draft <small>all actions simulated in your browser</small></div><div className="toolbar-actions"><button className="btn secondary" onClick={()=>{reset();setFailureMode(v=>!v)}} aria-pressed={failureMode}><TriangleAlert size={15}/> {failureMode?'crm failure on':'crm failure off'}</button><button className="btn secondary" onClick={reset}><RotateCcw size={15}/> reset</button><button className="btn primary" onClick={run}><Play size={15}/> {mode==='running'?'restart call':'run sample call'}</button></div></div>
    <div className="studio-grid"><aside className="studio-library"><h2>blocks</h2><p>choose a block to inspect the design decision.</p>{Object.entries(definitions).map(([id,data])=><button key={id} className={selected===id?'library-block chosen':'library-block'} onClick={()=>{setSelected(id);setMobileInspector(true)}}><span className={`block-dot cat-${data.category.replace(' ','-')}`}/><span>{data.title}<small>{data.category}</small></span></button>)}</aside><div className="flow-canvas" aria-label="illustrative voice agent journey graph"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodeClick={(_,node)=>{setSelected(node.id);setMobileInspector(true)}} fitView fitViewOptions={{padding:.19,minZoom:.44,maxZoom:1.2}} minZoom={.35} maxZoom={1.5} proOptions={{hideAttribution:true}} nodesDraggable={false} nodesConnectable={false} elementsSelectable><Background gap={22} color="#244258" size={1}/><Controls showInteractive={false}/></ReactFlow><div className="canvas-note">drag to explore · scroll to zoom · select a node to inspect it</div></div><aside className={`studio-inspector ${mobileInspector?'open':''}`}><button className="inspector-close" onClick={()=>setMobileInspector(false)} aria-label="close inspector"><X size={18}/></button><p className="eyebrow">inspector / {selected}</p><h2>{definitions[selected].title}</h2><span className="inspector-kind">{definitions[selected].category}</span><p>{definitions[selected].detail}</p><div className="inspector-boundary"><strong>why this block exists</strong><span>{selected==='collect'?'a bounded conversation gathers missing facts. it does not decide whether to reveal account data.':selected==='fetch'?'external data comes from a tool response, not from the model guessing.':selected==='failure'?'failure is a designed route, not a surprising dead end.':'one visible step, with a clear input and next action.'}</span></div><p className="inspector-small">concept only. no real calls, API access, or customer data.</p></aside></div>
    <section className="simulation"><div className="sim-heading"><div><p className="eyebrow">watch the journey run</p><h2>the call, the state, the fallback.</h2></div><span>{mode==='idle'?'ready':mode==='running'?'running…':latest?.outcome||'complete'}</span></div><div className="sim-columns"><div className="sim-panel"><h3>call + execution trace</h3>{trace.length===0?<div className="empty-state">run a sample call to see every decision. then switch on crm failure and compare.</div>:<ol className="trace-list">{trace.map((step,i)=><li key={`${step.id}-${i}`} className={`trace-${step.speaker}`}><span className="trace-number">{String(i+1).padStart(2,'0')}</span><div><small>{step.id} / {step.speaker}</small><p>{step.line}</p></div>{i===trace.length-1&&<Check size={15}/>}</li>)}</ol>}</div><div className="sim-panel"><h3>collected state</h3>{Object.keys(variables).length===0?<div className="empty-state">variables appear here as the call progresses.</div>:<dl className="state-list">{Object.entries(variables).map(([key,value])=><div key={key}><dt>{key.replace('_',' ')}</dt><dd>{value}</dd></div>)}</dl>}<div className={`outcome-box ${failureMode?'warning':''}`}><strong>outcome</strong><span>{latest?.outcome||'waiting for a call'}</span></div><p className="sim-disclaimer">all transcript lines, variables and outcomes are illustrative. no customer data or actual CRM integration.</p></div></div><div className="studio-next"><Link className="btn secondary" to="/orb">see the optional voice-native page <ArrowRight size={16}/></Link><Link className="text-link" to="/me">skip to the person behind this ↗</Link></div></section>
  </main>
}
