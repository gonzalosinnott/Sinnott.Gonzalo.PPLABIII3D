
const anuncios =  JSON.parse( localStorage.getItem( 'anuncios' )) || [] ;

console.log(anuncios);

actualizarAnucios();

function actualizarAnucios(){
    anuncios.forEach((element)=>{

        const titulo = document.createElement("h3");
        const descripcion = document.createElement("h4");
        const precio = document.createElement("p");
        const puertas = document.createElement("p");
        const kilometros = document.createElement("p");
        const potencia = document.createElement("p");
        const divisor = document.createElement("p");

        for (const key in element) {
            switch(key){
                case "titulo":
                    titulo.innerHTML = element[key];
                    break;
                case "descripcion":
                    descripcion.innerHTML = element[key];
                    break;
                case "precio":
                    precio.innerHTML = "$ " + element[key];
                    break;
                case "puertas":
                    puertas.innerHTML = "Puertas: " + element[key];
                    break;
                case "kms":
                    kilometros.innerHTML ="Kilometros: " + element[key];
                    break;
                case "potencia":
                    potencia.innerHTML ="Potencia: " + element[key];
                    break;
            }
            divisor.innerHTML = "----------------------------";                              
        }    

        document.getElementById('divAnuncios').appendChild(titulo);
        document.getElementById('divAnuncios').appendChild(descripcion);
        document.getElementById('divAnuncios').appendChild(precio);
        document.getElementById('divAnuncios').appendChild(puertas);
        document.getElementById('divAnuncios').appendChild(kilometros);
        document.getElementById('divAnuncios').appendChild(potencia);
        document.getElementById('divAnuncios').appendChild(divisor);
    });
};

