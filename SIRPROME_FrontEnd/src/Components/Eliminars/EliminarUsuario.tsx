import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EliminarUsuario = () => {
  const {idUsuario}=useParams();
  const [carga, setCarga] = useState(false);
  const navigate = useNavigate();

  const onEliminar = async () => {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar el usuario?`);
    if (!confirmacion) {
      return;
    }

    setCarga(true);


    const url = `http://localhost:4100/EliminarUsuario/${idUsuario}`;
    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.ok) {
        alert("Usuario eliminado con éxito");
        navigate("/");
      } else {
        const error = await response.json();
        alert(error.message || "Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Error al conectar con el servidor");
    } finally {
      setCarga(false);
    }
  };

  return (
    <>
      <div className="fondo">
        <div className="contenedor">
          <div>
            <button onClick={onEliminar} disabled={carga}>
              {carga ? "Eliminando..." : "Eliminar Usuario"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminarUsuario;
