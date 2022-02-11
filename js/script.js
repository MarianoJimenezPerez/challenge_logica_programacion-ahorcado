/*---------Variables globales---------*/

const btnIniciar = document.querySelector('#btn-iniciar');
const containerTableroCanvas = document.querySelector('#container-tablero-canvas');
const palabras = ['auto', 'moto', 'bicicleta'];
const arrayPalabraSorteada = [];

/*---------Funciones---------*/

function escogerPalabra(arrayDePalabras){
    const n = Math.floor(Math.random() * arrayDePalabras.length);
    arrayPalabraSorteada.push(arrayDePalabras[n])
    return arrayDePalabras[n];
}

function dibujarTablero() {
    containerTableroCanvas.innerHTML = '';
    const tCanvas = document.createElement('canvas');
    tCanvas.classList.add('tablero-canvas');
    containerTableroCanvas.appendChild(tCanvas);

    const div = document.createElement('div');
    div.classList.add('w-50');
    containerTableroCanvas.appendChild(div);

    const p1 = document.createElement('p');
    p1.classList.add('letras-fallidas');
    p1.classList.add('t-center');
    div.appendChild(p1)

    const p2 = document.createElement('p');
    p2.classList.add('palabra-encriptada');
    p2.classList.add('t-center');
    div.appendChild(p2);
}

function dibujarGuiones(palabra){
    const nCaracteres = palabra.length;
    const palabraEncriptada = document.querySelector('.palabra-encriptada');
    palabraEncriptada.innerHTML = '';
    for( i = 0; i < nCaracteres; i++){
        palabraEncriptada.innerHTML += ' _ ';
    };
}

function dibujarLetraCorrecta(letra){

}
function corroborarLetra(){
    window.addEventListener('keypress', (e) => {
        if(e.keyCode > 96 && e.keyCode < 123){
            let palabraEncriptada = document.querySelector('.palabra-encriptada');
            palabraEncriptada.innerHTML = '';
            let nuevaPalabra = [];
            let letraPresionada = e.key;
            let palabra = arrayPalabraSorteada[0];
            let acierto = false;
            for (i = 0; i < palabra.length; i++){
                if( letraPresionada == palabra[i]){
                    nuevaPalabra.push(letraPresionada)
                } else {
                    nuevaPalabra.push('_')
                }
            }
            return palabraEncriptada.innerHTML = nuevaPalabra;
        } else {
            return alert("Debe presionar una letra");
        }
    });
}
/*---------Listeners---------*/

btnIniciar.addEventListener('click', () => {
    const palabraSorteada = escogerPalabra(palabras);
    dibujarTablero();
    dibujarGuiones(palabraSorteada);
    corroborarLetra();
});

/*---------Carga de DOM---------*/
