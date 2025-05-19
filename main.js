function calcularBoletosYTotales() {
    const boletos = [
      { id: 'boleto15', precio: 40 },
      { id: 'boleto30', precio: 70 },
      { id: 'boleto1h', precio: 120 },
      { id: 'boletoAllday', precio: 250 },
      { id: 'personaExtra40', precio: 40 },
      { id: 'personaExtra60', precio: 60 }
    ];
  
    boletos.forEach(({ id, precio }) => {
      const inicial = parseInt(document.getElementById(id + 'Inicial').value) || 0;
      const final = parseInt(document.getElementById(id + 'Final').value) || 0;
      const cantidadBoletos = final && inicial ? (final - inicial + 1) : 0;
      const total = cantidadBoletos * precio;
  
      document.getElementById(id + 'Boletos').innerText = cantidadBoletos;
      document.getElementById(id + 'Total').innerText = `$${total}`;
      if (document.getElementById(id + 'InicialTexto')) {
        document.getElementById(id + 'InicialTexto').innerText = inicial;
        document.getElementById(id + 'FinalTexto').innerText = final || '';
      }
    });
  
    const credito = parseInt(document.getElementById('tarjetaCredito').value) || 0;
    const debito = parseInt(document.getElementById('tarjetaDebito').value) || 0;
    const amex = parseInt(document.getElementById('tarjetaAmex').value) || 0;
    const efectivo = parseInt(document.getElementById('efectivoTotal').value) || 0;
  
    const totalTarjeta = credito + debito + amex;
    document.getElementById('totalTarjeta').innerText = `$${totalTarjeta}`;
    document.getElementById('tarjetaCreditoTexto').innerText = `$${credito}`;
    document.getElementById('tarjetaDebitoTexto').innerText = `$${debito}`;
    document.getElementById('tarjetaAmexTexto').innerText = amex ? `$${amex}` : '';
    document.getElementById('efectivoTexto').innerText = `$${efectivo}`;
  
    const totalVenta = totalTarjeta + efectivo;
    document.getElementById('totalVenta').innerText = `$${totalVenta}`;
  
    const totalBoletos = boletos.reduce((sum, { id }) => {
      return sum + (parseInt(document.getElementById(id + 'Boletos').innerText) || 0);
    }, 0);
    document.getElementById('totalBoletos').innerText = totalBoletos;
  
    const global = boletos.reduce((sum, { id }) => {
      const total = parseInt(document.getElementById(id + 'Total').innerText.replace('$', '')) || 0;
      return sum + total;
    }, 0) + (parseInt(document.getElementById('calcetasTotal').innerText.replace('$', '')) || 0);
    document.getElementById('globalTotal').innerText = `$${global}`;
  
    const calcetasInicial = parseInt(document.getElementById('calcetasInicial').value) || 0;
    const calcetasTerminamos = parseInt(document.getElementById('calcetasTerminamos').value) || 0;
    const calcetasVendidas = calcetasInicial - calcetasTerminamos;
    const totalCalcetas = calcetasVendidas * 35;
  
    document.getElementById('calcetasInicialTexto').innerText = calcetasInicial;
    document.getElementById('calcetasTerminamosTexto').innerText = calcetasTerminamos;
    document.getElementById('calcetasVendidas').innerText = calcetasVendidas;
    document.getElementById('calcetasTotal').innerText = `$${totalCalcetas}`;
  }
  
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calcularBoletosYTotales);
  });

// Botón limpiar: borra todos los inputs y recalcula
document.getElementById('botonLimpiar').addEventListener('click', () => {
    document.querySelectorAll('input').forEach(input => input.value = '');
    calcularBoletosYTotales();
  });
  
  // Botón exportar: copia texto plano al portapapeles listo para WhatsApp
  document.getElementById('botonExportar').addEventListener('click', () => {
    let textoParaWhatsApp = 'Corte PB\n15/05/25\n\n';
  
    const boletos = [
      { id: 'boleto15', nombre: 'BOLETO 15min', precio: 40 },
      { id: 'boleto30', nombre: 'BOLETO 30min', precio: 70 },
      { id: 'boleto1h', nombre: 'BOLETO 1HR', precio: 120 },
      { id: 'boletoAllday', nombre: 'BOLETO ALLDAY', precio: 250 },
      { id: 'personaExtra40', nombre: 'PERSONA EXTRA $40', precio: 40 },
      { id: 'personaExtra60', nombre: 'PERSONA EXTRA $60', precio: 60 },
    ];
  
    boletos.forEach(({ id, nombre, precio }) => {
      const inicial = document.getElementById(id + 'Inicial').value || '';
      const final = document.getElementById(id + 'Final').value || '';
      const boletosCount = document.getElementById(id + 'Boletos').innerText || '0';
      const total = document.getElementById(id + 'Total').innerText || '$0';
  
      textoParaWhatsApp += `${nombre} $${precio}\nInicial: ${inicial}\nFinal: ${final}\nBoletos: ${boletosCount}\nTotal: ${total}\n\n`;
    });
  
    const credito = document.getElementById('tarjetaCredito').value || 0;
    const debito = document.getElementById('tarjetaDebito').value || 0;
    const amex = document.getElementById('tarjetaAmex').value || 0;
    const efectivo = document.getElementById('efectivoTotal').value || 0;
  
    textoParaWhatsApp += `Tarjetas:\nCrédito: $${credito}\nDébito: $${debito}\nAmex: $${amex}\n\n`;
    textoParaWhatsApp += `Efectivo: $${efectivo}\n\n`;
  
    const calcetasInicial = document.getElementById('calcetasInicial').value || '';
    const calcetasTerminamos = document.getElementById('calcetasTerminamos').value || '';
    const calcetasVendidas = document.getElementById('calcetasVendidas').innerText || '0';
    const calcetasTotal = document.getElementById('calcetasTotal').innerText || '$0';
  
    textoParaWhatsApp += `Calcetas\nIniciamos: ${calcetasInicial}\nTerminamos: ${calcetasTerminamos}\nVendidas: ${calcetasVendidas}\nTotal: ${calcetasTotal}\n`;
  
    // Copiar al portapapeles
    navigator.clipboard.writeText(textoParaWhatsApp)
      .then(() => alert('Datos copiados para WhatsApp!'))
      .catch(() => alert('Error copiando al portapapeles.'));
  });
  
  