const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputLibreta = document.getElementById("libreta");
const boton = document.getElementById("mostrarDatos");

boton.addEventListener("click", () => {
    alert(`Los datos ingresados son: Nombre: ${inputNombre.value} Apellido: ${inputApellido.value} Libreta Universitaria: ${inputLibreta.value}`);
});