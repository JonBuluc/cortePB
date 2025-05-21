import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db };

const inputsInflables = {
    boleto15Inicial: document.getElementById('boleto15Inicial'),
    boleto15Final: document.getElementById('boleto15Final'),
    boleto30Inicial: document.getElementById('boleto30Inicial'),
    boleto30Final: document.getElementById('boleto30Final'),
    boleto1hrInicial: document.getElementById('boleto1hrInicial'),
    boleto1hrFinal: document.getElementById('boleto1hrFinal'),
    boletoAllDayInicial: document.getElementById('boletoAllDayInicial'),
    boletoAllDayFinal: document.getElementById('boletoAllDayFinal'),
    personaExtra40Inicial: document.getElementById('personaExtra40Inicial'),
    personaExtra40Final: document.getElementById('personaExtra40Final'),
    personaExtra60Inicial: document.getElementById('personaExtra60Inicial'),
    personaExtra60Final: document.getElementById('personaExtra60Final'),
    calcetasInicial: document.getElementById('calcetasInicial'),
    calcetasTerminamos: document.getElementById('calcetasTerminamos'),
    inputFondo: document.getElementById('inputFondo'),
    tarjetaCredito: document.getElementById('tarjetaCredito'),
    tarjetaDebito: document.getElementById('tarjetaDebito'),
    tarjetaAmex: document.getElementById('tarjetaAmex'),
  };
  
  const inputsBicis = {
    biciFolioInicial: document.getElementById('biciFolioInicial'),
    biciFolioFinal: document.getElementById('biciFolioFinal'),
    biciPenalizacion: document.getElementById('biciPenalizacion'),
  };
  
  const btnLimpiarInflables = document.getElementById('btnLimpiarInflables');
  const btnCopiarInflables = document.getElementById('btnCopiarInflables');
  const btnLimpiarBicis = document.getElementById('btnLimpiarBicis');
  const btnCopiarBicis = document.getElementById('btnCopiarBicis');
  
  const btnMostrarInflables = document.getElementById('btnMostrarInflables');
  const btnMostrarBicis = document.getElementById('btnMostrarBicis');
  
  const seccionInflables = document.getElementById('seccionInflables');
  const seccionBicis = document.getElementById('seccionBicis');
  
  const textoPlanoInflables = document.getElementById('textoPlanoInflables');
  const textoPlanoBicis = document.getElementById('textoPlanoBicis');
  
  const preciosPorTipo = {
    boleto15: 40,
    boleto30: 70,
    boleto1hr: 120,
    boletoAllDay: 250,
    personaExtra40: 40,
    personaExtra60: 60,
    calcetas: 35,
  };

//funcion para tener un userid con google
let usuarioID = null;


function loginConGoogle() {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      usuarioID = user.uid; // <-- AQUÍ GUARDAS EL UID
      console.log("Usuario logueado con Google:", usuarioID);
      // Ya puedes usar usuarioID en tus funciones Firestore
    })
    .catch(error => {
      console.error("Error en login Google:", error.message);
    });
}

onAuthStateChanged(auth, user => {
  if (user) {
    usuarioID = user.uid; // <-- TAMBIÉN LO GUARDAS AQUÍ
    console.log("Usuario activo:", usuarioID);
  } else {
    console.log("No hay usuario logueado");
  }
});

function registrarseConGoogle() {
  signInWithPopup(auth, provider)
    .then(async result => {
      const user = result.user;
      console.log("Usuario solicita registro:", user.uid);

      // Guardar UID y correo en usuariosPendientes
      const referenciaUsuarioPendiente = doc(db, "usuariosPendientes", user.uid);
      await setDoc(referenciaUsuarioPendiente, {
        correo: user.email,
        nombre: user.displayName || "Sin nombre",
        timestamp: new Date()
      });

      alert("Registro enviado. Espera a que un administrador confirme tu acceso.");
    })
    .catch(error => {
      console.error("Error en registro con Google:", error.message);
    });
}

