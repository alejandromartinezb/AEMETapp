import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Button from './components/button/Button';
import useFetch from './hooks/useFetch';
import { useState } from 'react';
import trimId from './utils/trimId';
import Dropdown from './components/dropdown/Dropdown';
import PronosticoTabla from './components/pronosticoTabla/PronosticoTabla';

function App() {
    // useState es un hook que devuelve un array con 2 elementos, capturados entre []. (Valor del estado y función que lo modifica)
    // Inicializamos con "" para evitar que la búsqueda se ejecute con un valor undefined
    const [valueInputProvincia, setValueInputProvincia] = useState("");
    const [valueInputMunicipio, setValueInputMunicipio] = useState("");

    // Estado adicional para mostrar la provincia encontrada en la pantalla
    const [provincia, setProvincia] = useState(null);
    const [municipio, setMunicipio] = useState(null);

    // Controlador para saber qué es lo último que se ha clickado (provincia o municipio)
    const [ubicacionFocus, setUbicacionFocus] = useState(null);

    const url_provincias = 'http://localhost:3000/api/provincias';
    const url_provinciaHoy = 'http://localhost:3000/api/prediccion/'; // :provincia
    const url_municipios = 'http://localhost:3000/api/municipios';
    const url_municipioHoy = 'http://localhost:3000/api/prediccion/municipio/'; // :id
    const { datos: listadoProvincias } = useFetch(url_provincias);
    const { datos: prediccionProvincia } = useFetch(provincia ? url_provinciaHoy + provincia.id : null);
    const { datos: listadoMunicipios } = useFetch(url_municipios);
    const { datos: prediccionMunicipio } = useFetch(municipio ? url_municipioHoy + trimId(municipio.id) : null);

    // Eliminados useEffects para hacer console.log() con los datos que vienen del backend


    // Función para buscar la provincia del input en el JSON. Usado en el dropdown.
    function buscarProvincia() {
        // 1. Verificamos que 'datos' exista y sea un array
        // Sigue siendo necesaria para evitar errores si el usuario clica antes de que termine el fetch
        if (!listadoProvincias || !Array.isArray(listadoProvincias)) {
            console.warn("Los datos aún no están listos o no son un array");
            return;
        }

        // 2. Buscamos el objeto cuyo nombre coincida con lo escrito en el input
        const provinciaEncontrada = listadoProvincias.find(prov =>
            prov.nombre == valueInputProvincia.nombre
        );

        if (provinciaEncontrada) {
            setProvincia(provinciaEncontrada);
            setUbicacionFocus("provincia");
        } else {
            console.warn("No se encontró ninguna coincidencia para:", valueInputProvincia);
            setProvincia(null);
        }
    }

    // Función para buscar el municipio del input en el backend. Usado en el dropdown.
    function buscarMunicipio() {
        // 1. Verificamos que 'datos' exista y sea un array (aunque siempre lo va a ser)
        // Sigue siendo necesaria para evitar errores si el usuario clica antes de que termine el fetch
        if (!listadoMunicipios || !Array.isArray(listadoMunicipios)) {
            console.warn("Los datos aún no están listos o no son un array");
            return;
        }

        // 2. Buscamos el objeto cuyo nombre coincida con lo escrito en el input
        const municipioEncontrado = listadoMunicipios.find(muni =>
            muni.nombre == valueInputMunicipio.nombre
        );

        if (municipioEncontrado) {
            setMunicipio(municipioEncontrado);
            setUbicacionFocus("municipio");
        } else {
            console.warn("No se encontró ninguna coincidencia para:", valueInputMunicipio);
            setMunicipio(null);
        }
    }

    // Función que se usa en el input del header
    function buscarMunicipioId(codigo) {
        if (!listadoMunicipios || !Array.isArray(listadoMunicipios)) {
            console.warn("Los datos aún no están listos o no son un array");
            return;
        }

        const municipioEncontrado = listadoMunicipios.find(muni =>
            trimId(muni.id) == codigo
        )


        if (municipioEncontrado) {
            setMunicipio(municipioEncontrado);
            setUbicacionFocus("municipio");
        } else {
            console.warn("No se encontró ninguna coincidencia para:", valueInputMunicipio);
            setMunicipio(null);
        }
    }

    return (
        <>
            <Header
                onSearch={buscarMunicipioId}
            ></Header>
            <main>
                <section className="controls-section">
                    <div className="control-group">
                        <Dropdown
                            options={listadoMunicipios}
                            onSelect={(option) => setValueInputMunicipio(option)}
                            label="Elije un municipio"
                        />
                        <Button onClick={buscarMunicipio}>Ver pronóstico</Button>
                    </div>

                    <div className="control-group">
                        <Dropdown
                            options={listadoProvincias}
                            onSelect={(option) => setValueInputProvincia(option)}
                            label="Elije una provincia"
                        />
                        <Button onClick={buscarProvincia}>Ver pronóstico</Button>
                    </div>
                </section>


                {prediccionProvincia && ubicacionFocus === "provincia" && (
                    <div className="informe-wrapper">
                        <pre className="informe-texto">
                            {prediccionProvincia.prediccion}
                        </pre>
                    </div>
                )}

                {prediccionMunicipio && ubicacionFocus == "municipio" && (
                    <PronosticoTabla weatherData={prediccionMunicipio}>

                    </PronosticoTabla>
                )}
            </main>
            <Footer></Footer>
        </>
    )
}

export default App;
