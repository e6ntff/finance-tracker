/*! For license information please see 474.f920c8c7.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkfinance_tracker=self.webpackChunkfinance_tracker||[]).push([[474],{8474:(e,s,a)=>{a.r(s),a.d(s,{default:()=>z});var n=a(2791),t=a(2965),r=a(7346),l=a(8807),i=a(7257),o=a(8416),c=a(9884),d=a(3070),g=a(4133),p=a(7201),u=a(1431),h=a(5563),w=a(2556),Z=a(8624),x=a(4215),m=a(8272),v=a(7462);const f={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"}}]},name:"warning",theme:"outlined"};var j=a(4291),y=function(e,s){return n.createElement(j.Z,(0,v.Z)({},e,{ref:s,icon:f}))};const I=n.forwardRef(y);const C={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 01520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 01270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 010 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"}}]},name:"login",theme:"outlined"};var k=function(e,s){return n.createElement(j.Z,(0,v.Z)({},e,{ref:s,icon:C}))};const b=n.forwardRef(k);var A=a(7703),S=a(184);const M=(0,t.v0)(r.l),z=(0,i.Pi)((()=>{const{setLogged:e,setIsTourStarted:s}=l.userStore,{userOptions:a}=A.optionsStore,{language:r}=a,i=(0,n.useMemo)((()=>({logIn:{email:!1,password:!1},signIn:{email:!1,password:!1,passwordAgain:!1}})),[]),v=(0,n.useMemo)((()=>({logIn:{email:"",password:""},signIn:{email:"",password:"",passwordAgain:""}})),[]),[f,j]=(0,n.useState)("logIn"),[y,C]=(0,n.useState)(!1),[k,z]=(0,n.useState)(!1),[E,L]=(0,n.useState)(i[f]),[q,P]=(0,n.useState)(v[f]),R=(0,n.useMemo)((()=>{for(const e of Object.values(E))if(!e)return!1;return q.password===q.passwordAgain||"signIn"!==f}),[E,q.password,q.passwordAgain,f]),T=(0,n.useCallback)((e=>{const{value:s,validity:a}=e.target;C(!1),P((e=>({...e,email:s}))),L((e=>({...e,email:a.valid})))}),[C,P,L]),B=(0,n.useCallback)(((e,s)=>{const{value:a}=e.target;C(!1),P((e=>({...e,[s?"passwordAgain":"password"]:a}))),L((e=>({...e,[s?"passwordAgain":"password"]:a.length>=6&&a.length<=16})))}),[C,P,L]),H=(0,n.useCallback)((async()=>{try{await(0,t.Xb)(M,q.email,q.password),s(!0),e(!0)}catch(a){C(!0)}}),[q,e,s]),O=(0,n.useCallback)((async()=>{try{await(0,t.e5)(M,q.email,q.password),e(!0)}catch(s){C(!0)}}),[C,q.email,q.password,e]),_=(0,n.useCallback)((()=>{j((e=>{const s="logIn"===e?"signIn":"logIn";return L(i[s]),P(v[s]),C(!1),z(!1),s}))}),[j,L,P,C,z,i,v]),V=()=>{z((e=>!e))};return(0,n.useEffect)((()=>{const e=e=>{"Enter"===e.code&&R&&H()};return window.addEventListener("keyup",e),()=>window.removeEventListener("keyup",e)})),(0,S.jsxs)(d.Z,{layout:"vertical",labelCol:{span:26},wrapperCol:{span:26},children:[(0,S.jsx)(d.Z.Item,{label:o.Z.email[r],children:(0,S.jsx)(g.Z,{required:!0,pattern:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",type:"text",value:q.email,onChange:T})}),(0,S.jsx)(d.Z.Item,{label:(0,S.jsxs)(p.Z,{gap:4,children:[o.Z.password[r],"signIn"===f&&(0,S.jsx)(u.Z,{title:o.Z.passwordRequirements[r],placement:"right",children:(0,S.jsx)(Z.Z,{style:{opacity:.5}})})]}),children:(0,S.jsx)(g.Z,{required:!0,type:k?"text":"password",value:q.password,onChange:B,suffix:k?(0,S.jsx)(x.Z,{style:{opacity:.5},onClick:V}):(0,S.jsx)(m.Z,{style:{opacity:.5},onClick:V})})}),"signIn"===f&&(0,S.jsx)(d.Z.Item,{label:o.Z.repeatPassword[r],children:(0,S.jsx)(g.Z,{required:!0,type:"password",value:q.passwordAgain,onChange:e=>B(e,!0)})}),(0,S.jsxs)(p.Z,{vertical:!0,gap:16,children:[y&&(0,S.jsxs)(p.Z,{gap:4,children:[(0,S.jsx)(I,{}),(0,S.jsx)(h.Z.Text,{type:"danger",children:o.Z.invalidLogin[r]})]}),q.password!==q.passwordAgain&&"signIn"===f&&(0,S.jsxs)(p.Z,{gap:4,children:[(0,S.jsx)(I,{}),(0,S.jsx)(h.Z.Text,{type:"danger",children:o.Z.passMatch[r]})]}),(0,S.jsxs)(p.Z,{align:"center",gap:16,children:[(0,S.jsx)(u.Z,{title:"logIn"===f?o.Z.logIn[r]:o.Z.signIn[r],children:(0,S.jsx)(w.ZP,{disabled:!R,onClick:"logIn"===f?O:H,children:(0,S.jsx)(b,{})})}),(0,S.jsx)(c.Z,{onClick:_,children:"signIn"===f?o.Z.already[r]:o.Z.yet[r]})]})]})]})}))}}]);
//# sourceMappingURL=474.f920c8c7.chunk.js.map