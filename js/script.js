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
    window.addEventListener('keypress', (e) => {
        let palabraDecodificada = []
        if(e.keyCode > 96 && e.keyCode < 123){
            let letraPresionada = e.key;
            for (i = 0; i < palabra.length; i++){
                if( letraPresionada == palabra[i]){
                    palabraDecodificada.push(palabra[i])
                    /*let palabraEncriptada = document.querySelector('.palabra-encriptada').textContent;
                    palabraEncriptada = letraDescubierta*/
                    /*let modificada = 
                    palabraEncriptada.replace([i * 2], letraPresionada)*/
                } else if(palabraDecodificada[i] != ''){
                    palabraDecodificada[i] = palabraDecodificada[i]
                }
                else {
                    palabraDecodificada[i] = '_'
                }
            }
            console.log(palabraDecodificada)
        } else {
            return alert("Debe presionar una letra");
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
