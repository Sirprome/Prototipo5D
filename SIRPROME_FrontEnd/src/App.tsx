import { Route, BrowserRouter, Routes } from "react-router-dom";


// Módulo Usuario
import Inicio from "./Components/Usuario/Inicio";
import Recuperar from "./Components/Usuario/Recuperar";
import Registro from "./Components/Usuario/Registro";
import Rol from "./Components/Usuario/Rol";
import EliminarUsuario from "./Components/Eliminars/EliminarUsuario";

// Módulo Grupos
import CrearGrupo from "./Components/GruposV2/CrearGrupo";
import IngresarMiembro from "./Components/GruposV2/InsertarMiembro";
import VerMisGrupos from "./Components/GruposV2/VerMisGrupos";
import VerGrupos from "./Components/GruposV2/VerGrupos";

//Diseño Grupos
import "./assets/VerMisGrupos.css"
import "./assets/VerDetalles.css"

// Módulo Criterios
import InsertarCriterios from "./Components/Criterios/insertarCriterios";
import ActualizarCriterio from "./Components/Criterios/ActualizarCriterios";
import CalificarAlumno from "./Components/Criterios/CalificarCriterios";
import EliminarCriterio from "./Components/Eliminars/EliminarCriterio";

// Módulo Tareas
import CrearTarea from "./Components/Tareas/Agretarea";
import ActualizarTarea from "./Components/Tareas/ActualizarTareas";
import SubirTarea from "./Components/Tareas/SubirTarea";
import CalificarTarea from "./Components/Tareas/Calificar";

// Módulo Eliminaciones
import EliminarComentarios from "./Components/Eliminars/EliminarComentarios";
import EliminarGrupo from "./Components/Eliminars/EliminarGrupo";
import EliminarTarea from "./Components/Eliminars/EliminarTareas";
import EliminarMiembro from "./Components/Eliminars/EliminarMiembro";
import Grupos from "./Components/GruposV2/Grupo";
import InfoGrupo from "./Components/GruposV2/InfoGrupo";
import CriterioAlumno from "./Components/Criterios/CriteriosAlumno";
import TareaAlumno from "./Components/Tareas/TareasAlumno";
import TareaAlumnos from "./Components/Tareas/TareaAlumnos";
import CriterioGrupo from "./Components/Criterios/CriterioGrupo";
import InsertarComentario from "./Components/Comentarios.tsx/Comentarios";


function App() {
  return (
    <BrowserRouter>
      <Routes>
      //profe                                  //Grupo                           //criterio                                  //Alumno
      a3cc48d2-a3ca-4fe8-b1fb-31f99fc664c8/8c3ecb71-94c5-4e6d-b97b-995e61fa9892/589d8e2a-6f9d-40ac-b25e-cf506ec28455/d594106e-8db4-4d40-b930-e68f3d8ab323
        {/* MÓDULO USUARIO */}
        <Route path="/" element={<Inicio />} />
        <Route path="/Seleccionar-Rol/:idUsuario" element={<Rol />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Recuperar" element={<Recuperar />} />
        <Route path="/Eliminar/:idUsuario" element={<EliminarUsuario />} />
          
        <Route path="/InsertarComentario/:idUsuario1/:idGrupo/:idUsuario2" element={<InsertarComentario />} />


        {/* MÓDULO GRUPOS */}
        <Route path="/CrearGrupo/:idProfesor" element={<CrearGrupo />} />
        <Route path="/InsertarMiembro/:idUsuario" element={<IngresarMiembro />} />
        <Route path="/VerGrupos/:idUsuario" element={<VerGrupos />} />
        <Route path="/Grupos/:idUsuario/:idGrupo" element={<Grupos />} />
        <Route path="/InfoGrupo/:idUsuario/:idGrupo" element={<InfoGrupo />} />

        <Route path="/MisGrupos/:idProfesor" element={<VerMisGrupos />} />

        <Route path="/CriterioGrupo/:idProfesor/:idGrupo" element={<CriterioGrupo/>} />
        <Route path="/CriterioAlumno/:id/:idGrupo" element={<CriterioAlumno />} />

        <Route path="/TareaAlumno/:id/:idGrupo/:idTarea/:idUsuario" element={<TareaAlumno />} />
        <Route path="/TareaAlumnos/:idProfesor/:idGrupo/:idTarea" element={<TareaAlumnos />} />

        {/* MÓDULO CRITERIOS */}
        <Route path="/InsertarCriterio/:idProfesor/:idGrupo/:idCriterio" element={<InsertarCriterios />} />
        <Route path="/ActualizarCriterio/:idProfesor/:idGrupo/:idCriterio" element={<ActualizarCriterio />} />
        <Route path="/CalificarCriterio/:idProfesor/:idGrupo/:idCriterio/:idAlumno" element={<CalificarAlumno />} />

        

        {/* MÓDULO TAREAS */}
        <Route path="/InsertarTarea/:idProfesor/:idGrupo" element={<CrearTarea />} />
        <Route path="/ActualizarTarea/:idProfesor/:idGrupo/:idTarea" element={<ActualizarTarea />} />
        <Route path="/SubirTarea/:idUsuario/:idGrupo/:idTarea" element={<SubirTarea />} />
        <Route path="/CalificarTarea/:idProfesor/:idGrupo/:idTarea/:idUsuario" element={<CalificarTarea />} />

        {/* MÓDULO ELIMINACIONES */}
        <Route path="/EliminarComentario/:idProfesor/:idGrupo/:idComentario" element={<EliminarComentarios />} />
        <Route path="/EliminarGrupo/:idProfesor/:idGrupo" element={<EliminarGrupo />} />
        <Route path="/EliminarTarea/:idProfesor/:idGrupo/:idTarea" element={<EliminarTarea />} />
        <Route path="/EliminarCriterio/:idProfesor/:idGrupo/:idCriterio" element={<EliminarCriterio />} />
        <Route path="/EliminarMiembro/:idProfesor/:idGrupo" element={<EliminarMiembro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
