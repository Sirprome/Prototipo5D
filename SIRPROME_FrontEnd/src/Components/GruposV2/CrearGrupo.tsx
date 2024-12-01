import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/Barra_Lateral.css";
import "../../assets/Estilos.css";

const CrearGrupo = () => {
  const navigate = useNavigate();
  const { idProfesor } = useParams<{ idProfesor: string }>();
  const [nombre, setNombre] = useState<string>("");
  const [imagen, setImagen] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [carga, setCarga] = useState<boolean>(false);

  const onCrearGrupo = async () => {
    setCarga(true);

    if (!nombre.trim()) {
      alert("Ingrese el nombre del grupo");
      setCarga(false);
      return;
    }
    if (!imagen.trim()) {
      alert("Ingrese la URL de la imagen del grupo");
      setCarga(false);
      return;
    }
    

    const url = `http://localhost:4100/CrearGrupo/${idProfesor}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nombre: nombre,
          Imagen: imagen,
          IdProfesor: idProfesor,
        }),
      });

      if (response.ok) {
        alert("Grupo creado con éxito");
        setNombre("");
        setImagen("");
        setCodigo(""); 
        navigate(`/MisGrupos/${idProfesor}`);
      } else {
        const error = await response.json();
        alert(error.message || "Titulo existe  o URl ya existente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };
  useEffect(() => {
    const menu = document.getElementById("menu");
    const barra = document.getElementById("barra");
    const main = document.getElementById("main");

    const toggleMenu = () => {
      barra!.classList.toggle('menu-contraer');
      menu!.classList.toggle('menu-toggle');
      main!.classList.toggle('menu-contraer');
    };

    if (menu) {
      menu.addEventListener("click", toggleMenu);
    }

    return () => {
      if (menu) {
        menu.removeEventListener("click", toggleMenu);
      }
    };
  }, []);


  return (
    <>
    <header>
        <div className="izq">
          <div className="menu-conteiner">
            <div className="menu" id="menu">
            <img src="/Iconos/Icono-Menu.svg" alt="icon-udemy" className="logo" />
            </div>
          </div>
          <div className="brand">
            
            <span className="uno">Sirprome</span>
          </div>
        </div>
        
      </header>
      <div className="barra-lateral" id="barra">
        <nav>
          <ul>
            <li>
              <a onClick={() => navigate(`/MisGrupos/${idProfesor}`)} className="Buscar">
                <img src="/Iconos/Icono-Contenido.svg" alt="" />
                <span>Mis Grupos</span>
              </a>
            </li>
            <li>
              <a onClick={onCrearGrupo} >
                <img src="/Iconos/Icono-CrearContenidos.svg" alt="" />
                <span>Crear Grupo</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate(`/MisGrupos/${idProfesor}`)}>
                <img src="/Iconos/Icono-Volver.svg" alt="" />
                <span>Volver</span>
              </a>
            </li>
            <li>
              <a href="/">
                <img src="/Iconos/Icono-EliminarUsuario.svg" alt="" />
                <span>Cerrar Sesion</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <main id="main">
    <div className="Contenedor_MisGrupos">
      <div className="Titulo_Grupo_Profesores">
        <h4>Crear Nuevo Grupo</h4>
        <div>
          <label>Nombre del Grupo:</label>
          <input className="input-crear"
            type="text"
            placeholder="Nombre del grupo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>URL de la Imagen del Grupo:</label>
          <input className="input-crear2"
            type="text"
            placeholder="URL de la imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>
        
        <div>
          <button onClick={onCrearGrupo} disabled={carga} className="criterio-boton boton-subir">
            {carga ? "Creando..." : "Crear Grupo"}
            <img src="/Iconos/Icono-CrearContenido.svg" className="imagen-subir" />
          </button>
        </div>
      </div>
    </div>
    </main>
    </>
  );
};

export default CrearGrupo;
