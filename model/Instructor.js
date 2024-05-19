class Instructor {

    constructor(id, nombre, edad, especialidad, cursos) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.especialidad = especialidad; 
        this.cursos = cursos; // Un array de cursos que el instructor enseña
    }

    static agregarInstructor(objinstructor) {
        let listainstructor = JSON.parse(localStorage.getItem('Instructores')) || [];
        objinstructor.id = this.generateGUID();
        listainstructor.push(objinstructor);
        localStorage.setItem('Instructores', JSON.stringify(listainstructor));
    }

    static obtenerInstructores() {
        return JSON.parse(localStorage.getItem('Instructores')) || [];
    }

    static generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static mostrarInstructorAsociarCurso() {
        let elemento = document.getElementById('listaMultipleDisponibles');
        elemento.innerHTML = '';
        let lista = this.obtenerInstructores();

        if (lista.length == 0) {
            elemento.innerHTML = `
            <li>
                <a href="#" class="list-group-item list-group-item-action">
                    <b>Actualente no hay cursos disponibles:</b>
                </a>
            </li>`;
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

    static mostrarInstructores() {

        let elemento = document.getElementById('listainstructores');
        elemento.innerHTML = '';
        let listainstructores = this.obtenerInstructores();

        if (listainstructores.length == 0) {
            elemento.innerHTML = `
                <a href="#" class="list-group-item list-group-item-action">
                    <b>Actualmente no se han creado instructores</b>
                </a>`;
            return;
        }

        listainstructores.forEach(instructor => {

            elemento.innerHTML += `
                <a href="#" class="list-group-item list-group-item-action">
                    <b>id: </b>${instructor.id}<br/>
                    <b>nombre:</b> ${instructor.nombre}<br/>
                    <b>especialidad:</b> ${instructor.especialidad}
                </a>`;
        });

    }
}

export default Instructor;
