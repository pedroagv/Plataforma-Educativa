import Estudiante from '../model/Estudiante.js'
import Curso from '../model/Curso.js'
import Instructor from '../model/Instructor.js';

document.addEventListener('DOMContentLoaded', () => {

    // metodo para listar los cursos al iniciar
    Curso.mostrarCursos();

    // metodo para listar los estudiantes al iniciar
    Estudiante.mostrarEstudiantes();

    // metodo para listar los estudiantes al iniciar
    Instructor.mostrarInstructores();

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
    Estudiante.mostrarEstudiantes();
    console.log(obj);
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
    Curso.mostrarCursos();
    console.log(obj);
});


// control del boton del formulario instructor
var frmcurso = document.getElementById('frm-instructor');
frmcurso.addEventListener('submit', function (event) {
    event.preventDefault();

    var form = event.target;
    var nombre = form.nombre.value;
    var edad = form.edad.value;
    var especialidad = form.especialidad.value;
    var cursos = [];

    const obj = new Instructor(null, nombre, edad, especialidad, cursos);
    Instructor.agregarInstructor(obj);
    Instructor.mostrarInstructores();
    console.log(obj);
});

// accion para traer los instructores en una lista multiple
document.getElementById('btn-multiple-instructor').addEventListener('click', function () {

    Instructor.mostrarInstructorAsociarCurso();

    const btnPrueba = document.getElementById('btnPrueba');

    const newBtnPrueba = btnPrueba.cloneNode(true);
    btnPrueba.parentNode.replaceChild(newBtnPrueba, btnPrueba);

    // accion para asociar los cursos y los estudiantes
    newBtnPrueba.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.list-group-item input[type="checkbox"]:checked');
        const selectedItems = Array.from(checkboxes).map(checkbox => checkbox.value);
        document.getElementById('instructores').value = JSON.stringify(selectedItems);
    });

});

// accion para traer los instructores en una lista multiple
document.getElementById('btn-multiple-curso').addEventListener('click', function () {

    Curso.mostrarCursosAsociarEstudiante();

    const btnPrueba = document.getElementById('btnPrueba');

    const newBtnPrueba = btnPrueba.cloneNode(true);
    btnPrueba.parentNode.replaceChild(newBtnPrueba, btnPrueba);

    // accion para asociar los cursos y los estudiantes
    newBtnPrueba.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.list-group-item input[type="checkbox"]:checked');
        const selectedItems = Array.from(checkboxes).map(checkbox => checkbox.value);
        document.getElementById('cursos').value = JSON.stringify(selectedItems);
    });
});