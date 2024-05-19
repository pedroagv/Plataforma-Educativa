class Estudiante {
    constructor(id, nombre, edad, cursos) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.cursos = cursos;
    }

    static guardarEstudiante(objestudiante) {
        
        // mejora para que guarde y actualice en un solo metodo

        /*let listaEstudiantes = JSON.parse(localStorage.getItem('Estudiantes')) || [];
        objestudiante.id = this.generateGUID();
        listaEstudiantes.push(objestudiante);
        localStorage.setItem('Estudiantes', JSON.stringify(listaEstudiantes));*/

        let listaEstudiantes = JSON.parse(localStorage.getItem('Estudiantes')) || [];

        if (objestudiante.id === '') {
            // Si el ID está vacío, generar un nuevo ID
            objestudiante.id = this.generateGUID();
            // Agregar el nuevo instructor a la lista
            listaEstudiantes.push(objestudiante);
        } else {
            // Si el ID no está vacío, buscar y actualizar el instructor existente
            const index = listaEstudiantes.findIndex(estudiante => estudiante.id === objestudiante.id);
            if (index !== -1) {
                // Actualizar el instructor existente
                listaEstudiantes[index] = objestudiante;
            } else {
                // Si no se encuentra el instructor, agregarlo como nuevo (aunque este caso debería ser raro)
                listaEstudiantes.push(objestudiante);
            }
        }

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('Estudiantes', JSON.stringify(listaEstudiantes));
    }

    static eliminarEstudiante(id) {
         
         let listaEstudiantes = JSON.parse(localStorage.getItem('Estudiantes')) || [];

         // Filtrar la lista para remover el estudiante con el ID dado se crea una nueva lista sin este y se guarda.
         listaEstudiantes = listaEstudiantes.filter(estudiante => estudiante.id !== id);
          
         localStorage.setItem('Estudiantes', JSON.stringify(listaEstudiantes));
    }

    static obtenerEstudiantes() {
        return JSON.parse(localStorage.getItem('Estudiantes')) || [];
    }    

    static obtenerEstudiantePorid(id) {

        const lista = this.obtenerEstudiantes();

        const estudiante = lista.find(estudiante => estudiante.id === id);

        return estudiante;
    }

    static generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default Estudiante;
