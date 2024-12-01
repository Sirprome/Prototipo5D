import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Tarea {
  Titulo: string;
  Descripcion: string;
  ValorMax: number;
  Calificacion: number;
  Evidencia: string;
}

interface Grupo {
  Nombre: string;
  Imagen: string;
}

const TareaAlumno = () => {
  const { idProfesor, idGrupo, idTarea } = useParams<{ idProfesor: string; idGrupo: string; idTarea: string }>();
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [grupo, setGrupo] = useState<Grupo | null>(null);
  const [carga, setCarga] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarea = async () => {
      if (!idProfesor || !idGrupo || !idTarea) return;
      const url = `http://localhost:4100/TareaAlumnos/${idProfesor}/${idGrupo}/${idTarea}`;

      try {
        const response = await fetch(url, { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setGrupo({ Nombre: data.Grupo, Imagen: data.Imagen });
          setTarea(data.Tarea);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error al cargar la tarea.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
      } finally {
        setCarga(false);
      }
    };

    fetchTarea();
  }, [idProfesor, idGrupo, idTarea]);

  return (
    <div>
      {carga && <p>Cargando información...</p>}
      {error && <p className="error">{error}</p>}
      {grupo && (
        <div>
          <h3>{grupo.Nombre}</h3>
          <img src={grupo.Imagen} alt={grupo.Nombre} width="100" height="100" />
        </div>
      )}
      {tarea && (
        <div>
          <h4>{tarea.Titulo}</h4>
          <p><b>Descripción:</b> {tarea.Descripcion}</p>
          <p><b>Valor Máximo:</b> {tarea.ValorMax}</p>
          <p><b>Calificación:</b> {tarea.Calificacion}</p>
          <p><b>Evidencia:</b> {tarea.Evidencia}</p>
        </div>
      )}
    </div>
  );
};

export default TareaAlumno;
