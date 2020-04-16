//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody'); 
const vaciarElCarrito = document.querySelector('#vaciar-carrito');


//Listeners
cargarEventListener();

function cargarEventListener() {
    //dispara cuando se presiona "Agregar carrito"
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar carrito
    vaciarElCarrito.addEventListener('click', vaciarCarrito);

    //Al cargar documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
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
       alert('El curso se ha agregado a su carrito');
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

    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
const row = document.createElement('tr'); // tr= table row
       row.innerHTML = ` 
          <td>
             <img src="${curso.imagen}"
          </td>
          <td>${curso.titulo}</td>   
          <td>${curso.precio}</td> 
          <td>
             <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td> 
        `;  
        listaCursos.appendChild(row); 
        guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  let curso, cursoId;
  if(e.target.classList.contains('borrar-curso') ) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
    alert('Se a eliminado este elemento');
  }
  eliminarCursoLocalStorage(cursoId);
  
}

//elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  //forma lenta
  //listaCursos.innerHTML = '';
  //forma rapida y recomendada
  while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
  }

  // vaciar Local Storage
  vaciarLocalStorage();

  return false;
}

//Almacena cursos en el carrito a localstorage

function guardarCursoLocalStorage(curso){
 let cursos;

 //toma el valor de un arreglo con datos de LS o vacio
 cursos = obtenerCursosLocalStorage();
 
 //El curso seleccionado se agrega al arreglo
 cursos.push(curso);

 localStorage.setItem('cursos', JSON.stringify(cursos) );  
}

// Comprueba que haya elementos en el Local Storage
function obtenerCursosLocalStorage(){
  let cursosLS;

  //Comprobamos si hay algo en el Local Storage
  if(localStorage.getItem('cursos') === null){
    cursosLS = [];
  }else {
    /*let LS = localStorage.getItem('cursos');
    if(cursosLS.includes(LS) === true){
            alert('Este elemento ya existe en el carrito');
    }else{*/
    cursosLS = JSON.parse(localStorage.getItem('cursos') );
    }

  return cursosLS;
}
//}

// Imprime los cursos de Local Storage en el carrito
function leerLocalStorage(){
  let cursosLs;

  cursosLs = obtenerCursosLocalStorage();

  cursosLs.forEach(function(curso){
   //construir el template
   const row = document.createElement('tr'); // tr= table row
       row.innerHTML = ` 
          <td>
             <img src="${curso.imagen}"
          </td>
          <td>${curso.titulo}</td>   
          <td>${curso.precio}</td> 
          <td>
             <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
          </td> 
        `;  
        listaCursos.appendChild(row); 
        
  });
}

//Elimina el curso por el ID en Local Storage

function eliminarCursoLocalStorage(curso){
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    // Iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index){
          if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
          }   
    });
    // Añadimos el arreglo actual a Storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

//Elimina todos los cursos de Local Storage

function vaciarLocalStorage(){
  localStorage.clear();
}