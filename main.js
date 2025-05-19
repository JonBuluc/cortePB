const functionCalculateBoletosYTotales = () => {
    const boletosData = [
      { idInicial: "boleto15Inicial", idFinal: "boleto15Final", idBoletos: "boleto15Boletos", idTotal: "boleto15Total", precio: 40 },
      { idInicial: "boleto30Inicial", idFinal: "boleto30Final", idBoletos: "boleto30Boletos", idTotal: "boleto30Total", precio: 70 },
      { idInicial: "boleto1hInicial", idFinal: "boleto1hFinal", idBoletos: "boleto1hBoletos", idTotal: "boleto1hTotal", precio: 120 },
      { idInicial: "boletoAlldayInicial", idFinal: "boletoAlldayFinal", idBoletos: "boletoAlldayBoletos", idTotal: "boletoAlldayTotal", precio: 250 },
      { idInicial: "personaExtra40Inicial", idFinal: "personaExtra40Final", idBoletos: "personaExtra40Boletos", idTotal: "personaExtra40Total", precio: 40 },
      { idInicial: "personaExtra60Inicial", idFinal: "personaExtra60Final", idBoletos: "personaExtra60Boletos", idTotal: "personaExtra60Total", precio: 60 }
    ];
  
    let acumuladoBoletos = 0;
    let acumuladoTotal = 0;
  
    boletosData.forEach(({ idInicial, idFinal, idBoletos, idTotal, precio }) => {
      const valorInicial = parseInt(document.getElementById(idInicial)?.value) || 0;
      const valorFinal = parseInt(document.getElementById(idFinal)?.value) || 0;
      let numeroBoletos = 0;
  
      if (valorFinal >= valorInicial && valorInicial > 0) {
        numeroBoletos = valorFinal - valorInicial + 1;
      }
  
      document.getElementById(idBoletos).textContent = numeroBoletos;
      const totalCalc = numeroBoletos * precio;
      document.getElementById(idTotal).textContent = totalCalc;
  
      acumuladoBoletos += numeroBoletos;
      acumuladoTotal += totalCalc;
    });
  
    const credito = parseInt(document.getElementById("tarjetaCredito")?.value) || 0;
    const debito = parseInt(document.getElementById("tarjetaDebito")?.value) || 0;
    const amex = parseInt(document.getElementById("tarjetaAmex")?.value) || 0;
    const efectivo = parseInt(document.getElementById("efectivoTotal")?.value) || 0;
  
    const totalTarjeta = credito + debito + amex;
    const totalVenta = totalTarjeta + efectivo;
  
    document.getElementById("totalTarjeta").textContent = totalTarjeta;
    document.getElementById("totalVenta").textContent = totalVenta;
    document.getElementById("totalBoletos").textContent = acumuladoBoletos;
    document.getElementById("globalTotal").textContent = acumuladoTotal;
  
    const calcetasInicial = parseInt(document.getElementById("calcetasInicial")?.value) || 0;
    const calcetasTerminamos = parseInt(document.getElementById("calcetasTerminamos")?.value) || 0;
    const calcetasVendidas = calcetasInicial - calcetasTerminamos;
  
    document.getElementById("calcetasVendidas").textContent = calcetasVendidas > 0 ? calcetasVendidas : 0;
    document.getElementById("calcetasTotal").textContent = calcetasVendidas * 35;
  };
  
  document.querySelectorAll("input").forEach((inputElement) => {
    inputElement.addEventListener("input", functionCalculateBoletosYTotales);
  });
  
  window.onload = functionCalculateBoletosYTotales;
  