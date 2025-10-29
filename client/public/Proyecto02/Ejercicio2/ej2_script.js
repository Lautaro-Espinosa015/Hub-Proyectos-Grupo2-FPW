// 1. Patrón que valida solo enteros
const enteroRegex = /^-?\d+$/;

// 2. Referencias al DOM
const btn = document.getElementById('btnCalcular');
const salida = document.getElementById('salida');

// 3. Listener de clic
btn.addEventListener('click', () => {
  // 4. Solicitar valores
  const a = prompt('Ingresa el primer número entero:');
  const b = prompt('Ingresa el segundo número entero:');
  const c = prompt('Ingresa el tercer número entero:');

  // 5. Validar con regex
  if (!enteroRegex.test(a) || !enteroRegex.test(b) || !enteroRegex.test(c)) {
    salida.textContent =
      'Debes ingresar solo números enteros (sin decimales ni texto).';
    return;
  }

  // 6. Parsear y calcular
  const n1 = parseInt(a, 10);
  const n2 = parseInt(b, 10);
  const n3 = parseInt(c, 10);
  const promedio = (n1 + n2 + n3) / 3;

  // 7. Mostrar resultado
  salida.textContent = `El promedio de ${n1}, ${n2} y ${n3} es ${promedio.toFixed(2)}`;
});