class Curso {

    constructor(nombrecurso, duracion, nivel, instructor) {
        this.id = this.generateGUID();
        this.nombrecurso = nombrecurso;
        this.duracion = duracion;
        this.nivel = nivel;
    }

    static agregarCurso(objcurso) {
        let listacursos = JSON.parse(localStorage.getItem('Cursos')) || [];
        listacursos.push(objcurso);
        localStorage.setItem('Cursos', JSON.stringify(listacursos));
    }

    static obtenerCursos() {
        return JSON.parse(localStorage.getItem('Cursos')) || [];
    }

    static mostrarCursos() {
        let elemento = document.getElementById('listacursos');
        elemento.innerHTML = '';
        let listacursos = this.obtenerCursos();

        if (listacursos.length == 0) {
            elemento.innerHTML = `
            <a href="#" class="list-group-item list-group-item-action">
                <b>Actualente no hay cursos disponibles:</b>
            </a>`;
            return;
        }

        listacursos.forEach(curso => {
            console.log(curso);
            elemento.innerHTML += `
            <a href="#" class="list-group-item list-group-item-action">
                <b>id: </b>${curso.id}<br/><b>Curso:</b> ${curso.nombrecurso} | <b>Duracion:</b> ${curso.duracion} | <b>Nivel:</b> ${curso.nivel}
            </a>`;
        });

        this.mostrarCursosAsociarEstudiante();

    }

    static mostrarCursosAsociarEstudiante() {
        let elemento = document.getElementById('listacursosdisponibles');
        elemento.innerHTML = '';
        let listacursos = this.obtenerCursos();

        if (listacursos.length == 0) {
            elemento.innerHTML = `
            <li>
                <a href="#" class="list-group-item list-group-item-action">
                    <b>Actualente no hay cursos disponibles:</b>
                </a>
            </li>`;
            return;
        }

        listacursos.forEach(curso => {
            console.log(curso);
            elemento.innerHTML += `
            <li class="list-group-item">
                <input type="checkbox" id="item-${curso.id}" value="${curso.id}">
                <label for="item1"><b>Curso:</b>${curso.nombrecurso}</label>
            </li>`;
        });
    }

    generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    // Método para obtener la información del curso
    obtenerInformacion() {
        return `Curso: ${this.nombrecurso}, Duración: ${this.duracion} horas, Nivel: ${this.nivel}`;
    }
}

export default Curso;
