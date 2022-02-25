/*---------Variables globales---------*/

const btnIniciar = document.querySelector('#btn-iniciar');
let tableroCanvas = document.querySelector('#tablero-canvas');
const palabras = ['auto', 'moto', 'bicicleta', 'teclado', 'almacen'];
const controlLetras = document.querySelector('.control-letras');
const arrayLetrasIncorrectas = [];
let vidas = 5;

/*---------Funciones---------*/

function escogerPalabra(){
    const palabraAlAzar = palabras[Math.floor(Math.random() * palabras.length)]
    return palabraAlAzar
}

function limpiarTablero() {
    tableroCanvas.innerHTML = '';
}

function dibujarGuiones(palabra){
    controlLetras.innerHTML = ''; // limpio por si se había jugado antes
    const p = document.createElement('p');
    p.classList.add("palabra-encriptada")
    const palabraSpliteada = palabra.split('');
    const palabraEncriptada = palabraSpliteada.map(letra => letra.replace(letra, "_"))
    p.innerHTML = palabraEncriptada.join(" ");
    return controlLetras.appendChild(p)
}

function dibujarCanvas(tablero, vidas){
    const pincel = tablero.getContext('2d');
    if(vidas == 4){
        // Dibuja colgante ahorcado
        pincel.fillStyle = 'teal';
        pincel.strokeStyle = 'teal';
        pincel.beginPath();
        pincel.moveTo(10, 400);
        pincel.lineTo(10, 0);
        pincel.lineTo(150, 0);
        pincel.lineTo(150, 20);
        pincel.stroke();
        pincel.closePath();
    }
    if(vidas == 3){
        // Dibuja cabeza
        pincel.arc(150, 35, 15, 0, (2 * 3.14));
        pincel.stroke();
    }
}

function dibujarLetraIncorrecta(letra){
    let encontrado = false;
    const letrasIncorrectas = document.querySelector('#letras-incorrectas');
    for ( i = 0; i < arrayLetrasIncorrectas.length; i++){
        let letrai = arrayLetrasIncorrectas[i];
        if ( letrai == letra){
            encontrado = true;
        }
    }

    if(encontrado){
        alert('Ya pulsaste esta letra')
    } else{
        vidas--
        arrayLetrasIncorrectas.push(letra);
        dibujarCanvas(tableroCanvas, vidas)
        const letrasSplit = arrayLetrasIncorrectas.join(' - ');
        letrasIncorrectas.innerHTML = letrasSplit;
    }
}

function corroborarLetra(palabra){
    let palabraSpliteada = palabra.split('');
    let palabraEncriptada = palabraSpliteada.map(letra => letra.replace(letra, "_"))
    window.addEventListener('keypress', (e) => {
        if(e.keyCode > 96 && e.keyCode < 123){
            let indices = [];   //aqui se pushearan todos los indices donde se encuentre la letra presionada
            let letraPresionada = e.key;
            let indexOf = palabra.indexOf(letraPresionada);  //si retorna -1 es porque no se encontró, por lo cual no se pushearía nada al array de indices
            while ( indexOf != -1 ) {
                indices.push(indexOf)
                indexOf = palabra.indexOf(letraPresionada, (indexOf+1));
            }
            if(indices != ''){ //si el array de indices no está vacio, es porque hay coincidencias
                for( i = 0; i < indices.length; i++){
                    let indice = indices[i];
                    palabraEncriptada[indice] = letraPresionada;
                }
            }else{ //si el array de indices está vacio, debemos descontar vidas
                dibujarLetraIncorrecta(letraPresionada);
            }
            const p = document.querySelector('.palabra-encriptada');
            p.innerHTML = palabraEncriptada.join(' ');
        } else {
            alert('La tecla presionada no es una letra')
        }
    });
}

/*---------Listeners---------*/

btnIniciar.addEventListener('click', () => {
    const palabraSorteada = escogerPalabra();
    dibujarGuiones(palabraSorteada);
    corroborarLetra(palabraSorteada)
});

/*---------Carga de DOM---------*/


