// Autor: Álvaro Pereira
// Fecha: 05-06-2023
// Nombre: juego.js
// Descripción: Archivo javascript que tiene como función el control del funcionamiento del juego Piedra, Papel o Tijera y las funciones de mostrar las ventanas de juego y puntuación

document.addEventListener("DOMContentLoaded", function () { // Cargo el evento DOMContentLoaded para así tener que evitar la espera de imagenes u otras acciones de este caracter 
  let botonesJugador = Array.from( // Guardo en un array los elementos del DOM con la clase boton-jugador, para manipurarlos más adelante.
    document.querySelectorAll(".boton-jugador") // 
  );
  let contador = document.querySelector(".contador p"); // Selecciono el parrafo del div contador para mostrar el mensaje del contador, del ganador y del reinicio del juego
  let iaPuntuacion = document.querySelector("#iaPuntuacion"); // Selecciono el parrafo de la puntuación de la IA
  let jugadorPuntuacion = document.querySelector("#jugadorPuntuacion"); // Selecciono el parrafo de la puntuación del jugador

  // Agregar el evento click al enlace de volver
  let enlacePuntuacion = document.querySelector(".botones-main"); // Selecciono el primer enlace de la clase .botones-main, con el manipulo las ventanas de puntuación y juego
  let juegoEstado = document.querySelector(".juego-estado"); // Selecciono la 'caja' que contiene el div del juego
  let puntuacionContent = document.querySelector(".puntuacion-content"); // Selecciono la 'caja' que contiene la puntuación

  enlacePuntuacion.addEventListener("click", function (event) { // Evento que se dispara cuando se hace clic en el enlace de puntuacion para manipular las ventanas de juego y puntuación
    event.preventDefault();
    if (juegoEstado.style.display === "none") {  // Muestro el juego
      juegoEstado.style.display = "flex";
      puntuacionContent.style.display = "none";
    } else { // Muestro la puntuación
      juegoEstado.style.display = "none";
      puntuacionContent.style.display = "flex";
    }
  });

  let iaPuntos = 0; // Inicio la puntuacion de la IA a 0
  let jugadorPuntos = 0; // Inicio la puntuacion del jugador a 0

  function manejarJugadaJugador(e) { // Función para deshabilitar los botones del jugador una vez haya clickado, para evitar hacer entrar en bucle al juego u otros errores
    botonesJugador.forEach((boton) => { // Recorro el array de botones
      boton.disabled = true; // Los deshabilito 
    });

    let opcionJugador = e.target.innerText; // Inicio la opción elegida por el jugador. Si clickó sobre el botón piedra, pues extraigo el texto de ese boton
    e.target.classList.add("boton-seleccionado"); // Agrego la clase que cambia el tamaño del botón en el que se clickó, para diferencia el botón con el que se empezó la partida por parte del jugador

    // Mostrar la cuenta atrás desde 3 hasta 1 y reinicio la partida despues de mostrar el ganador de la ronda
    let cuenta = 3; // Inicializo la cuenta en 3
    contador.innerText = cuenta; // Añado el conteo al parrafo del div contador
    let cuentaAtras = setInterval(() => { // Creo el intervalo de cuenta atrás
      cuenta--; // Resto valor a la cuenta 
      if (cuenta === 0) { // Cuando llega a 0, limpio el intervalo, asigno los resultados y los muestro. Después, muestro el mensaje de reinicio y reinicio la partida
        clearInterval(cuentaAtras); // Limpio el intervalo
        let opcionIA = generarJugadaIA(); // Asigno la opción escogida por la ia a la función generarJugadaIA()
        let resultado = evaluarJugadas(opcionJugador, opcionIA); // Compruebo el resultado
        mostrarResultado(resultado, opcionIA); // Muestro el resultado
        setTimeout(() => {
          contador.innerText = "Reiniciando partida...";
          setTimeout(() => {
            reiniciarPartida();
            resetearBotones(); // Restablecer el tamaño de los botones después de reiniciar
          }, 2000);
        }, 1000);
      } else {
        contador.innerText = cuenta;
      }
    }, 1000);
  }

  function resetearBotones() { // Función para resetear el tamaño de los botones del jugador después de reiniciar la partida
    botonesJugador.forEach((boton) => {
      boton.classList.remove("boton-seleccionado");
    });
  }

  function generarJugadaIA() { // Función para generar una jugada (respuesta) aleatoria para la IA
    let opcionesIA = botonesJugador.map((boton) => boton.innerText); // Obtengo el texto de cada botón de la IA (Piedra, papel o tijera)
    return opcionesIA[Math.floor(Math.random() * opcionesIA.length)]; // Devuelvo un texto aleatorio
  }

  function evaluarJugadas(opcionJugador, opcionIA) { // Función para evaluar las jugadas y determinar el ganador
    if (opcionJugador === opcionIA) { // Si la respuesta es igual -> Empate, sino comparo todas las posibilidades
      return "Empate";
    }
    if (
      (opcionJugador === "Piedra" && opcionIA === "Tijera") ||
      (opcionJugador === "Papel" && opcionIA === "Piedra") ||
      (opcionJugador === "Tijera" && opcionIA === "Papel")
    ) {
      jugadorPuntos++;
      jugadorPuntuacion.innerText = jugadorPuntos;
      return "El jugador gana";
    }
    iaPuntos++;
    iaPuntuacion.innerText = iaPuntos;
    return "La IA gana";
  }

  function mostrarResultado(resultado, opcionIA) { // Función para mostrar el resultado en el DOM y hacer mas grande el botón-respuesta de la IA, para dar a entender que respuesta escogió
    let resultadoElemento = document.createElement("p");
    resultadoElemento.textContent = resultado;
    contador.innerText = "";
    contador.insertBefore(resultadoElemento, contador.firstChild);
    let botonesIA = document.querySelectorAll(".boton-IA");
    botonesIA.forEach((boton) => {
      if (boton.innerText === opcionIA) {
        boton.style.transform = "scale(1.25)";
      }
    });
  }

  function reiniciarPartida() { // Función para reiniciar el juego y para habilitar los botones del jugador
    botonesJugador.forEach((boton) => {
      boton.disabled = false;
    });
    contador.innerText = ""; // Restablezco la cuenta atrás
    let resultadoElemento = contador.querySelector("p"); // Elimino el resultado mostrado
    if (resultadoElemento) {
      resultadoElemento.remove();
    }
    botonesJugador.forEach((boton) => { // Restablezco el tamaño de los botones del jugador
      boton.style.transform = "";
    });
    
    let botonesIA = document.querySelectorAll(".boton-IA"); // Restablezco el tamaño de los botones de la IA
    botonesIA.forEach((boton) => {
      boton.style.transform = "";
    });

    botonesJugador.forEach((boton) => { // Restablezco el :hover en los botones del jugador 
      boton.classList.add("hoverable");
    });
  }

  botonesJugador.forEach((boton) => { // Agrego el evento click a los botones del jugador para empezar la partida
    boton.addEventListener("click", manejarJugadaJugador);
  });

});
