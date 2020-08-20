import React, { Fragment } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  //state para citas
  const [citas, actualizarCitas] = useState(citasIniciales);

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem(JSON.stringify([]));
    }
  }, [citas, citasIniciales]);
  //funcion para añadir citas (estas se pasan como prop a formulario)
  const crearCita = (cita) => {
    actualizarCitas([...citas, cita]);
  };

  //funcion para eliminar cita por id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    actualizarCitas(nuevasCitas);
  };
  //mensaje opcional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="one-half column">
          <Formulario crearCita={crearCita} />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map((cita) => (
            <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
