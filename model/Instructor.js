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

    static obtenerInstructorPorid(id) {
        const lista = this.obtenerInstructores();
        const instructor = lista.find(instructor => instructor.id === id);
        return instructor;
    }    

    
}

export default Instructor;