window.loginConGoogle = loginConGoogle;

  
  function calcularBoletos(inicial, final) {
    const inicioNum = Number(inicial);
    const finalNum = Number(final);
    if (
      inicial === '' || final === '' ||
      isNaN(inicioNum) || isNaN(finalNum) ||
      finalNum < inicioNum
    ) {
      return 0;
    }
    return finalNum - inicioNum + 1;
  }
  
  function actualizarTextoPlanoInflables() {
    const fechaHoy = new Date().toLocaleDateString('es-ES');
  
    const boleto15Boletos = calcularBoletos(inputsInflables.boleto15Inicial.value, inputsInflables.boleto15Final.value);
    const boleto15Total = boleto15Boletos * preciosPorTipo.boleto15;
  
    const boleto30Boletos = calcularBoletos(inputsInflables.boleto30Inicial.value, inputsInflables.boleto30Final.value);
    const boleto30Total = boleto30Boletos * preciosPorTipo.boleto30;
  
    const boleto1hrBoletos = calcularBoletos(inputsInflables.boleto1hrInicial.value, inputsInflables.boleto1hrFinal.value);
    const boleto1hrTotal = boleto1hrBoletos * preciosPorTipo.boleto1hr;
  
    const boletoAllDayBoletos = calcularBoletos(inputsInflables.boletoAllDayInicial.value, inputsInflables.boletoAllDayFinal.value);
    const boletoAllDayTotal = boletoAllDayBoletos * preciosPorTipo.boletoAllDay;
  
    const personaExtra40Boletos = calcularBoletos(inputsInflables.personaExtra40Inicial.value, inputsInflables.personaExtra40Final.value);
    const personaExtra40Total = personaExtra40Boletos * preciosPorTipo.personaExtra40;
  
    const personaExtra60Boletos = calcularBoletos(inputsInflables.personaExtra60Inicial.value, inputsInflables.personaExtra60Final.value);
    const personaExtra60Total = personaExtra60Boletos * preciosPorTipo.personaExtra60;
  
    const calcetasInicialNum = Number(inputsInflables.calcetasInicial.value);
    const calcetasTerminamosNum = Number(inputsInflables.calcetasTerminamos.value);
    const calcetasVendidas = (!isNaN(calcetasInicialNum) && !isNaN(calcetasTerminamosNum)) ? calcetasInicialNum - calcetasTerminamosNum : 0;
    const calcetasTotal = calcetasVendidas * preciosPorTipo.calcetas;
  
    const tarjetaCreditoNum = Number(inputsInflables.tarjetaCredito.value) || 0;
    const tarjetaDebitoNum = Number(inputsInflables.tarjetaDebito.value) || 0;
    const tarjetaAmexNum = Number(inputsInflables.tarjetaAmex.value) || 0;
  
    const totalVentas =
      boleto15Total +
      boleto30Total +
      boleto1hrTotal +
      boletoAllDayTotal +
      personaExtra40Total +
      personaExtra60Total;
  
    const efectivoCalculado = totalVentas - (tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum);
  
    const fondoNum = Number(inputsInflables.inputFondo.value) || 0;
    const globalTotal = totalVentas + calcetasTotal;

  
    const texto = 
  `*INFLABLES*
  ${fechaHoy}
  
  *BOLETO 15 min* $40
  Inicial: ${inputsInflables.boleto15Inicial.value || '---'}
  Final: ${inputsInflables.boleto15Final.value || '---'}
  Boletos: ${boleto15Boletos}
  Total: $${boleto15Total}
  
  *BOLETO 30 MIN* $70
  Inicial: ${inputsInflables.boleto30Inicial.value || '---'}
  Final: ${inputsInflables.boleto30Final.value || '---'}
  Boletos: ${boleto30Boletos}
  Total: $${boleto30Total}
  
  *BOLETO 1HR* $120
  Inicial: ${inputsInflables.boleto1hrInicial.value || '---'}
  Final: ${inputsInflables.boleto1hrFinal.value || '---'}
  Boletos: ${boleto1hrBoletos}
  Total: $${boleto1hrTotal}
  
  *BOLETO ALLDAY* $250
  Inicial: ${inputsInflables.boletoAllDayInicial.value || '---'}
  Final: ${inputsInflables.boletoAllDayFinal.value || '---'}
  Boletos: ${boletoAllDayBoletos}
  Total: $${boletoAllDayTotal}
  
  *PERSONA EXTRA* $40
  Inicial: ${inputsInflables.personaExtra40Inicial.value || '---'}
  Final: ${inputsInflables.personaExtra40Final.value || '---'}
  Boletos: ${personaExtra40Boletos}
  Total: $${personaExtra40Total}
  
  *PERSONA EXTRA* $60
  Inicial: ${inputsInflables.personaExtra60Inicial.value || '---'}
  Final: ${inputsInflables.personaExtra60Final.value || '---'}
  Boletos: ${personaExtra60Boletos}
  Total: $${personaExtra60Total}
  
  *Tarjeta*
  Crédito: $${tarjetaCreditoNum}
  Débito: $${tarjetaDebitoNum}
  Amex: $${tarjetaAmexNum}
  Total: $${tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum}
  
  *Efectivo:* $${efectivoCalculado}
  
  *Total venta:* $${totalVentas}
  *Total de boletos:* ${boleto15Boletos + boleto30Boletos + boleto1hrBoletos + boletoAllDayBoletos + personaExtra40Boletos + personaExtra60Boletos}
  
  *Global:* $${globalTotal}
  
  *CALCETAS*
  Iniciamos: ${inputsInflables.calcetasInicial.value || '---'}
  Terminamos: ${inputsInflables.calcetasTerminamos.value || '---'}
  Vendidas: ${calcetasVendidas}
  Total: $${calcetasTotal}
  
  *Fondo:* $${fondoNum}
  `;
  
    textoPlanoInflables.textContent = texto;
  
    return {
      fechaHoy,
      fondo: fondoNum,
      calcetasInicial: calcetasInicialNum,
      calcetasFinal: calcetasTerminamosNum,
      calcetasVendidas,
      calcetasTotal,
      tarjetaCreditoNum,
      tarjetaDebitoNum,
      tarjetaAmexNum,
      totalTarjetas: tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum,
      efectivoCalculado,
      totalVentas,
      totalBoletos: boleto15Boletos + boleto30Boletos + boleto1hrBoletos + boletoAllDayBoletos + personaExtra40Boletos + personaExtra60Boletos,
      boleto15Inicial: inputsInflables.boleto15Inicial.value,
      boleto15Final: inputsInflables.boleto15Final.value,
      boleto15Boletos,
      boleto15Total,
      boleto30Inicial: inputsInflables.boleto30Inicial.value,
      boleto30Final: inputsInflables.boleto30Final.value,
      boleto30Boletos,
      boleto30Total,
      boleto1hrInicial: inputsInflables.boleto1hrInicial.value,
      boleto1hrFinal: inputsInflables.boleto1hrFinal.value,
      boleto1hrBoletos,
      boleto1hrTotal,
      boletoAllDayInicial: inputsInflables.boletoAllDayInicial.value,
      boletoAllDayFinal: inputsInflables.boletoAllDayFinal.value,
      boletoAllDayBoletos,
      boletoAllDayTotal,
      personaExtra40Inicial: inputsInflables.personaExtra40Inicial.value,
      personaExtra40Final: inputsInflables.personaExtra40Final.value,
      personaExtra40Boletos,
      personaExtra40Total,
      personaExtra60Inicial: inputsInflables.personaExtra60Inicial.value,
      personaExtra60Final: inputsInflables.personaExtra60Final.value,
      personaExtra60Boletos,
      personaExtra60Total,
      globalTotal
    };
  }
  
  function actualizarTextoPlanoBicis() {
    const fechaHoy = new Date().toLocaleDateString('es-ES');
    const biciFolioInicialNum = inputsBicis.biciFolioInicial.value;
    const biciFolioFinalNum = inputsBicis.biciFolioFinal.value;
    const biciPenalizacionNum = Number(inputsBicis.biciPenalizacion.value) || 0;
  
    const totalBicis = calcularBoletos(biciFolioInicialNum, biciFolioFinalNum) || 0;
  
    const texto = 
  `*Bi-Bikes*
  ${fechaHoy}
  Folio inicial: ${inputsBicis.biciFolioInicial.value || '---'}
  Folio final: ${inputsBicis.biciFolioFinal.value || '---'}
  Penalización: ${biciPenalizacionNum}
  Total bicis: ${totalBicis}
  `;
  
    textoPlanoBicis.textContent = texto;
  
    return {
      fechaHoy,
      biciFolioInicialNum,
      biciFolioFinalNum,
      biciPenalizacionNum,
      totalBicis
    };
  }
  
  function limpiarInflables() {
    Object.values(inputsInflables).forEach(input => (input.value = ''));
    actualizarTextoPlanoInflables();
  }
  
  function limpiarBicis() {
    Object.values(inputsBicis).forEach(input => (input.value = ''));
    actualizarTextoPlanoBicis();
  }
  
  function copiarTextoPlano(texto) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado al portapapeles');
    });
  }
  
