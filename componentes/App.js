import { createNavbar } from './navBar.js';
import Estudiante from '../model/Estudiante.js'
import Curso from '../model/Curso.js'

document.addEventListener('DOMContentLoaded', () => {

    const navbar = createNavbar();
    document.body.prepend(navbar);

    // metodo para listar los cursos al iniciar
    Curso.mostrarCursos();

    // metodo para listar los estudiantes al iniciar
    Estudiante.mostrarEstudiantes();

});



// control del boton del formulario estudiantes
var frmestudiante = document.getElementById('frm-estudiante');
frmestudiante.addEventListener('submit', function (event) {
    event.preventDefault();

    var form = event.target;
    var nombre = form.nombre.value;
    var apellido = form.apellido.value;
    var edad = form.edad.value;
    var cursos = form.cursos.value;
    const obj = new Estudiante(nombre, apellido, edad, JSON.parse(cursos));
    debugger;
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
    const obj = new Curso(nombrecurso, duracion, nivel, [], []);
    Curso.agregarCurso(obj);
    Curso.mostrarCursos();
    console.log(obj);
});


// accion para asociar los cursos y los estudiantes
document.getElementById('btnPrueba').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.list-group-item input[type="checkbox"]:checked');
    const selectedItems = Array.from(checkboxes).map(checkbox => checkbox.value);
    document.getElementById('cursos').value = JSON.stringify(selectedItems); 
    console.log(selectedItems);
});