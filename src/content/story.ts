export const chapters=[
  {id:1,kicker:'01 / getvocal',title:'ive seen this problem before',teaser:'working with voice agents taught me that the conversation is only one part of the system.',body:["at pink unicorn, i built client-facing voice agents using getvocal's platform. i didnt build the platform itself.","the thing that stayed with me was how much easier a workflow became to reason about once it was visible. a call could be more than a prompt. it had steps, state, branching, and places to debug."],aside:'simplified from the kind of workflows i worked with. not a GetVocal architecture diagram.'},
  {id:2,kicker:'02 / visibility',title:'a graph makes the mess visible',teaser:'voice agents get messy really fast.',body:['business rules. customer context. api calls. fallbacks. what the llm can do. what it definitely cannot do.','a graph gives engineering, product, and the client something concrete to review. rules stop hiding inside one massive prompt.'],aside:'an illustrative account-service flow, not a client workflow.'},
  {id:3,kicker:'03 / the tradeoff',title:'okay yeah, graphs get ugly too',teaser:'you can also turn every follow-up into another box. that doesnt scale particularly well.',body:['one thing i found useful while working with visual agent flows: keep the larger workflow explicit, but let a goal-driven llm node handle a bounded mini-conversation.','the graph sets the boundary. the llm collects the missing state inside it. neither has to pretend it can do the others job.'],aside:'graph = workflow control. llm node = flexibility within a goal.'},
  {id:4,kicker:'04 / your call',title:'graph or llm?',teaser:'where would you put the control?',body:[],aside:'turns out you probably want both.'},
  {id:5,kicker:'05 / the connection',title:'then i looked at blue machines',teaser:'this is a product thought based on what youve shown publicly.',body:['your public material talks about voice agents, enterprise systems, guardrails, journey orchestration and the path toward self-serve delivery.','you already describe the hard machinery. i kept wondering what the layer above it could feel like if the workflow itself became extremely visual.'],aside:'i dont know what your internal console looks like. this is not an audit of it.'}
];
export const pathItems=[
  {num:'01',name:'getvocal',to:'/stage/1'},
  {num:'02',name:'graphs',to:'/stage/2'},
  {num:'03',name:'the tradeoff',to:'/stage/3'},
  {num:'04',name:'graph or llm?',to:'/stage/4'},
  {num:'05',name:'blue machines',to:'/stage/5'},
  {num:'06',name:'flow studio',to:'/flow-studio'},
  {num:'07',name:'one more idea',to:'/orb'},
  {num:'08',name:'me',to:'/me'}
];
export const sampleRules=['customer context','business rule','api call','failure route'];
