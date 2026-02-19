import { useEffect, useState } from "react";


function useFetch(url) {
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si no existe url, return
        if (!url) {
            return
        }

        // 1. Creamos un controlador para poder cancelar la petición
        const abortController = new AbortController();

        const cargarDatos = async () => {
            setCargando(true);
            try {
                // 2. Pasamos la señal al fetch
                const respuesta = await fetch(url, { signal: abortController.signal });
                if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);

                const json = await respuesta.json();
                setDatos(json);
                setError(null);
            } catch (err) {
                // 3. Ignoramos el error si fue porque nosotros cancelamos la petición
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();

        // 4. Función de limpieza: cancela la petición si el componente se desmonta
        return () => abortController.abort();
    }, [url]);

    return { datos, cargando, error };
}

export default useFetch;