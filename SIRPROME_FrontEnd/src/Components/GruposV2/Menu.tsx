import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const Menu = () => {
    return (
        <nav className="navbar ">
            <div className="container-fluid">
                <div className='nav-header'>
                    <div className='Titulo'>
                        <a className="navbar-brand" href="#">SIRPROME</a>
                    </div>
                    <button className="navbar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/Primeros">Primeros</a>
                            <a className="nav-link active" aria-current="page" href="/Terceros">Terceros</a>
                            <a className="nav-link active" aria-current="page" href="/Quintos">Quintos</a>
                            <a className="nav-link active" aria-current="page" href="https://www.youtube.com/watch?v=_jW0WrjwiVI"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
