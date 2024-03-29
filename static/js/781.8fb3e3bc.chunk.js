"use strict";(self.webpackChunkexpenses_manager=self.webpackChunkexpenses_manager||[]).push([[781],{2158:(e,t,s)=>{s.d(t,{Z:()=>I});var n=s(2791),r=s(7257),a=s(7201),l=s(4248),i=s(7708),o=s(4320),c=s(7892),d=s.n(c),u=s(9026),m=s.n(u),g=s(4895),h=s(4187),p=s(8807),x=s(5967),j=s(3623),S=s(7703),f=s(6619),Z=s(184);const v=(0,r.Pi)((()=>{const{list:e}=o.listStore,{defaultRange:t}=S.optionsStore,s=(0,n.useMemo)((()=>(0,f.BF)(e,t)),[e,t]),r={labels:new Array(s.length).fill(""),datasets:[{data:s}]};return(0,Z.jsx)(j.x1,{style:{inlineSize:"100%"},data:r,options:{plugins:{legend:{display:!1},tooltip:{enabled:!1}},scales:{x:{display:!1,grid:{display:!1}},y:{display:!1,grid:{display:!1}}},elements:{point:{radius:0},line:{cubicInterpolationMode:"monotone",borderColor:"#7775"}},aspectRatio:25}})})),y=(0,n.memo)(v);x.kL.register(x.u,x.jn,x.ST,x.uw,x.f$,x.od),d().extend(m());const b=(0,r.Pi)((e=>{let{range:t,setRange:s,isAccurate:r,setIsAccurate:c}=e;const{list:u}=o.listStore,{isSmallScreen:m}=p.userStore,{defaultRange:x,setDefaultRange:j}=S.optionsStore,[f,v]=(0,n.useState)(x),b=(0,n.useMemo)((()=>{const e=Object.values(u).map((e=>e.date));return[Math.min(...e),Math.max(...e)]}),[u]),I=(0,n.useMemo)((()=>{const e=d()(b[0]).startOf("day"),t=d()(b[1]).endOf("day"),s={};let n=e;if(r)for(;n.isBefore(t)||n.isSame(t,"day");)s[n.valueOf()]=1===n.date()?0===n.month()?n.format("YYYY"):n.format("M"):" ",n=n.add(1,"day").startOf("day");else for(;n.isBefore(t)||n.isSame(t,"month");)s[n.valueOf()]=0===n.month()?n.format("YYYY"):" ",n=n.add(1,"month").startOf("month");return s}),[b,r]);(0,n.useEffect)((()=>{j(b)}),[b,j]),(0,n.useEffect)((()=>{s(x)}),[x,s]);const C=(0,n.useCallback)((e=>{s(e)}),[s]);return(0,n.useEffect)((()=>{v(t)}),[t]),(0,n.useEffect)((()=>{m&&c(!1)}),[m,c]),(0,n.useEffect)((()=>{!r&&s([d().max([d()(t[0]).startOf("month"),d()(x[0])]).valueOf(),d().min([d()(t[1]).endOf("month"),d()(x[1])]).valueOf()])}),[r]),d()(x[1]).diff(d()(x[0]),"hours")>=48?(0,Z.jsxs)(a.Z,{gap:16,align:"center",children:[(0,Z.jsx)(l.Z,{size:m?"small":"middle",defaultValue:r,value:r,onChange:c,options:[{label:(0,Z.jsx)(g.Z,{}),value:!1},{label:(0,Z.jsx)(h.Z,{}),value:!0,disabled:m}]}),(0,Z.jsxs)(a.Z,{vertical:!0,align:"stretch",style:{inlineSize:"100%"},children:[(0,Z.jsx)(y,{}),(0,Z.jsx)(i.Z,{range:!0,value:f,marks:I,step:null,dots:!0,tooltip:{formatter:e=>(0,Z.jsx)(Z.Fragment,{children:d()(e).format(r?"DD.MM.YY":"MM.YY")})},min:b[0],max:b[1],defaultValue:x,onChange:v,onChangeComplete:C})]})]}):(0,Z.jsx)(Z.Fragment,{})})),I=(0,n.memo)(b)},8781:(e,t,s)=>{s.r(t),s.d(t,{default:()=>je});var n=s(2791),r=s(8418),a=s(6220),l=s(7201),i=s(5160),o=s(1429),c=s(952),d=s(4231),u=s(914),m=s(3936),g=s(7257),h=s(4320),p=s(8807),x=s(2499),j=s(2622),S=s(1752),f=s(9966),Z=s(4878);const v=function(e,t){switch(arguments.length>2&&void 0!==arguments[2]?arguments[2]:Z.Z.baseCurrency){case"USD":e.EUR=e.USD*t.EUR,e.RUB=e.USD*t.RUB;break;case"EUR":e.USD=e.EUR/t.EUR,e.RUB=e.EUR*t.RUB/t.EUR;break;case"RUB":e.EUR=e.RUB/t.RUB*t.EUR,e.USD=e.RUB/t.RUB}return e};var y=s(8416),b=s(6005),I=s(1468),C=s(7715),O=s(3070),k=s(6106),R=s(3556),M=s(7892),E=s.n(M),z=s(3475),D=s(126),U=s(8228),A=s(184);const P=(0,g.Pi)((e=>{let{id:t,onChange:s}=e;const{categories:n}=z.categoryStore,{isSmallScreen:r}=p.userStore;return(0,A.jsx)(D.Z,{size:r?"small":"middle",allowClear:!0,style:{minInlineSize:"7em"},onChange:s,value:t,suffixIcon:(0,A.jsx)(U.Z,{style:{color:n[t].color}}),children:Object.keys(n).map((e=>(0,A.jsx)(D.Z.Option,{value:e,children:n[e].name},e)))})}));var Y=s(7575),w=s(732),B=s(7703);const F=(0,g.Pi)((e=>{let{opened:t,initialItemId:s,toggleOpened:r,submitItem:a}=e;const[l,i]=(0,n.useState)(Z.Z.baseCurrency),{currencyRates:o,isSmallScreen:c}=p.userStore,{userOptions:d}=B.optionsStore,{list:m}=h.listStore,{language:g}=d,x=(0,n.useMemo)((()=>void 0!==s?m[s]:Z.Z.emptyItem),[m,s]),[j,S]=(0,n.useState)(x),f=(0,n.useCallback)((e=>{const{value:t}=e.target;S((e=>({...e,title:t})))}),[S]),M=(0,n.useCallback)((e=>{e&&S((t=>({...t,date:e.valueOf()})))}),[S]),z=(0,n.useCallback)((e=>{S((t=>({...t,categoryId:e})))}),[S]),D=(0,n.useCallback)((e=>{const{value:t}=e.target;S((e=>{const s={...e,price:{...e.price,[l]:Number(t)}};return{...s,price:v(s.price,o,l)}}))}),[S,l,o]);(0,n.useEffect)((()=>{const e=s=>{"Enter"===s.key&&t&&(a(j),window.removeEventListener("keyup",e))};return window.addEventListener("keyup",e),()=>{window.removeEventListener("keyup",e)}}),[j,a,t]);const U=(0,A.jsx)(b.Z,{required:!0,type:"text",value:j.title,onInput:f}),F=(0,A.jsx)(b.Z,{required:!0,type:"number",min:"1",step:"1",value:Math.round(j.price[l]),onInput:D}),T=(0,A.jsx)(R.Z,{value:l,setCurrency:i,onChange:i}),L=(0,A.jsx)(I.Z,{required:!0,onChange:M,value:E()(j.date),minDate:Z.Z.startDate,maxDate:E()()}),H=(0,A.jsx)(P,{id:j.categoryId,onChange:z});return(0,A.jsx)(C.Z,{open:t,okButtonProps:{size:c?"small":"middle"},cancelButtonProps:{size:c?"small":"middle"},onOk:()=>{a(j)},onCancel:()=>{S(x),r()},okText:(0,A.jsx)(Y.Z,{}),cancelText:(0,A.jsx)(w.Z,{}),children:(0,A.jsxs)(O.Z,{size:c?"small":"middle",layout:"vertical",style:{inlineSize:"100%"},children:[(0,A.jsx)(O.Z.Item,{label:y.Z.title[g],children:U}),(0,A.jsx)(O.Z.Item,{label:y.Z.price[g],children:(0,A.jsxs)(k.Z,{children:[(0,A.jsx)(u.Z,{span:16,children:F}),(0,A.jsx)(u.Z,{span:1}),(0,A.jsx)(u.Z,{span:7,children:T})]})}),(0,A.jsx)(O.Z.Item,{label:y.Z.dateAndCat[g],children:(0,A.jsxs)(k.Z,{children:[(0,A.jsx)(u.Z,{span:10,children:L}),(0,A.jsx)(u.Z,{span:1}),(0,A.jsx)(u.Z,{span:13,children:H})]})})]})})})),T=F,L=(0,g.Pi)((e=>{let{mode:t,initialItemId:s}=e;const{isSmallScreen:g}=p.userStore,{replaceItem:Z,list:v,setLastDeletedItemId:b}=h.listStore,{userOptions:I}=B.optionsStore,{categories:C}=z.categoryStore,{currency:O,language:k}=I,[R,M]=(0,n.useState)(!1),[D,U]=(0,n.useState)(v[s]),P=(0,n.useCallback)((()=>{M((e=>!e))}),[M]),Y=(0,n.useCallback)((e=>{U((t=>{if(JSON.stringify(t)!==JSON.stringify(e)){const t={...e,updatedAt:E()().valueOf()};return Z(s,t),t}return t})),P()}),[U,Z,P,s]),w=(0,n.useCallback)((()=>{b(s)}),[b,s]),F=(0,A.jsx)(l.Z,{justify:"center",style:{opacity:D.title?"1":".5"},children:g?(0,A.jsx)(i.Z.Text,{strong:!0,ellipsis:!0,children:D.title||y.Z.noTitle[k]}):(0,A.jsx)(x.Z,{ellipsis:!0,level:3,style:{margin:0},children:D.title||y.Z.noTitle[k]})}),L=(0,A.jsx)(o.Z,{value:E()(D.date).format("DD.MM.YY"),style:{scale:g?".75":"1"}}),H=(0,A.jsx)(l.Z,{vertical:!0,align:"stretch",children:(0,A.jsx)(c.Z,{color:C[D.categoryId].color,children:(0,A.jsx)("span",{style:{margin:"auto",color:C[D.categoryId].color,filter:"invert(1)"},children:C[D.categoryId].name})})}),N=(0,A.jsx)(l.Z,{justify:"center",children:g?(0,A.jsxs)(i.Z.Text,{strong:!0,children:[(0,r.R)(O),Math.round(D.price[O])]}):(0,A.jsx)(x.Z,{level:3,style:{margin:0},children:(0,r.R)(O,D.price[O])})}),_=(0,A.jsx)(j.Z,{onClick:w,style:{scale:g?"1":"1.5"}}),q=(0,A.jsx)(S.Z,{onClick:P,style:{scale:g?"1":"1.5"}}),J=(0,A.jsxs)(l.Z,{justify:"space-evenly",children:[q,N,_]}),V=(0,n.useMemo)((()=>D.updatedAt?(0,A.jsxs)(A.Fragment,{children:["".concat(y.Z.createdAt[k]," ").concat(E()(D.createdAt).format("HH:mm:ss DD.MM.YY")),(0,A.jsx)("br",{}),"".concat(y.Z.updatedAt[k]," ").concat(E()(D.updatedAt).format("HH:mm:ss DD.MM.YY"))]}):(0,A.jsx)(A.Fragment,{children:"".concat(y.Z.createdAt[k]," ").concat(E()(D.createdAt).format("HH:mm:ss DD.MM.YY"))})),[D,k]),W=(0,A.jsx)(d.Z,{title:V,children:(0,A.jsx)(f.Z,{})});return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(T,{opened:R,initialItemId:s,toggleOpened:P,submitItem:Y}),"list"===t?(0,A.jsxs)(a.Z,{children:[(0,A.jsx)(u.Z,{children:L}),(0,A.jsx)(u.Z,{span:9,children:F}),(0,A.jsx)(u.Z,{span:3,children:H}),(0,A.jsx)(u.Z,{span:5,children:N}),(0,A.jsx)(u.Z,{children:q}),(0,A.jsx)(u.Z,{children:_}),(0,A.jsx)(u.Z,{children:W})]}):(0,A.jsx)(m.Z,{extra:[W],size:g?"small":"default",bordered:!0,title:F,actions:[J],children:(0,A.jsx)(l.Z,{justify:"center",children:(0,A.jsxs)(l.Z,{vertical:!0,align:"stretch",gap:4,children:[L,H]})})})]})})),H=L;var N=s(4664),_=s(6051),q=s(6619);const J=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250;const[s,r]=(0,n.useState)(e);return(0,n.useEffect)((()=>{const s=setTimeout((()=>{r(e)}),t);return()=>{clearTimeout(s)}}),[e,t]),s};var V=s(6281);const W=(0,g.Pi)((e=>{let{filteredListIds:t}=e;const{width:s,loading:r}=p.userStore,{listOptions:a}=B.optionsStore,{lastDeletedItemId:l}=h.listStore,i=J(a),[o,c]=(0,n.useState)(4);(0,n.useEffect)((()=>{c(s<350?1:s<450?2:s<850?3:4)}),[c,s]);const d=(0,n.useMemo)((()=>(0,q.W2)(i,t)),[t,i]),m=(0,n.useMemo)((()=>{const e=[];let t=-1;return d.forEach(((s,n)=>{n%o===0&&(t++,e.push([])),e[t].push(s)})),e}),[o,d]);return(0,A.jsxs)(A.Fragment,{children:[r?(0,A.jsx)(V.Z,{}):!t.length&&(0,A.jsx)(N.Z,{image:N.Z.PRESENTED_IMAGE_SIMPLE,description:""}),"list"===i.mode?(0,A.jsx)(_.Z,{style:{inlineSize:"100%"},children:d.map((e=>(0,A.jsx)(H,{mode:i.mode,initialItemId:e},e)))}):m.map((e=>(0,A.jsx)(k.Z,{gutter:16,style:{inlineSize:"100%"},children:e.map((e=>e!==l?(0,A.jsx)(u.Z,{span:24/o,children:(0,A.jsx)(H,{mode:i.mode,initialItemId:e})},e):(0,A.jsx)(A.Fragment,{})))},e[0])))]})})),$=(0,n.memo)(W);var G=s(2556),K=s(7128),Q=s(6834),X=s(9286);const ee=(0,g.Pi)((()=>{const{addItem:e}=h.listStore,{isSmallScreen:t}=p.userStore,[s,r]=(0,n.useState)(!1),a=(0,n.useCallback)((()=>{r((e=>!e))}),[r]),l=(0,n.useCallback)((t=>{const s=E()().valueOf();e({...t,createdAt:s}),a()}),[e,a]);return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(G.ZP,{onClick:a,size:t?"small":"middle",children:(0,A.jsx)(X.Z,{})}),(0,A.jsx)(T,{opened:s,toggleOpened:a,submitItem:l})]})}));var te=s(2158);const se=(0,g.Pi)((()=>{const{categories:e}=z.categoryStore,{isSmallScreen:t}=p.userStore,{listOptions:s,handleCategoriesToFilterChange:n}=B.optionsStore;return(0,A.jsx)(D.Z,{size:t?"small":"middle",mode:"multiple",showSearch:!1,tagRender:t=>((e,t)=>{const{label:s,value:n,onClose:r}=e,a=Object.keys(t).length>1?t[n].color:"";return(0,A.jsx)(c.Z,{color:a,onMouseDown:e=>{e.preventDefault(),e.stopPropagation()},closable:!0,onClose:r,style:{marginInlineEnd:4},children:(0,A.jsx)("span",{style:{color:a,filter:"invert(1)"},children:s})})})(t,e),style:{minInlineSize:"10em"},value:s.categoriesToFilterIds,onChange:n,children:Object.keys(e).map((t=>(0,A.jsx)(D.Z.Option,{value:t,children:e[t].name},t)))})}));var ne=s(4248),re=s(4544),ae=s(54),le=s(9168),ie=s(2785),oe=s(897);const ce=(0,g.Pi)((()=>{const{isSmallScreen:e}=p.userStore,{setIsSortingReversed:t,listOptions:s,handleSortAlgorithmChanging:n}=B.optionsStore;return(0,A.jsxs)(l.Z,{gap:8,style:{alignSelf:"start"},children:[s.isSortingReversed?(0,A.jsx)(re.Z,{}):(0,A.jsx)(ae.Z,{}),(0,A.jsx)(ne.Z,{size:e?"small":"middle",value:s.sortingAlgorithm,onDoubleClick:()=>t(!s.isSortingReversed),onChange:n,options:[{label:(0,A.jsx)(le.Z,{}),value:"date"},{label:(0,A.jsx)(ie.Z,{}),value:"title"},{label:(0,A.jsx)(oe.Z,{}),value:"price"}]})]})}));var de=s(6324),ue=s(9197);const me=(0,g.Pi)((()=>{const{isSmallScreen:e}=p.userStore,{listOptions:t,handleModeChanging:s}=B.optionsStore;return(0,A.jsx)(l.Z,{gap:8,style:{alignSelf:"start"},children:(0,A.jsx)(ne.Z,{size:e?"small":"middle",value:t.mode,onChange:s,options:[{label:(0,A.jsx)(de.Z,{}),value:"list",disabled:e},{label:(0,A.jsx)(ue.Z,{}),value:"grid"}]})})}));var ge=s(3605);const he=(0,g.Pi)((e=>{let{total:t}=e;const{isSmallScreen:s,loading:r}=p.userStore,{listOptions:a,defaultRange:i,resetListOptions:o,handlePageChanging:c,setRange:d,setIsAccurate:u}=B.optionsStore,{isSortingReversed:m,range:g,categoriesToFilterIds:h,pageSize:x,currentPage:j,sortingAlgorithm:S,isAccurate:f}=a,v=(0,n.useMemo)((()=>m||h.length>0||x!==Z.Z.defaultPageSize||1!==j||g[0]&&g[1]&&(g[0]!==i[0]||g[1])!==i[1]||"date"!==S),[g,i,m,h,x,j,S]);return(0,A.jsxs)(l.Z,{vertical:!0,style:{inlineSize:"100%"},children:[(0,A.jsxs)(l.Z,{vertical:!0,gap:32,children:[(0,A.jsxs)(l.Z,{gap:16,vertical:s,children:[(0,A.jsxs)(l.Z,{gap:16,children:[(0,A.jsx)(ee,{}),(0,A.jsx)(se,{})]}),(0,A.jsxs)(l.Z,{gap:16,children:[(0,A.jsx)(ce,{}),(0,A.jsx)(me,{}),(0,A.jsx)(G.ZP,{disabled:!v,onClick:o,size:s?"small":"middle",children:(0,A.jsx)(ge.Z,{})})]})]}),(0,A.jsx)(te.Z,{setIsAccurate:u,isAccurate:f,range:g,setRange:d})]}),(0,A.jsx)(K.Z,{}),!r&&(0,A.jsx)(Q.Z,{style:{alignSelf:"center"},size:s?"small":"default",showSizeChanger:!0,pageSizeOptions:Z.Z.pageSizeOptions,current:a.currentPage,pageSize:a.pageSize,total:t,onChange:c,onShowSizeChange:c})]})})),pe=(0,n.memo)(he),xe=(0,g.Pi)((()=>{const{isSmallScreen:e}=p.userStore,{list:t}=h.listStore,{listOptions:s,userOptions:r,handleModeChanging:a,handlePageChanging:i}=B.optionsStore,{language:o}=r,{range:c,sortingAlgorithm:d,isSortingReversed:u,categoriesToFilterIds:m,pageSize:g}=s;(0,n.useEffect)((()=>{e&&a("grid")}),[e,a]),(0,n.useEffect)((()=>{i(1,g)}),[c,d,u,m,g,i]);const x=(0,n.useMemo)((()=>(0,q.tL)(s,t,o)),[t,o,s]);return(0,A.jsxs)(l.Z,{vertical:!0,gap:16,align:"center",children:[(0,A.jsx)(pe,{total:x.length}),(0,A.jsx)($,{filteredListIds:x})]})})),je=xe},6619:(e,t,s)=>{s.d(t,{BF:()=>g,CH:()=>u,W2:()=>c,r6:()=>m,tL:()=>o,u1:()=>d});var n=s(8418),r=s(7892),a=s.n(r),l=s(6818),i=s.n(l);a().extend(i());const o=(e,t,s)=>{const{range:r,categoriesToFilterIds:a,sortingAlgorithm:l,isSortingReversed:i}=e;return(0,n.M)(t,Object.keys(t).filter((e=>t[e].date>=r[0]&&t[e].date<=r[1]&&(!a.length||a.some((s=>t[e].categoryId===s))))),l,i,s)},c=(e,t)=>{const{currentPage:s,pageSize:n}=e,r=(s-1)*n,a=r+n;return t.slice(r,a)},d=(e,t,s,n)=>{if("year"===s){const s={};Object.keys(e).forEach((n=>{const r=a()(e[n].date).year();void 0===s[r]?s[r]=e[n].price[t]:s[r]+=e[n].price[t]}));for(let e in s)s[e]=Math.round(s[e]);return s}if("month"===s){const s=new Array(12).fill(0);return Object.keys(e).forEach((r=>{if(a()(e[r].date).year()===n){const n=a()(e[r].date).month();s[n]+=e[r].price[t]}})),s.map((e=>Math.round(e)))}return[]},u=(e,t,s)=>{const n=[];return Object.keys(e).forEach((r=>{if(e[r].date>t[0]&&e[r].date<t[1]){const t=Object.keys(n).findIndex((t=>n[Number(t)].categoryId===e[r].categoryId));-1!==t?n[t].value+=e[r].price[s]:n.push({categoryId:e[r].categoryId,value:e[r].price[s]})}})),n.map((e=>({...e,value:Math.round(e.value)})))},m=(e,t,s)=>Math.floor(Object.values(e).reduce(((e,n)=>n.date>=t[0]&&n.date<=t[1]?e+n.price[s]:e),0)),g=(e,t)=>{const s=[],n=a()(t[1]);let r=a()(t[0]),l=a()(t[0]).add(1,"month");for(;!l.isAfter(n,"day");){const t=Object.values(e).filter((e=>e.date>r.valueOf()&&e.date<l.valueOf())).reduce(((e,t)=>e+t.price.USD),0);s.push(t),r=r.add(1,"month"),l=l.add(1,"month")}return s}},8418:(e,t,s)=>{s.d(t,{M:()=>r,R:()=>n});const n=(e,t)=>{var s;let n="";"USD"===e&&(n+="$"),"EUR"===e&&(n+="\u20ac"),"RUB"===e&&(n+="\u20bd");const r=null===(s=Math.round(t))||void 0===s?void 0:s.toString().split("").reverse().reduce(((e,t,s)=>s%3===0&&0!==s?[...e,t+","]:[...e,t]),[]).reverse().join("");return void 0===t?n:n+r},r=(e,t,s,n,r)=>{let a;switch(s){case"date":a=t.sort(((t,s)=>e[s].date.valueOf()-e[t].date.valueOf()));break;case"title":a=t.sort(((t,s)=>e[t].title.localeCompare(e[s].title,r,{sensitivity:"base"})));break;case"price":a=t.sort(((t,s)=>e[s].price.USD-e[t].price.USD));break;default:a=t}return n?a.reverse():a}}}]);
//# sourceMappingURL=781.8fb3e3bc.chunk.js.map