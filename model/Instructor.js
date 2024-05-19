class Instructor {
    constructor(nombre, edad, especialidad, cursos) {
        this.nombre = nombre;
        this.edad = edad;
        this.especialidad = especialidad;
        this.cursos = cursos; // Un array de cursos que el instructor enseña
    }

    // Método para obtener la información del instructor
    obtenerInformacion() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}, Especialidad: ${this.especialidad}`;
    }

    // Método para agregar un curso
    agregarCurso(curso) {
        this.cursos.push(curso);
    }

    // Método para obtener la lista de cursos
    obtenerCursos() {
        return this.cursos.join(", ");
    }    
}

export default Instructor;
