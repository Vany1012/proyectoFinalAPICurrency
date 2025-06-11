window.onload = (e) => {
    console.log('JS is in tha house!');

  const divisaOrigen = document.getElementById('sl-divisa-origen');
  const divisaDestino = document.getElementById('sl-divisa-destino');
  const cantidad = document.getElementById('ip-cantidad');
  const resultado = document.getElementById('lb-conversion');
  const btnConvertir = document.getElementById('btn-convertir');

  fetch("https://api.unirateapi.com/api/rates?api_key=78YNDiuCjL98U2Th1tShGObKGUq2DTCfZtVkcl8rurAzEsxcnWeUevsbppMTaQHO")
        .then((response) => {
            console.log('Datos recibidos:', response);
            return response.json();
        })
        .then((data) => {
        console.log('Datos de la respuesta',data);
        const divisas = Object.keys(data.rates);
        insertarMonedas(divisas);
    })
    .catch((error) => {
        console.error('Hubo un error');
    })

    function insertarMonedas(divisas){
        divisaOrigen.innerHTML = "";
        divisaDestino.innerHTML = "";
        divisas.forEach(divisa => {
          let divisa1 = document.createElement('option');
          let divisa2 = document.createElement('option');
          divisa1.value = divisa;
          divisa2.value = divisa;
          divisa1.textContent = divisa;
          divisa2.textContent = divisa;
          divisaOrigen.appendChild(divisa1);
          divisaDestino.appendChild(divisa2);

        });
        // Preelegimos divisas
        divisaOrigen.value = 'USD';
        divisaDestino.value = 'MXN';
    };

    function convertir() {
        let cantidadValor = parseFloat(cantidad.value);
        if(isNaN(cantidadValor)){
            alert('Ingrese una cantidad para realizar la conversión');
            resultado.innerText = " ";
        }
        else if(cantidadValor < 0){
            alert('Ingresa una cantidad positiva para poder realizar la conversión');
            resultado.innerText = " ";
        }
        else{
            let from = divisaOrigen.value;
            let to = divisaDestino.value;
            fetch(`https://api.unirateapi.com/api/convert?api_key=78YNDiuCjL98U2Th1tShGObKGUq2DTCfZtVkcl8rurAzEsxcnWeUevsbppMTaQHO&amount=${cantidadValor}&from=${from}&to=${to}`)
            .then((response) => {
                console.log('Datos de conversión recibidos:', response);
                return response.json();
            })
            .then((data) => {
                console.log('Datos de la respuesta "conversión"',data);
                resultado.innerText = `${data.result.toFixed(4)}`;
            })
        };
        };

    btnConvertir.addEventListener('click', convertir);
  };