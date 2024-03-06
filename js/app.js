//Se crea el escucha del evento click al logo alura
let logoApp = document.getElementById("logoAlura");
// Se crea un escucha de evento para aplicar la funcion toggleDarkClass
document.getElementById("darkMode").addEventListener("change", toggleDarkTheme);
//Se crea el escucha del evento click al btn-encriptar
document.getElementById("btn-encriptar").addEventListener("click", btnEncriptarValidationFunction);
//Se crea el escucha del evento click al btn-encriptar
document.getElementById("btn-desencriptar").addEventListener("click", btnDesencriptarValidationFunction);
//Se crea escucha del boton copiar 
const botonCopiar = document.getElementById("btn-copiar");
// textarea donde se ingresa la informacion el usuario
let cajaTexto = document.getElementById("cajaTexto");
// imagen de persona con lupa
let menecoContainter = document.getElementById("meneco-container");
// El texto de que no se ingreso texto
let noEncripTextContainer = document.getElementById("encrip-text-container");
// parrafo que tendra el resultado del texto encriptado o desencriptado
let resultText = document.getElementById("result-text");
// variables que almacenaral el texto orinal y encritado y desencriptado
let textoOriginal, textoEncriptado, textoDesencriptado;

// Agregar un evento de clic a la imagen de alura
logoApp.addEventListener("click", function () {
  // Recargar la página
  location.reload();
});

// Funcion para cambiar el color de fondo de la aplicacion
function toggleDarkTheme() {
  let checkbox = document.getElementById("darkMode");
  let body = document.body;
  let btnCopy = document.getElementById("btn-copy");

  if (checkbox.checked) {
    body.classList.add("darkTheme");
    btnCopy.classList.add("btn-outline-light");
    btnCopy.classList.remove("btn-outline-secondary");
  } else {
    body.classList.remove("darkTheme");
    btnCopy.classList.remove("btn-outline-light");
    btnCopy.classList.add("btn-outline-secondary");
  }
} // fin de la funcion toggleDarkClass

function btnEncriptarValidationFunction() {
  if (cajaTexto.value.trim() !== "") {
    resultText.classList.remove("ocultar");
    cajaTexto.removeAttribute("required");
    cajaTexto.classList.remove("required");
    menecoContainter.classList.add("ocultar");
    noEncripTextContainer.classList.add("ocultar");
    textoOriginal = cajaTexto.value;
    textoEncriptado = encriptar(textoOriginal);
    console.log(textoEncriptado);
    resultText.textContent = textoEncriptado;
  } else {
    cajaTexto.setAttribute("required", "true");
    cajaTexto.classList.add("required");
    menecoContainter.classList.remove("ocultar");
    noEncripTextContainer.classList.remove("ocultar");
    resultText.classList.add("ocultar");
    cajaTexto.focus();
    cajaTexto.click();

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No ingreso texto en el campo de texto!",
    });
  }
}

function btnDesencriptarValidationFunction() {
  if (cajaTexto.value.trim() !== "") {
    resultText.classList.remove("ocultar");
    cajaTexto.removeAttribute("required");
    cajaTexto.classList.remove("required");
    menecoContainter.classList.add("ocultar");
    noEncripTextContainer.classList.add("ocultar");
    textoOriginal = cajaTexto.value;
    textoDesencriptado = desEncriptar(textoOriginal);
    console.log(textoDesencriptado);
    resultText.textContent = textoDesencriptado;
  } else {
    cajaTexto.setAttribute("required", "true");
    cajaTexto.classList.add("required");
    menecoContainter.classList.remove("ocultar");
    noEncripTextContainer.classList.remove("ocultar");
    resultText.classList.add("ocultar");
    cajaTexto.focus();
    cajaTexto.click();

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No ingreso texto en el campo de texto!",
    });
  }
}

// Funcion para encriptar el texto
function encriptar(mensaje) {
  // Definir un objeto con las letras a cambiar como claves y las letras de reemplazo como valores
  let letrasACambiar = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  // Utilizar expresiones regulares y el método replace para reemplazar las letras
  return mensaje.replace(/[aeo]/g, function (letra) {
    return letrasACambiar[letra] || letra; // Si la letra no está en el objeto, se deja sin cambios
  });
}

// Funcion para desEncriptar el texto
function desEncriptar(mensaje) {
  let letrasACambiar = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };

  // Utilizar el método replace para reemplazar las letras según las claves del objeto letrasACambiar
  for (let clave in letrasACambiar) {
    mensaje = mensaje.replace(new RegExp(clave, "g"), letrasACambiar[clave]);
  }

  return mensaje;
}


// Agregar un evento de clic al botón
botonCopiar.addEventListener("click", function() {
    // Intentar copiar el texto al portapapeles
    if (resultText.textContent !== "") {
      navigator.clipboard.writeText(resultText.textContent)
      .then(() => {
          // Éxito
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Texto copiado al portapapeles",
              showConfirmButton: false,
              timer: 1500
            });
      })
      .catch(err => {
          // Error
          console.error('Error al intentar copiar el texto: ', err);
      });
    } else {
      cajaTexto.setAttribute("required", "true");
      cajaTexto.classList.add("required");
      menecoContainter.classList.remove("ocultar");
      noEncripTextContainer.classList.remove("ocultar");
      cajaTexto.focus();
      cajaTexto.click();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No existe texto a copiar!",
        footer: "Ingrese texto en el campo de texto"
      });
    }
    
});
