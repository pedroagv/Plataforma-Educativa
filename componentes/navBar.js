// probando un seudo react a partir del javascrip jajaja

export function createNavbar() {
    const nav = document.getElementById('barraNavegacion');
    nav.innerHTML = `
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Plataforma Educativa</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="Cursos.html">Cursos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="Estudiantes.html">Estudiantes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="Instructor.html">Instructor</a>
                </li>
            </ul>
        </div>
    </div>
    `;
    return nav;
}
