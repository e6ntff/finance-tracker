"use strict";(self.webpackChunkexpenses_manager=self.webpackChunkexpenses_manager||[]).push([[766],{2158:(e,t,s)=>{s.d(t,{Z:()=>M});var a=s(2791),r=s(7257),n=s(7201),o=s(4248),l=s(7708),i=s(4320),c=s(7892),d=s.n(c),u=s(9026),m=s.n(u),f=s(4895),p=s(4187),g=s(8807),y=s(5967),h=s(3623),S=s(7703),v=s(6619),x=s(184);const j=(0,r.Pi)((()=>{const{list:e}=i.listStore,{defaultRange:t}=S.optionsStore,s=(0,a.useMemo)((()=>(0,v.BF)(e,t)),[e,t]),r={labels:new Array(s.length).fill(""),datasets:[{data:s}]};return(0,x.jsx)(h.x1,{style:{inlineSize:"100%"},data:r,options:{plugins:{legend:{display:!1},tooltip:{enabled:!1}},scales:{x:{display:!1,grid:{display:!1}},y:{display:!1,grid:{display:!1}}},elements:{point:{radius:0},line:{cubicInterpolationMode:"monotone",borderColor:"#7775"}},aspectRatio:25}})})),b=(0,a.memo)(j);y.kL.register(y.u,y.jn,y.ST,y.uw,y.f$,y.od),d().extend(m());const O=(0,r.Pi)((e=>{let{range:t,setRange:s,isAccurate:r,setIsAccurate:c}=e;const{list:u}=i.listStore,{isSmallScreen:m}=g.userStore,{defaultRange:y,setDefaultRange:h}=S.optionsStore,[v,j]=(0,a.useState)(y),O=(0,a.useMemo)((()=>{const e=Object.values(u).map((e=>e.date));return[Math.min(...e),Math.max(...e)]}),[u]),M=(0,a.useMemo)((()=>{const e=d()(O[0]).startOf("day"),t=d()(O[1]).endOf("day"),s={};let a=e;if(r)for(;a.isBefore(t)||a.isSame(t,"day");)s[a.valueOf()]=1===a.date()?0===a.month()?a.format("YYYY"):a.format("M"):" ",a=a.add(1,"day").startOf("day");else for(;a.isBefore(t)||a.isSame(t,"month");)s[a.valueOf()]=0===a.month()?a.format("YYYY"):" ",a=a.add(1,"month").startOf("month");return s}),[O,r]);(0,a.useEffect)((()=>{h(O)}),[O,h]),(0,a.useEffect)((()=>{s(y)}),[y,s]);const k=(0,a.useCallback)((e=>{s(e)}),[s]);return(0,a.useEffect)((()=>{j(t)}),[t]),(0,a.useEffect)((()=>{m&&c(!1)}),[m,c]),(0,a.useEffect)((()=>{!r&&s([d().max([d()(t[0]).startOf("month"),d()(y[0])]).valueOf(),d().min([d()(t[1]).endOf("month"),d()(y[1])]).valueOf()])}),[r]),d()(y[1]).diff(d()(y[0]),"hours")>=48?(0,x.jsxs)(n.Z,{gap:16,align:"center",children:[(0,x.jsx)(o.Z,{size:m?"small":"middle",defaultValue:r,value:r,onChange:c,options:[{label:(0,x.jsx)(f.Z,{}),value:!1},{label:(0,x.jsx)(p.Z,{}),value:!0,disabled:m}]}),(0,x.jsxs)(n.Z,{vertical:!0,align:"stretch",style:{inlineSize:"100%"},children:[(0,x.jsx)(b,{}),(0,x.jsx)(l.Z,{range:!0,value:v,marks:M,step:null,dots:!0,tooltip:{formatter:e=>(0,x.jsx)(x.Fragment,{children:d()(e).format(r?"DD.MM.YY":"MM.YY")})},min:O[0],max:O[1],defaultValue:y,onChange:j,onChangeComplete:k})]})]}):(0,x.jsx)(x.Fragment,{})})),M=(0,a.memo)(O)},9766:(e,t,s)=>{s.r(t),s.d(t,{default:()=>A});var a=s(2791),r=s(7257),n=s(4320),o=s(7201),l=s(2556),i=s(4664),c=s(8807),d=s(3623),u=s(8416),m=s(8418),f=s(7892),p=s.n(f),g=s(5967),y=s(6619),h=s(7703),S=s(184);g.kL.register(g.u,g.vn,g.ZL,g.uw,g.f$);const v=(0,r.Pi)((e=>{let{mode:t,setMode:s}=e;const{isSmallScreen:r}=c.userStore,{list:l}=n.listStore,{statsOptions:i,userOptions:f,setStatsRange:g}=h.optionsStore,{currency:v,language:x}=f,{range:j}=i,b=(0,a.useMemo)((()=>(0,y.u1)(l,v,t,p()(j[0]).year())),[v,l,t,j]),O={labels:"month"===t?u.Z.months[x]:Object.keys(b),datasets:[{label:(0,m.R)(v),data:Object.values(b),backgroundColor:"#f00"}]},M={plugins:{legend:{display:!1}},onClick:(e,a)=>{if(a.length){const e=a[0].index,r="year"===t?[p()(j[0]).year(Number(O.labels[e])).startOf("year").valueOf(),p()(j[0]).year(Number(O.labels[e])).endOf("year").valueOf()]:[p()(j[0]).month(e).startOf("month").valueOf(),p()(j[0]).month(e).endOf("month").valueOf()];"year"===t&&s("month"),g(r)}}};return(0,S.jsx)(o.Z,{style:{inlineSize:r?"unset":"50%"},children:(0,S.jsx)(d.$Q,{data:O,options:M})})}));var x=s(3475);g.kL.register(g.qi,g.tt,g.u,g.De,g.Dx);const j=(0,r.Pi)((()=>{const{isSmallScreen:e}=c.userStore,{list:t}=n.listStore,{userOptions:s,statsOptions:r}=h.optionsStore,{currency:l}=s,{categories:i}=x.categoryStore,{range:u}=r,f=(0,a.useMemo)((()=>(0,y.CH)(t,u,l)),[t,l,u]),[p,g,v]=[f.map((e=>i[e.categoryId].name)),f.map((e=>i[e.categoryId].color)),f.map((e=>Math.round(e.value)))],j={labels:p,datasets:[{label:(0,m.R)(l),data:v,backgroundColor:g}]};return(0,S.jsx)(o.Z,{style:{inlineSize:e?"unset":"40%"},children:(0,S.jsx)(d.by,{data:j,options:{plugins:{legend:{display:!0,position:"right"}}}})})}));var b=s(3605),O=s(6818),M=s.n(O),k=s(2158),Z=s(6281),E=s(5160),R=s(3936),C=s(1429);const Y=(0,r.Pi)((()=>{const{isSmallScreen:e}=c.userStore,{list:t}=n.listStore,{statsOptions:s,userOptions:r}=h.optionsStore,{range:o,isAccurate:l}=s,{currency:i}=r,d=(0,a.useMemo)((()=>(0,y.r6)(t,o,i)),[t,o,i]),u=(0,a.useMemo)((()=>{const t=l?"DD.MM.YY":"MM.YY";return(0,S.jsxs)(E.Z.Text,{type:"secondary",style:{fontSize:e?".8em":"1em"},children:[p()(o[0]).format(t),o[0]!==o[1]?"-".concat(p()(o[1]).format(t)):""]})}),[l,o,e]);return(0,S.jsx)(R.Z,{bordered:!0,children:(0,S.jsx)(C.Z,{title:u,value:d,prefix:(0,m.R)(i),valueStyle:{color:"#f00",fontSize:e?"1em":"1.5em"}})})})),I=(0,a.memo)(Y);p().extend(M());const w=(0,r.Pi)((()=>{const{list:e}=n.listStore,{isSmallScreen:t,loading:s}=c.userStore,{statsOptions:r,defaultRange:d,setStatsRange:u,setIsStatsAccurate:m}=h.optionsStore,{range:f,isAccurate:g}=r,[y,x]=(0,a.useState)("year"),O=(0,a.useCallback)((()=>{x("year"),u(d)}),[x,d,u]);(0,a.useEffect)((()=>{const e=e=>{"Escape"===e.key&&O()};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}}),[O]);const M=(0,a.useMemo)((()=>f[0]!==d[0]||f[1]!==d[1]),[f,d]);(0,a.useEffect)((()=>{p()(f[0]).year()!==p()(f[1]).year()?x("year"):x("month")}),[f]);const E=(0,S.jsxs)(o.Z,{gap:16,children:[(0,S.jsx)(I,{}),(0,S.jsx)(l.ZP,{size:t?"small":"middle",onClick:O,disabled:!M,children:(0,S.jsx)(b.Z,{})})]}),R=(0,S.jsxs)(o.Z,{vertical:!0,gap:16,align:"stretch",children:[(0,S.jsx)(k.Z,{setIsAccurate:m,isAccurate:g,range:f,setRange:u}),(0,S.jsxs)(o.Z,{align:"center",justify:"space-between",vertical:t,children:[(0,S.jsx)(v,{mode:y,setMode:x}),(0,S.jsx)(j,{})]})]});return s?(0,S.jsx)(Z.Z,{}):Object.keys(e).length?(0,S.jsxs)(o.Z,{vertical:!0,gap:32,children:[E,R]}):(0,S.jsx)(i.Z,{image:i.Z.PRESENTED_IMAGE_SIMPLE,description:""})})),A=(0,a.memo)(w)},6619:(e,t,s)=>{s.d(t,{BF:()=>f,CH:()=>u,W2:()=>c,r6:()=>m,tL:()=>i,u1:()=>d});var a=s(8418),r=s(7892),n=s.n(r),o=s(6818),l=s.n(o);n().extend(l());const i=(e,t,s)=>{const{range:r,categoriesToFilterIds:n,sortingAlgorithm:o,isSortingReversed:l}=e;return(0,a.M)(t,Object.keys(t).filter((e=>t[e].date>=r[0]&&t[e].date<=r[1]&&(!n.length||n.some((s=>t[e].categoryId===s))))),o,l,s)},c=(e,t)=>{const{currentPage:s,pageSize:a}=e,r=(s-1)*a,n=r+a;return t.slice(r,n)},d=(e,t,s,a)=>{if("year"===s){const s={};Object.keys(e).forEach((a=>{const r=n()(e[a].date).year();void 0===s[r]?s[r]=e[a].price[t]:s[r]+=e[a].price[t]}));for(let e in s)s[e]=Math.round(s[e]);return s}if("month"===s){const s=new Array(12).fill(0);return Object.keys(e).forEach((r=>{if(n()(e[r].date).year()===a){const a=n()(e[r].date).month();s[a]+=e[r].price[t]}})),s.map((e=>Math.round(e)))}return[]},u=(e,t,s)=>{const a=[];return Object.keys(e).forEach((r=>{if(e[r].date>t[0]&&e[r].date<t[1]){const t=Object.keys(a).findIndex((t=>a[Number(t)].categoryId===e[r].categoryId));-1!==t?a[t].value+=e[r].price[s]:a.push({categoryId:e[r].categoryId,value:e[r].price[s]})}})),a.map((e=>({...e,value:Math.round(e.value)})))},m=(e,t,s)=>Math.floor(Object.values(e).reduce(((e,a)=>a.date>=t[0]&&a.date<=t[1]?e+a.price[s]:e),0)),f=(e,t)=>{const s=[],a=n()(t[1]);let r=n()(t[0]),o=n()(t[0]).add(1,"month");for(;!o.isAfter(a,"day");){const t=Object.values(e).filter((e=>e.date>r.valueOf()&&e.date<o.valueOf())).reduce(((e,t)=>e+t.price.USD),0);s.push(t),r=r.add(1,"month"),o=o.add(1,"month")}return s}},8418:(e,t,s)=>{s.d(t,{M:()=>r,R:()=>a});const a=(e,t)=>{var s;let a="";"USD"===e&&(a+="$"),"EUR"===e&&(a+="\u20ac"),"RUB"===e&&(a+="\u20bd");const r=null===(s=Math.round(t))||void 0===s?void 0:s.toString().split("").reverse().reduce(((e,t,s)=>s%3===0&&0!==s?[...e,t+","]:[...e,t]),[]).reverse().join("");return void 0===t?a:a+r},r=(e,t,s,a,r)=>{let n;switch(s){case"date":n=t.sort(((t,s)=>e[s].date.valueOf()-e[t].date.valueOf()));break;case"title":n=t.sort(((t,s)=>e[t].title.localeCompare(e[s].title,r,{sensitivity:"base"})));break;case"price":n=t.sort(((t,s)=>e[s].price.USD-e[t].price.USD));break;default:n=t}return a?n.reverse():n}}}]);
//# sourceMappingURL=766.14d16614.chunk.js.map