
    function procesarCadena() {
      let cadena = document.getElementById("cadena").value;
      let resultado = "";

      if (!/^[0-4?]+$/.test(cadena)) {
        document.getElementById("resultado").innerText = "❌ Solo números 0 - 4 y ?";
        return;
      }

      
      for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] === "?") {
          let izq = parseInt(cadena[i - 1]) || 0; 
          let der = parseInt(cadena[i + 1]) || 0; 
          resultado += (izq + der); 
        } else {
          resultado += cadena[i]; 
        }
      }

   
      document.getElementById("resultado").innerText = "✅ Resultado: " + resultado;
    }

   
    document.getElementById("btnProcesar").addEventListener("click", procesarCadena);