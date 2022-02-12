/*---------Variables globales---------*/

const btnIniciar = document.querySelector('#btn-iniciar');
let tableroCanvas = document.querySelector('#tablero-canvas');
const palabras = ['auto', 'moto', 'bicicleta', 'teclado', 'almacen'];
const controlLetras = document.querySelector('.control-letras');

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

function corroborarLetra(palabra){
    let vidas = 5;
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
                vidas--
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

const pincel = tableroCanvas.getContext('2d');
    pincel.fillStyle = 'teal';
    pincel.strokeStyle = 'teal';
    pincel.beginPath();
    pincel.moveTo(10, 400);
    pincel.lineTo(10, 0);
    pincel.lineTo(150, 0);
    pincel.lineTo(150, 20);
    pincel.stroke();
    pincel.closePath();

    pincel.arc(150, 35, 15, 0, (2 * 3.14));
    pincel.stroke();
    

