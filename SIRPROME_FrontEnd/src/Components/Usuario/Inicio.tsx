import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/Estilos.css";
import Logo from "../../assets/Logo.jpg";

const GestionUsuario = () => {
  const navigate = useNavigate();
  const { idUsuario } = useParams();
  const [vistaActual, setVistaActual] = useState("inicio");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [carga, setCarga] = useState(false);

  useEffect(() => {
    if (vistaActual === "actualizarRol" && (!idUsuario || idUsuario.length !== 36)) {
      alert("Acceso inválido");
      navigate("/");
    }
  }, [vistaActual, idUsuario, navigate]);

  const onIngresar = async () => {
    setCarga(true);
    if (!correo.trim() || !contraseña.trim()) {
      alert("Por favor, completa todos los campos.");
      setCarga(false);
      return;
    }
    const url = "http://localhost:4100/Inicio";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Correo: correo, Contraseña: contraseña }),
      });
      if (response.ok) {
        const data = await response.json();
        const idUsuario = data.id;
        const rol = data.rol;
        if (!idUsuario) throw new Error("No se recibió un ID válido");
        navigate(rol === "estudiante" ? `/VerGrupos/${idUsuario}` : `/MisGrupos/${idUsuario}`);
      } else {
        alert("Error al iniciar sesión.");
      }
    } catch {
      alert("Error al conectar con el servidor.");
    } finally {
      setCarga(false);
    }
  };

  const onRegistrar = async () => {
    setCarga(true);
    if (!nombre.trim() || !correo.trim() || !contraseña.trim()) {
      alert("Por favor, completa todos los campos.");
      setCarga(false);
      return;
    }
    const url = "http://localhost:4100/Registrar";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nombre: nombre, Correo: correo, Contraseña: contraseña }),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/Seleccionar-Rol/${data.id}`);
      } else {
        alert("Error al registrar usuario.");
      }
    } catch {
      alert("Error al conectar con el servidor.");
    } finally {
      setCarga(false);
    }
  };

  const onRecuperar = async () => {
    setCarga(true);
    if (!correo.trim()) {
      alert("Por favor, ingresa un correo.");
      setCarga(false);
      return;
    }
    const url = "http://localhost:4100/Recuperar";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Correo: correo }),
      });
      if (response.ok) {
        alert("Correo enviado para recuperación.");
        setVistaActual("inicio");
      } else {
        alert("Error al recuperar contraseña.");
      }
    } catch {
      alert("Error al conectar con el servidor.");
    } finally {
      setCarga(false);
    }
  };

  const onActualizarRol = async () => {
    setCarga(true);
    if (!rol.trim()) {
      alert("Selecciona un rol.");
      setCarga(false);
      return;
    }
    const url = `http://localhost:4100/ActualizarRol/${idUsuario}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Rol: rol }),
      });
      if (response.ok) {
        navigate(rol === "estudiante" ? `/VerGrupos/${idUsuario}` : `/MisGrupos/${idUsuario}`);
      } else {
        alert("Error al actualizar el rol.");
      }
    } catch {
      alert("Error al conectar con el servidor.");
    } finally {
      setCarga(false);
    }
  };

  return (
    <div className="fondo">
      <div className="contenedor">
      <div className="contenido1">
      <img src={Logo} className="Logo"/>
        {vistaActual === "inicio" && (
          <>
          
            <h4>SIRPROME</h4>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <button onClick={() => setVistaActual("recuperar")} className="linkBoton">Olvide mi contraseña</button>

            <button onClick={onIngresar} disabled={carga} className="Enter">
              {carga ? "Cargando..." : "Login"}
            </button>
            <div className="Pregunta">¿Todavia no tienes cuenta?
            <button onClick={() => setVistaActual("registro")} className="linkBoton">Registrar</button>
            </div>          
            </>
        )}

        {vistaActual === "registro" && (
          <>
            <h4>Registrar Usuario</h4>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <button onClick={onRegistrar} disabled={carga} className="Enter">
              {carga ? "Cargando..." : "Registrar"}
            </button>
            <button onClick={() => setVistaActual("inicio")} className="linkBoton">Volver</button>
          </>
        )}

        {vistaActual === "recuperar" && (
          <>
            <h4>Recuperar Contraseña</h4>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <button onClick={onRecuperar} disabled={carga} className="Enter">
              {carga ? "Cargando..." : "Recuperar"}
            </button>
            <button onClick={() => setVistaActual("inicio")} className="linkBoton">Volver</button>
          </>
        )}

        {vistaActual === "actualizarRol" && (
          <>
            <h4>Actualizar Rol</h4>
            <p>ID Usuario: {idUsuario}</p>
            <button onClick={() => setRol("estudiante")}>Estudiante</button>
            <button onClick={() => setRol("profesor")}>Profesor</button>
            <button onClick={onActualizarRol} disabled={carga}>
              {carga ? "Cargando..." : "Actualizar"}
            </button>
            <button onClick={() => setVistaActual("inicio")}>Volver</button>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default GestionUsuario;
