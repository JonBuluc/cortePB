// Referencias a inputs
const inputFondo = document.getElementById('inputFondo');

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

const tarjetaCredito = document.getElementById('tarjetaCredito');
const tarjetaDebito = document.getElementById('tarjetaDebito');
const tarjetaAmex = document.getElementById('tarjetaAmex');
const efectivoTotal = document.getElementById('efectivoTotal');

const calcetasInicial = document.getElementById('calcetasInicial');
const calcetasTerminamos = document.getElementById('calcetasTerminamos');
const calcetasVendidasSpan = document.getElementById('calcetasVendidas');
const calcetasTotalSpan = document.getElementById('calcetasTotal');

const textoPlano = document.getElementById('textoPlano');

const btnLimpiar = document.getElementById('btnLimpiar');
const btnCopiar = document.getElementById('btnCopiar');

// Precios fijos
const preciosPorTipo = {
  boleto15: 40,
  boleto30: 70,
  boleto1hr: 120,
  boletoAllDay: 250,
  personaExtra40: 40,
  personaExtra60: 60,
};

// Función para calcular boletos y total, con control para no negativos ni NaN
function calcularBoletosYTotal(inicial, final, precio) {
  const inicialNum = Number(inicial);
  const finalNum = Number(final);
  if (isNaN(inicialNum) || isNaN(finalNum) || finalNum < inicialNum) {
    return { boletos: 0, total: 0 };
  }
  const boletos = finalNum - inicialNum + 1;
  const total = boletos * precio;
  return { boletos, total };
}

// Actualiza calcetas vendidos y total
function actualizarCalcetas() {
  const inicialNum = Number(calcetasInicial.value) || 0;
  const terminadoNum = Number(calcetasTerminamos.value) || 0;
  const vendidas = inicialNum - terminadoNum >= 0 ? inicialNum - terminadoNum : 0;
  const total = vendidas * 35; // precio fijo calcetas
  calcetasVendidasSpan.textContent = vendidas;
  calcetasTotalSpan.textContent = `$${total}`;
  return { vendidas, total };
}

