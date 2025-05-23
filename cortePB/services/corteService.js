import { doc, setDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from '../firebase/firebaseConfig.js';

const preciosPorTipo = {
  boleto15: 40,
  boleto30: 70,
  boleto1hr: 120,
  boletoAllDay: 250,
  personaExtra40: 40,
  personaExtra60: 60,
  calcetas: 35,
};

async function obtenerNombreUsuarioAutorizado(usuarioId) {
  const docUsuario = await getDoc(doc(db, "usuariosAutorizados", usuarioId));
  if (!docUsuario.exists()) return "Usuario desconocido";
  const datosUsuario = docUsuario.data();
  return datosUsuario.nombre || "Sin nombre";
}


function calcularBoletos(inicialValor, finalValor) {
  const inicioNum = Number(inicialValor);
  const finalNum = Number(finalValor);
  if (
    inicialValor === "" ||
    finalValor === "" ||
    isNaN(inicioNum) ||
    isNaN(finalNum) ||
    finalNum < inicioNum
  ) {
    return 0;
  }
  return finalNum - inicioNum + 1;
}

function generarTextoPlanoInflables(inputsInflables) {
  const fechaHoy = new Date().toLocaleDateString("es-ES");

  const boleto15Boletos = calcularBoletos(inputsInflables.boleto15Inicial.value,inputsInflables.boleto15Final.value);
  const boleto15Total = boleto15Boletos * preciosPorTipo.boleto15;

  const boleto30Boletos = calcularBoletos(inputsInflables.boleto30Inicial.value,inputsInflables.boleto30Final.value);
  const boleto30Total = boleto30Boletos * preciosPorTipo.boleto30;

  const boleto1hrBoletos = calcularBoletos(inputsInflables.boleto1hrInicial.value,inputsInflables.boleto1hrFinal.value);
  const boleto1hrTotal = boleto1hrBoletos * preciosPorTipo.boleto1hr;

  const boletoAllDayBoletos = calcularBoletos(inputsInflables.boletoAllDayInicial.value,inputsInflables.boletoAllDayFinal.value);
  const boletoAllDayTotal = boletoAllDayBoletos * preciosPorTipo.boletoAllDay;

  const personaExtra40Boletos = calcularBoletos(inputsInflables.personaExtra40Inicial.value,inputsInflables.personaExtra40Final.value);
  const personaExtra40Total = personaExtra40Boletos * preciosPorTipo.personaExtra40;

  const personaExtra60Boletos = calcularBoletos(inputsInflables.personaExtra60Inicial.value,inputsInflables.personaExtra60Final.value);
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

  const efectivoCalculado =
    totalVentas - (tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum);

  const fondoNum = Number(inputsInflables.inputFondo.value) || 0;
  const globalTotal = totalVentas + calcetasTotal;

  const textoPlano =
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
  *Total de boletos:* $${boleto15Boletos + boleto30Boletos + boleto1hrBoletos + boletoAllDayBoletos + personaExtra40Boletos + personaExtra60Boletos}
  
  *Global:* $${globalTotal}
  
  *CALCETAS*
  Iniciamos: ${inputsInflables.calcetasInicial.value || '---'}
  Terminamos: ${inputsInflables.calcetasTerminamos.value || '---'}
  Vendidas: ${calcetasVendidas}
  Total: $${calcetasTotal}
  
  *Fondo:* $${fondoNum}
  `;

  return { textoPlano, datos: {
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
    totalBoletos:
      boleto15Boletos +
      boleto30Boletos +
      boleto1hrBoletos +
      boletoAllDayBoletos +
      personaExtra40Boletos +
      personaExtra60Boletos,
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
  }};
}

function generarTextoPlanoBicis(inputsBicis) {
  const fechaHoy = new Date().toLocaleDateString("es-ES");
  const biciFolioInicialValor = inputsBicis.biciFolioInicial.value;
  const biciFolioFinalValor = inputsBicis.biciFolioFinal.value;
  const biciPenalizacionNum = Number(inputsBicis.biciPenalizacion.value) || 0;

  const totalBicis = calcularBoletos(biciFolioInicialValor, biciFolioFinalValor) || 0;

  const textoPlano =
  `*Bi-Bikes*
  ${fechaHoy}
  Folio inicial: ${inputsBicis.biciFolioInicial.value || '---'}
  Folio final: ${inputsBicis.biciFolioFinal.value || '---'}
  Penalización: ${biciPenalizacionNum}
  Total bicis: ${totalBicis}
  `;

  return {
    textoPlano,
    datos: {
      fechaHoy,
      biciFolioInicialValor,
      biciFolioFinalValor,
      biciPenalizacionNum,
      totalBicis,
    },
  };
}

async function guardarCorteInflables(usuarioId, inputsInflables) {
  const nombreUsuario = await obtenerNombreUsuarioAutorizado(usuarioId);
  const { datos } = generarTextoPlanoInflables(inputsInflables);

  const corteInflables = {
    nombreUsuario,
    usuarioId,
    fecha: datos.fechaHoy,
    fondo: datos.fondo,
    calcetas: {
      inicial: inputsInflables.calcetasInicial.value || "0",
      final: inputsInflables.calcetasTerminamos.value || "0",
      vendidas: datos.calcetasVendidas,
      total: datos.calcetasTotal,
    },
    tarjetas: {
      credito: datos.tarjetaCreditoNum,
      debito: datos.tarjetaDebitoNum,
      amex: datos.tarjetaAmexNum,
      totalTarjetas: datos.totalTarjetas,
    },
    efectivo: datos.efectivoCalculado,
    totalVentas: datos.totalVentas,
    totalBoletos: datos.totalBoletos,
    global: datos.globalTotal,
    boletos: {
      boleto15: {
        inicial: inputsInflables.boleto15Inicial.value || "0",
        final: inputsInflables.boleto15Final.value || "0",
        cantidad: datos.boleto15Boletos,
        total: datos.boleto15Total,
      },
      boleto30: {
        inicial: inputsInflables.boleto30Inicial.value || "0",
        final: inputsInflables.boleto30Final.value || "0",
        cantidad: datos.boleto30Boletos,
        total: datos.boleto30Total,
      },
      boleto1hr: {
        inicial: inputsInflables.boleto1hrInicial.value || "0",
        final: inputsInflables.boleto1hrFinal.value || "0",
        cantidad: datos.boleto1hrBoletos,
        total: datos.boleto1hrTotal,
      },
      boletoAllDay: {
        inicial: inputsInflables.boletoAllDayInicial.value || "0",
        final: inputsInflables.boletoAllDayFinal.value || "0",
        cantidad: datos.boletoAllDayBoletos,
        total: datos.boletoAllDayTotal,
      },
      personaExtra40: {
        inicial: inputsInflables.personaExtra40Inicial.value || "0",
        final: inputsInflables.personaExtra40Final.value || "0",
        cantidad: datos.personaExtra40Boletos,
        total: datos.personaExtra40Total,
      },
      personaExtra60: {
        inicial: inputsInflables.personaExtra60Inicial.value || "0",
        final: inputsInflables.personaExtra60Final.value || "0",
        cantidad: datos.personaExtra60Boletos,
        total: datos.personaExtra60Total,
      },
    },
    tipoCorte: "inflables",
    createdAt: new Date(),
  };

  const referenciaDocumentoFecha = doc(db, "cortes", new Date().toISOString().split("T")[0]);

  await setDoc(
    referenciaDocumentoFecha,
    { inflables: corteInflables },
    { merge: true }
  );

  return `${datos.fechaHoy}_inflables_${usuarioId}`;
}

async function guardarCorteBicis(usuarioId, inputsBicis) {
  const nombreUsuario = await obtenerNombreUsuarioAutorizado(usuarioId);
  const { datos } = generarTextoPlanoBicis(inputsBicis);

  const corteBicis = {
    nombreUsuario,
    usuarioId,
    fecha: datos.fechaHoy,
    folioInicial: datos.biciFolioInicialValor,
    folioFinal: datos.biciFolioFinalValor,
    penalizacion: datos.biciPenalizacionNum,
    totalBicis: datos.totalBicis,
    tipoCorte: "bicis",
    createdAt: new Date(),
  };

  const referenciaDocumentoFecha = doc(db, "cortes", new Date().toISOString().split("T")[0]);

  await setDoc(
    referenciaDocumentoFecha,
    { bicis: corteBicis },
    { merge: true }
  );

  return `${datos.fechaHoy}_bicis_${usuarioId}`;
}


export {
  generarTextoPlanoInflables,
  generarTextoPlanoBicis,
  guardarCorteInflables,
  guardarCorteBicis,
};