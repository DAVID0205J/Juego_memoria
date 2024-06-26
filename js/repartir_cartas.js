import { lista_cartas_nivel } from "./data_cartas.js";

function construir_nivel(nivel) {
    function ordenarAleatorio(a, b) {
        return Math.random() - 0.5;
    }

    let todas_las_tarjetas = lista_cartas_nivel[nivel].concat(lista_cartas_nivel[nivel]);

    // Organiza de forma aleatoria la lista todas_las_cartas
    todas_las_tarjetas.sort(ordenarAleatorio);

    return todas_las_tarjetas;
}

export function repartirCartas(nivel) {
    let tablero = document.querySelector(".tablero");
    tablero.innerHTML = ""; // Limpiar el tablero antes de repartir nuevas cartas

    let todas_las_cartas = construir_nivel(nivel);
    todas_las_cartas.forEach((cada_carta) => {
        let carta = document.createElement("div");
        carta.classList.add("carta_trasera");
        carta.innerHTML = `<div class="carta_frontal">${cada_carta}</div>`;
        tablero.appendChild(carta);
    });

    // Evento para manejar el click en cada carta
    let todas_las_cartas_div = document.querySelectorAll(".carta_trasera");
    todas_las_cartas_div.forEach((cada_div) => {
        cada_div.addEventListener("click", () => {
            // Lógica para manejar el volteo de las cartas
            let cartas_descubiertas = document.querySelectorAll(".activar");

            if (cartas_descubiertas.length < 2) {
                cada_div.classList.add("activar");
                cartas_descubiertas = document.querySelectorAll(".activar");

                if (cartas_descubiertas.length === 2) {
                    let carta_1 = cartas_descubiertas[0].querySelector(".carta_frontal").textContent;
                    let carta_2 = cartas_descubiertas[1].querySelector(".carta_frontal").textContent;

                    if (carta_1 === carta_2) {
                        // Acciones cuando las cartas son iguales
                        contador_de_cartas++;
                        if (contador_de_cartas === todas_las_cartas.length / 2) {
                            Cargar_puntos(vidas.length, nivelActual);
                            // Aquí puedes mostrar una ventana emergente de "Siguiente nivel" si lo deseas
                        }
                        setTimeout(() => {
                            cartas_descubiertas.forEach((carta) => {
                                carta.classList.remove("activar");
                                carta.classList.add("ocultar");
                                carta.innerHTML = ""; // Limpiar el contenido de la carta
                            });
                            Cargar_acierto(carta_1); // Llamar función para cargar aciertos
                        }, 1000);
                    } else {
                        // Acciones cuando las cartas no son iguales
                        Actualizar_vidas(false);
                        setTimeout(() => {
                            cartas_descubiertas.forEach((carta) => {
                                carta.classList.remove("activar");
                            });
                        }, 1000);
                    }
                }
            }
        });
    });
}
