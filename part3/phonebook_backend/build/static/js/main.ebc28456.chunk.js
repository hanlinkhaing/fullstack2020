(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=(t(20),t(4)),i=t(2),l=function(e){var n=e.value,t=e.handler;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},s=function(e){var n=e.persons,t=e.deleteHandler,a=function(e){return function(){window.confirm("Delete ".concat(e.name,"?"))&&t(e.id)}};return r.a.createElement("div",null,n.map((function(e){return r.a.createElement("p",{key:e.name},"".concat(e.name," ").concat(e.number)," ",r.a.createElement("button",{onClick:a(e)},"delete"))})))},m=function(e){var n=e.name,t=e.changeName,a=e.number,o=e.changeNumber,c=e.addPerson;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n.newName,onChange:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a.newNumber,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=t(3),f=t.n(d),h=function(){return f.a.get("/api/persons").then((function(e){return e.data}))},b=function(e){return f.a.post("/api/persons",e).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat("/api/persons","/").concat(e)).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat("/api/persons","/").concat(e),n).then((function(e){return e.data}))},E={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:5,marginBottom:10},v={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:5,marginBottom:10},w=function(e){var n=e.message;return r.a.createElement("div",null,n.message?r.a.createElement("p",{style:n.isError?v:E},n.message):r.a.createElement(r.a.Fragment,null))},j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),d=Object(i.a)(c,2),f=d[0],E=d[1],v=Object(a.useState)(""),j=Object(i.a)(v,2),O=j[0],y=j[1],k=Object(a.useState)(""),S=Object(i.a)(k,2),N=S[0],C=S[1],B=Object(a.useState)({isError:!1,message:null}),D=Object(i.a)(B,2),P=D[0],R=D[1];Object(a.useEffect)((function(){h().then((function(e){o(e)}))}),[]);var z=N?t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())})):t,H=function(e){R(e),setTimeout((function(){return R({isError:!1,message:null})}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:P}),r.a.createElement(l,{value:N,handler:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(m,{name:f,changeName:function(e){E(e.target.value)},number:O,changeNumber:function(e){y(e.target.value)},addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===f}));if(n){if(!window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?")))return;p(n.id,Object(u.a)(Object(u.a)({},n),{},{number:O})).then((function(e){o(t.map((function(t){return n.id===t.id?e:t}))),H({isError:!1,message:"Updated ".concat(e.name," with ").concat(e.number)})})).catch((function(e){console.log(e),H({isError:!0,message:"Information of ".concat(n.name," has already been removed from server.")}),o(t.filter((function(e){return n.id!==e.id})))}))}else b({name:f,number:O}).then((function(e){o(t.concat(e)),H(Object(u.a)(Object(u.a)({},P),{},{message:"Added ".concat(e.name)}))}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:z,deleteHandler:function(e){g(e).then((function(){o(t.filter((function(n){return n.id!==e}))),H({isError:!1,message:"Successfully Deleted"})})).catch((function(n){console.log(n),o(t.filter((function(n){return e!==n.id}))),H({isError:!0,message:"Record has already been removed from server."})}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.ebc28456.chunk.js.map