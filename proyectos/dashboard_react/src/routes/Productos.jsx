import { useState, useEffect } from "react"
import api from "../api/api.js"
import styled from "styled-components"

const Cards = styled.section`
    padding: 16px;
    max-width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 240px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
    justify-content: center;
    section{
        display: flex;
        flex-flow: row;
        flex-wrap: nowrap;
        width: 100%;
    }
    .card-image{
        min-width: 100px;
        height: 100px;
        background-color: gray;
        text-align: center;
    }
    .card-content{
        width: 100%;
        padding: 8px;
    }
`


export default function Productos() {
    const [filtro, setFiltro] = useState(null)
    const [inventario, setInventario] = useState([])
    const [filtros, setFiltros] = useState([])


    useEffect(() => {
        let isMounted = true;

        const fetchInventario = async () => {
            try {
                const res = await api.getProductos();
                if (isMounted) {
                    setInventario(res.data);
                }
            } catch (error) { console.error('Error fetching inventario:', error); }
        };
        fetchInventario();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        setFiltros([...new Set(inventario.map(item => item.nombre_producto))]);
        console.log(inventario);

    }, [inventario])

    function Items({ InvetarioSTATE, Filtro }) {
        if (Filtro !== null && Filtro !== "all") {
            const filtrado = InvetarioSTATE.filter(item => item.nombre_producto == Filtro)
            return (<>{filtrado ? <Cards>{filtrado.map(item =>
                    <section key={item.id}>
                        <div className="card-image">IMAGEN</div>
                        <div className="card-content">
                            <h3>{item.nombre_producto}</h3>
                            <p>{item.precio_base}</p>
                        </div>
                    </section>
                    
            )} </Cards> : ""}</>)
        } else {
            return (
                <>
                    <Cards>
                        {
                            InvetarioSTATE ?
                                InvetarioSTATE.map(item =>
                                    <section key={item.id}>
                                        <div className="card-image">IMAGEN</div>
                                        <div className="card-content">
                                            <h3>{item.nombre_producto}</h3>
                                            <p>{item.precio_base}</p>
                                        </div>
                                    </section>)
                                :
                                ""
                        }
                    </Cards>
                </>
            )
        }
    }

    return (
        <>
            <section className="filtro">
                <select onChange={e => setFiltro(e.target.value)}>
                    <option value="all" >todos</option>
                    {filtros.map(item => <option value={item} >{item}</option>)}
                </select>
            </section>
            <Items InvetarioSTATE={inventario} Filtro={filtro} />

        </>)
}