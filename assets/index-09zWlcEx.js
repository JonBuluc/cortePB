import{getAuth as de,GoogleAuthProvider as ue,onAuthStateChanged as me,signInWithPopup as Z,signOut as be}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";import{getFirestore as ye,getDoc as T,doc as s,setDoc as x,deleteDoc as J,getDocs as Q,collection as ee}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";import{initializeApp as ge}from"https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Ee={apiKey:"AIzaSyDor9GX8xvhBpzaRlWZxttnfeZXvECXHlA",authDomain:"cortepb-46853.firebaseapp.com",projectId:"cortepb-46853",storageBucket:"cortepb-46853.firebasestorage.app",messagingSenderId:"174579571846",appId:"1:174579571846:web:e2519682b31dac687e0507"},pe=ge(Ee),r=ye(pe),w=de(),oe=new ue;let c=null,h=!1,$={},y=!1;function ve(){return Z(w,oe).then(e=>(c=e.user.uid,console.log("Usuario logueado con Google:",c),c)).catch(e=>{throw console.error("Error en login Google:",e.message),e})}function te(){return Z(w,oe).then(async e=>{const o=e.user;console.log("Usuario solicita registro:",o.uid);const n=s(r,"usuariosPendientes",o.uid);await x(n,{correo:o.email,nombre:o.displayName||"Sin nombre",timestamp:new Date}),alert("Registro enviado. Espera a que un administrador confirme tu acceso.")}).catch(e=>{throw console.error("Error en registro con Google:",e.message),e})}function fe(e){return me(w,async o=>{var n;if(o){c=o.uid;try{const t=await T(s(r,"usuariosAutorizados",c));if(t.exists()){const a=t.data();h=!0,y=((n=a.roles)==null?void 0:n.esAdmin)===!0,$=a.roles||{}}else h=!1,y=!1,$={}}catch(t){console.error("Error obteniendo datos del usuario:",t.message)}}else c=null,h=!1,y=!1,$={};e(o,{usuarioID:c,usuarioAutorizado:h,esAdmin:y,usuarioRoles:$})})}async function Be(){return(await Q(ee(r,"usuariosPendientes"))).docs.map(o=>({id:o.id,...o.data()}))}async function Ie(e){const o=await T(s(r,"usuariosPendientes",e));if(!o.exists())return!1;const n=o.data();return await x(s(r,"usuariosAutorizados",e),n),await J(s(r,"usuariosPendientes",e)),!0}async function he(e){return await J(s(r,"usuariosPendientes",e)),!0}async function $e(){return(await Q(ee(r,"usuariosAutorizados"))).docs.map(o=>({id:o.id,...o.data()}))}async function xe(e,o,n,t){if(y&&e===c)throw new Error("No puedes cambiar tus propios permisos como administrador.");const a=s(r,"usuariosAutorizados",e),i=await T(a);if(!i.exists())return!1;const l=i.data(),d=l.roles||{};return d[o]=d[o]||{leer:!1,escribir:!1},d[o][n]=t,await x(a,{...l,roles:d}),!0}function ae(e){if(!c)return alert("⛔ Debes iniciar sesión para guardar."),!1;if(!h)return alert("🕒 Tu cuenta está en revisión. Espera autorización del administrador."),!1;if(y)return!0;const o=$[e];return!o||!o.escribir?(alert("⛔ No tienes permisos para guardar en esta área: "+e),!1):!0}function Fe(){be(w).then(()=>{console.log("Sesión cerrada correctamente"),alert("Se cerro la sesión")}).catch(e=>{console.error("Error al cerrar sesión:",e)})}const D={boleto15Inicial:document.getElementById("boleto15Inicial"),boleto15Final:document.getElementById("boleto15Final"),boleto30Inicial:document.getElementById("boleto30Inicial"),boleto30Final:document.getElementById("boleto30Final"),boleto1hrInicial:document.getElementById("boleto1hrInicial"),boleto1hrFinal:document.getElementById("boleto1hrFinal"),boletoAllDayInicial:document.getElementById("boletoAllDayInicial"),boletoAllDayFinal:document.getElementById("boletoAllDayFinal"),personaExtra40Inicial:document.getElementById("personaExtra40Inicial"),personaExtra40Final:document.getElementById("personaExtra40Final"),personaExtra60Inicial:document.getElementById("personaExtra60Inicial"),personaExtra60Final:document.getElementById("personaExtra60Final"),calcetasInicial:document.getElementById("calcetasInicial"),calcetasTerminamos:document.getElementById("calcetasTerminamos"),inputFondo:document.getElementById("inputFondo"),tarjetaCredito:document.getElementById("tarjetaCredito"),tarjetaDebito:document.getElementById("tarjetaDebito"),tarjetaAmex:document.getElementById("tarjetaAmex")},P={biciFolioInicial:document.getElementById("biciFolioInicial"),biciFolioFinal:document.getElementById("biciFolioFinal"),biciPenalizacion:document.getElementById("biciPenalizacion")},u={boleto15:40,boleto30:70,boleto1hr:120,boletoAllDay:250,personaExtra40:40,personaExtra60:60,calcetas:35};async function ne(e){const o=await T(s(r,"usuariosAutorizados",e));return o.exists()?o.data().nombre||"Sin nombre":"Usuario desconocido"}function m(e,o){const n=Number(e),t=Number(o);return e===""||o===""||isNaN(n)||isNaN(t)||t<n?0:t-n+1}function ie(e){const o=new Date().toLocaleDateString("es-ES"),n=m(e.boleto15Inicial.value,e.boleto15Final.value),t=n*u.boleto15,a=m(e.boleto30Inicial.value,e.boleto30Final.value),i=a*u.boleto30,l=m(e.boleto1hrInicial.value,e.boleto1hrFinal.value),d=l*u.boleto1hr,E=m(e.boletoAllDayInicial.value,e.boletoAllDayFinal.value),U=E*u.boletoAllDay,p=m(e.personaExtra40Inicial.value,e.personaExtra40Final.value),N=p*u.personaExtra40,v=m(e.personaExtra60Inicial.value,e.personaExtra60Final.value),C=v*u.personaExtra60,z=Number(e.calcetasInicial.value),S=Number(e.calcetasTerminamos.value),j=!isNaN(z)&&!isNaN(S)?z-S:0,O=j*u.calcetas,f=Number(e.tarjetaCredito.value)||0,B=Number(e.tarjetaDebito.value)||0,I=Number(e.tarjetaAmex.value)||0,F=t+i+d+U+N+C,_=F-(f+B+I),q=Number(e.inputFondo.value)||0,K=F+O;return{textoPlano:`*INFLABLES*
  ${o}
  
  *BOLETO 15 min* $40
  Inicial: ${e.boleto15Inicial.value||"---"}
  Final: ${e.boleto15Final.value||"---"}
  Boletos: ${n}
  Total: $${t}
  
  *BOLETO 30 MIN* $70
  Inicial: ${e.boleto30Inicial.value||"---"}
  Final: ${e.boleto30Final.value||"---"}
  Boletos: ${a}
  Total: $${i}
  
  *BOLETO 1HR* $120
  Inicial: ${e.boleto1hrInicial.value||"---"}
  Final: ${e.boleto1hrFinal.value||"---"}
  Boletos: ${l}
  Total: $${d}
  
  *BOLETO ALLDAY* $250
  Inicial: ${e.boletoAllDayInicial.value||"---"}
  Final: ${e.boletoAllDayFinal.value||"---"}
  Boletos: ${E}
  Total: $${U}
  
  *PERSONA EXTRA* $40
  Inicial: ${e.personaExtra40Inicial.value||"---"}
  Final: ${e.personaExtra40Final.value||"---"}
  Boletos: ${p}
  Total: $${N}
  
  *PERSONA EXTRA* $60
  Inicial: ${e.personaExtra60Inicial.value||"---"}
  Final: ${e.personaExtra60Final.value||"---"}
  Boletos: ${v}
  Total: $${C}
  
  *Tarjeta*
  Crédito: $${f}
  Débito: $${B}
  Amex: $${I}
  Total: $${f+B+I}
  
  *Efectivo:* $${_}
  
  *Total venta:* $${F}
  *Total de boletos:* $${n+a+l+E+p+v}
  
  *Global:* $${K}
  
  *CALCETAS*
  Iniciamos: ${e.calcetasInicial.value||"---"}
  Terminamos: ${e.calcetasTerminamos.value||"---"}
  Vendidas: ${j}
  Total: $${O}
  
  *Fondo:* $${q}
  `,datos:{fechaHoy:o,fondo:q,calcetasInicial:z,calcetasFinal:S,calcetasVendidas:j,calcetasTotal:O,tarjetaCreditoNum:f,tarjetaDebitoNum:B,tarjetaAmexNum:I,totalTarjetas:f+B+I,efectivoCalculado:_,totalVentas:F,totalBoletos:n+a+l+E+p+v,boleto15Inicial:e.boleto15Inicial.value,boleto15Final:e.boleto15Final.value,boleto15Boletos:n,boleto15Total:t,boleto30Inicial:e.boleto30Inicial.value,boleto30Final:e.boleto30Final.value,boleto30Boletos:a,boleto30Total:i,boleto1hrInicial:e.boleto1hrInicial.value,boleto1hrFinal:e.boleto1hrFinal.value,boleto1hrBoletos:l,boleto1hrTotal:d,boletoAllDayInicial:e.boletoAllDayInicial.value,boletoAllDayFinal:e.boletoAllDayFinal.value,boletoAllDayBoletos:E,boletoAllDayTotal:U,personaExtra40Inicial:e.personaExtra40Inicial.value,personaExtra40Final:e.personaExtra40Final.value,personaExtra40Boletos:p,personaExtra40Total:N,personaExtra60Inicial:e.personaExtra60Inicial.value,personaExtra60Final:e.personaExtra60Final.value,personaExtra60Boletos:v,personaExtra60Total:C,globalTotal:K}}}function le(e){const o=new Date().toLocaleDateString("es-ES"),n=e.biciFolioInicial.value,t=e.biciFolioFinal.value,a=Number(e.biciPenalizacion.value)||0,i=m(n,t)||0;return{textoPlano:`*Bi-Bikes*
  ${o}
  Folio inicial: ${e.biciFolioInicial.value||"---"}
  Folio final: ${e.biciFolioFinal.value||"---"}
  Penalización: ${a}
  Total bicis: ${i}
  `,datos:{fechaHoy:o,biciFolioInicialValor:n,biciFolioFinalValor:t,biciPenalizacionNum:a,totalBicis:i}}}async function Ae(e,o){const n=await ne(e),{datos:t}=ie(o),a={nombreUsuario:n,usuarioId:e,fecha:t.fechaHoy,fondo:t.fondo,calcetas:{inicial:o.calcetasInicial.value||"0",final:o.calcetasTerminamos.value||"0",vendidas:t.calcetasVendidas,total:t.calcetasTotal},tarjetas:{credito:t.tarjetaCreditoNum,debito:t.tarjetaDebitoNum,amex:t.tarjetaAmexNum,totalTarjetas:t.totalTarjetas},efectivo:t.efectivoCalculado,totalVentas:t.totalVentas,totalBoletos:t.totalBoletos,global:t.globalTotal,boletos:{boleto15:{inicial:o.boleto15Inicial.value||"0",final:o.boleto15Final.value||"0",cantidad:t.boleto15Boletos,total:t.boleto15Total},boleto30:{inicial:o.boleto30Inicial.value||"0",final:o.boleto30Final.value||"0",cantidad:t.boleto30Boletos,total:t.boleto30Total},boleto1hr:{inicial:o.boleto1hrInicial.value||"0",final:o.boleto1hrFinal.value||"0",cantidad:t.boleto1hrBoletos,total:t.boleto1hrTotal},boletoAllDay:{inicial:o.boletoAllDayInicial.value||"0",final:o.boletoAllDayFinal.value||"0",cantidad:t.boletoAllDayBoletos,total:t.boletoAllDayTotal},personaExtra40:{inicial:o.personaExtra40Inicial.value||"0",final:o.personaExtra40Final.value||"0",cantidad:t.personaExtra40Boletos,total:t.personaExtra40Total},personaExtra60:{inicial:o.personaExtra60Inicial.value||"0",final:o.personaExtra60Final.value||"0",cantidad:t.personaExtra60Boletos,total:t.personaExtra60Total}},tipoCorte:"inflables",createdAt:new Date},i=s(r,"cortes",new Date().toISOString().split("T")[0]);return await x(i,{inflables:a},{merge:!0}),`${t.fechaHoy}_inflables_${e}`}async function Te(e,o){const n=await ne(e),{datos:t}=le(o),a={nombreUsuario:n,usuarioId:e,fecha:t.fechaHoy,folioInicial:t.biciFolioInicialValor,folioFinal:t.biciFolioFinalValor,penalizacion:t.biciPenalizacionNum,totalBicis:t.totalBicis,tipoCorte:"bicis",createdAt:new Date},i=s(r,"cortes",new Date().toISOString().split("T")[0]);return await x(i,{bicis:a},{merge:!0}),`${t.fechaHoy}_bicis_${e}`}const we=document.getElementById("btnLimpiarInflables"),De=document.getElementById("btnCopiarInflables"),Pe=document.getElementById("btnLimpiarBicis"),Le=document.getElementById("btnCopiarBicis"),Y=document.getElementById("btnMostrarInflables"),V=document.getElementById("btnMostrarBicis");function X(){Y.classList.remove("active"),V.classList.remove("active"),b.classList.remove("active")}const re=document.getElementById("textoPlanoInflables"),ce=document.getElementById("textoPlanoBicis");function g(e){if(e==="inflables"){const{textoPlano:o}=ie(D);re.textContent=o}else if(e==="bicis"){const{textoPlano:o}=le(P);ce.textContent=o}}const k=document.querySelector(".login-google-contenedor"),R=document.getElementById("btnRegistrarseConGoogle"),b=document.getElementById("btnMostrarAdmin"),G=document.getElementById("panelAdmin"),H=document.getElementById("panelAdminRoles"),M=document.getElementById("listaUsuariosPendientes"),W=document.getElementById("listaRolesUsuarios");fe((e,o)=>{e?(console.log("Usuario activo:",o.usuarioID),o.usuarioAutorizado?(k.style.display="none",R.style.display="none",o.esAdmin?(b.style.display="inline-block",L(),A()):(b.style.display="none",G.style.display="none",H.style.display="none")):(console.warn("Usuario NO autorizado"),k.style.display="none",R.style.display="inline-block",b.style.display="none",G.style.display="none",H.style.display="none")):(console.log("No hay usuario logueado"),k.style.display="block",R.style.display="none",b.style.display="none",G.style.display="none",H.style.display="none")});async function L(){const e=await Be();if(M.innerHTML="",e.length===0){M.innerHTML="<li>No hay usuarios pendientes.</li>";return}e.forEach(o=>{const n=document.createElement("li");n.innerHTML=`
      <strong>${o.nombre||"Sin nombre"}</strong> (${o.correo||"Sin correo"})
      <button onclick="autorizarUsuarioYUI('${o.id}')">Autorizar</button>
      <button onclick="rechazarUsuarioYUI('${o.id}')">Eliminar</button>
    `,M.appendChild(n)})}window.autorizarUsuarioYUI=async function(e){await Ie(e)&&(alert("✅ Usuario autorizado"),L())};window.rechazarUsuarioYUI=async function(e){await he(e),alert("❌ Usuario eliminado"),L()};async function A(){const e=await $e();W.innerHTML="",e.forEach(o=>{const n=o.roles||{},t=o.id,a=o.nombre||"(Sin nombre)",i=o.correo||"(Sin correo)",l=document.createElement("li");l.innerHTML=`
      <strong>${a}</strong> (${i})<br>
      ${Ue(t,n)}
      <hr>
    `,W.appendChild(l)})}function Ue(e,o){const n=["bicis","inflables"];let t="";return n.forEach(a=>{const i=o[a]||{leer:!1,escribir:!1};t+=`
      <div style="margin-bottom: 0.5rem">
        <strong>${a.toUpperCase()}</strong><br>
        <label><input type="checkbox" onchange="cambiarPermisoYUI('${e}', '${a}', 'leer', this.checked)" ${i.leer?"checked":""}> Leer</label>
        <label><input type="checkbox" onchange="cambiarPermisoYUI('${e}', '${a}', 'escribir', this.checked)" ${i.escribir?"checked":""}> Escribir</label>
      </div>
    `}),t}window.cambiarPermisoYUI=async function(e,o,n,t){try{await xe(e,o,n,t),alert("✅ Permisos actualizados para "+e),A()}catch(a){alert(a.message),A()}};window.loginConGoogle=ve;window.registrarseConGoogle=te;window.cargarUsuariosPendientesYUI=L;window.cargarRolesUsuariosYUI=A;function Ne(){Object.values(D).forEach(e=>e.value=""),g("inflables")}function Ce(){Object.values(P).forEach(e=>e.value=""),g("bicis")}function se(e){navigator.clipboard.writeText(e).then(()=>{alert("Texto copiado al portapapeles")})}Object.values(D).forEach(e=>{e.addEventListener("input",()=>g("inflables"))});Object.values(P).forEach(e=>{e.addEventListener("input",()=>g("bicis"))});we.addEventListener("click",Ne);Pe.addEventListener("click",Ce);De.addEventListener("click",()=>se(re.textContent));Le.addEventListener("click",()=>se(ce.textContent));Y.addEventListener("click",()=>{document.getElementById("seccionInflables").style.display="block",document.getElementById("seccionBicis").style.display="none",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",X(),Y.classList.add("active")});V.addEventListener("click",()=>{document.getElementById("seccionInflables").style.display="none",document.getElementById("seccionBicis").style.display="block",document.getElementById("panelAdmin").style.display="none",document.getElementById("panelAdminRoles").style.display="none",X(),V.classList.add("active")});b.addEventListener("click",()=>{document.getElementById("seccionInflables").style.display="none",document.getElementById("seccionBicis").style.display="none",document.getElementById("panelAdmin").style.display="block",document.getElementById("panelAdminRoles").style.display="block",X(),b.classList.add("active")});document.getElementById("btnGuardarInflables").addEventListener("click",()=>{ae("inflables")&&(Ae(c,D),alert("Se guardo el corte de inflables en la nube"))});document.getElementById("btnGuardarBicis").addEventListener("click",()=>{ae("bicis")&&(Te(c,P),alert("Se guardo el corte de bicis en la nube"))});document.getElementById("btnRegistrarseConGoogle").addEventListener("click",te);document.getElementById("botonCerrarSesion").addEventListener("click",Fe);g("inflables");g("bicis");
