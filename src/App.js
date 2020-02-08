import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //state del formulario

  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: ""
  });

  const [hacerConsulta, setHacerConsulta] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (hacerConsulta) {
        const appId = "6f757272b30acd291babe7fd8afabda3";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;

        console.log(url);

        const respuesta = await fetch(url);

        const resultado = await respuesta.json();
        console.log(resultado);

        setHacerConsulta(false);
        setResultado(resultado);

        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };

    consultarAPI();
    // eslint-disable-next-line
  }, [hacerConsulta]);

  let componente;

  if (error) {
    componente = <Error mensaje="No se encontró la ciudad solicitada" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setHacerConsulta={setHacerConsulta}
              />
            </div>

            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
