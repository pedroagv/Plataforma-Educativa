class Curso {

    constructor(id, nombrecurso, duracion, nivel, instructores) {
        this.id = id;
        this.nombrecurso = nombrecurso;
        this.duracion = duracion;
        this.nivel = nivel;
        this.instructores = instructores;
    }

    static agregarCurso(objcurso) {
        let listacursos = JSON.parse(localStorage.getItem('Cursos')) || [];
        objcurso.id = this.generateGUID();
        listacursos.push(objcurso);
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
}

export default Curso;
