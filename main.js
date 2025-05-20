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
  
  function calcularBoletos(inicial, final) {
    const inicioNum = Number(inicial);
    const finalNum = Number(final);
    if (
      !inicial || !final || // si alguno está vacío
      isNaN(inicioNum) || isNaN(finalNum) || // o no es número
      finalNum < inicioNum // o final menor que inicial
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
  
    // Total ventas es suma de boletos + acompañantes
    const totalVentas =
      boleto15Total +
      boleto30Total +
      boleto1hrTotal +
      boletoAllDayTotal +
      personaExtra40Total +
      personaExtra60Total;
  
    const efectivoCalculado = totalVentas - (tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum);
  
    // Global no incluye fondo
    const globalTotal = totalVentas+calcetasTotal;
  
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
  *Efectivo:* $${efectivoCalculado}
  
  *Total venta:* $${totalVentas}
  *Total de boletos:* ${boleto15Boletos + boleto30Boletos + boleto1hrBoletos + boletoAllDayBoletos + personaExtra40Boletos + personaExtra60Boletos}
  
  *Global:* $${globalTotal}
  
  *CALCETAS*
  Iniciamos: ${inputsInflables.calcetasInicial.value || '---'}
  Terminamos: ${inputsInflables.calcetasTerminamos.value || '---'}
  Vendidas: ${calcetasVendidas || '0'}
  Total: $${calcetasTotal || '0'}
  
  *Fondo:* $${inputsInflables.inputFondo.value || '0'}
  `;
  
    textoPlanoInflables.textContent = texto;
  }
  
  function actualizarTextoPlanoBicis() {
    const fechaHoy = new Date().toLocaleDateString('es-ES');
    const biciFolioInicialNum = Number(inputsBicis.biciFolioInicial.value);
    const biciFolioFinalNum = Number(inputsBicis.biciFolioFinal.value);
    const biciPenalizacionNum = Number(inputsBicis.biciPenalizacion.value) || 0;
  
    const totalBicis = calcularBoletos(biciFolioInicialNum, biciFolioFinalNum);    
  
    const texto = 
  `*Bi-Bikes*
  ${fechaHoy}
  Folio inicial: ${inputsBicis.biciFolioInicial.value || '---'}
  Folio final: ${inputsBicis.biciFolioFinal.value || '---'}
  Penalización: ${biciPenalizacionNum}
  Total bicis: ${totalBicis}
  `;
    textoPlanoBicis.textContent = texto;
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
  
  Object.values(inputsInflables).forEach(input => {
    input.addEventListener('input', actualizarTextoPlanoInflables);
  });
  
  Object.values(inputsBicis).forEach(input => {
    input.addEventListener('input', actualizarTextoPlanoBicis);
  });
  
  btnLimpiarInflables.addEventListener('click', limpiarInflables);
  btnCopiarInflables.addEventListener('click', () => copiarTextoPlano(textoPlanoInflables.textContent));
  
  btnLimpiarBicis.addEventListener('click', limpiarBicis);
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
  
  // Inicializar textos planos
  actualizarTextoPlanoInflables();
  actualizarTextoPlanoBicis();
  