// main.js

// ------------------
// Datos precios inflables
const preciosPorTipo = {
    boleto15: 40,
    boleto30: 70,
    boleto1hr: 120,
    boletoAllDay: 250,
    personaExtra40: 40,
    personaExtra60: 60,
    calcetas: 35,
  };
  
  // --- Inflables inputs ---
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
    tarjetaCredito: document.getElementById('tarjetaCredito'),
    tarjetaDebito: document.getElementById('tarjetaDebito'),
    tarjetaAmex: document.getElementById('tarjetaAmex'),
    efectivoTotal: document.getElementById('efectivoTotal'),
    calcetasInicial: document.getElementById('calcetasInicial'),
    calcetasTerminamos: document.getElementById('calcetasTerminamos'),
    inputFondo: document.getElementById('inputFondo'),
  };
  
  // --- Bicis inputs ---
  const inputsBicis = {
    biciFolioInicial: document.getElementById('biciFolioInicial'),
    biciFolioFinal: document.getElementById('biciFolioFinal'),
    biciPenalizacion: document.getElementById('biciPenalizacion'),
    biciTotal: document.getElementById('biciTotal'),
  };
  
  // Texto plano contenedores
  const textoPlanoInflables = document.getElementById('textoPlanoInflables');
  const textoPlanoBicis = document.getElementById('textoPlanoBicis');
  
  // Botones
  const btnLimpiarInflables = document.getElementById('btnLimpiarInflables');
  const btnCopiarInflables = document.getElementById('btnCopiarInflables');
  const btnLimpiarBicis = document.getElementById('btnLimpiarBicis');
  const btnCopiarBicis = document.getElementById('btnCopiarBicis');
  
  // Menu botones
  const btnMostrarInflables = document.getElementById('btnMostrarInflables');
  const btnMostrarBicis = document.getElementById('btnMostrarBicis');
  
  const seccionInflables = document.getElementById('seccionInflables');
  const seccionBicis = document.getElementById('seccionBicis');
  
  // Función para calcular boletos
  function calcularBoletos(inicial, final) {
    const inicioNum = Number(inicial);
    const finalNum = Number(final);
    if (!isNaN(inicioNum) && !isNaN(finalNum) && finalNum >= inicioNum) {
      return finalNum - inicioNum + 1;
    }
    return 0;
  }
  
  // Actualizar texto plano inflables
  function actualizarTextoPlanoInflables() {
    const fechaHoy = new Date().toLocaleDateString('es-ES');
  
    // Calcular boletos y totales
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
  
    // Calcetas
    const calcetasInicialNum = Number(inputsInflables.calcetasInicial.value);
    const calcetasTerminamosNum = Number(inputsInflables.calcetasTerminamos.value);
    const calcetasVendidas = (!isNaN(calcetasInicialNum) && !isNaN(calcetasTerminamosNum)) ? calcetasInicialNum - calcetasTerminamosNum : 0;
    const calcetasTotal = calcetasVendidas * preciosPorTipo.calcetas;
  
    // Totales tarjetas y efectivo
    const tarjetaCreditoNum = Number(inputsInflables.tarjetaCredito.value) || 0;
    const tarjetaDebitoNum = Number(inputsInflables.tarjetaDebito.value) || 0;
    const tarjetaAmexNum = Number(inputsInflables.tarjetaAmex.value) || 0;
  
    const totalVenta = boleto15Total+boleto30Total+boleto1hrTotal+boletoAllDayTotal+personaExtra40Total+personaExtra60Total;
    const efectivoNum = totalVenta - (tarjetaCreditoNum + tarjetaAmexNum + tarjetaDebitoNum);
    const totalBoletos = boleto15Boletos + boleto30Boletos + boleto1hrBoletos + boletoAllDayBoletos + personaExtra40Boletos + personaExtra60Boletos;
  
    const globalTotal = totalVenta + calcetasTotal;
  
    // Armar texto
    const texto =
  `*INFLABLES*
  ${fechaHoy}
  
  *BOLETO 15 min* $40
  Inicial: ${inputsInflables.boleto15Inicial.value || '---'}
  Final: ${inputsInflables.boleto15Final.value || '---'}
  Boletos: ${boleto15Boletos || '0'}
  Total: $${boleto15Total || '0'}
  
  *BOLETO 30 MIN* $70
  Inicial: ${inputsInflables.boleto30Inicial.value || '---'}
  Final: ${inputsInflables.boleto30Final.value || '---'}
  Boletos: ${boleto30Boletos || '0'}
  Total: $${boleto30Total || '0'}
  
  *BOLETO 1HR* $120
  Inicial: ${inputsInflables.boleto1hrInicial.value || '---'}
  Final: ${inputsInflables.boleto1hrFinal.value || '---'}
  Boletos: ${boleto1hrBoletos || '0'}
  Total: $${boleto1hrTotal || '0'}
  
  *BOLETO ALLDAY* $250
  Inicial: ${inputsInflables.boletoAllDayInicial.value || '---'}
  Final: ${inputsInflables.boletoAllDayFinal.value || '---'}
  Boletos: ${boletoAllDayBoletos || '0'}
  Total: $${boletoAllDayTotal || '0'}
  
  *PERSONA EXTRA* $40
  Inicial: ${inputsInflables.personaExtra40Inicial.value || '---'}
  Final: ${inputsInflables.personaExtra40Final.value || '---'}
  Boletos: ${personaExtra40Boletos || '0'}
  Total: $${personaExtra40Total || '0'}
  
  *PERSONA EXTRA* $60
  Inicial: ${inputsInflables.personaExtra60Inicial.value || '---'}
  Final: ${inputsInflables.personaExtra60Final.value || '---'}
  Boletos: ${personaExtra60Boletos || '0'}
  Total: $${personaExtra60Total || '0'}
  
  *Tarjeta*
  Crédito: $${tarjetaCreditoNum}
  Débito: $${tarjetaDebitoNum}
  Amex: $${tarjetaAmexNum}
  Total: $${tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum}
  Efectivo: $${efectivoNum}
  Total venta: $${totalVenta}
  Total de boletos: ${totalBoletos}
  Global: $${globalTotal}
  
  *CALCETAS*
  Iniciamos: ${inputsInflables.calcetasInicial.value || '---'}
  Terminamos: ${inputsInflables.calcetasTerminamos.value || '---'}
  Vendidas: ${calcetasVendidas || '0'}
  Total: $${calcetasTotal || '0'}
  
  *Fondo:* $${inputsInflables.inputFondo.value || '0'}
  `;
    textoPlanoInflables.textContent = texto;
  }
  
  // Actualizar texto plano bicis
  function actualizarTextoPlanoBicis() {
    const biciFolioInicialNum = inputsBicis.biciFolioInicial.value || '---';
    const biciFolioFinalNum = inputsBicis.biciFolioFinal.value || '---';
    const biciPenalizacionNum = inputsBicis.biciPenalizacion.value || '0';
    const biciTotalNum = inputsBicis.biciTotal.value || '0';
  
    const texto =
  `*Bi-Bikes*
  18/05/25
  Folio inicial: ${biciFolioInicialNum}
  Folio final: ${biciFolioFinalNum}
  Penalización: ${biciPenalizacionNum}
  Total bicis: ${biciTotalNum}
  `;
    textoPlanoBicis.textContent = texto;
  }
  
  // Limpiar inputs inflables
  function limpiarInflables() {
    Object.values(inputsInflables).forEach(input => (input.value = ''));
    actualizarTextoPlanoInflables();
  }
  
  // Limpiar inputs bicis
  function limpiarBicis() {
    Object.values(inputsBicis).forEach(input => (input.value = ''));
    actualizarTextoPlanoBicis();
  }
  
  // Copiar texto a portapapeles
  function copiarTextoPlano(texto) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado al portapapeles');
    });
  }
  
  // Manejo eventos inputs inflables
  Object.values(inputsInflables).forEach(input => {
    input.addEventListener('input', actualizarTextoPlanoInflables);
  });
  
  // Manejo eventos inputs bicis
  Object.values(inputsBicis).forEach(input => {
    input.addEventListener('input', actualizarTextoPlanoBicis);
  });
  
  // Botones limpiar y copiar inflables
  btnLimpiarInflables.addEventListener('click', limpiarInflables);
  btnCopiarInflables.addEventListener('click', () => copiarTextoPlano(textoPlanoInflables.textContent));
  
  // Botones limpiar y copiar bicis
  btnLimpiarBicis.addEventListener('click', limpiarBicis);
  btnCopiarBicis.addEventListener('click', () => copiarTextoPlano(textoPlanoBicis.textContent));
  
  // Menu para cambiar de sección
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
  
  // Inicializar textos planos
  actualizarTextoPlanoInflables();
  actualizarTextoPlanoBicis();