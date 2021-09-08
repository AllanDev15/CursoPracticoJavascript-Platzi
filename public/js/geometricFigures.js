document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menu');
  const navigation = document.querySelector('#navigation');
  const btnPerimetroCuadrado = document.querySelector('#perimetroCuadrado');
  const btnAreaCuadrado = document.querySelector('#areaCuadrado');
  const btnPerimetroTriangulo = document.querySelector('#perimetroTriangulo');
  const btnAreaTriangulo = document.querySelector('#areaTriangulo');
  const inputRadio = document.querySelector('#inputRadio');
  const inputDiametro = document.querySelector('#inputDiametro');
  const btnAreaCirculo = document.querySelector('#areaCirculo');
  const btnPerimetroCirculo = document.querySelector('#perimetroCirculo');

  btnPerimetroCuadrado.addEventListener('click', cuadrado);
  btnAreaCuadrado.addEventListener('click', cuadrado);
  btnPerimetroTriangulo.addEventListener('click', triangulo);
  btnAreaTriangulo.addEventListener('click', triangulo);
  inputRadio.addEventListener('change', valorElegidoCirculo);
  inputDiametro.addEventListener('change', valorElegidoCirculo);
  btnAreaCirculo.addEventListener('click', circulo);
  btnPerimetroCirculo.addEventListener('click', circulo);

  function valorElegidoCirculo(e) {
    const tipo = e.target.value;
    const inputCirculo = document.querySelector('#inputCirculo');

    const labelInputCirculo = inputCirculo.parentElement.querySelector('label');
    labelInputCirculo.textContent = capitalize(`${tipo} del circulo:`);
  }

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  menu.addEventListener('click', () => {
    navigation.classList.toggle('max-h-0');
    navigation.classList.toggle('max-h-56');
  });
});

function eliminarResultado(e) {
  e.target.parentElement.remove();
}

function cuadrado(e) {
  const inputLadoCuadrado = document.querySelector('#inputLadoCuadrado');
  const lado = inputLadoCuadrado.value;
  const tipoCalculo = e.target.dataset.type;
  const squareCard = document.querySelector('.card.square');

  if (tipoCalculo == 'area') {
    const area = lado * lado;
    const msg = `El area del cuadrado es ${area}`;
    mostrarMensaje(squareCard, 'res', tipoCalculo, msg, 'indigo');
  } else if (tipoCalculo == 'perimetro') {
    const perimetro = lado * 4;
    const msg = `El perimetro del cuadrado es ${perimetro}`;
    mostrarMensaje(squareCard, 'res', tipoCalculo, msg, 'indigo');
  }
}

function triangulo(e) {
  const lado1Triangulo = parseInt(document.querySelector('#inputLado1Triangulo').value);
  const lado2Triangulo = parseInt(document.querySelector('#inputLado2Triangulo').value);
  const baseTriangulo = parseInt(document.querySelector('#inputBaseTriangulo').value);
  const tipoCalculo = e.target.dataset.type;
  const contenedor = document.querySelector('.card.triangle');

  if (lado1Triangulo != lado2Triangulo) {
    // mostrarMensajeError(contenedor, 'Los 2 lados del triangulo deben ser iguales');
    mostrarMensaje(contenedor, 'error', 'error', 'Los 2 lados del triangulo deben ser iguales', 'red');
  } else {
    if (tipoCalculo == 'area') {
      const altura = Math.sqrt(lado1Triangulo ** 2 + lado2Triangulo ** 2);
      const area = ((baseTriangulo * altura) / 2).toFixed(4);
      const msg = `El area del triangulo es ${area}`;
      mostrarMensaje(contenedor, 'res', 'area', msg, 'indigo');
    } else if (tipoCalculo == 'perimetro') {
      const perimetro = lado1Triangulo + lado2Triangulo + baseTriangulo;
      const msg = `El perimetro del triangulo es ${perimetro}`;
      mostrarMensaje(contenedor, 'res', 'perimetro', msg, 'indigo');
    }
  }
}

function circulo(e) {
  const contenedor = document.querySelector('.card.circle');
  const valor = contenedor.querySelector("input[type='radio']:checked").value;
  const inputCirculo = document.querySelector('#inputCirculo').value;
  const tipoCalculo = e.target.dataset.type;

  if (tipoCalculo == 'area') {
    let area;
    valor == 'radio' ? (area = (Math.PI * inputCirculo ** 2).toFixed(4)) : (area = (Math.PI * (inputCirculo / 2) ** 2).toFixed(4));
    const msg = `El area del circulo es ${area}`;
    mostrarMensaje(contenedor, 'res', 'area', msg, 'indigo');
  } else if (tipoCalculo == 'perimetro') {
    let perimetro;
    valor == 'radio' ? (perimetro = (Math.PI * (inputCirculo * 2)).toFixed(4)) : (perimetro = (Math.PI * inputCirculo).toFixed(4));
    const msg = `El perimetro del criculo es ${perimetro}`;
    mostrarMensaje(contenedor, 'res', 'perimetro', msg, 'indigo');
  }
}

function mostrarMensaje(contenedor, tipoMsg, tipoData, msg, color) {
  const colors = {
    green: ['text-green-600', 'bg-green-200'],
    blue: ['text-blue-600', 'bg-blue-200'],
    red: ['text-red-600', 'bg-red-200'],
    indigo: ['text-indigo-600', 'bg-indigo-200'],
  };

  let textColor = colors[color][0];
  let bgColor = colors[color][1];

  const mensaje = contenedor.querySelector(`.res-${tipoData}-msg`);
  const mensajeError = contenedor.querySelector('.res-error-msg');
  let resContainer;
  let p;

  if (tipoMsg === 'error') {
    if (mensajeError) {
      mensajeError.textContent = msg;
    }
  } else {
    if (mensajeError) {
      mensajeError.remove();
    }
  }

  if (mensaje) {
    mensaje.querySelector('p').textContent = msg;
  } else {
    resContainer = document.createElement('div');

    p = document.createElement('p');
    p.textContent = msg;
    p.classList.add('text-sm', textColor);

    resContainer.className = `res-${tipoData}-msg ${tipoMsg}-msg flex justify-between items-center py-2 px-4 mt-3 rounded ${bgColor} opacity-0 transition-opacity duration-300`;
    resContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="closeRes h-4 w-4 cursor-pointer fill-current ${textColor}" onclick="eliminarResultado(event)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`;
    const closeIcon = resContainer.querySelector('svg');
    resContainer.insertBefore(p, closeIcon);
    contenedor.appendChild(resContainer);

    setTimeout(() => {
      resContainer.classList.remove('opacity-0');
      resContainer.classList.add('opacity-100');
    }, 1);
  }
}
