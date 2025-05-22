import{initializeApp as oe}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";import{getFirestore as ae,getDoc as O,doc as c,getDocs as X,collection as K,setDoc as h,deleteDoc as q}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";import{getAuth as ne,GoogleAuthProvider as le,onAuthStateChanged as ie,signInWithPopup as W}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function l(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=l(a);fetch(a.href,i)}})();const se={apiKey:"AIzaSyDor9GX8xvhBpzaRlWZxttnfeZXvECXHlA",authDomain:"cortepb-46853.firebaseapp.com",projectId:"cortepb-46853",storageBucket:"cortepb-46853.firebasestorage.app",messagingSenderId:"174579571846",appId:"1:174579571846:web:e2519682b31dac687e0507"},Z=oe(se),d=ae(Z),k=ne(Z),Y=new le,t={boleto15Inicial:document.getElementById("boleto15Inicial"),boleto15Final:document.getElementById("boleto15Final"),boleto30Inicial:document.getElementById("boleto30Inicial"),boleto30Final:document.getElementById("boleto30Final"),boleto1hrInicial:document.getElementById("boleto1hrInicial"),boleto1hrFinal:document.getElementById("boleto1hrFinal"),boletoAllDayInicial:document.getElementById("boletoAllDayInicial"),boletoAllDayFinal:document.getElementById("boletoAllDayFinal"),personaExtra40Inicial:document.getElementById("personaExtra40Inicial"),personaExtra40Final:document.getElementById("personaExtra40Final"),personaExtra60Inicial:document.getElementById("personaExtra60Inicial"),personaExtra60Final:document.getElementById("personaExtra60Final"),calcetasInicial:document.getElementById("calcetasInicial"),calcetasTerminamos:document.getElementById("calcetasTerminamos"),inputFondo:document.getElementById("inputFondo"),tarjetaCredito:document.getElementById("tarjetaCredito"),tarjetaDebito:document.getElementById("tarjetaDebito"),tarjetaAmex:document.getElementById("tarjetaAmex")},m={biciFolioInicial:document.getElementById("biciFolioInicial"),biciFolioFinal:document.getElementById("biciFolioFinal"),biciPenalizacion:document.getElementById("biciPenalizacion")},re=document.getElementById("btnLimpiarInflables"),ce=document.getElementById("btnCopiarInflables"),de=document.getElementById("btnLimpiarBicis"),ue=document.getElementById("btnCopiarBicis"),j=document.getElementById("btnMostrarInflables"),U=document.getElementById("btnMostrarBicis"),R=document.getElementById("btnMostrarAdmin");function M(){j.classList.remove("active"),U.classList.remove("active"),R.classList.remove("active")}const J=document.getElementById("textoPlanoInflables"),Q=document.getElementById("textoPlanoBicis"),b={boleto15:40,boleto30:70,boleto1hr:120,boletoAllDay:250,personaExtra40:40,personaExtra60:60,calcetas:35};let u=null,$=!1,A={},I=!1;function me(){W(k,Y).then(o=>{u=o.user.uid,console.log("Usuario logueado con Google:",u)}).catch(o=>{console.error("Error en login Google:",o.message)})}ie(k,async o=>{const e=document.querySelector(".login-google-contenedor"),l=document.getElementById("btnRegistrarseConGoogle");if(o){u=o.uid,console.log("Usuario activo:",u);try{const n=await O(c(d,"usuariosAutorizados",u));if(n.exists()){const a=n.data();console.log("Datos del usuario:",a),$=!0,I=a.roles.esAdmin===!0,A=a.roles||{},console.log("✅ Usuario autorizado"),e.style.display="none",l.style.display="none",I?(console.log("👑 Usuario es ADMIN"),document.getElementById("btnMostrarAdmin").style.display="inline-block",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",x(),S()):(document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",document.getElementById("btnMostrarAdmin").style.display="none")}else console.warn("⛔ Usuario NO autorizado"),$=!1,I=!1,A={},e.style.display="none",l.style.display="inline-block",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",document.getElementById("btnMostrarAdmin").style.display="none"}catch(n){console.error("❌ Error obteniendo datos del usuario:",n.message)}}else u=null,$=!1,I=!1,A={},console.log("No hay usuario logueado"),e.style.display="block",l.style.display="none",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",document.getElementById("btnMostrarAdmin").style.display="none"});function be(){W(k,Y).then(async o=>{const e=o.user;console.log("Usuario solicita registro:",e.uid);const l=c(d,"usuariosPendientes",e.uid);await h(l,{correo:e.email,nombre:e.displayName||"Sin nombre",timestamp:new Date}),alert("Registro enviado. Espera a que un administrador confirme tu acceso.")}).catch(o=>{console.error("Error en registro con Google:",o.message)})}async function x(){const o=document.getElementById("listaUsuariosPendientes");o.innerHTML="";const e=await X(K(d,"usuariosPendientes"));if(e.empty){o.innerHTML="<li>No hay usuarios pendientes.</li>";return}e.forEach(async l=>{const n=l.data(),a=document.createElement("li");a.innerHTML=`
      <strong>${n.nombre||"Sin nombre"}</strong> (${n.correo||"Sin correo"})
      <button onclick="autorizarUsuario('${l.id}')">Autorizar</button>
      <button onclick="rechazarUsuario('${l.id}')">Eliminar</button>
    `,o.appendChild(a)})}async function ye(o){const e=await O(c(d,"usuariosPendientes",o));if(!e.exists())return;const l=e.data();await h(c(d,"usuariosAutorizados",o),l),await q(c(d,"usuariosPendientes",o)),alert("✅ Usuario autorizado"),x()}async function pe(o){await q(c(d,"usuariosPendientes",o)),alert("❌ Usuario eliminado"),x()}async function S(){const o=document.getElementById("listaRolesUsuarios");o.innerHTML="Cargando...";const e=await X(K(d,"usuariosAutorizados"));o.innerHTML="",e.forEach(l=>{const n=l.data(),a=l.id,i=n.nombre||"(Sin nombre)",s=n.correo||"(Sin correo)",r=n.roles||{},p=document.createElement("li");p.innerHTML=`
      <strong>${i}</strong> (${s})<br>
      ${Ie(a,r)}
      <hr>
    `,o.appendChild(p)})}function Ie(o,e){const l=["bicis","inflables"];let n="";return l.forEach(a=>{const i=e[a]||{leer:!1,escribir:!1};n+=`
      <div style="margin-bottom: 0.5rem">
        <strong>${a.toUpperCase()}</strong><br>
        <label><input type="checkbox" onchange="cambiarPermiso('${o}', '${a}', 'leer', this.checked)" ${i.leer?"checked":""}> Leer</label>
        <label><input type="checkbox" onchange="cambiarPermiso('${o}', '${a}', 'escribir', this.checked)" ${i.escribir?"checked":""}> Escribir</label>
      </div>
    `}),n}async function ge(o,e,l,n){if(I&&o===u){alert("No puedes cambiar tus propios permisos como administrador."),S();return}const a=c(d,"usuariosAutorizados",o),i=await O(a);if(!i.exists())return;const s=i.data(),r=s.roles||{};r[e]=r[e]||{leer:!1,escribir:!1},r[e][l]=n,await h(a,{...s,roles:r}),alert("✅ Permisos actualizados para "+o)}window.cargarRolesUsuarios=S;window.cambiarPermiso=ge;window.cargarUsuariosPendientes=x;window.autorizarUsuario=ye;window.rechazarUsuario=pe;window.loginConGoogle=me;function _(o){if(!u)return alert("⛔ Debes iniciar sesión para guardar."),!1;if(!$)return alert("🕒 Tu cuenta está en revisión. Espera autorización del administrador."),!1;if(I)return!0;const e=A[o];return!e||!e.escribir?(alert("⛔ No tienes permisos para guardar en esta área: "+o),!1):!0}function y(o,e){const l=Number(o),n=Number(e);return o===""||e===""||isNaN(l)||isNaN(n)||n<l?0:n-l+1}function T(){const o=new Date().toLocaleDateString("es-ES"),e=y(t.boleto15Inicial.value,t.boleto15Final.value),l=e*b.boleto15,n=y(t.boleto30Inicial.value,t.boleto30Final.value),a=n*b.boleto30,i=y(t.boleto1hrInicial.value,t.boleto1hrFinal.value),s=i*b.boleto1hr,r=y(t.boletoAllDayInicial.value,t.boletoAllDayFinal.value),p=r*b.boletoAllDay,g=y(t.personaExtra40Inicial.value,t.personaExtra40Final.value),D=g*b.personaExtra40,E=y(t.personaExtra60Inicial.value,t.personaExtra60Final.value),L=E*b.personaExtra60,C=Number(t.calcetasInicial.value),P=Number(t.calcetasTerminamos.value),w=!isNaN(C)&&!isNaN(P)?C-P:0,z=w*b.calcetas,f=Number(t.tarjetaCredito.value)||0,v=Number(t.tarjetaDebito.value)||0,B=Number(t.tarjetaAmex.value)||0,F=l+a+s+p+D+L,G=F-(f+v+B),H=Number(t.inputFondo.value)||0,V=F+z,te=`*INFLABLES*
  ${o}
  
  *BOLETO 15 min* $40
  Inicial: ${t.boleto15Inicial.value||"---"}
  Final: ${t.boleto15Final.value||"---"}
  Boletos: ${e}
  Total: $${l}
  
  *BOLETO 30 MIN* $70
  Inicial: ${t.boleto30Inicial.value||"---"}
  Final: ${t.boleto30Final.value||"---"}
  Boletos: ${n}
  Total: $${a}
  
  *BOLETO 1HR* $120
  Inicial: ${t.boleto1hrInicial.value||"---"}
  Final: ${t.boleto1hrFinal.value||"---"}
  Boletos: ${i}
  Total: $${s}
  
  *BOLETO ALLDAY* $250
  Inicial: ${t.boletoAllDayInicial.value||"---"}
  Final: ${t.boletoAllDayFinal.value||"---"}
  Boletos: ${r}
  Total: $${p}
  
  *PERSONA EXTRA* $40
  Inicial: ${t.personaExtra40Inicial.value||"---"}
  Final: ${t.personaExtra40Final.value||"---"}
  Boletos: ${g}
  Total: $${D}
  
  *PERSONA EXTRA* $60
  Inicial: ${t.personaExtra60Inicial.value||"---"}
  Final: ${t.personaExtra60Final.value||"---"}
  Boletos: ${E}
  Total: $${L}
  
  *Tarjeta*
  Crédito: $${f}
  Débito: $${v}
  Amex: $${B}
  Total: $${f+v+B}
  
  *Efectivo:* $${G}
  
  *Total venta:* $${F}
  *Total de boletos:* ${e+n+i+r+g+E}
  
  *Global:* $${V}
  
  *CALCETAS*
  Iniciamos: ${t.calcetasInicial.value||"---"}
  Terminamos: ${t.calcetasTerminamos.value||"---"}
  Vendidas: ${w}
  Total: $${z}
  
  *Fondo:* $${H}
  `;return J.textContent=te,{fechaHoy:o,fondo:H,calcetasInicial:C,calcetasFinal:P,calcetasVendidas:w,calcetasTotal:z,tarjetaCreditoNum:f,tarjetaDebitoNum:v,tarjetaAmexNum:B,totalTarjetas:f+v+B,efectivoCalculado:G,totalVentas:F,totalBoletos:e+n+i+r+g+E,boleto15Inicial:t.boleto15Inicial.value,boleto15Final:t.boleto15Final.value,boleto15Boletos:e,boleto15Total:l,boleto30Inicial:t.boleto30Inicial.value,boleto30Final:t.boleto30Final.value,boleto30Boletos:n,boleto30Total:a,boleto1hrInicial:t.boleto1hrInicial.value,boleto1hrFinal:t.boleto1hrFinal.value,boleto1hrBoletos:i,boleto1hrTotal:s,boletoAllDayInicial:t.boletoAllDayInicial.value,boletoAllDayFinal:t.boletoAllDayFinal.value,boletoAllDayBoletos:r,boletoAllDayTotal:p,personaExtra40Inicial:t.personaExtra40Inicial.value,personaExtra40Final:t.personaExtra40Final.value,personaExtra40Boletos:g,personaExtra40Total:D,personaExtra60Inicial:t.personaExtra60Inicial.value,personaExtra60Final:t.personaExtra60Final.value,personaExtra60Boletos:E,personaExtra60Total:L,globalTotal:V}}function N(){const o=new Date().toLocaleDateString("es-ES"),e=m.biciFolioInicial.value,l=m.biciFolioFinal.value,n=Number(m.biciPenalizacion.value)||0,a=y(e,l)||0,i=`*Bi-Bikes*
  ${o}
  Folio inicial: ${m.biciFolioInicial.value||"---"}
  Folio final: ${m.biciFolioFinal.value||"---"}
  Penalización: ${n}
  Total bicis: ${a}
  `;return Q.textContent=i,{fechaHoy:o,biciFolioInicialNum:e,biciFolioFinalNum:l,biciPenalizacionNum:n,totalBicis:a}}function Ee(){Object.values(t).forEach(o=>o.value=""),T()}function fe(){Object.values(m).forEach(o=>o.value=""),N()}function ee(o){navigator.clipboard.writeText(o).then(()=>{alert("Texto copiado al portapapeles")})}async function ve(o){const e=T(),l={fecha:e.fechaHoy,fondo:t.inputFondo.value||"0",calcetas:{inicial:t.calcetasInicial.value||"0",final:t.calcetasTerminamos.value||"0",vendidas:e.calcetasVendidas,total:e.calcetasTotal},tarjetas:{credito:e.tarjetaCreditoNum,debito:e.tarjetaDebitoNum,amex:e.tarjetaAmexNum,totalTarjetas:e.tarjetaCreditoNum+e.tarjetaDebitoNum+e.tarjetaAmexNum},efectivo:e.efectivoCalculado,totalVentas:e.totalVentas,totalBoletos:e.totalBoletos,global:e.globalTotal,boletos:{boleto15:{inicial:t.boleto15Inicial.value||"0",final:t.boleto15Final.value||"0",cantidad:e.boleto15Boletos,total:e.boleto15Total},boleto30:{inicial:t.boleto30Inicial.value||"0",final:t.boleto30Final.value||"0",cantidad:e.boleto30Boletos,total:e.boleto30Total},boleto1hr:{inicial:t.boleto1hrInicial.value||"0",final:t.boleto1hrFinal.value||"0",cantidad:e.boleto1hrBoletos,total:e.boleto1hrTotal},boletoAllDay:{inicial:t.boletoAllDayInicial.value||"0",final:t.boletoAllDayFinal.value||"0",cantidad:e.boletoAllDayBoletos,total:e.boletoAllDayTotal},personaExtra40:{inicial:t.personaExtra40Inicial.value||"0",final:t.personaExtra40Final.value||"0",cantidad:e.personaExtra40Boletos,total:e.personaExtra40Total},personaExtra60:{inicial:t.personaExtra60Inicial.value||"0",final:t.personaExtra60Final.value||"0",cantidad:e.personaExtra60Boletos,total:e.personaExtra60Total}}};try{const n=c(d,"usuarios",o),a=new Date().toISOString().split("T")[0],i=c(n,"cortes",a);await h(i,{inflables:l},{merge:!0}),alert("Corte de inflables guardado correctamente")}catch(n){console.error("Error al guardar corte inflables:",n)}}async function Be(o){const e=N(),l={fecha:e.fechaHoy,folioInicial:m.biciFolioInicial.value||"0",folioFinal:m.biciFolioFinal.value||"0",penalizacion:e.biciPenalizacionNum,totalBicis:e.totalBicis};try{const n=c(d,"usuarios",o),a=new Date().toISOString().split("T")[0],i=c(n,"cortes",a);await h(i,{bicis:l},{merge:!0}),alert("Corte de bicis guardado correctamente")}catch(n){console.error("Error al guardar corte bicis:",n)}}Object.values(t).forEach(o=>{o.addEventListener("input",T)});Object.values(m).forEach(o=>{o.addEventListener("input",N)});re.addEventListener("click",Ee);de.addEventListener("click",fe);ce.addEventListener("click",()=>ee(J.textContent));ue.addEventListener("click",()=>ee(Q.textContent));j.addEventListener("click",()=>{document.getElementById("seccionInflables").style.display="block",document.getElementById("seccionBicis").style.display="none",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",M(),j.classList.add("active")});U.addEventListener("click",()=>{document.getElementById("seccionInflables").style.display="none",document.getElementById("seccionBicis").style.display="block",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",M(),U.classList.add("active")});R.addEventListener("click",()=>{document.getElementById("seccionInflables").style.display="none",document.getElementById("seccionBicis").style.display="none",document.getElementById("panelAdmin").style.display="block",document.getElementById("panelAdminRoles").style.display="block",M(),R.classList.add("active")});document.getElementById("btnGuardarInflables").addEventListener("click",()=>{_("inflables")&&ve(u)});document.getElementById("btnGuardarBicis").addEventListener("click",()=>{_("bicis")&&Be(u)});document.getElementById("btnRegistrarseConGoogle").addEventListener("click",be);T();N();