// Función para guardar corte inflables
async function guardarCorteInflables(usuarioId) {
    const datos = actualizarTextoPlanoInflables();
  
    const corte = {
      fecha: datos.fechaHoy,
      fondo: inputsInflables.inputFondo.value || '0',
      calcetas: {
        inicial: inputsInflables.calcetasInicial.value || '0',
        final: inputsInflables.calcetasTerminamos.value || '0',
        vendidas: datos.calcetasVendidas,
        total: datos.calcetasTotal
      },
      tarjetas: {
        credito: datos.tarjetaCreditoNum,
        debito: datos.tarjetaDebitoNum,
        amex: datos.tarjetaAmexNum,
        totalTarjetas: datos.tarjetaCreditoNum + datos.tarjetaDebitoNum + datos.tarjetaAmexNum
      },
      efectivo: datos.efectivoCalculado,
      totalVentas: datos.totalVentas,
      totalBoletos: datos.totalBoletos,
      global: datos.globalTotal,
      boletos: {
        boleto15: { inicial: inputsInflables.boleto15Inicial.value || '0', final: inputsInflables.boleto15Final.value || '0', cantidad: datos.boleto15Boletos, total: datos.boleto15Total },
        boleto30: { inicial: inputsInflables.boleto30Inicial.value || '0', final: inputsInflables.boleto30Final.value || '0', cantidad: datos.boleto30Boletos, total: datos.boleto30Total },
        boleto1hr: { inicial: inputsInflables.boleto1hrInicial.value || '0', final: inputsInflables.boleto1hrFinal.value || '0', cantidad: datos.boleto1hrBoletos, total: datos.boleto1hrTotal },
        boletoAllDay: { inicial: inputsInflables.boletoAllDayInicial.value || '0', final: inputsInflables.boletoAllDayFinal.value || '0', cantidad: datos.boletoAllDayBoletos, total: datos.boletoAllDayTotal },
        personaExtra40: { inicial: inputsInflables.personaExtra40Inicial.value || '0', final: inputsInflables.personaExtra40Final.value || '0', cantidad: datos.personaExtra40Boletos, total: datos.personaExtra40Total },
        personaExtra60: { inicial: inputsInflables.personaExtra60Inicial.value || '0', final: inputsInflables.personaExtra60Final.value || '0', cantidad: datos.personaExtra60Boletos, total: datos.personaExtra60Total }
      }
    };
  
    try {
      const docRef = doc(db, "usuarios", usuarioId);
      const fechaKey = new Date().toISOString().split("T")[0];
      const areaRef = doc(docRef, "cortes", fechaKey);
  
      await setDoc(areaRef, { inflables: corte }, { merge: true });
      alert("Corte de inflables guardado correctamente");
    } catch (error) {
      console.error("Error al guardar corte inflables:", error);
    }
  }
  
  // Función para guardar corte bicis
  async function guardarCorteBicis(usuarioId) {
    const datos = actualizarTextoPlanoBicis();
  
    const corte = {
      fecha: datos.fechaHoy,
      folioInicial: inputsBicis.biciFolioInicial.value || '0',
      folioFinal: inputsBicis.biciFolioFinal.value || '0',
      penalizacion: datos.biciPenalizacionNum,
      totalBicis: datos.totalBicis
    };
  
    try {
      const docRef = doc(db, "usuarios", usuarioId);
      const fechaKey = new Date().toISOString().split("T")[0];
      const areaRef = doc(docRef, "cortes", fechaKey);
  
      await setDoc(areaRef, { bicis: corte }, { merge: true });
      alert("Corte de bicis guardado correctamente");
    } catch (error) {
      console.error("Error al guardar corte bicis:", error);
    }
  }
  
  
  // Eventos
  Object.values(inputsInflables).forEach(input => {
    input.addEventListener('input', actualizarTextoPlanoInflables);
  });
  
  Object.values(inputsBicis).forEach(input => {
    input.addEventListener('input', actualizarTextoPlanoBicis);
  });
  
  btnLimpiarInflables.addEventListener('click', limpiarInflables);
  btnLimpiarBicis.addEventListener('click', limpiarBicis);
  
  
  btnCopiarInflables.addEventListener('click', () => copiarTextoPlano(textoPlanoInflables.textContent));
  btnCopiarBicis.addEventListener('click', () => copiarTextoPlano(textoPlanoBicis.textContent));
  
  btnMostrarInflables.addEventListener('click', () => {
    btnMostrarInflables.classList.add('active');
    btnMostrarBicis.classList.remove('active');
    seccionInflables.classList.add('seccionActiva');
    seccionInflables.classList.remove('seccionOculta');
    seccionBicis.classList.remove('seccionActiva');
    seccionBicis.classList.add('seccionOculta');
  });
  
  btnMostrarBicis.addEventListener('click', () => {
    btnMostrarBicis.classList.add('active');
    btnMostrarInflables.classList.remove('active');
    seccionBicis.classList.add('seccionActiva');
    seccionBicis.classList.remove('seccionOculta');
    seccionInflables.classList.remove('seccionActiva');
    seccionInflables.classList.add('seccionOculta');
  });
  
  document.getElementById("btnGuardarInflables").addEventListener("click", () => {
    guardarCorteInflables(usuarioID);
  });
  
  document.getElementById("btnGuardarBicis").addEventListener("click", () => {
    guardarCorteBicis(usuarioID);
  });

  document.getElementById("btnRegistrarseConGoogle").addEventListener("click", registrarseConGoogle);

  
  // Inicializar textos planos
  actualizarTextoPlanoInflables();
  actualizarTextoPlanoBicis();