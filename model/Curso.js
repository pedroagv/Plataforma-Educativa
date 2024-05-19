class Curso {

    constructor(id, nombrecurso, duracion, nivel, instructores) {
        this.id = id;
        this.nombrecurso = nombrecurso;
        this.duracion = duracion;
        this.nivel = nivel;
        this.instructores = instructores;
    }

    static guardarCurso(objcurso) {
        /*let listacursos = JSON.parse(localStorage.getItem('Cursos')) || [];
        objcurso.id = this.generateGUID();
        listacursos.push(objcurso);
        localStorage.setItem('Cursos', JSON.stringify(listacursos));*/

        let listacursos = JSON.parse(localStorage.getItem('Cursos')) || [];

        if (objcurso.id === '') {
            // Si el ID está vacío, generar un nuevo ID
            objcurso.id = this.generateGUID();
            // Agregar el nuevo instructor a la lista
            listacursos.push(objcurso);
        } else {
            // Si el ID no está vacío, buscar y actualizar el instructor existente
            const index = listacursos.findIndex(curso => curso.id === objcurso.id);
            if (index !== -1) {
                // Actualizar el instructor existente
                listacursos[index] = objcurso;
            } else {
                // Si no se encuentra el instructor, agregarlo como nuevo (aunque este caso debería ser raro)
                listacursos.push(objcurso);
            }
        }

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('Cursos', JSON.stringify(listacursos));
    }

    static obtenerCursos() {
        return JSON.parse(localStorage.getItem('Cursos')) || [];
    }

    

    static generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static obtenerCursoPorid(id) {

        const lista = this.obtenerCursos();

        const curso = lista.find(curso => curso.id === id);

        return curso;
    }

    static eliminarCurso(id) {
         
        let listaCursos = JSON.parse(localStorage.getItem('Cursos')) || [];

        // Filtrar la lista para remover el estudiante con el ID dado se crea una nueva lista sin este y se guarda.
        listaCursos = listaCursos.filter(curso => curso.id !== id);
         
        localStorage.setItem('Cursos', JSON.stringify(listaCursos));
   }
}

export default Curso;
