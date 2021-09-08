const cupones = ['JuanDC_es_Batman', 'pero_no_le_digas_a_nadie', 'es_un_secreto'];
const descuentos = {
  JuanDC_es_Batman: 15,
  pero_no_le_digas_a_nadie: 30,
  es_un_secreto: 25,
};

document.addEventListener('DOMContentLoaded', () => {
  const btnCupones = document.querySelector('#btnMostrarCupones');
  const btnDescuento = document.querySelector('#btnDescuento');

  btnCupones.addEventListener('click', mostrarCupones);

  btnDescuento.addEventListener('click', calcularDescuento);
  mostrarprecioRandom();
});

function quitarCupones() {
  const msgCupones = document.querySelectorAll('.cupon-msg');
  msgCupones.forEach((cupon) => cupon.remove());
}

function calcularDescuento() {
  const contenedor = document.querySelector('.card.discount');
  const strPrecio = document.querySelector('#precio');
  const precio = parseInt(strPrecio.textContent.replace('$', ''));
  const cupon = document.querySelector('#inputCupon').value;
  let msg;

  if (cupon) {
    const descuento = descuentos[cupon];
    const precioFinal = precio - precio * (descuento / 100);
    strPrecio.textContent = `$${precio}  →  $${precioFinal.toFixed(2)}`;

    quitarCupones();

    msg = `Descuento del ${descuento}% aplicado`;

    mostrarMensaje(contenedor, 'res', 'descuento', msg, 'blue');
  } else {
    msg = 'No se aplico ningun descuento';
    mostrarMensaje(contenedor, 'error', 'error', msg, 'red');
  }
}

function mostrarprecioRandom() {
  const pPrecio = document.querySelector('#precio');

  const precio = Math.floor(Math.random() * (2000 - 400)) + 400;

  pPrecio.textContent = `$${precio}`;
}

function mostrarCupones() {
  const contenedor = document.querySelector('.card.discount');
  cupones.forEach((cupon) => {
    mostrarMensaje(contenedor, 'cupon', `cupon-${cupones.indexOf(cupon)}`, cupon, 'green');
  });

  const msgCupones = document.querySelectorAll('.cupon-msg');
  const inputCupon = document.querySelector('#inputCupon');

  msgCupones.forEach((cupon) => {
    cupon.classList.add('cursor-pointer');

    cupon.addEventListener('click', () => {
      const txtCupon = cupon.querySelector('p');
      inputCupon.value = txtCupon.textContent;

      cupon.removeEventListener('click', quitarCupones());
    });
  });
}