// Genera el texto plano para mostrar y copiar
function generarTextoPlano() {
  // Calculos boletos
  const boleto15Calc = calcularBoletosYTotal(boleto15Inicial.value, boleto15Final.value, preciosPorTipo.boleto15);
  const boleto30Calc = calcularBoletosYTotal(boleto30Inicial.value, boleto30Final.value, preciosPorTipo.boleto30);
  const boleto1hrCalc = calcularBoletosYTotal(boleto1hrInicial.value, boleto1hrFinal.value, preciosPorTipo.boleto1hr);
  const boletoAllDayCalc = calcularBoletosYTotal(boletoAllDayInicial.value, boletoAllDayFinal.value, preciosPorTipo.boletoAllDay);
  const personaExtra40Calc = calcularBoletosYTotal(personaExtra40Inicial.value, personaExtra40Final.value, preciosPorTipo.personaExtra40);
  const personaExtra60Calc = calcularBoletosYTotal(personaExtra60Inicial.value, personaExtra60Final.value, preciosPorTipo.personaExtra60);

  // Calcetas
  const calcetas = actualizarCalcetas();

  // Totales tarjeta y efectivo
  const tarjetaCreditoNum = Number(tarjetaCredito.value) || 0;
  const tarjetaDebitoNum = Number(tarjetaDebito.value) || 0;
  const tarjetaAmexNum = Number(tarjetaAmex.value) || 0;
  const efectivoNum = Number(efectivoTotal.value) || 0;

  // Total venta boletos sumados
  const totalBoletos = boleto15Calc.boletos + boleto30Calc.boletos + boleto1hrCalc.boletos + boletoAllDayCalc.boletos + personaExtra40Calc.boletos + personaExtra60Calc.boletos;
  const totalVentaBoletos = boleto15Calc.total + boleto30Calc.total + boleto1hrCalc.total + boletoAllDayCalc.total + personaExtra40Calc.total + personaExtra60Calc.total;

  // Global total
  const globalTotal = totalVentaBoletos + efectivoNum;

  // Fondo
  const fondoNum = Number(inputFondo.value) || 0;

  // Texto plano con negritas para WhatsApp
  const texto = 
`**INFLABLES**
15/05/25

**BOLETO 15 min $40**
Inicial: ${boleto15Inicial.value || '---'}
Final: ${boleto15Final.value || '---'}
Boletos: ${boleto15Calc.boletos}
Total: $${boleto15Calc.total}

**BOLETO 30 MIN $70**
Inicial: ${boleto30Inicial.value || '---'}
Final: ${boleto30Final.value || '---'}
Boletos: ${boleto30Calc.boletos}
Total: $${boleto30Calc.total}

**BOLETO 1HR $120**
Inicial: ${boleto1hrInicial.value || '---'}
Final: ${boleto1hrFinal.value || '---'}
Boletos: ${boleto1hrCalc.boletos}
Total: $${boleto1hrCalc.total}

**BOLETO ALLDAY $250**
Inicial: ${boletoAllDayInicial.value || '---'}
Final: ${boletoAllDayFinal.value || '---'}
Boletos: ${boletoAllDayCalc.boletos}
Total: $${boletoAllDayCalc.total}

**PERSONA EXTRA $40**
Inicial: ${personaExtra40Inicial.value || '---'}
Final: ${personaExtra40Final.value || '---'}
Venta: ${personaExtra40Calc.boletos}
Total: $${personaExtra40Calc.total}

**PERSONA EXTRA $60**
Inicial: ${personaExtra60Inicial.value || '---'}
Final: ${personaExtra60Final.value || '---'}
Venta: ${personaExtra60Calc.boletos}
Total: $${personaExtra60Calc.total}

**Tarjeta**
Crédito: $${tarjetaCreditoNum}
Débito: $${tarjetaDebitoNum}
Amex: $${tarjetaAmexNum}
Total: $${tarjetaCreditoNum + tarjetaDebitoNum + tarjetaAmexNum}
Efectivo: $${efectivoNum}
Total venta: $${totalVentaBoletos}
Total de boletos: ${totalBoletos}
Global: $${globalTotal}

**CALCETAS**
Iniciamos: ${calcetasInicial.value || '---'}
Terminamos: ${calcetasTerminamos.value || '---'}
Vendidas: ${calcetas.vendidas}
Total: $${calcetas.total}

Fondo: $${fondoNum}

---

**Bi-Bikes**
18/05/25
Folio inicial: 60156
Folio final: 60654
Penalización: 4
Total bicis: 499
`;

  textoPlano.textContent = texto;
}

// Limpiar todos los inputs
function limpiarDatos() {
  const todosInputs = document.querySelectorAll('input[type=number]');
  todosInputs.forEach(input => input.value = '');
  inputFondo.value = 0;
  calcetasVendidasSpan.textContent = '0';
  calcetasTotalSpan.textContent = '$0';
  textoPlano.textContent = '';
}

// Copiar al portapapeles
function copiarPortapapeles() {
  const texto = textoPlano.textContent;
  navigator.clipboard.writeText(texto).then(() => {
    alert('Texto copiado al portapapeles.');
  }).catch(() => {
    alert('Error al copiar al portapapeles.');
  });
}

// Event listeners para actualizar texto cada vez que cambian inputs
const inputsActualizar = document.querySelectorAll('input[type=number]');
inputsActualizar.forEach(input => {
  input.addEventListener('input', generarTextoPlano);
});

// Botones
btnLimpiar.addEventListener('click', () => {
  limpiarDatos();
  generarTextoPlano();
});

btnCopiar.addEventListener('click', copiarPortapapeles);

// Inicializar texto plano vacío al cargar
generarTextoPlano();
