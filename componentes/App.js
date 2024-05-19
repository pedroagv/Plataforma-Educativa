import Estudiante from '../model/Estudiante.js'
import Curso from '../model/Curso.js'
import Instructor from '../model/Instructor.js';

document.addEventListener('DOMContentLoaded', () => {

    // metodo para listar los cursos al iniciar
    mostrarCursos();

    // metodo para listar los estudiantes al iniciar
    mostrarEstudiantes();

    // metodo para listar los estudiantes al iniciar
    mostrarInstructores();
    
});



// control del boton del formulario estudiantes
var frmestudiante = document.getElementById('frm-estudiante');
frmestudiante.addEventListener('submit', function (event) {
    event.preventDefault();

    var form = event.target;
    var nombre = form.nombre.value;
    var edad = form.edad.value;
    var cursos = form.cursos.value;
    const obj = new Estudiante(null, nombre, edad, JSON.parse(cursos));

    Estudiante.agregarEstudiante(obj);
    mostrarEstudiantes();
    showToast('Estudiante agregado con exito!');
    frmestudiante.reset();

});


// control del boton del formulario curso
var frmcurso = document.getElementById('frm-curso');
frmcurso.addEventListener('submit', function (event) {
    event.preventDefault();

    var form = event.target;
    var nombrecurso = form.nombrecurso.value;
    var duracion = form.duracion.value;
    var nivel = form.nivel.value;
    var instructores = JSON.parse(form.instructores.value);

    const obj = new Curso(null, nombrecurso, duracion, nivel, instructores);
    Curso.agregarCurso(obj);
    mostrarCursos();
    showToast('Curso agregado con exito!');
    frmcurso.reset();
});


// control del boton del formulario instructor
var frminstructor = document.getElementById('frm-instructor');
frminstructor.addEventListener('submit', function (event) {
    event.preventDefault();

    var form = event.target;
    var nombre = form.nombre.value;
    var edad = form.edad.value;
    var especialidad = form.especialidad.value;
    var cursos = [];

    const obj = new Instructor(null, nombre, edad, especialidad, cursos);
    Instructor.agregarInstructor(obj);
    mostrarInstructores();
    showToast('Instructor agregado con exito!');
    frminstructor.reset();
});

// accion para traer los instructores en una lista multiple
document.getElementById('btn-multiple-instructor').addEventListener('click', function () {

    mostrarInstructorAsociarCurso();

    const btnPrueba = document.getElementById('btnPrueba');

    const newBtnPrueba = btnPrueba.cloneNode(true);
    btnPrueba.parentNode.replaceChild(newBtnPrueba, btnPrueba);

    // accion para asociar los cursos y los estudiantes
    newBtnPrueba.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.list-group-item input[type="checkbox"]:checked');
        const selectedItems = Array.from(checkboxes).map(checkbox => checkbox.value);
        document.getElementById('instructores').value = JSON.stringify(selectedItems);
        showToast('Items agregados al formulario!');
    });

});

// accion para traer los instructores en una lista multiple
document.getElementById('btn-multiple-curso').addEventListener('click', function () {

    mostrarCursosAsociarEstudiante();

    const btnPrueba = document.getElementById('btnPrueba');

    const newBtnPrueba = btnPrueba.cloneNode(true);
    btnPrueba.parentNode.replaceChild(newBtnPrueba, btnPrueba);

    // accion para asociar los cursos y los estudiantes
    newBtnPrueba.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.list-group-item input[type="checkbox"]:checked');
        const selectedItems = Array.from(checkboxes).map(checkbox => checkbox.value);
        document.getElementById('cursos').value = JSON.stringify(selectedItems);
        showToast('Items agregados al formulario!');
    });
});

function mostrarEstudiantes() {
    let elemento = document.getElementById('listaestudiantes');
    elemento.innerHTML = '';
    let listaestudiantes = Estudiante.obtenerEstudiantes();

    if (listaestudiantes.length == 0) {
        elemento.innerHTML = `
        <a href="#" class="list-group-item list-group-item-action">
            <b>Actualmente no hay estudiantes inscritos.</b>
        </a>`;

        showToast('Actualmente no hay estudiantes inscritos.!','danger');

        return;
    }

    listaestudiantes.forEach(estudiante => {

        const nombresCursos = estudiante.cursos.map(curso_id => {
            const curso = Curso.obtenerCursoPorid(curso_id);
            return curso ? curso.nombrecurso : `id no encontrado: ${curso_id}`;
        });

        const cursosStr = nombresCursos.join(', ');

        elemento.innerHTML += `
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <b>Estudiante: </b> ${estudiante.nombre} <br/>
                <b>cursos: </b> ${cursosStr}
            </div>
            <div>
                <button class="btn btn-light btn-sm me-2">✏️</button>
                <button class="btn btn-light btn-sm me-2">🗑️</button>
            </div>
        </div>`;
    });
}

