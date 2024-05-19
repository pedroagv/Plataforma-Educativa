class Estudiante {
    constructor(id, nombre, edad, cursos) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.cursos = cursos;
    }

    static agregarEstudiante(objestudiante) {
        let listaEstudiantes = JSON.parse(localStorage.getItem('Estudiantes')) || [];
        objestudiante.id = this.generateGUID();
        listaEstudiantes.push(objestudiante);
        localStorage.setItem('Estudiantes', JSON.stringify(listaEstudiantes));
    }

    static obtenerEstudiantes() {
        return JSON.parse(localStorage.getItem('Estudiantes')) || [];
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
