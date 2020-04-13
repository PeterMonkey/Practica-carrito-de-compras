//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');


//Listeners
cargarEventListener();

function cargarEventListener() {
    //dispara cuando se presiona "Agregar carrito"
    cursos.addEventListener('click', comprarCurso);
}




//Funciones
//funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
      // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;
      // Enviamos el curso seleccionado para tomar sus datos
       leerDatosCurso(curso);
    }

}

//lee los datos del curso

function leerDatosCurso(curso) {
    const infoCurso = {
      imagen: curso.querySelector('img').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector('.precio span').textContent,
      id: curso.querySelector('a').getAttribute('data-id')
    }

    console.log(infoCurso);
}
