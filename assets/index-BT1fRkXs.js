import{initializeApp as U}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";import{getFirestore as q,doc as f,setDoc as O}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";import{getAuth as W,GoogleAuthProvider as Z,onAuthStateChanged as Y,signInWithPopup as R}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const J={apiKey:"AIzaSyDor9GX8xvhBpzaRlWZxttnfeZXvECXHlA",authDomain:"cortepb-46853.firebaseapp.com",projectId:"cortepb-46853",storageBucket:"cortepb-46853.firebasestorage.app",messagingSenderId:"174579571846",appId:"1:174579571846:web:e2519682b31dac687e0507"},k=U(J),P=q(k),S=W(k),H=new Z,e={boleto15Inicial:document.getElementById("boleto15Inicial"),boleto15Final:document.getElementById("boleto15Final"),boleto30Inicial:document.getElementById("boleto30Inicial"),boleto30Final:document.getElementById("boleto30Final"),boleto1hrInicial:document.getElementById("boleto1hrInicial"),boleto1hrFinal:document.getElementById("boleto1hrFinal"),boletoAllDayInicial:document.getElementById("boletoAllDayInicial"),boletoAllDayFinal:document.getElementById("boletoAllDayFinal"),personaExtra40Inicial:document.getElementById("personaExtra40Inicial"),personaExtra40Final:document.getElementById("personaExtra40Final"),personaExtra60Inicial:document.getElementById("personaExtra60Inicial"),personaExtra60Final:document.getElementById("personaExtra60Final"),calcetasInicial:document.getElementById("calcetasInicial"),calcetasTerminamos:document.getElementById("calcetasTerminamos"),inputFondo:document.getElementById("inputFondo"),tarjetaCredito:document.getElementById("tarjetaCredito"),tarjetaDebito:document.getElementById("tarjetaDebito"),tarjetaAmex:document.getElementById("tarjetaAmex")},c={biciFolioInicial:document.getElementById("biciFolioInicial"),biciFolioFinal:document.getElementById("biciFolioFinal"),biciPenalizacion:document.getElementById("biciPenalizacion")},Q=document.getElementById("btnLimpiarInflables"),_=document.getElementById("btnCopiarInflables"),ee=document.getElementById("btnLimpiarBicis"),te=document.getElementById("btnCopiarBicis"),C=document.getElementById("btnMostrarInflables"),j=document.getElementById("btnMostrarBicis"),B=document.getElementById("seccionInflables"),y=document.getElementById("seccionBicis"),M=document.getElementById("textoPlanoInflables"),V=document.getElementById("textoPlanoBicis"),s={boleto15:40,boleto30:70,boleto1hr:120,boletoAllDay:250,personaExtra40:40,personaExtra60:60,calcetas:35};let d=null;function oe(){R(S,H).then(o=>{d=o.user.uid,console.log("Usuario logueado con Google:",d)}).catch(o=>{console.error("Error en login Google:",o.message)})}Y(S,o=>{o?(d=o.uid,console.log("Usuario activo:",d)):console.log("No hay usuario logueado")});function ae(){R(S,H).then(async o=>{const t=o.user;console.log("Usuario solicita registro:",t.uid);const n=f(P,"usuariosPendientes",t.uid);await O(n,{correo:t.email,nombre:t.displayName||"Sin nombre",timestamp:new Date}),alert("Registro enviado. Espera a que un administrador confirme tu acceso.")}).catch(o=>{console.error("Error en registro con Google:",o.message)})}window.loginConGoogle=oe;function u(o,t){const n=Number(o),l=Number(t);return o===""||t===""||isNaN(n)||isNaN(l)||l<n?0:l-n+1}function F(){const o=new Date().toLocaleDateString("es-ES"),t=u(e.boleto15Inicial.value,e.boleto15Final.value),n=t*s.boleto15,l=u(e.boleto30Inicial.value,e.boleto30Final.value),a=l*s.boleto30,i=u(e.boleto1hrInicial.value,e.boleto1hrFinal.value),r=i*s.boleto1hr,b=u(e.boletoAllDayInicial.value,e.boletoAllDayFinal.value),$=b*s.boletoAllDay,m=u(e.personaExtra40Inicial.value,e.personaExtra40Final.value),h=m*s.personaExtra40,I=u(e.personaExtra60Inicial.value,e.personaExtra60Final.value),T=I*s.personaExtra60,A=Number(e.calcetasInicial.value),N=Number(e.calcetasTerminamos.value),L=!isNaN(A)&&!isNaN(N)?A-N:0,D=L*s.calcetas,v=Number(e.tarjetaCredito.value)||0,p=Number(e.tarjetaDebito.value)||0,E=Number(e.tarjetaAmex.value)||0,g=n+a+r+$+h+T,w=g-(v+p+E),z=Number(e.inputFondo.value)||0,G=g+D,K=`*INFLABLES*
  ${o}
  
  *BOLETO 15 min* $40
  Inicial: ${e.boleto15Inicial.value||"---"}
  Final: ${e.boleto15Final.value||"---"}
  Boletos: ${t}
  Total: $${n}
  
  *BOLETO 30 MIN* $70
  Inicial: ${e.boleto30Inicial.value||"---"}
  Final: ${e.boleto30Final.value||"---"}
  Boletos: ${l}
  Total: $${a}
  
  *BOLETO 1HR* $120
  Inicial: ${e.boleto1hrInicial.value||"---"}
  Final: ${e.boleto1hrFinal.value||"---"}
  Boletos: ${i}
  Total: $${r}
  
  *BOLETO ALLDAY* $250
  Inicial: ${e.boletoAllDayInicial.value||"---"}
  Final: ${e.boletoAllDayFinal.value||"---"}
  Boletos: ${b}
  Total: $${$}
  
  *PERSONA EXTRA* $40
  Inicial: ${e.personaExtra40Inicial.value||"---"}
  Final: ${e.personaExtra40Final.value||"---"}
  Boletos: ${m}
  Total: $${h}
  
  *PERSONA EXTRA* $60
  Inicial: ${e.personaExtra60Inicial.value||"---"}
  Final: ${e.personaExtra60Final.value||"---"}
  Boletos: ${I}
  Total: $${T}
  
  *Tarjeta*
  Crédito: $${v}
  Débito: $${p}
  Amex: $${E}
  Total: $${v+p+E}
  
  *Efectivo:* $${w}
  
  *Total venta:* $${g}
  *Total de boletos:* ${t+l+i+b+m+I}
  
  *Global:* $${G}
  
  *CALCETAS*
  Iniciamos: ${e.calcetasInicial.value||"---"}
  Terminamos: ${e.calcetasTerminamos.value||"---"}
  Vendidas: ${L}
  Total: $${D}
  
  *Fondo:* $${z}
  `;return M.textContent=K,{fechaHoy:o,fondo:z,calcetasInicial:A,calcetasFinal:N,calcetasVendidas:L,calcetasTotal:D,tarjetaCreditoNum:v,tarjetaDebitoNum:p,tarjetaAmexNum:E,totalTarjetas:v+p+E,efectivoCalculado:w,totalVentas:g,totalBoletos:t+l+i+b+m+I,boleto15Inicial:e.boleto15Inicial.value,boleto15Final:e.boleto15Final.value,boleto15Boletos:t,boleto15Total:n,boleto30Inicial:e.boleto30Inicial.value,boleto30Final:e.boleto30Final.value,boleto30Boletos:l,boleto30Total:a,boleto1hrInicial:e.boleto1hrInicial.value,boleto1hrFinal:e.boleto1hrFinal.value,boleto1hrBoletos:i,boleto1hrTotal:r,boletoAllDayInicial:e.boletoAllDayInicial.value,boletoAllDayFinal:e.boletoAllDayFinal.value,boletoAllDayBoletos:b,boletoAllDayTotal:$,personaExtra40Inicial:e.personaExtra40Inicial.value,personaExtra40Final:e.personaExtra40Final.value,personaExtra40Boletos:m,personaExtra40Total:h,personaExtra60Inicial:e.personaExtra60Inicial.value,personaExtra60Final:e.personaExtra60Final.value,personaExtra60Boletos:I,personaExtra60Total:T,globalTotal:G}}function x(){const o=new Date().toLocaleDateString("es-ES"),t=c.biciFolioInicial.value,n=c.biciFolioFinal.value,l=Number(c.biciPenalizacion.value)||0,a=u(t,n)||0,i=`*Bi-Bikes*
  ${o}
  Folio inicial: ${c.biciFolioInicial.value||"---"}
  Folio final: ${c.biciFolioFinal.value||"---"}
  Penalización: ${l}
  Total bicis: ${a}
  `;return V.textContent=i,{fechaHoy:o,biciFolioInicialNum:t,biciFolioFinalNum:n,biciPenalizacionNum:l,totalBicis:a}}function le(){Object.values(e).forEach(o=>o.value=""),F()}function ie(){Object.values(c).forEach(o=>o.value=""),x()}function X(o){navigator.clipboard.writeText(o).then(()=>{alert("Texto copiado al portapapeles")})}async function ne(o){const t=F(),n={fecha:t.fechaHoy,fondo:e.inputFondo.value||"0",calcetas:{inicial:e.calcetasInicial.value||"0",final:e.calcetasTerminamos.value||"0",vendidas:t.calcetasVendidas,total:t.calcetasTotal},tarjetas:{credito:t.tarjetaCreditoNum,debito:t.tarjetaDebitoNum,amex:t.tarjetaAmexNum,totalTarjetas:t.tarjetaCreditoNum+t.tarjetaDebitoNum+t.tarjetaAmexNum},efectivo:t.efectivoCalculado,totalVentas:t.totalVentas,totalBoletos:t.totalBoletos,global:t.globalTotal,boletos:{boleto15:{inicial:e.boleto15Inicial.value||"0",final:e.boleto15Final.value||"0",cantidad:t.boleto15Boletos,total:t.boleto15Total},boleto30:{inicial:e.boleto30Inicial.value||"0",final:e.boleto30Final.value||"0",cantidad:t.boleto30Boletos,total:t.boleto30Total},boleto1hr:{inicial:e.boleto1hrInicial.value||"0",final:e.boleto1hrFinal.value||"0",cantidad:t.boleto1hrBoletos,total:t.boleto1hrTotal},boletoAllDay:{inicial:e.boletoAllDayInicial.value||"0",final:e.boletoAllDayFinal.value||"0",cantidad:t.boletoAllDayBoletos,total:t.boletoAllDayTotal},personaExtra40:{inicial:e.personaExtra40Inicial.value||"0",final:e.personaExtra40Final.value||"0",cantidad:t.personaExtra40Boletos,total:t.personaExtra40Total},personaExtra60:{inicial:e.personaExtra60Inicial.value||"0",final:e.personaExtra60Final.value||"0",cantidad:t.personaExtra60Boletos,total:t.personaExtra60Total}}};try{const l=f(P,"usuarios",o),a=new Date().toISOString().split("T")[0],i=f(l,"cortes",a);await O(i,{inflables:n},{merge:!0}),alert("Corte de inflables guardado correctamente")}catch(l){console.error("Error al guardar corte inflables:",l)}}async function ce(o){const t=x(),n={fecha:t.fechaHoy,folioInicial:c.biciFolioInicial.value||"0",folioFinal:c.biciFolioFinal.value||"0",penalizacion:t.biciPenalizacionNum,totalBicis:t.totalBicis};try{const l=f(P,"usuarios",o),a=new Date().toISOString().split("T")[0],i=f(l,"cortes",a);await O(i,{bicis:n},{merge:!0}),alert("Corte de bicis guardado correctamente")}catch(l){console.error("Error al guardar corte bicis:",l)}}Object.values(e).forEach(o=>{o.addEventListener("input",F)});Object.values(c).forEach(o=>{o.addEventListener("input",x)});Q.addEventListener("click",le);ee.addEventListener("click",ie);_.addEventListener("click",()=>X(M.textContent));te.addEventListener("click",()=>X(V.textContent));C.addEventListener("click",()=>{C.classList.add("active"),j.classList.remove("active"),B.classList.add("seccionActiva"),B.classList.remove("seccionOculta"),y.classList.remove("seccionActiva"),y.classList.add("seccionOculta")});j.addEventListener("click",()=>{j.classList.add("active"),C.classList.remove("active"),y.classList.add("seccionActiva"),y.classList.remove("seccionOculta"),B.classList.remove("seccionActiva"),B.classList.add("seccionOculta")});document.getElementById("btnGuardarInflables").addEventListener("click",()=>{ne(d)});document.getElementById("btnGuardarBicis").addEventListener("click",()=>{ce(d)});document.getElementById("btnRegistrarseConGoogle").addEventListener("click",ae);F();x();
