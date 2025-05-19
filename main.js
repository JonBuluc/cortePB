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
  