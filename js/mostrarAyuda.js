// Autor: Álvaro Pereira
// Fecha: 05-06-2023
// Nombre: mostrarAyuda.js
// Descripción: Archivo javascript que tiene como función abrir y cerrar la ventana de ayuda de la página principal

document.addEventListener('DOMContentLoaded', () => { // Cargo el evento DOMContentLoaded para así tener que evitar la espera de imagenes u otras acciones de este caracter 
    let enlaceReglas = document.querySelector('.botones-main[href="#"]'); // Devuelvo el primer elemento y lo asigno a la variable
    let enlaceCerrar = document.querySelector('.reglas-content .enlance-especial'); // Devuelvo el primer elemento y lo asigno a la variable
    let reglasContent = document.querySelector('.reglas-content'); // Devuelvo el primer elemento y lo asigno a la variable
  
    enlaceReglas.addEventListener('click', (e) => { // Cargo el evento al hacer click sobre el enlace Ayuda, abre la ventana de ayuda
      e.preventDefault();
      reglasContent.style.display = 'block';
    });
  
    enlaceCerrar.addEventListener('click', (e) => { // Cargo el evento al hacer click sobre el enlace cerrar, que cierra el div que contiene la información de Ayuda
      e.preventDefault();
      reglasContent.style.display = 'none';
    });
  });
  