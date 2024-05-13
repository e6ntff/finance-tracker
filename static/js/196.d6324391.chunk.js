"use strict";(self.webpackChunkfinance_tracker=self.webpackChunkfinance_tracker||[]).push([[196],{196:(e,s,a)=>{a.r(s),a.d(s,{default:()=>M});var n=a(2791),t=a(2965),r=a(7346),l=a(8807),i=a(7257),o=a(8416),c=a(9884),d=a(9469),g=a(4231),p=a(7201),u=a(5563),w=a(2556),h=a(3070),Z=a(8624),m=a(398),x=a(7462);const v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 01520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 01270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 010 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"}}]},name:"login",theme:"outlined"};var j=a(4291),I=function(e,s){return n.createElement(j.Z,(0,x.Z)({},e,{ref:s,icon:v}))};const f=n.forwardRef(I);var b=a(7703),k=a(184);const y=(0,t.v0)(r.l),C={logIn:{email:!1,password:!1},signIn:{email:!1,password:!1,passwordAgain:!1}},A={logIn:{email:"",password:""},signIn:{email:"",password:"",passwordAgain:""}},M=(0,i.Pi)((()=>{const{setLogged:e,setIsNicknameModalOpened:s}=l.userStore,{userOptions:a}=b.optionsStore,{language:r}=a,[i,x]=(0,n.useState)("logIn"),[v,j]=(0,n.useState)(!1),[I,M]=(0,n.useState)(C[i]),[S,E]=(0,n.useState)(A[i]),L=(0,n.useMemo)((()=>{for(const e of Object.values(I))if(!e)return!1;return S.password===S.passwordAgain||"signIn"!==i}),[I,S.password,S.passwordAgain,i]),P=(0,n.useCallback)((e=>{const{value:s,validity:a}=e.target;j(!1),E((e=>({...e,email:s}))),M((e=>({...e,email:a.valid})))}),[j,E,M]),q=(0,n.useCallback)(((e,s)=>{const{value:a}=e.target;j(!1),E((e=>({...e,[s?"passwordAgain":"password"]:a}))),M((e=>({...e,[s?"passwordAgain":"password"]:a.length>=6&&a.length<=16})))}),[j,E,M]),O=(0,n.useCallback)((async()=>{try{await(0,t.Xb)(y,S.email,S.password),s(!0)}catch(e){j(!0)}}),[S,s]),T=(0,n.useCallback)((async()=>{try{await(0,t.e5)(y,S.email,S.password),e(!0)}catch(s){j(!0)}}),[j,S.email,S.password,e]),z=(0,n.useCallback)((()=>{x((e=>{const s="logIn"===e?"signIn":"logIn";return M(C[s]),E(A[s]),j(!1),s}))}),[x,M,E,j]);(0,n.useEffect)((()=>{const e=e=>{"Enter"===e.code&&L&&O()};return window.addEventListener("keyup",e),()=>window.removeEventListener("keyup",e)}));const R=(0,n.useMemo)((()=>(0,k.jsx)(d.Z,{required:!0,pattern:"^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",type:"text",value:S.email,onChange:P})),[S.email,P]),_=(0,n.useMemo)((()=>(0,k.jsx)(g.Z,{title:o.Z.passwordRequirements[r],placement:"right",children:(0,k.jsx)(Z.Z,{style:{opacity:.5}})})),[r]),B=(0,n.useCallback)((function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const s=e?S.passwordAgain:S.password;return(0,k.jsx)(d.Z.Password,{visibilityToggle:!e,required:!0,value:s,onChange:s=>q(s,e)})}),[S.password,S.passwordAgain,q]),H=(0,n.useMemo)((()=>(0,k.jsxs)(p.Z,{gap:4,children:[(0,k.jsx)(m.Z,{}),(0,k.jsx)(u.Z.Text,{type:"danger",children:o.Z.passMatch[r]})]})),[r]),N=(0,n.useMemo)((()=>(0,k.jsx)(g.Z,{title:"logIn"===i?o.Z.logIn[r]:o.Z.signIn[r],children:(0,k.jsx)(w.ZP,{disabled:!L,onClick:"logIn"===i?T:O,children:(0,k.jsx)(f,{})})})),[r,i,T,O,L]);return(0,k.jsxs)(h.Z,{layout:"vertical",labelCol:{span:26},wrapperCol:{span:26},children:[(0,k.jsx)(h.Z.Item,{label:o.Z.email[r],children:R}),(0,k.jsx)(h.Z.Item,{label:(0,k.jsxs)(p.Z,{gap:4,children:[o.Z.password[r],"signIn"===i&&_]}),children:B()}),"signIn"===i&&(0,k.jsx)(h.Z.Item,{label:o.Z.repeatPassword[r],children:B(!0)}),(0,k.jsxs)(p.Z,{vertical:!0,gap:16,children:[v&&(0,k.jsxs)(p.Z,{gap:4,children:[(0,k.jsx)(m.Z,{}),(0,k.jsx)(u.Z.Text,{type:"danger",children:o.Z.invalidLogin[r]})]}),S.password!==S.passwordAgain&&"signIn"===i&&H,(0,k.jsxs)(p.Z,{align:"center",gap:16,children:[N,(0,k.jsx)(c.Z,{onClick:z,children:"signIn"===i?o.Z.already[r]:o.Z.yet[r]})]})]})]})}))}}]);
//# sourceMappingURL=196.d6324391.chunk.js.map