/*---------Variables globales---------*/

const btnIniciar = document.querySelector('#btn-iniciar');
const tableroCanvas = document.querySelector('#tablero-canvas');
const palabras = ['auto', 'moto', 'bicicleta'];
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
    const p = document.createElement('p');
    p.classList.add("palabra-encriptada")
    const palabraSpliteada = palabra.split('');
    const palabraEncriptada = palabraSpliteada.map(letra => letra.replace(letra, "_"))
    p.innerHTML = palabraEncriptada.join(" ");
    return controlLetras.appendChild(p)
}

/*function dibujarLetraCorrecta(letra){

}*/
function corroborarLetra(palabra){
    let vidas = 5;
    let palabraSpliteada = palabra.split('');
    let palabraEncriptada = palabraSpliteada.map(letra => letra.replace(letra, "_"))
    window.addEventListener('keypress', (e) => {
        if(e.keyCode > 96 && e.keyCode < 123){
            let letraPresionada = e.key;
            let indexOf = palabra.indexOf(letraPresionada)
            if(indexOf != '-1'){
                palabraEncriptada[indexOf] = letraPresionada
            } else{
                vidas--
            }
            /*let letraPresionada = e.key;
            for (i = 0; i < palabraSpliteada.length; i++){
                if( letraPresionada == palabra[i]){
                    palabraEncriptada[i] = palabra[i];
                }
            }
            const p = document.querySelector('.palabra-encriptada');
            p.innerHTML = palabraEncriptada.join(' ');*/
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
