"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[191],{32367:function(t,e,n){n.d(e,{HW:function(){return i},DM:function(){return m},o0:function(){return u},o_:function(){return s},Mb:function(){return l},xj:function(){return c},_4:function(){return d},Ty:function(){return h},ZG:function(){return f},TW:function(){return g},P9:function(){return p},Mg:function(){return x},_r:function(){return r},NP:function(){return o},Tm:function(){return a}});let r=150,o=6e4*new Date().getTimezoneOffset(),i={"image/jpeg":".jpg","image/png":".png","image/heic":".heic"},a=[8.55,47.38],u=4,s=14,l=864e5,c=6048e5,d=314496e5,f="#8e44ad",g="#27ae60",h="https://travel-api.kupfer.es/images/pictures/ph.png",m={whiteText:"#eee",darkText:"#333"},p="/",x="/dashboard"},1356:function(t,e,n){n.r(e),n.d(e,{EditSelfieContextWrapper:function(){return d}});var r=n(57437),o=n(2265),i=n(42874),a=n(67185),u=n(74598);let s=t=>t.me.img||t.lc.img?{me:!!t.me.img,lc:!!t.lc.img}:void 0,l=t=>Math.abs(t.lat)+Math.abs(t.lng)>0,c=(t,e)=>t&&l(e)?[(0,i.Ww)({...e,active_hash:e.hash},{...t,force:!0})]:[],d=t=>{let{children:e,initialData:n}=t,[d,f]=(0,o.useState)(n),g=(0,o.useMemo)(()=>s(d.images),[d.images.me,d.images.lc]),h=(0,o.useMemo)(()=>l(d.selfie),[d.selfie.lat,d.selfie.lng]),m=(0,o.useMemo)(()=>c(g,d.selfie),[d.selfie.lat,d.selfie.lng,g]),[p,x]=(0,o.useState)({}),v=(0,o.useCallback)(t=>{let e=a.iW.safeParse({...d.selfie,...t});e.success?x({}):x((0,i.Uo)(e.error.issues)),f(e=>({...e,selfie:{...e.selfie,...t}}))},[d]),b=(0,o.useMemo)(()=>({data:d,setData:f,setSelfieData:v,errors:p,setErrors:x,hash:d.selfie.hash,hasImages:g,hasLocation:h,markers:m,_insideContext_:!0}),[d,m]);return(0,r.jsx)(u.EditSelfieContext.Provider,{value:b,children:e})}},4387:function(t,e,n){n.r(e),n.d(e,{JwtTokenContextWrapper:function(){return c}});var r=n(57437),o=n(44785),i=n(16463),a=n(2265),u=n(27776),s=n(42874),l=n(50461);let c=t=>{var e;let{children:n,contextData:c}=t,d=null!==(e=o.Z.get("token"))&&void 0!==e?e:null,[f,g]=(0,a.useState)(c.jwt),[h,m]=(0,a.useState)(c.user),p=(0,i.useRouter)(),x=(0,a.useCallback)(function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e||!h&&t?m((0,s.JM)(t)):h&&!t&&m(null)},[h]),v=(0,a.useCallback)(t=>{t?o.Z.set("token",t):o.Z.remove("token"),g(t),x(t,!0)},[x]),b=(0,a.useCallback)(t=>(0,s.Cx)(t,f).catch(t=>{throw 401===t.status&&p.push("/auth/logout"+(0,s.L7)({status:t.status})),413===t.status&&u.toast.error("file size too big"),t}),[f]),w=(0,a.useMemo)(()=>({jwt:f,setJwt:v,setUser:m,user:h,api:b,isAuthed:!!h,isAdmin:(null==h?void 0:h.id)===1,_insideContext_:!0}),[f,h,b,v]);return(0,a.useEffect)(()=>{x(d)},[d]),(0,r.jsx)(l.JwtTokenContext.Provider,{value:w,children:n})}},72023:function(t,e,n){n.r(e),n.d(e,{NotificationsWrapper:function(){return l}});var r=n(57437),o=n(2265),i=n(27776),a=n(42874),u=n(50461),s=n(84655);let l=t=>{let{children:e}=t,{api:n,jwt:l}=(0,u.useJwtTokenContext)(),[c,d]=(0,o.useState)(10),[f,g]=(0,o.useState)([]),[h,m]=(0,o.useState)(0),p=t=>{g(e=>[...e.map(e=>({...e,seen:e.id===t?new Date().toISOString():e.seen}))]),m(t=>Math.max(0,(null!=t?t:0)-1)),v(t,!0)},x=t=>{g(e=>[...e.map(e=>({...e,seen:e.id===t?null:e.seen}))]),m(t=>(null!=t?t:0)+1),v(t,!1)},v=(t,e)=>{n({url:"/api/notifications/mark",body:{unread:Number(!e),id:t}}).then(a.xO).then(t=>{m(t.unread),b()}).catch(t=>{console.error(t),i.toast.error(String(t))})},b=t=>{n({url:"/api/notifications?limit=".concat(c),signal:t}).then(a.xO).then(t=>{g(t.notifications),m(t.unread)})},w=(0,o.useMemo)(()=>({notifications:f,markAsUnead:x,markAsRead:p,unread:h,loadMore:()=>d(t=>t+10),_insideContext_:!0}),[f,h]);return(0,o.useEffect)(()=>{if(!l)return;let t=new AbortController,e=setTimeout(()=>b(t.signal),1e3),n=setInterval(()=>b(t.signal),2e4);return()=>{t.abort(),clearTimeout(e),clearInterval(n)}},[l,c]),(0,r.jsx)(s.NotificationsContext.Provider,{value:w,children:e})}},74598:function(t,e,n){n.r(e),n.d(e,{EditSelfieContext:function(){return o},useEditSelfieContext:function(){return i}});var r=n(2265);let o=(0,r.createContext)({data:{},setData:()=>null,setSelfieData:()=>null,errors:{},setErrors:()=>null,hash:"",hasImages:void 0,hasLocation:!1,markers:[],_insideContext_:!1}),i=()=>{let t=(0,r.useContext)(o);if(!t._insideContext_)throw Error("`useEditSelfieContext` must be used inside of `EditSelfieContext`.");return t}},70191:function(t,e,n){n.d(e,{Rv:function(){return r.useJwtTokenContext},dV:function(){return o.useEditSelfieContext},lR:function(){return i.useNotificationsContext},qF:function(){return a.NotificationsWrapper}});var r=n(50461);n(4387);var o=n(74598);n(1356);var i=n(84655),a=n(72023)},50461:function(t,e,n){n.r(e),n.d(e,{JwtTokenContext:function(){return o},useJwtTokenContext:function(){return i}});var r=n(2265);let o=(0,r.createContext)({jwt:null,setJwt:()=>null,user:null,setUser:()=>null,isAdmin:!1,isAuthed:!1,api:Promise.resolve,_insideContext_:!1}),i=t=>{let e=(0,r.useContext)(o);if(!e._insideContext_)throw Error("`useJwtTokenContext` must be used inside of `JwtTokenContext`.");return(null==t?void 0:t.redirect)&&!e.isAuthed&&"string"==typeof e.jwt&&(window.location.href=t.redirect),e}},84655:function(t,e,n){n.r(e),n.d(e,{NotificationsContext:function(){return o},useNotificationsContext:function(){return i}});var r=n(2265);let o=(0,r.createContext)({notifications:[],markAsRead:()=>null,markAsUnead:()=>null,loadMore:()=>null,unread:void 0,_insideContext_:!1}),i=()=>{let t=(0,r.useContext)(o);if(!t._insideContext_)throw Error("`useNotificationsContext` must be used inside of `NotificationsContext`.");return t}},42874:function(t,e,n){n.d(e,{vQ:function(){return o},Uo:function(){return i},gw:function(){return a},G0:function(){return M},p6:function(){return y},Cx:function(){return u},r7:function(){return I},JM:function(){return l},ZE:function(){return b},jA:function(){return p},Ij:function(){return g},ZP:function(){return _},gY:function(){return C},xO:function(){return w},kb:function(){return c},HP:function(){return x},w6:function(){return D},OH:function(){return U},t6:function(){return W},Jm:function(){return N},Jj:function(){return j},iQ:function(){return E},qH:function(){return h},Ww:function(){return P},SH:function(){return A},Sy:function(){return T},L7:function(){return v}});var r=n(27776);let o=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0;navigator.clipboard.writeText(t).then(()=>{n&&(0,r.toast)(n),null==e||e()})},i=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={};return t.forEach(t=>{let e;let r=n;t.path.forEach((n,o)=>{var i,a;"string"==typeof n?(e=[],r[n]=null!==(i=r[n])&&void 0!==i?i:e):"number"==typeof n&&(e={},r[n]=null!==(a=r[n])&&void 0!==a?a:e);let u=o===t.path.length-1?t.message:void 0;u?r[n]=u:r=r[n]})}),e&&console.error(n),n},a=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;return setTimeout(t,e)},u=function(t){let{method:e="POST",body:n,url:r="/api/selfies",contentType:o="application/x-www-form-urlencoded",signal:i,cache:a,cacheTags:u=[]}=t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return fetch("".concat("https://travel-api.kupfer.es").concat(r),{signal:i,next:{cache:a,tags:u},method:null!=e?e:"POST",headers:{...!1===o?{}:{"Content-Type":o},...s?{Authorization:"Bearer ".concat(s)}:{}},body:n?n instanceof FormData?n:new URLSearchParams(n).toString():void 0,credentials:"include"}).then(t=>{let e=t.status,n=t.ok;return t.json().then(t=>{if(n)return t.status=e,t;if(t)throw{...t,status:e};throw{success:0,status:e,responseData:t}})})};var s=n(49714);let l=t=>{var e,n;return t&&null!==(n=null===(e=(0,s.o)(t))||void 0===e?void 0:e.data)&&void 0!==n?n:null},c=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);return"".concat(t).concat(e(),"-").concat(e())};var d=n(56800),f=n.n(d);let g=t=>f()("has-loading-mask",{"is-loading-mask":t.loading},{"cursor-wait":t.fetching},{"has-spinner":t.spinner}),h=t=>void 0===t?"":m(t.selfies.length,!!t.more),m=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return void 0===t?"":1===t?"(1 result)":"(".concat(t).concat(e?"+":""," results)")},p=t=>Array.isArray(t)?t[t.length-1]:t,x=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{let e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}),v=t=>{let e=Object.keys(t);if(!(Object.values(t).filter(Boolean).length>0))return"";let n=[];for(let r=0,o=e.length;r<o;++r)n.push("".concat(encodeURIComponent(e[r]),"=").concat(encodeURIComponent(t[e[r]])));return"?"+n.join("&")},b=()=>Math.round(+new Date/1e4),w=t=>{if(t.success)return t.responseData;throw console.error("UNSUCCESSFUL",t),t.responseData},C=(t,e)=>"".concat(t," ").concat(e[Number(1!==t)]),y=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t=>t.toString().padStart(2,"0"),r=n(t.getHours()),o=n(t.getMinutes()),i=n(t.getDate()),a=n(t.getMonth()+1),u=t.getFullYear();return e||t.getHours()+t.getMinutes()===0?"".concat(i,"-").concat(a,"-").concat(u):"".concat(r,":").concat(o," ").concat(i,"-").concat(a,"-").concat(u)};var k=n(48952),S=n(32367);let _=t=>{let e=t;if("string"==typeof t&&(e=new Date(+new Date(t)-S.NP)),isNaN(e)&&(e=new Date(t)),isNaN(e))throw Error('Invalid date! "'.concat(String(t),'"'));return e},z="date-locale";(0,k.z2)(z,function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(1e3*n<S.Mb){let t=+new Date;if(new Date().getDate()===new Date(t-(null!=n?n:0)).getDate())return["today","today"]}return[["today","today"],["today","today"],["today","today"],["today","today"],["recently","today"],["recently","recently"],["yesterday","tomorrow"],["%s days ago","in %s days"],["1 week ago","in 1 week"],["%s weeks ago","in %s weeks"],["1 month ago","in 1 month"],["%s months ago","in %s months"],["1 year ago","in 1 year"],["%s years ago","in %s years"]][e]});let T=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,k.WU)(_(t),e?z:void 0)},D=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=[];void 0===e&&(e=t,t=0);for(let o=t;o<e;o+=n)r.push(o);return r},M=(t,e,n)=>{var o;if((null===(o=prompt("Type delete to continue"))||void 0===o?void 0:o.toLowerCase())==="delete"){let o=t({method:"DELETE",url:"/api/selfie/delete/".concat(e.hash)}).then(w);r.toast.promise(o,{success:t=>(n(t),"".concat(e.name," Deleted!")),error:t=>(console.error(t),String(t))})}},E=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"".concat("https://travel-api.kupfer.es","/images/pictures/uploads/").concat(t.hash,"/").concat(e?"mini_":"","me.jpg")},j=function(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return"".concat("https://travel-api.kupfer.es","/images/pictures/uploads/").concat(t.hash,"/").concat(e?"mini_":"","lc.jpg")},N=t=>"".concat("https://travel-api.kupfer.es","/images/pictures/uploads/").concat(t.hash,"/cp.jpg"),A=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"me";return("me"===e?t.me_brightness:t.lc_brightness)<120?S.DM.whiteText:S.DM.darkText},J=(t,e)=>e?"edit"===e?"/edit/".concat(t):"/s/".concat(t):"#",P=function(t){var e,n,r;let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o.lc=null===(e=o.lc)||void 0===e||e,o.me=null===(n=o.me)||void 0===n||n,o.url=null!==(r=o.url)&&void 0!==r?r:void 0;let i=o.force?"?t=".concat(+new Date):"",a="<div class='empty-div'>";return a+='<a href="'.concat(J(t.active_hash,o.url),'"'),o.me&&o.lc?a+=' class="'.concat(f()("rounded-pin-double",{openable:!!o.url}),'" >')+'\n      <span class="rounded-pin-double-one"><img src="'.concat(E(t,!0)+i,'"/></span>\n      <span class="rounded-pin-double-two"><img src="').concat(j(t,!0)+i,'"/></span>\n    ')+"</a>":(a+=' class="'.concat(f()("rounded-pin",{openable:!!o.url}),'"'),o.me?a+=" style=\"background-image: url('".concat(E(t,!0)+i,"')\" ></a>"):o.lc?a+=" style=\"background-image: url('".concat(j(t,!0)+i,"')\" ></a>"):a+=">(none)</a>"),a+="</div>",{lat:t.lat,lng:t.lng,icon:a}},U=(t,e)=>"linear-gradient(0.25turn,rgb(".concat(t,"),rgb(").concat(e,"))"),W=t=>"0 1px 60px 20px rgb(".concat(t,")"),I=t=>"(".concat(t.lat,", ").concat(t.lng,")")},67185:function(t,e,n){n.d(e,{iW:function(){return u},L4:function(){return a}});var r=n(59772);let o=r.z.enum(["menu","top"]),i=r.z.union([r.z.literal(0),r.z.literal(1),r.z.literal(2)]),a=r.z.object({bell_position:o,email:r.z.string().email(),name:r.z.string().min(5),short_desc:r.z.string().min(5),profile_pic:r.z.string().min(1),gender:i,username:r.z.string().min(4),password:r.z.string().min(8).optional(),confirm:r.z.string().min(8).optional()}).superRefine((t,e)=>{let{confirm:n,password:r}=t;n!==r&&e.addIssue({code:"custom",message:"the passwords do not match",path:["confirm"]})}),u=r.z.object({title:r.z.string().min(5,"Title must be at least 5 characters long"),subtitle:r.z.string().min(10,"Subtitle must be between 5 and 100 characters long").max(100,"Subtitle must be between 5 and 100 characters long"),date:r.z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Date must be in yyyy-mm-dd format"),place:r.z.string().min(1,"Place must not be empty"),lat:r.z.number().refine(t=>0!==t,{message:"Latitude cannot be 0"}),lng:r.z.number().refine(t=>0!==t,{message:"Longitude cannot be 0"}),description:r.z.string(),url:r.z.string(),hash:r.z.string(),visible:r.z.boolean(),draft:r.z.boolean()})}}]);