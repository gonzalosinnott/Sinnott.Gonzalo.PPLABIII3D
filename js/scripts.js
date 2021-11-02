import { Anuncio_Auto } from "./anuncio.js";
import { crearTabla } from "./tabla.js";

const $divTabla = document.getElementById("divTabla");

const anuncios =  JSON.parse( localStorage.getItem( 'anuncios' )) || [] ;

const $formulario = document.forms[0];

actualizarTabla();
resetForm(); 


localStorage.setItem('anuncios', JSON.stringify(anuncios));

function resetForm(){
    $formulario.reset();
    $formulario.txtId.value = '';
    const tituloForm = document.getElementById("tituloForm");
    tituloForm.textContent = "CARGAR ANUNCIO";

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = true;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = true;
}


window.addEventListener("click", (e)=>{

    if(e.target.matches("td")){
        
        const id = e.target.parentElement.id;
        cargarFormulario(anuncios.find((anuncio)=> anuncio.id == id));

        const tituloForm = document.getElementById("tituloForm");
        tituloForm.textContent = "MODIFICAR / BORRAR ANUNCIO: ID " + id;

    }else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        resetForm();        
    }
    else if(e.target.matches("#btnCancel")){
        resetForm();        
    }    
});

$formulario.addEventListener("submit", (e) => {
    

    e.preventDefault();

    const {txtId, txtTitulo, txtTransaccion, txtDescripcion, txtPrecio, txtPuertas, txtKms, txtPotencia} = $formulario;
    
    const formAnuncio = new Anuncio_Auto(parseInt(txtId.value), txtTitulo.value, txtTransaccion.value, txtDescripcion.value, txtPrecio.value, txtPuertas.value, txtKms.value, txtPotencia.value);
    
    if($formulario.txtId.value === ''){
        formAnuncio.id = getMaxId() + 1;
        handlerCreate(formAnuncio);
        console.log(formAnuncio);
    }
    else{
        formAnuncio.id = parseInt(formAnuncio.id);
        handlerUpdate(formAnuncio);
    }
    resetForm();
});

function getMaxId() {
    if(anuncios.length == 0){
        return 0 ;
    }
    else{
    return anuncios.reduce((prev, current) => (+prev.id > +current.id) ? prev : current).id;
    }
}

const handlerCreate = (nuevoAnuncio)=>{
    
    anuncios.push(nuevoAnuncio);
    actualizarStorage(anuncios);
    actualizarTabla();
    console.log(anuncios);
};

const handlerUpdate = (anuncioEditado)=>{

    console.log(anuncioEditado);
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == anuncioEditado.id;
    })

    anuncios.splice(indice, 1);
    anuncios.push(anuncioEditado);

    actualizarStorage(anuncios);
    actualizarTabla();
    console.log(anuncios);
};


const handlerDelete = (id) => {

    if (confirm("Quiere eliminar el anuncio ?")) {
        const indice = anuncios.findIndex((anuncio)=>{
            return anuncio.id == id;
        })

        anuncios.splice(indice, 1);

        actualizarStorage(anuncios);
        actualizarTabla();
    }
};

const actualizarStorage = (data)=>{
    localStorage.setItem('anuncios', JSON.stringify(data));
};

function actualizarTabla() {

    if (localStorage.length !== 0) {

        while ($divTabla.hasChildNodes()) {
            $divTabla.removeChild($divTabla.firstElementChild);
        }
        const data = JSON.parse(localStorage.getItem("anuncios"));
        $divTabla.appendChild(crearSpinner());

        setTimeout(() => {
            while ($divTabla.hasChildNodes()) {
                $divTabla.removeChild($divTabla.firstElementChild)
            }
            const data = JSON.parse(localStorage.getItem('anuncios'));
            if (data) {
                sortTabla(anuncios);
                $divTabla.appendChild(crearTabla(anuncios));                
            }
        }, 3000);
    }
};

function crearSpinner() {
    const spinner = document.createElement("img");
  
    spinner.width = 300;
    
    spinner.src = "./assets/spin.gif";
    spinner.alt = "Progressbar";
  
    return spinner;
};

function cargarFormulario(anuncio) {

    mostrarBotones();

    const {txtId, txtTitulo, txtTransaccion, txtDescripcion, txtPrecio, txtPuertas, txtKms, txtPotencia} = $formulario;

    txtId.value = parseInt(anuncio.id);
    txtTitulo.value= anuncio.titulo;
    txtTransaccion.value = anuncio.transaccion;
    txtDescripcion.value = anuncio.descripcion;
    txtPrecio.value = anuncio.precio;
    txtPuertas.value= anuncio.puertas;
    txtKms.value= anuncio.kms;
    txtPotencia.value= anuncio.potencia;
};

function mostrarBotones() {

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = false;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = false;
};

function sortTabla(array) {
    array.sort((a, b) => {
        return a.titulo - b.titulo;
    });  
        
};
