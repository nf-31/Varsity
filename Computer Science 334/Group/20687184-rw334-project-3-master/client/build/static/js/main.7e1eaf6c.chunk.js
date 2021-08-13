(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{137:function(e,t,a){},167:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(13),r=a.n(o),i=(a(137),a(32)),s=a(8),l=a(222),j=a(223),u=a(37),d=a(208),h=a(116),b=a(199),p=a(221),g=a(14),O=a(16),m=a(77),x=a(1);var f=function(e){return function(t){var a=t.isLoading,n=Object(m.a)(t,["isLoading"]);return a?Object(x.jsx)("p",{style:{textAlign:"center",fontSize:"30px"},children:"Loading..."}):Object(x.jsx)(e,Object(i.a)({},n))}},v=a(202),y=a(203),k=a(204),C=a(205),S=a(206),w=Object(b.a)((function(e){return{link:{textDecoration:"none"},group:{margin:e.spacing(1),marginTop:e.spacing(1),marginBottom:e.spacing(1),background:"#9CDEE0"}}})),I=function(e){var t=e.groups,a=w();return t&&0!==t.length?Object(x.jsx)(v.a,{container:!0,direction:"column",children:t.map((function(e){return Object(x.jsx)(v.a,{item:!0,children:Object(x.jsxs)(y.a,{className:a.group,children:[Object(x.jsx)(k.a,{title:e.name,titleTypographyProps:{variant:"h5"}}),Object(x.jsx)(C.a,{children:Object(x.jsx)(g.b,{className:a.link,to:"groups/".concat(e.gid,"/posts"),children:Object(x.jsx)(S.a,{children:"View Group"})},e.gid)})]})},e.gid)}))}):Object(x.jsx)(u.a,{variant:"h5",children:"No groups."})},N=a(9),B=a.n(N),T=a(225),E=Object(b.a)((function(e){return{button:{backgroundColor:"#9CDEE0","&:hover":{backgroundColor:"#66CACC",borderColor:"#0062cc",boxShadow:"none"},"&:active":{boxShadow:"none",backgroundColor:"#66CACC",borderColor:"#005cbf"}},group:{margin:e.spacing(1),marginTop:e.spacing(1),marginBottom:e.spacing(1),background:"#9CDEE0"}}}));var A=function(e){var t=E(),a=e.isLoading,c=e.setNewGroup,o=Object(n.useState)(""),r=Object(s.a)(o,2),i=r[0],l=r[1];return a?Object(x.jsx)("div",{}):Object(x.jsx)("div",{children:Object(x.jsx)("form",{style:{margin:"50px"},children:Object(x.jsxs)(v.a,{container:!0,direction:"column",alignItems:"center",justify:"center",children:[Object(x.jsx)(u.a,{variant:"h6",style:{margin:"10px"},children:"Create a new group"}),Object(x.jsx)(T.a,{onChange:function(e){l(e.target.value)},value:i,label:"Group name",variant:"outlined",required:!0,style:{margin:"5px"}}),Object(x.jsx)(S.a,{className:t.button,onClick:function(){var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);B.a.post("http://localhost:3001/api/groups",{groupName:i}).then((function(){c(!0)})).catch((function(e){console.error(e)}))},variant:"contained",style:{margin:"5px"},children:"Create group"})]})})})};var D=function(){var e=f(I),t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)(null),i=Object(s.a)(r,2),l=i[0],j=i[1],u=Object(n.useState)(!1),h=Object(s.a)(u,2),b=h[0],p=h[1];return Object(n.useEffect)((function(){o({loading:!0}),p(!0);var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);B.a.get("http://localhost:3001/api/groups").then((function(e){o(!1),j(e.data)})),p(!1)}),[o,j,p,b]),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(A,{isLoading:c,setNewGroup:p}),Object(x.jsx)(e,{isLoading:c,groups:l})]})},L=a(229),_=a(210),P=a(230),F=a(228),z=a(75),W=a.n(z),R=a(209),G=a(224),M=a(79),U={width:"400px",height:"400px"};function q(e){var t=c.a.useState(null),a=Object(s.a)(t,2),n=a[0],o=a[1],r=Boolean(n),i=r?"simple-popover":void 0,l={lat:e.lat,lng:e.lng};return Object(x.jsxs)("div",{children:[Object(x.jsx)(R.a,{"aria-describedby":i,variant:"contained",onClick:function(e){o(e.currentTarget)},children:Object(x.jsx)(W.a,{})}),Object(x.jsx)(F.a,{id:i,open:r,anchorEl:n,onClose:function(){o(null)},anchorOrigin:{vertical:"center",horizontal:"right"},transformOrigin:{vertical:"center",horizontal:"left"},children:Object(x.jsx)(G.a,{width:400,height:400,children:Object(x.jsx)(M.b,{googleMapsApiKey:"AIzaSyB4Iv8u8OXePZpv5XXqn_4ek328YsOyw9o",mapIds:["ae84a393d0289081"],children:Object(x.jsx)(M.a,{clickableIcons:!1,mapContainerStyle:U,center:l,zoom:10,options:{mapId:"ae84a393d0289081"},children:Object(x.jsx)(M.c,{position:l})})})})})]})}var V=a(86),J=Object(b.a)((function(e){return{postFeed:{},post:{backgroundColor:"#9CDEE0",padding:e.spacing(2,2,2,2),marginBottom:e.spacing(1)},comment:{backgroundColor:"#E2F5F7",marginTop:e.spacing(1),marginBottom:e.spacing(2)},commentbox:{primaryColor:"#E2F5F7",marginTop:e.spacing(1),marginBottom:e.spacing(2)},geopopup:{marginLeft:"auto"},link:{textDecoration:"none"},chip:{background:"#E2F5F7",marginTop:e.spacing(1),marginLeft:e.spacing(1)}}})),X=function(e){var t=e.group,a=J();return t?Object(x.jsx)(v.a,{container:!0,direction:"column",wrap:"nowrap",children:0===t.posts.length?Object(x.jsx)(u.a,{children:"No posts"}):t.posts.map((function(e){return Object(x.jsx)("div",{children:Object(x.jsx)(v.a,{item:!0,children:Object(x.jsx)(y.a,{className:a.post,children:Object(x.jsx)(v.a,{container:!0,direction:"row",justify:"space-between",children:Object(x.jsxs)(v.a,{item:!0,children:[e.author?Object(x.jsx)(k.a,{avatar:Object(x.jsx)(L.a,{src:e.author.avatar_path,alt:e.author.username}),title:e.author.username,titleTypographyProps:{variant:"h5"},subheader:V.unixToStr(e.date_time)}):Object(x.jsx)(k.a,{title:"Deleted",titleTypographyProps:{variant:"h5"},subheader:V.unixToStr(e.date_time)}),Object(x.jsxs)(_.a,{children:[Object(x.jsx)(u.a,{variant:"body2",children:e.body}),e.categories.map((function(e){return Object(x.jsx)(P.a,{className:a.chip,label:e.type})}))]}),Object(x.jsxs)(C.a,{children:[Object(x.jsx)(g.b,{className:a.link,to:"post/"+e.pid,children:Object(x.jsx)(S.a,{children:"View Post"})},e.pid),Object(x.jsx)(q,{lat:parseInt(e.geo_tag.split(" ")[0]),lng:parseInt(e.geo_tag.split(" ")[1])})]})]})})})})},e.pid)}))}):Object(x.jsx)("p",{children:"No group."})},H=a(117),K=a(211),Y=a(212),Z=a(213),Q=a(214),$=a(215),ee=a(89),te=a.n(ee);var ae=function(e){var t=e.createPost,a=Object(b.a)((function(e){return{fab:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)},chip:{marginLeft:e.spacing(1),marginBottom:e.spacing(1)}}}))(),c=Object(n.useState)({loaded:!1,longitude:null,latitude:null}),o=Object(s.a)(c,2),r=o[0],i=o[1],l=Object(n.useState)(!1),j=Object(s.a)(l,2),h=j[0],p=j[1];function g(){navigator.geolocation.getCurrentPosition((function(e){i({loaded:!0,longitude:e.coords.longitude,latitude:e.coords.latitude})}))}Object(n.useEffect)((function(){g()}),[i]);var O=Object(n.useState)(""),m=Object(s.a)(O,2),f=m[0],v=m[1],y=Object(n.useState)([]),k=Object(s.a)(y,2),C=k[0],w=k[1],I=Object(n.useState)(""),N=Object(s.a)(I,2),B=N[0],E=N[1],A=function(){return Object(x.jsx)(R.a,{onClick:function(){var e;""!==(e=B)&&w((function(t){return[].concat(Object(H.a)(t),[e])}))},children:Object(x.jsx)(te.a,{})})};return Object(x.jsxs)(d.a,{children:[Object(x.jsxs)(K.a,{open:h,fullWidth:!0,children:[Object(x.jsx)(Y.a,{children:"Make a post on group"}),Object(x.jsxs)(Z.a,{children:[Object(x.jsxs)(u.a,{variant:"body1",children:["Lat: ",r.latitude,", Lon: ",r.longitude]}),Object(x.jsx)(T.a,{autoFocus:!0,margin:"normal",fullWidth:!0,multiline:!0,variant:"outlined",onChange:function(e){v(e.target.value)}}),Object(x.jsx)("div",{children:C.map((function(e){return Object(x.jsx)(P.a,{className:a.chip,label:e,onDelete:function(){return t=e,void w((function(e){return e.filter((function(e){return e!==t}))}));var t}})}))}),Object(x.jsx)("div",{children:Object(x.jsx)(T.a,{error:C.length<3,helperText:"Give at least three categories",variant:"outlined",label:"Category",margin:"dense",onChange:function(e){E(e.target.value)},InputProps:{endAdornment:Object(x.jsx)(A,{})}})})]}),Object(x.jsxs)(Q.a,{children:[Object(x.jsx)(S.a,{onClick:function(){p(!1),g(),t({categories:C,bodyText:f,geoTag:"".concat(r.latitude," ").concat(r.longitude)}),w([]),E("")},disabled:C.length<3,children:"Post"}),Object(x.jsx)(S.a,{onClick:function(){p(!1),w([]),E("")},children:"Cancel"})]})]}),Object(x.jsx)($.a,{className:a.fab,color:"primary",onClick:function(){p(!0),g()},children:Object(x.jsx)(te.a,{})})]})};var ne=function(){var e=f(X),t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)({loading:!1,group:null}),i=Object(s.a)(r,2),l=i[0],j=i[1],u=Object(O.g)().gid;return Object(n.useEffect)((function(){j({loading:!0}),o(!0);var e="http://localhost:3001/api/groups/".concat(u,"/posts"),t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t),B.a.get(e).then((function(e){j({loading:!1,group:{posts:e.data}}),o(!1)})).catch((function(e){j({loading:!1}),console.error(e)})),o(!1)}),[j,o,c,u]),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(e,{isLoading:l.loading,group:l.group}),Object(x.jsx)(ae,{setRefresh:o,createPost:function(e){var t="http://localhost:3001/api/groups/".concat(u,"/posts"),a=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(a),B.a.post(t,e).then((function(e){console.log(e),o(!0)}))}})]})},ce="http://localhost:3001/api",oe={Accept:"application/json","Content-Type":"application/json"};var re=a(90),ie=a(216),se=a(226),le=function(e){var t=e.setLoggedIn,a=Object(n.useState)(""),c=Object(s.a)(a,2),o=c[0],r=c[1],i=Object(n.useState)(""),l=Object(s.a)(i,2),j=l[0],h=l[1],b=Object(n.useState)(!1),p=Object(s.a)(b,2),O=p[0],m=p[1];return Object(x.jsx)(d.a,{children:Object(x.jsxs)(re.a,{elevation:5,style:{padding:10},children:[Object(x.jsx)(u.a,{variant:"h4",children:"Login"}),Object(x.jsx)(T.a,{label:"Username",placeholder:"Enter username",value:o,onChange:function(e){r(e.target.value)},fullWidth:!0,required:!0}),Object(x.jsx)(T.a,{label:"Password",placeholder:"Enter password",type:"password",value:j,onChange:function(e){h(e.target.value)},fullWidth:!0,required:!0}),Object(x.jsx)(ie.a,{control:Object(x.jsx)(se.a,{name:"checkedB",color:"primary",checked:O,onChange:function(e){m(e.target.checked)}}),label:"Remember me"}),Object(x.jsx)(S.a,{type:"submit",color:"primary",variant:"contained",onClick:function(){!function(e,t,a,n){B.a.post("".concat(ce,"/login"),{auth:{username:e,password:t,rememberMe:a}},{headers:oe}).then((function(e){var t=e.data.authtoken,a=e.data.expiresIn;localStorage.setItem("token",t),localStorage.setItem("expiresIn",a),console.log("Successfully logged in")})).then((function(){n(!0)})).catch((function(e){console.error(e),console.error("Failed to log in"),n(!1)}))}(o,j,O,(function(a){a?(t(!0),e.history.push("/global_feed")):e.history.push("/login")}))},fullWidth:!0,children:"Login"}),Object(x.jsxs)(u.a,{variant:"body1",style:{marginTop:10},children:["Don't already have an account?",Object(x.jsx)(g.b,{to:"/register",style:{marginLeft:5},children:"Register here!"})]})]})})},je=function(e){var t=e.setLoggedIn;return Object(x.jsx)(d.a,{children:Object(x.jsxs)(re.a,{elevation:5,style:{padding:10},children:[Object(x.jsx)(u.a,{variant:"h4",children:"Logout"}),Object(x.jsx)(u.a,{children:"Are you sure you'd like to logout?"}),Object(x.jsx)(S.a,{type:"submit",color:"primary",variant:"contained",onClick:function(){!function(e){var t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t),B.a.post("".concat(ce,"/logout")).then((function(t){localStorage.removeItem("token"),localStorage.removeItem("expiresIn"),console.log("Successfully logged out"),e(!0)})).catch((function(t){console.error(t),console.error("Failed to log out"),e(!1)}))}((function(a){t(!1),e.history.push("/")}))},fullWidth:!0,children:"Logout"})]})})};var ue=function(){var e=Object(O.g)().uid,t=Object(n.useState)(null),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)(!1),i=Object(s.a)(r,2),l=i[0],j=i[1];return Object(n.useEffect)((function(){var t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t),B.a.get("http://localhost:3001/api/users/".concat(e)).then((function(e){o(e.data)})),B.a.get("http://localhost:3001/api/friends/".concat(e)).then((function(e){j(e.data.isfriend)}))}),[j,o,e]),Object(x.jsx)(d.a,{children:Object(x.jsxs)(y.a,{children:[Object(x.jsx)(k.a,{avatar:Object(x.jsx)(L.a,{src:c?c.avatar_path:null,alt:c?c.username:null}),title:c?c.username:"not loaded",titleTypographyProps:{variant:"h5"}}),Object(x.jsx)(C.a,{children:Object(x.jsx)(S.a,{color:"primary",onClick:function(){l?function(){var t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t),B.a.delete("http://localhost:3001/api/friends/remove/".concat(e)).then((function(){j(!1)}))}():function(){var t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t),B.a.post("http://localhost:3001/api/friends/add/".concat(e)).then((function(){j(!0)}))}()},children:l?"Remove friend":"Add friend"})})]})})},de=a(227),he=a(217),be=Object(b.a)((function(e){return{profilePicture:{width:e.spacing(15),height:e.spacing(15),marginBottom:e.spacing(2)},passwordButton:{marginTop:e.spacing(2),marginBottom:e.spacing(2)},submitButton:{marginRight:e.spacing(2),marginBottom:e.spacing(2)},deleteButton:{marginRight:e.spacing(2),marginBottom:e.spacing(2)},uploadButton:{marginRight:e.spacing(2),marginBottom:e.spacing(2)}}})),pe=function(e){var t=e.profile,a=e.setRefresh,n=be(),o=c.a.useState(!0),r=Object(s.a)(o,2),i=r[0],l=r[1],j=c.a.useState(!1),h=Object(s.a)(j,2),b=h[0],p=h[1],g=c.a.useState(!1),O=Object(s.a)(g,2),m=O[0],f=O[1],v=c.a.useState(null),y=Object(s.a)(v,2),k=y[0],C=y[1],w=c.a.useState(""),I=Object(s.a)(w,2),N=I[0],E=I[1],A=c.a.useState(""),D=Object(s.a)(A,2),_=D[0],P=D[1],F=c.a.useState(""),z=Object(s.a)(F,2),W=z[0],R=z[1];return t?Object(x.jsx)("div",{children:Object(x.jsxs)(d.a,{children:[Object(x.jsxs)("div",{children:[Object(x.jsx)(L.a,{className:n.profilePicture,src:t.avatar_path}),!i&&Object(x.jsxs)("form",{children:[Object(x.jsx)(de.a,{type:"file",accept:"image/*",onChange:function(e){return C(e.target.files[0])}}),Object(x.jsx)(S.a,{color:"primary",className:n.uploadButton,variant:"contained",onClick:function(){var e=new FormData;e.append("profile_pic",k);var t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t);B.a.post("http://localhost:3001/api/upload-profile-pic",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(){a(!0),console.log("Success")})).catch((function(e){a(!0),console.error(e)}))},children:"Upload Profile Picture"}),Object(x.jsx)(he.a,{})]})]}),Object(x.jsx)(T.a,{label:"User Name",variant:"outlined",defaultValue:t.username,InputProps:{readOnly:i},fullWidth:!0,onChange:function(e){return P(e.target.value)},margin:"normal"}),!i&&Object(x.jsxs)("div",{children:[Object(x.jsx)(S.a,{color:"primary",onClick:function(){var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);""!==_&&null!=_&&B.a.patch("http://localhost:3001/api/update/username",{newUsername:_}).then((function(e){a(!0),console.log(e.status)})).catch((function(e){a(!0),console.error(e),400===e.response.status&&alert("That username is already taken")}))},className:n.uploadButton,variant:"contained",children:"Change username"}),Object(x.jsx)(he.a,{})]}),Object(x.jsx)(T.a,{label:"Email",variant:"outlined",defaultValue:t.email,InputProps:{readOnly:i},fullWidth:!0,type:"email",onChange:function(e){return R(e.target.value)},margin:"normal"}),!i&&Object(x.jsxs)("div",{children:[Object(x.jsx)(S.a,{color:"primary",onClick:function(){var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);""!==W&&null!=W&&B.a.patch("http://localhost:3001/api/update/email",{email:W}).then((function(){a(!0),console.log("Success")})).catch((function(e){a(!0),console.error(e),400===e.response.status&&alert("That email is already taken")}))},className:n.uploadButton,variant:"contained",children:"Change email"}),Object(x.jsx)(he.a,{})]}),Object(x.jsxs)("div",{children:[i&&Object(x.jsx)(S.a,{onClick:function(){return l(!i)},color:"primary",className:n.editButton,variant:"contained",children:"Edit profile"}),!i&&Object(x.jsxs)("div",{children:[Object(x.jsx)(S.a,{color:"primary",onClick:function(){return f(!0)},className:n.passwordButton,variant:"contained",children:"Change password"}),Object(x.jsx)("div",{children:Object(x.jsx)(S.a,{onClick:function(){return p(!0)},variant:"contained",color:"primary",className:n.deleteButton,children:"Delete account"})}),Object(x.jsx)(S.a,{onClick:function(){return l(!i)},className:n.cancelButton,color:"secondary",variant:"contained",children:"Cancel"})]})]}),Object(x.jsxs)(K.a,{open:b,fullWidth:!0,children:[Object(x.jsx)(Y.a,{children:"Are you sure you'd like to delete your account?"}),Object(x.jsx)(Z.a,{children:Object(x.jsx)(u.a,{variant:"body1",children:"Deleting your account is permanent."})}),Object(x.jsxs)(Q.a,{children:[Object(x.jsx)(S.a,{onClick:function(){var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);B.a.delete("http://localhost:3001/api/delete").then((function(){console.log("Success"),window.location.replace("/")})).catch((function(e){a(!0),console.error(e)}))},children:"Delete account"}),Object(x.jsx)(S.a,{onClick:function(){return p(!1)},children:"Cancel"})]})]}),Object(x.jsxs)(K.a,{open:m,fullWidth:!0,children:[Object(x.jsx)(Y.a,{children:"Enter your new password"}),Object(x.jsx)(Z.a,{children:Object(x.jsx)(T.a,{autoFocus:!0,margin:"normal",fullWidth:!0,variant:"outlined",onChange:function(e){E(e.target.value)},type:"password"})}),Object(x.jsxs)(Q.a,{children:[Object(x.jsx)(S.a,{onClick:function(){var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);B.a.post("http://localhost:3001/api/update/password",{password:N}).then((function(){a(!0),console.log("Success")})).catch((function(e){a(!0),console.error(e)}))},children:"Change password"}),Object(x.jsx)(S.a,{onClick:function(){return f(!1)},children:"Cancel"})]})]})]})}):Object(x.jsx)("p",{children:"No user."})};var ge=function(){var e=f(pe),t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)({loading:!0,profile:null}),i=Object(s.a)(r,2),l=i[0],j=i[1];return Object(n.useEffect)((function(){j({loading:!0});var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);B.a.get("http://localhost:3001/api/profile").then((function(e){j({loading:!1,profile:e.data})})),o(!1)}),[j,c,o]),Object(x.jsx)("div",{children:Object(x.jsx)(d.a,{children:Object(x.jsx)(e,{isLoading:l.loading,profile:l.profile,setRefresh:o})})})},Oe=a(231),me=a(207),xe=a(171),fe=a(218),ve=a(219),ye=a(112),ke=a.n(ye),Ce=a(108),Se=a.n(Ce),we=a(109),Ie=a.n(we),Ne=a(111),Be=a.n(Ne),Te=a(56),Ee=a.n(Te),Ae=a(110),De=a.n(Ae),Le=Object(b.a)((function(e){return{list:{width:250},link:{textDecoration:"none",color:e.palette.text.primary}}}));function _e(){var e=Le(),t=c.a.useState({isOpen:!1}),a=Object(s.a)(t,2),n=a[0],o=a[1],r=function(e){return function(t){("keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&o({state:n,isOpen:e})}};return Object(x.jsxs)("div",{children:[Object(x.jsx)(R.a,{onClick:r(!0),className:e.menuButton,edge:"start",color:"inherit","aria-label":"menu",children:Object(x.jsx)(ke.a,{})}),Object(x.jsx)(Oe.a,{anchor:"left",open:n.isOpen,onClose:r(!1),children:Object(x.jsx)("div",{className:e.list,role:"presentation",onClick:r(!1),onKeyDown:r(!1),children:Object(x.jsxs)(me.a,{children:[Object(x.jsx)(g.b,{to:"/",className:e.link,children:Object(x.jsxs)(xe.a,{button:!0,children:[Object(x.jsx)(fe.a,{children:Object(x.jsx)(Se.a,{})}),Object(x.jsx)(ve.a,{primary:"Home"})]},"home")}),Object(x.jsx)(g.b,{to:"/global_feed",className:e.link,children:Object(x.jsxs)(xe.a,{button:!0,children:[Object(x.jsx)(fe.a,{children:Object(x.jsx)(W.a,{})}),Object(x.jsx)(ve.a,{primary:"Feed"})]},"global_feed")}),Object(x.jsx)(g.b,{to:"/groups",className:e.link,children:Object(x.jsxs)(xe.a,{button:!0,children:[Object(x.jsx)(fe.a,{children:Object(x.jsx)(Ie.a,{})}),Object(x.jsx)(ve.a,{primary:"Group"})]},"groups")}),Object(x.jsx)(g.b,{to:"/search/groups",className:e.link,children:Object(x.jsxs)(xe.a,{button:!0,children:[Object(x.jsx)(fe.a,{children:Object(x.jsx)(De.a,{})}),Object(x.jsx)(ve.a,{primary:"Search Groups"})]},"search-groups")}),Object(x.jsx)(g.b,{to:"/search/users",className:e.link,children:Object(x.jsxs)(xe.a,{button:!0,children:[Object(x.jsx)(fe.a,{children:Object(x.jsx)(Ee.a,{})}),Object(x.jsx)(ve.a,{primary:"Search Users"})]},"search-users")}),Object(x.jsx)(g.b,{to:"/profile",className:e.link,children:Object(x.jsxs)(xe.a,{button:!0,children:[Object(x.jsx)(fe.a,{children:Object(x.jsx)(Be.a,{})}),Object(x.jsx)(ve.a,{primary:"Profile"})]},"profile")})]})})})]})}var Pe=function(e){var t=e.component,a=Object(m.a)(e,["component"]);return Object(x.jsx)(O.b,Object(i.a)(Object(i.a)({},a),{},{render:function(e){return function(){var e=localStorage.getItem("token"),t=localStorage.getItem("expiresIn");return null!==e&&!((new Date).getTime()-t>=0)}()?Object(x.jsx)(t,Object(i.a)({},e)):Object(x.jsx)(O.a,{to:{pathname:"/",state:{from:e.location}}})}}))},Fe=a(86),ze=Object(b.a)((function(e){return{postFeed:{},post:{margin:e.spacing(1),marginBottom:e.spacing(1),marginRight:e.spacing(1),background:"#9CDEE0"},link:{textDecoration:"none"},chip:{background:"#E2F5F7",marginTop:e.spacing(1),marginLeft:e.spacing(1)}}})),We=function(e){var t=e.posts,a=ze();return console.log(t),t&&0!==t.length?Object(x.jsx)(v.a,{container:!0,direction:"column",wrap:"nowrap",children:t.map((function(e){return Object(x.jsx)("div",{children:Object(x.jsx)(v.a,{item:!0,children:Object(x.jsx)(y.a,{className:a.post,children:Object(x.jsx)(v.a,{container:!0,direction:"row",justify:"space-between",children:Object(x.jsxs)(v.a,{item:!0,children:[e.author?Object(x.jsx)(k.a,{avatar:Object(x.jsx)(L.a,{src:e.author.avatar_path,alt:e.author.username}),title:e.author.username,titleTypographyProps:{variant:"h5"},subheader:Fe.unixToStr(e.date_time)}):Object(x.jsx)(k.a,{title:"Deleted",titleTypographyProps:{variant:"h5"},subheader:Fe.unixToStr(e.date_time)}),Object(x.jsxs)(_.a,{children:[Object(x.jsx)(u.a,{variant:"body2",style:{wordWrap:"break-word"},children:e.body}),e.categories.map((function(e){return Object(x.jsx)(P.a,{className:a.chip,label:e.type},e.cid)}))]}),Object(x.jsxs)(C.a,{children:[Object(x.jsx)(g.b,{className:a.link,to:"post/"+e.pid,children:Object(x.jsx)(S.a,{children:"View Post"})},e.pid),Object(x.jsx)(q,{lat:parseInt(e.geo_tag.split(" ")[0]),lng:parseInt(e.geo_tag.split(" ")[1])})]})]})})})})},e.pid)}))}):Object(x.jsx)(u.a,{variant:"h5",children:"No posts."})},Re=a(118),Ge=a(220);function Me(e){var t=e.sorting,a=e.changeSorting,n=c.a.useState(null),o=Object(s.a)(n,2),r=o[0],i=o[1],l=["time","category","group","user"];return Object(x.jsxs)("div",{children:[Object(x.jsxs)(S.a,{onClick:function(e){i(e.currentTarget)},children:["Sort by: ",t]}),Object(x.jsx)(Re.a,{anchorEl:r,open:Boolean(r),onClose:function(){i(null)},children:l.map((function(e){return Object(x.jsx)(Ge.a,{onClick:function(){return a(e),void i(null)},children:e},l.indexOf(e))}))})]})}var Ue=function(){var e=f(We),t=c.a.useState("time"),a=Object(s.a)(t,2),o=a[0],r=a[1],i=Object(n.useState)({loading:!1,posts:null}),l=Object(s.a)(i,2),j=l[0],h=l[1];return Object(n.useEffect)((function(){h({loading:!0});var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);var t="http://localhost:3001/api/posts/all/".concat(o);B.a.get(t).then((function(e){h({loading:!1,posts:e.data})}))}),[h,o]),Object(x.jsxs)(d.a,{children:[Object(x.jsx)(u.a,{variant:"h4",children:"Global Feed:"}),Object(x.jsx)(Me,{sorting:o,changeSorting:r}),Object(x.jsx)(e,{isLoading:j.loading,posts:j.posts})]})},qe=a(113),Ve=a.n(qe),Je=a(86),Xe=Object(b.a)((function(e){return{post:{backgroundColor:"#9CDEE0",marginBottom:e.spacing(1)},comment:{backgroundColor:"#E2F5F7",marginTop:e.spacing(1),marginBottom:e.spacing(2)},commentbox:{primaryColor:"#E2F5F7",marginTop:e.spacing(1),marginBottom:e.spacing(2)},geopopup:{marginLeft:"auto"},profilePicture:{width:e.spacing(10),height:e.spacing(10)},chip:{background:"#E2F5F7",marginTop:e.spacing(1),marginLeft:e.spacing(1)}}})),He=function(e){var t=e.post,a=e.setRefresh,c=Object(n.useState)(""),o=Object(s.a)(c,2),r=o[0],i=o[1],l=Xe(),j=function(){return Object(x.jsx)(R.a,{onClick:h,children:Object(x.jsx)(Ve.a,{})})},h=function(){var e=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(e);var n="http://localhost:3001/api/posts/".concat(t.pid,"/comments");B.a.post(n,{bodyText:r}).then((function(){a(!0)})).catch((function(e){a(!0),console.error(e)}))};return t?Object(x.jsxs)(d.a,{children:[Object(x.jsx)(y.a,{className:l.post,children:Object(x.jsxs)(v.a,{container:!0,direction:"row",justify:"space-between",children:[Object(x.jsxs)(v.a,{item:!0,children:[t.author?Object(x.jsx)(k.a,{avatar:Object(x.jsx)(L.a,{src:t.author.avatar_path,alt:t.author.username,className:l.profilePicture}),title:t.author.username,titleTypographyProps:{variant:"h5"},subheader:Je.unixToStr(t.date_time)}):Object(x.jsx)(k.a,{title:"Deleted",titleTypographyProps:{variant:"h5"},subheader:Je.unixToStr(t.date_time)}),Object(x.jsxs)(_.a,{children:[Object(x.jsx)(d.a,{children:Object(x.jsx)(u.a,{variant:"body2",children:t.body})}),t.categories.map((function(e){return Object(x.jsx)(P.a,{className:l.chip,label:e.type})}))]})]}),Object(x.jsx)(v.a,{item:!0,children:Object(x.jsx)(C.a,{children:Object(x.jsx)(q,{lat:parseInt(t.geo_tag.split(" ")[0]),lng:parseInt(t.geo_tag.split(" ")[1])})})})]})}),Object(x.jsx)(T.a,{fullWidth:!0,variant:"outlined",label:"Comment",multiline:!0,InputProps:{endAdornment:Object(x.jsx)(j,{})},className:l.commentbox,margin:"dense",onChange:function(e){i(e.target.value)}}),Object(x.jsx)(u.a,{variant:"h5",children:"Comments:"}),Object(x.jsx)(v.a,{container:!0,direction:"column",wrap:"nowrap",children:t.comments.map((function(e){return Object(x.jsx)("div",{children:Object(x.jsx)(v.a,{item:!0,children:Object(x.jsxs)(y.a,{className:l.comment,children:[e.comment_author?Object(x.jsx)(k.a,{avatar:Object(x.jsx)(L.a,{src:e.comment_author.avatar_path,alt:e.comment_author.username}),title:e.comment_author.username,titleTypographyProps:{variant:"h6"},subheader:Je.unixToStr(e.date_time)}):Object(x.jsx)(k.a,{title:"Deleted",titleTypographyProps:{variant:"h5"},subheader:Je.unixToStr(t.date_time)}),Object(x.jsx)(_.a,{children:Object(x.jsx)(u.a,{variant:"body1",children:e.body})})]})})},e.cid)}))})]}):Object(x.jsx)("p",{children:"No post."})};var Ke=function(){var e=f(He),t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)({loading:!1,post:null}),i=Object(s.a)(r,2),l=i[0],j=i[1],u=Object(O.g)().pid;return Object(n.useEffect)((function(){j({loading:!0});var e="http://localhost:3001/api/posts/".concat(u),t=localStorage.getItem("token");B.a.defaults.headers.common.Authorization="Bearer ".concat(t),B.a.get(e).then((function(e){j({loading:!1,post:e.data[0]})})),o(!1)}),[j,u,o,c]),Object(x.jsx)(e,{isLoading:l.loading,post:l.post,setRefresh:o})},Ye=function(e){var t=Object(n.useState)(""),a=Object(s.a)(t,2),c=a[0],o=a[1],r=Object(n.useState)(""),i=Object(s.a)(r,2),l=i[0],j=i[1],h=Object(n.useState)(""),b=Object(s.a)(h,2),p=b[0],O=b[1];return Object(x.jsx)(d.a,{children:Object(x.jsxs)(re.a,{elevation:5,style:{padding:10},children:[Object(x.jsx)(u.a,{variant:"h6",children:"Register"}),Object(x.jsx)(T.a,{label:"Username",placeholder:"Enter username",value:c,onChange:function(e){o(e.target.value)},fullWidth:!0,required:!0}),Object(x.jsx)(T.a,{label:"Email",placeholder:"Enter e-mail address",value:p,onChange:function(e){O(e.target.value)},fullWidth:!0,required:!0}),Object(x.jsx)(T.a,{label:"Password",placeholder:"Enter password",type:"password",value:l,onChange:function(e){j(e.target.value)},fullWidth:!0,required:!0}),Object(x.jsx)(S.a,{style:{marginTop:10,marginBottom:10},type:"submit",color:"primary",variant:"contained",onClick:function(){!function(e,t,a,n){B.a.post("".concat(ce,"/register"),{username:e,password:a,email:t},{headers:oe}).then((function(){n(!0)})).catch((function(e){console.error(e),console.error("Failed to log in"),n(!1)}))}(c,p,l,(function(t){t?e.history.push("/login"):e.history.push("/register")}))},fullWidth:!0,children:"Register"}),Object(x.jsxs)(u.a,{children:["Already have an account?",Object(x.jsx)(g.b,{to:"/login",children:"Login here!"})]})]})})},Ze=Object(b.a)((function(){return{link:{textDecoration:"none",color:"white"},loginbutton:{color:"white"}}})),Qe=function(e){var t=Ze();return e.isLoggedIn?Object(x.jsx)(g.b,{to:"/logout",className:t.link,color:"inherit",children:Object(x.jsx)(S.a,{className:t.loginbutton,children:"Logout"})}):Object(x.jsx)(g.b,{to:"/login",className:t.link,color:"inherit",children:Object(x.jsx)(S.a,{className:t.loginbutton,children:"Login"})})},$e=a(52),et=a(54),tt=a(55),at=a(78),nt=a(76),ct=function(e){Object(at.a)(a,e);var t=Object(nt.a)(a);function a(){var e;Object(et.a)(this,a);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={term:"",output:[],addfriend:"Add friend",removefriend:"Remove friend",friend:"",length:0},e.handleClick=function(){B.a.get("http://localhost:3001/api/users/search/"+e.state.term).then((function(t){return e.setState({output:t.data})}))},e.handleChange=function(t){e.setState(Object($e.a)({},t.target.name,t.target.value))},e}return Object(tt.a)(a,[{key:"render",value:function(){var e=this.state.term;return Object(x.jsxs)(v.a,{container:!0,direction:"row",alignItems:"center",justify:"center",style:{margin:"20px"},children:[Object(x.jsx)(T.a,{size:"small",label:"Search for user",variant:"outlined",name:"term",onChange:this.handleChange,value:e}),Object(x.jsx)(R.a,{onClick:this.handleClick,style:{margin:"5px"},children:Object(x.jsx)(Ee.a,{})}),Object(x.jsx)(v.a,{container:!0,direction:"row",alignItems:"center",justify:"center",children:this.state.output.map((function(e,t){return Object(x.jsx)("div",{children:Object(x.jsx)(y.a,{variant:"outlined",style:{height:"220px",width:"200px",margin:"20px"},children:Object(x.jsxs)(v.a,{container:!0,direction:"column",alignItems:"center",justify:"center",children:[Object(x.jsx)(L.a,{style:{height:"100px",width:"100px",margin:"20px"},src:e.avatar_path}),Object(x.jsx)(u.a,{children:e.username}),Object(x.jsx)(C.a,{children:Object(x.jsx)(g.b,{to:"/viewuser/".concat(e.uid),style:{textDecoration:"none"},children:Object(x.jsx)(S.a,{variant:"contained",color:"primary",size:"small",children:"View profile"})})})]})})},t)}))})]})}}]),a}(n.Component),ot=function(e){Object(at.a)(a,e);var t=Object(nt.a)(a);function a(){var e;Object(et.a)(this,a);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={term:"",output:[]},e.handleClick=function(){B.a.get("http://localhost:3001/api/groups/"+e.state.term).then((function(t){return e.setState({output:t.data})}))},e.handleChange=function(t){e.setState(Object($e.a)({},t.target.name,t.target.value))},e}return Object(tt.a)(a,[{key:"render",value:function(){var e=this.state.term;return Object(x.jsx)("div",{children:Object(x.jsxs)(v.a,{container:!0,direction:"row",alignItems:"center",justify:"center",children:[Object(x.jsx)(T.a,{size:"small",label:"Search for group",variant:"outlined",name:"term",onChange:this.handleChange,value:e}),Object(x.jsx)(R.a,{onClick:this.handleClick,style:{margin:"5px"},children:Object(x.jsx)(Ee.a,{})}),Object(x.jsx)(v.a,{container:!0,direction:"row",alignItems:"center",justify:"center",children:this.state.output.map((function(e,t){return Object(x.jsx)("div",{children:Object(x.jsx)(y.a,{variant:"outlined",style:{height:"80px",width:"150px",margin:"20px",padding:"20px"},children:Object(x.jsxs)(v.a,{container:!0,direction:"column",alignItems:"center",justify:"center",children:[Object(x.jsx)(u.a,{children:e.name}),Object(x.jsx)(C.a,{children:Object(x.jsx)(g.b,{to:"/groups/".concat(e.gid,"/posts"),style:{textDecoration:"none"},children:Object(x.jsx)(S.a,{variant:"contained",color:"primary",size:"small",children:"View group"})})})]})})},t)}))})]})})}}]),a}(n.Component),rt=a(115),it=a.n(rt),st=a(114),lt=a.n(st),jt=Object(h.a)({palette:{primary:{main:lt.a[200]},secondary:{main:it.a[200]}}}),ut=Object(b.a)((function(e){return{root:{flexGrow:1},appBar:{flexGrow:1,color:"white",background:"linear-gradient(45deg, #380137 10%, #1E6A81 90%)"},menuButton:{marginRight:"auto"},title:{flexGrow:1},link:{textDecoration:"none",color:"white"},loginbutton:{color:"white"}}}));var dt=function(){var e=ut(),t=Object(n.useState)(!1),a=Object(s.a)(t,2),c=a[0],o=a[1];return Object(x.jsx)(p.a,{theme:jt,children:Object(x.jsx)("div",{className:e.root,children:Object(x.jsxs)(g.a,{children:[Object(x.jsx)(l.a,{className:e.appBar,position:"fixed",elevation:0,children:Object(x.jsxs)(j.a,{variant:"dense",children:[Object(x.jsx)(_e,{}),Object(x.jsx)(u.a,{variant:"h6",className:e.title,children:"[ GeoNet \ud83c\udf0e ]"}),Object(x.jsx)(Qe,{isLoggedIn:c})]})}),Object(x.jsx)(j.a,{}),Object(x.jsx)("div",{className:"App-body",children:Object(x.jsxs)(O.d,{children:[Object(x.jsx)(O.b,{exact:!0,path:"/register",component:Ye}),Object(x.jsx)(O.b,{exact:!0,path:"/login",render:function(e){return Object(x.jsx)(le,Object(i.a)(Object(i.a)({},e),{},{setLoggedIn:o}))}}),Object(x.jsx)(O.b,{exact:!0,path:"/logout",render:function(e){return Object(x.jsx)(je,Object(i.a)(Object(i.a)({},e),{},{setLoggedIn:o}))}}),Object(x.jsx)(Pe,{exact:!0,path:"/search/users",component:ct}),Object(x.jsx)(Pe,{exact:!0,path:"/search/groups",component:ot}),Object(x.jsx)(Pe,{exact:!0,path:"/creategroup",component:A}),Object(x.jsx)(Pe,{exact:!0,path:"/viewuser/:uid/",component:ue}),Object(x.jsx)(Pe,{exact:!0,path:"/groups",component:D}),Object(x.jsx)(Pe,{exact:!0,path:"/groups/:gid/posts",component:ne}),Object(x.jsx)(Pe,{exact:!0,path:"/groups/:gid/post/:pid/",component:Ke}),Object(x.jsx)(Pe,{exact:!0,path:"/profile",component:ge}),Object(x.jsx)(Pe,{exact:!0,path:"/global_feed",component:Ue}),Object(x.jsx)(Pe,{exact:!0,path:"/post/:pid",component:Ke}),Object(x.jsx)(O.b,{exact:!0,path:"/",children:Object(x.jsx)(d.a,{children:Object(x.jsx)(u.a,{variant:"h4",children:"Welcome to GeoNet!"})})}),Object(x.jsx)(O.b,{path:"*",children:"404 NOT FOUND"})]})})]})})})};r.a.render(Object(x.jsx)(c.a.StrictMode,{children:Object(x.jsx)(dt,{})}),document.getElementById("root"))},86:function(e,t){t.unixToStr=function(e){var t=function(e){var t=e.split(/\D+/);return new Date(Date.UTC(t[0],--t[1],t[2],t[3],t[4],t[5],t[6]))}(e),a=t.getFullYear(),n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()];return t.getDate()+" "+n+" "+a+" at "+t.getHours()+":"+t.getMinutes()}}},[[167,1,2]]]);
//# sourceMappingURL=main.7e1eaf6c.chunk.js.map