// main.js

// Precios fijos para cada tipo de boleto
const preciosPorTipo = {
    boleto15: 40,
    boleto30: 70,
    boleto1hr: 120,
    boletoAllDay: 250,
    personaExtra40: 40,
    personaExtra60: 60,
  };
  
  // Inputs
  const boleto15Inicial = document.getElementById('boleto15Inicial');
  const boleto15Final = document.getElementById('boleto15Final');
  const boleto30Inicial = document.getElementById('boleto30Inicial');
  const boleto30Final = document.getElementById('boleto30Final');
  const boleto1hrInicial = document.getElementById('boleto1hrInicial');
  const boleto1hrFinal = document.getElementById('boleto1hrFinal');
  const boletoAllDayInicial = document.getElementById('boletoAllDayInicial');
  const boletoAllDayFinal = document.getElementById('boletoAllDayFinal');
  const personaExtra40Inicial = document.getElementById('personaExtra40Inicial');
  const personaExtra40Final = document.getElementById('personaExtra40Final');
  const personaExtra60Inicial = document.getElementById('personaExtra60Inicial');
  const personaExtra60Final = document.getElementById('personaExtra60Final');
  
  const calcetasInicial = document.getElementById('calcetasInicial');
  const calcetasTerminamos = document.getElementById('calcetasTerminamos');
  
  const tarjetaCredito = document.getElementById('tarjetaCredito');
  const tarjetaDebito = document.getElementById('tarjetaDebito');
  const tarjetaAmex = document.getElementById('tarjetaAmex');
  const efectivoTotal = document.getElementById('efectivoTotal');
  
  const inputFondo = document.getElementById('inputFondo');
  
  const textoPlano = document.getElementById('textoPlano');
  
  const btnLimpiar = document.getElementById('btnLimpiar');
  const btnCopiar = document.getElementById('btnCopiar');
  
  // Función para calcular boletos y total según inicial y final
  function calcularBoletosYTotal(inicialString, finalString, precioPorBoleto) {
    const inicialNum = Number(inicialString);
    const finalNum = Number(finalString);
  
    if (isNaN(inicialNum) || isNaN(finalNum) || finalNum < inicialNum) {
      return { boletos: 0, total: 0 };
    }
  
    const boletos = finalNum - inicialNum + 1;
    const total = boletos * precioPorBoleto;
  
    return { boletos, total };
  }
  
  // Actualizar cálculo calcetas
  function actualizarCalcetas() {
    const inicialNum = Number(calcetasInicial.value);
    const terminamosNum = Number(calcetasTerminamos.value);
  
    if (isNaN(inicialNum) || isNaN(terminamosNum) || terminamosNum > inicialNum) {
      return { vendidas: 0, total: 0 };
    }
  
    const vendidas = inicialNum - terminamosNum;
    const total = vendidas * 35; // precio fijo calcetas
  
    return { vendidas, total };
  }
  
  // Generar texto plano para copiar o mostrar
  function generarTextoPlano() {
    const boleto15Calc = calcularBoletosYTotal(boleto15Inicial.value, boleto15Final.value, preciosPorTipo.boleto15);
    const boleto30Calc = calcularBoletosYTotal(boleto30Inicial.value, boleto30Final.value, preciosPorTipo.boleto30);
    const boleto1hrCalc = calcularBoletosYTotal(boleto1hrInicial.value, boleto1hrFinal.value, preciosPorTipo.boleto1hr);
    const boletoAllDayCalc = calcularBoletosYTotal(boletoAllDayInicial.value, boletoAllDayFinal.value, preciosPorTipo.boletoAllDay);
    const personaExtra40Calc = calcularBoletosYTotal(personaExtra40Inicial.value, personaExtra40Final.value, preciosPorTipo.personaExtra40);
    const personaExtra60Calc = calcularBoletosYTotal(personaExtra60Inicial.value, personaExtra60Final.value, preciosPorTipo.personaExtra60);
  
    const calcetasCalc = actualizarCalcetas();
  
    const creditoNum = Number(tarjetaCredito.value) || 0;
    const debitoNum = Number(tarjetaDebito.value) || 0;
    const amexNum = Number(tarjetaAmex.value) || 0;
    const efectivoNum = Number(efectivoTotal.value) || 0;
  
    const totalTarjeta = creditoNum + debitoNum + amexNum;
    const totalVenta = totalTarjeta + efectivoNum;
    const totalBoletos = boleto15Calc.boletos + boleto30Calc.boletos + boleto1hrCalc.boletos + boletoAllDayCalc.boletos + personaExtra40Calc.boletos + personaExtra60Calc.boletos;
    const global = totalVenta + calcetasCalc.total;
  
    const fecha = "15/05/25";
  
    return `
  *INFLABLES*
  ${fecha}
  
  *BOLETO 15 min* $40
  Inicial: ${boleto15Inicial.value || "---"}
  Final: ${boleto15Final.value || "---"}
  Boletos: ${boleto15Calc.boletos}
  Total: $${boleto15Calc.total}
  
  *BOLETO 30 MIN* $70
  Inicial: ${boleto30Inicial.value || "---"}
  Final: ${boleto30Final.value || "---"}
  Boletos: ${boleto30Calc.boletos}
  Total: $${boleto30Calc.total}
  
  *BOLETO 1HR* $120
  Inicial: ${boleto1hrInicial.value || "---"}
  Final: ${boleto1hrFinal.value || "---"}
  Boletos: ${boleto1hrCalc.boletos}
  Total: $${boleto1hrCalc.total}
  
  *BOLETO ALLDAY* $250
  Inicial: ${boletoAllDayInicial.value || "---"}
  Final: ${boletoAllDayFinal.value || "---"}
  Boletos: ${boletoAllDayCalc.boletos}
  Total: $${boletoAllDayCalc.total}
  
  *PERSONA EXTRA* $40
  Inicial: ${personaExtra40Inicial.value || "---"}
  Final: ${personaExtra40Final.value || "---"}
  Venta: ${personaExtra40Calc.boletos}
  Total: $${personaExtra40Calc.total}
  
  *PERSONA EXTRA* $60
  Inicial: ${personaExtra60Inicial.value || "---"}
  Final: ${personaExtra60Final.value || "---"}
  Venta: ${personaExtra60Calc.boletos}
  Total: $${personaExtra60Calc.total}
  
  *Tarjeta*
  Crédito: $${creditoNum}
  Débito: $${debitoNum}
  Amex: $${amexNum}
  Total: $${totalTarjeta}
  Efectivo: $${efectivoNum}
  Total venta: $${totalVenta}
  Total de boletos: ${totalBoletos}
  Global: $${global}
  
  *CALCETAS*
  Iniciamos: ${calcetasInicial.value || "---"}
  Terminamos: ${calcetasTerminamos.value || "---"}
  Vendidas: ${calcetasCalc.vendidas}
  Total: $${calcetasCalc.total}
  
  *Fondo:* $${inputFondo.value || 0}
  `.trim();
  }
  
  // Actualizar texto plano en la izquierda
  function actualizarTextoPlano() {
    textoPlano.textContent = generarTextoPlano();
  }
  
  // Limpiar inputs
  function limpiarDatos() {
    const todosInputs = document.querySelectorAll('input[type="number"]');
    todosInputs.forEach(input => (input.value = ''));
    actualizarTextoPlano();
  }
  
  // Copiar al portapapeles
  async function copiarPortapapeles() {
    try {
      await navigator.clipboard.writeText(textoPlano.textContent);
      alert('Copiado al portapapeles!');
    } catch {
      alert('Error al copiar al portapapeles.');
    }
  }
  
  // Eventos para actualizar texto plano al cambiar inputs
  const inputsParaActualizar = document.querySelectorAll('input[type="number"]');
  inputsParaActualizar.forEach(input =>
    input.addEventListener('input', actualizarTextoPlano)
  );
  
  btnLimpiar.addEventListener('click', limpiarDatos);
  btnCopiar.addEventListener('click', copiarPortapapeles);
  
  // Inicializa la vista
  actualizarTextoPlano();
  