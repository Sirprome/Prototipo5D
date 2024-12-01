import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.jpg";


const ActualizarRol = () => {
  const { idUsuario } = useParams();
  const navigate = useNavigate();
  const [rol, setRol] = useState("");
  const [carga, setCarga] = useState(false);

  useEffect(() => {
    if (!idUsuario || idUsuario.length !== 36) { 
      alert("Acceso inválido");
      navigate("/");
    }
  }, [idUsuario, navigate]);

  const onActualizarRol = async () => {
    setCarga(true);

    if (!rol.trim() || (rol.toLowerCase() !== "estudiante" && rol.toLowerCase() !== "profesor")) {
      alert("El rol debe ser 'estudiante' o 'profesor'");
      setCarga(false);
      return;
    }

    const url = `http://localhost:4100/ActualizarRol/${idUsuario}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Rol: rol }),
      });

      if (response.ok) {
        alert("Rol actualizado con éxito");
        if (rol.toLowerCase() === "estudiante") {
          navigate("/VerGrupos/"+idUsuario);
        } else if (rol.toLowerCase() === "profesor") {
          navigate("/MisGrupos/"+idUsuario);
        }
      } else {
        const error = await response.json();
        alert(error.message || "Error al actualizar el rol");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Error al conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };

  return (
    <div className="fondo-rol">
      <div className="contenedor-rol">
      <img src={Logo} className="Logo"/>
        <h4>Actualizar Rol</h4>

        <div>Nuevo Rol</div>
        <div>
          <button onClick={() => setRol("estudiante")} disabled={carga} className="boton-criterios distancia">
            Estudiante
          </button>
          <button onClick={() => setRol("profesor")} disabled={carga} className="boton-criterios roles">
            Profesor
          </button>
        </div>

        <div>
          <button onClick={onActualizarRol} disabled={carga || !rol} className="boton-criterios roles">
            {carga ? "Cargando..." : "Seleccionar Rol"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarRol;
