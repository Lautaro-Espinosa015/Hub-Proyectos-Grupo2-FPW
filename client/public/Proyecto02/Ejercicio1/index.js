function calcularMayor(numero1, numero2) {
  if (numero1 > numero2) {
    alert("El número " + numero1 + " es mayor que " + numero2);
  } else if (numero2 > numero1) {
    alert("El número " + numero2 + " es mayor que " + numero1);
  } else {
    alert("Ambos números son iguales: " + numero1);
  
  }
}

function probarMayor() {
  let n1 = parseFloat(document.getElementById("n1").value);
  let n2 = parseFloat(document.getElementById("n2").value);
  calcularMayor(n1, n2);
}
