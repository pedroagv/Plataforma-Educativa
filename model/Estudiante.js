class Estudiante {
    constructor(nombre, apellidos, edad, cursos) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.cursos = cursos;
    }

    static agregarEstudiante(objestudiante) {
        let listaEstudiantes = JSON.parse(localStorage.getItem('Estudiantes')) || [];
        listaEstudiantes.push(objestudiante);
        localStorage.setItem('Estudiantes', JSON.stringify(listaEstudiantes));
    }

    static obtenerEstudiantes() {
        return JSON.parse(localStorage.getItem('Estudiantes')) || [];
    }

    static mostrarEstudiantes() {
        let elemento = document.getElementById('listaestudiantes');
        elemento.innerHTML = '';
        let listaestudiantes = this.obtenerEstudiantes();

        if (listaestudiantes.length == 0) {
            elemento.innerHTML = `
            <a href="#" class="list-group-item list-group-item-action">
                <b>Actualmente no hay estudiantes inscritos.</b>
            </a>`;
            return;
        }

        listaestudiantes.forEach(estudiante => {
            elemento.innerHTML += `
            <a href="#" class="list-group-item list-group-item-action">
                <b>Estudiante:</b> ${estudiante.nombre} ${estudiante.apellidos} <br/>
                <b>cursos:</b> ${JSON.stringify(estudiante.cursos)}
            </a>`;
        });
    }

}

export default Estudiante;
