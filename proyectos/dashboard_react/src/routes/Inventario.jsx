import { useState, useEffect } from "react"
import api from "../api/api.js"
import styled from "styled-components"

export default function Inventario() {
    const [filtro, setFiltro] = useState(null)
    const [inventario, setInventario] = useState([])
    const [filtros, setFiltros] = useState([])



    useEffect(() => {
        let isMounted = true;

        const fetchInventario = async () => {
            try {
                const res = await api.getInvetario();
                if (isMounted) {
                    setInventario(res.data.inventario);
                }
            } catch (error) { console.error('Error fetching inventario:', error); }
        };
        fetchInventario();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        setFiltros([...new Set(inventario.map(item => item.nombre_producto))]);
    }, [inventario])



    return (
        <>
            <section className="filtro">
                <select onChange={e => setFiltro(e.target.value)}>
                    <option value="all" >todos</option>
                    {filtros.map(item => <option value={item} >{item}</option>)}
                </select>
            </section>
            <section>
                <Items InvetarioSTATE={inventario} Filtro={filtro} />
            </section>
        </>)
}


const ContainerListColor = styled.div`
    padding: 16px;
    max-width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 240px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
    justify-content: center;
    .card{
        width: 100%;
        padding: 8px;
    }
    .green{
        background-color: rgba(0, 255, 13, 0.205);
    }
    .red{
        background-color: rgba(255, 0, 0, 0.205);
    }
    .yellow{
        
    }
`

function Items({ InvetarioSTATE, Filtro }) {

    if (Filtro !== null && Filtro !== "all") {
        const filtrado = InvetarioSTATE.filter(item => item.nombre_producto == Filtro)
        return (
            <ContainerListColor>
                {filtrado && filtrado.map(item =>
                    <div key={item.id} className={`card ${item.estado == 'disponible' && ' green '} ${item.estado == 'vendido' && ' red '}`} >
                        <p>{item.nombre_producto}</p>
                        <p>{item?.vendedor_id}</p>
                    </div>
                )}
            </ContainerListColor>
        )
    } else {
        return (
            <ContainerListColor>
                {InvetarioSTATE && InvetarioSTATE.map(item =>
                    <div key={item.id} className={`card ${item.estado == 'disponible' && ' green '} ${item.estado == 'vendido' && ' red '}`} >
                        <p>{item.nombre_producto}</p>
                        <p>{item?.vendedor_id}</p>
                    </div>
                )}
            </ContainerListColor>
        )
    }
}