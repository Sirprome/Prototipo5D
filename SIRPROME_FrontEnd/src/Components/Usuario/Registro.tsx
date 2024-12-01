import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registrar = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [carga, setCarga] = useState(false);

  const onRegistrar = async () => {
    setCarga(true);

    if (!nombre.trim()) {
      alert("El nombre es necesario");
      setCarga(false);
      return;
    }
    if (!correo.trim()) {
      alert("El correo es necesario");
      setCarga(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert("Ingrese un correo electrónico válido");
      setCarga(false);
      return;
    }
    if (!contraseña.trim()) {
      alert("Es necesaria una contraseña");
      setCarga(false);
      return;
    }

    const url = "http://localhost:4100/Registrar"; 
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: nombre,
          Correo: correo,
          Contraseña: contraseña,
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        const idUsuario = data.id;
        if (!idUsuario) throw new Error("No se recibió un id válido");
        alert("Usuario registrado con éxito");
        navigate(`/Seleccionar-Rol/${idUsuario}`);
      } else {
        const error = await response.json();
        alert(error.message || "Hubo un problema al registrar el usuario");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Error al conectar con el servidor");
    }
    
  };

  return (
    <div className="fondo">
      <div className="contenedor">
        <div className="titulo">
          <h4>SIRPROME</h4>
        </div>

        <div className="agrupador-nombre">
          <div>Nombre</div>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            className="caja-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="agrupador-correo">
          <div>Correo Electrónico</div>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            className="caja-correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="agrupador-password">
          <div>Contraseña</div>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            className="caja-password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

        <div className="agrupador-boton">
          <button className="boton-registrar" onClick={onRegistrar} disabled={carga}>
            {carga ? "Registrando..." : "Registrar"}
          </button>
        </div>
        <div className="otros-botones">
              <button onClick={() => navigate("/")} disabled={carga}>
                Inicio de sesión
              </button>
              <button onClick={() => navigate("/recuperar")} disabled={carga}>
                Olvidé mi contraseña
              </button>
            </div>
      </div>
    </div>
  );
};

export default Registrar;
