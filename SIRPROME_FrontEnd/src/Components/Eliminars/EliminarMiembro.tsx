import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EliminarMiembro = () => {
  const { idProfesor, idGrupo } = useParams(); 
  const [idMiembro, setIdMiembro] = useState("");
  const [carga, setCarga] = useState(false);
  const navigate = useNavigate();
  const onEliminarMiembro = async () => {
    const confirmacion = window.confirm(`¿Está seguro de que desea eliminar al miembro con ID ${idMiembro} del grupo ${idGrupo}?`);
    if (!confirmacion) {
      return;
    }
    setCarga(true);
    if (!idMiembro.trim()) {
      alert("Ingrese el ID del profesor, el ID del grupo y el ID del miembro.");
      setCarga(false);
      return;
    }
    const url = `http://localhost:4100/EliminarMiembro/${idProfesor}/${idGrupo}/${idMiembro}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdProfesor: idProfesor,
          IdGrupo: idGrupo,
          IdMiembro: idMiembro,
        }),
      });

      if (response.ok) {
        alert("Miembro eliminado con éxito");
        navigate("/MisGrupos"+idProfesor);
      } else {
        const error = await response.json();
        alert(error.message || "Error al eliminar al miembro");
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
          <div>ID del Miembro</div>
          <input
            type="text"
            placeholder="Ingresa el ID del miembro"
            value={idMiembro}
            onChange={(e) => setIdMiembro(e.target.value)}
          />

          <div>
            <button onClick={onEliminarMiembro} disabled={carga}>
              {carga ? "Eliminando..." : "Eliminar Miembro"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EliminarMiembro;