function mostrarCursos() {
    let elemento = document.getElementById('listacursos');
    elemento.innerHTML = '';
    let lista = Curso.obtenerCursos();

    if (lista.length == 0) {
        elemento.innerHTML = `
        <a href="#" class="list-group-item list-group-item-action">
            <b>Actualente no hay cursos disponibles:</b>
        </a>`;

        showToast('Actualente no hay cursos disponibles.!','danger');

        return;
    }

    lista.forEach(curso => {

        const nombresInstructores = curso.instructores.map(instructor_id => {
            const instructor = Instructor.obtenerInstructorPorid(instructor_id);
            return instructor ? instructor.nombre : `id no encontrado: ${instructor_id}`;
        });

        // Convertir el array de nombres de cursos en una cadena separada por comas
        const instructorStr = nombresInstructores.join(', ');

        elemento.innerHTML += `
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <b>id: </b>${curso.id}<br/>
                <b>Curso: </b> ${curso.nombrecurso} <br/>
                <b>Duracion: </b> ${curso.duracion} <br/>
                <b>Nivel: </b> ${curso.nivel} <br/>
                <b>Instructores: </b> ${instructorStr}
            </div>
            <div>
                <button class="btn btn-light btn-sm me-2">✏️</button>
                <button class="btn btn-light btn-sm me-2">🗑️</button>
            </div>
        </div>`;
    });

    mostrarCursosAsociarEstudiante();

}

function mostrarCursosAsociarEstudiante() {
    let elemento = document.getElementById('listaMultipleDisponibles');
    elemento.innerHTML = '';
    let listacursos = Curso.obtenerCursos();

    if (listacursos.length == 0) {
        elemento.innerHTML = `
        <li>
            <a href="#" class="list-group-item list-group-item-action">
                <b>Actualmente no hay cursos disponibles.</b>
            </a>
        </li>`;

        showToast('Actualmente no hay cursos disponibles.!','danger');

        return;
    }

    listacursos.forEach(curso => {

        elemento.innerHTML += `
        <li class="list-group-item">
            <input type="checkbox" id="item-${curso.id}" value="${curso.id}">
            <label for="item1"><b>Curso: </b>${curso.nombrecurso}</label>
        </li>`;
    });
}

function mostrarInstructorAsociarCurso() {
    let elemento = document.getElementById('listaMultipleDisponibles');
    elemento.innerHTML = '';
    let lista = Instructor.obtenerInstructores();

    if (lista.length == 0) {
        elemento.innerHTML = `
        <li>
            <a href="#" class="list-group-item list-group-item-action">
                <b>Actualente no hay instructores en la plataforma.</b>
            </a>
        </li>`;

        showToast('Actualente no hay instructores en la plataforma..!','danger');

        return;
    }

    lista.forEach(instructor => {
        elemento.innerHTML += `
        <li class="list-group-item">
            <input type="checkbox" id="item-${instructor.id}" value="${instructor.id}">
            <label for="item1"><b>Instructor: </b>${instructor.nombre} 
            <br/><b>Especialidad: </b> ${instructor.especialidad}</label>
        </li>`;
    });
}

function mostrarInstructores() {

    let elemento = document.getElementById('listainstructores');
    elemento.innerHTML = '';
    let listainstructores = Instructor.obtenerInstructores();

    if (listainstructores.length == 0) {
        elemento.innerHTML = `
            <a href="#" class="list-group-item list-group-item-action">
                <b>Actualmente no se han creado instructores</b>
            </a>`;

            showToast('Actualente no hay instructores en la plataforma..!','danger');
        return;
    }

    listainstructores.forEach(instructor => {

        elemento.innerHTML += `
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
                <b>id: </b>${instructor.id}<br/>
                <b>nombre:</b> ${instructor.nombre}<br/>
                <b>especialidad:</b> ${instructor.especialidad}
            </div>
            <div>
                <button class="btn btn-light btn-sm me-2">✏️</button>
                <button class="btn btn-light btn-sm me-2">🗑️</button>
            </div>
        </div>`;
    });

}


// Función para mostrar el mensajes al usuario para no usar alertify
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toastId = 'toast-' + Date.now();
    
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });

    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}