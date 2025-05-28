import { useState, useEffect } from "react"
import { styled } from 'styled-components'
import api from "../api/api.js"
import { Link } from "react-router-dom"



const EmpleadosList = styled.div`
padding: 0px 1.2rem;
display: flex;
flex-flow: row wrap;
gap: 8px;
justify-content: center;
.elementos {
    padding: 0px 1.2rem;
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
    justify-content: center;
        div {
        width: 250px;
        padding: 0.8rem;
        border-radius: 0.8rem;
        background-color: aliceblue;
        color: #1a1a1a;
        }
}

`

export default function Empleados() {
    const [empleados, setEmpleados] = useState([])


    useEffect(() => {
        api.getEmpleados().then(res => {
            setEmpleados(prev => res.data.empleados)
            
            console.log(res.data.empleados);
        })

    }, [])

    return (
        <>
            <EmpleadosList>

                <section className="filtro">

                </section>
                <section className="elementos">
                    {empleados ? empleados.map(item => (
                        <div>
                            <h2>{item.id}</h2>
                            <h2>{item.nombre}</h2>
                            <p>estado: ...</p>
                            <p>ventas: ...</p>
                            <p>calificacion: {item.evaluacion_desempeño}</p>
                        <Link to={`/empleados/${item.id}`}key={item.id}>
                        Ver perfil
                        </Link>

                        </div>
                    ))
                        : <></>}
                </section>

            </EmpleadosList>
        </>
    )
}