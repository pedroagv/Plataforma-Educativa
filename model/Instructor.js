class Instructor {

    constructor(id, nombre, edad, especialidad, cursos) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.especialidad = especialidad;         
    }

    static guardarInstructor(objinstructor) {
        
        let listainstructor = JSON.parse(localStorage.getItem('Instructores')) || [];

        if (objinstructor.id === '') {
            // Si el ID está vacío, generar un nuevo ID
            objinstructor.id = this.generateGUID();
            // Agregar el nuevo instructor a la lista
            listainstructor.push(objinstructor);
        } else {
            // Si el ID no está vacío, buscar y actualizar el instructor existente
            const index = listainstructor.findIndex(instructor => instructor.id === objinstructor.id);
            if (index !== -1) {
                // Actualizar el instructor existente
                listainstructor[index] = objinstructor;
            } else {
                // Si no se encuentra el instructor, agregarlo como nuevo (aunque este caso debería ser raro)
                listainstructor.push(objinstructor);
            }
        }

        // Guardar la lista actualizada en localStorage
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

    static eliminarInstructor(id) {
         
        let listaInstructor = JSON.parse(localStorage.getItem('Instructores')) || [];

        // Filtrar la lista para remover el estudiante con el ID dado se crea una nueva lista sin este y se guarda.
        listaInstructor = listaInstructor.filter(instructor => instructor.id !== id);
         
        localStorage.setItem('Instructores', JSON.stringify(listaInstructor));
   }



    static obtenerInstructorPorid(id) {

        const lista = this.obtenerInstructores();

        const instructor = lista.find(instructor => instructor.id === id);

        return instructor;
    }    

    
}

export default Instructor;
