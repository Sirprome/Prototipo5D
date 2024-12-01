import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Recuperar = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [carga, setCarga] = useState(false);

    const onOlvidemicontraseña = async () => {
        setCarga(true);
        if (!correo) {
            alert("Por favor, ingresa un correo electrónico.");
            return;
        }

        const url = "http://localhost:4100/Recuperar";
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ Correo: correo }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                const mensaje = await response.text();
                alert(mensaje);
            } else {
                alert("Se envió un correo para recuperar la contraseña.");
                navigate("/");
            }
        } catch (error) {
            alert("Hubo un problema al conectar con el servidor. Por favor, intenta de nuevo.");
            console.error(error);
        }
    };

    return (
        <div className="contenedor">
         <div className="titulo">SIRPROME
                        <img className="imagen01"></img>
                    </div>
            <div className="agrupador-password">
                <div>Correo Electrónico</div>
                <div>
                    <input
                        type="text"
                        placeholder="Ingrese tu correo electrónico"
                        className="caja-password"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
            </div>
            <div className="agrupador-boton">
                <button className="boton-ingresar" onClick={onOlvidemicontraseña}>
                    Recuperar Contraseña
                </button>
            </div>
            <div className="otros-botones">
              <button onClick={() => navigate("/Registro")} disabled={carga}>
                Registrarse
              </button>
              <button onClick={() => navigate("/")} disabled={carga}>
                Inicio de sesión
              </button>
        </div>
        </div>
    );
};

export default Recuperar;
