import { useState, useEffect } from "react"
import { styled } from 'styled-components'
import api from "../api/api.js"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

const Perfil = styled.div`
    color:#1a1a1a;
    height: auto;
    padding: 8px;
    .Empleados_Header{
        display: flex;
        gap: 8px;
        width: 100%;
        padding: 0px 16px;
        padding-top: 8px;
        justify-content: left;
        align-items: center;
        background-color: aliceblue;
    }
    .Empleados_Header_imagen{
        width: 75px;
        height: 75px;
        border-radius: 50%;
        background-color: gray;
        text-align: center;
    }
    .Empleados_Header_perfil{
        h2{
            color: #1a1a1a92;
        }
    }
    .Panel{
        background-color: aliceblue;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .Panel_nav {
        display: flex;
        gap: 8px;
        list-style: none;
        padding:  0px 16px;
        justify-content: center;

        li {
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 4px;

            &:hover {
                background-color: #e0e0e0;
            }

            &.active {
                background-color: #007bff;
                color: white;
            }
        }
    }
    .Panel_Contenindo{
        padding: 0px 16px;
        display: flex;
        justify-content: center;
        position: relative;
    }
    .Panel_item{
        width: 100%;
        h2{
            padding: 16px;
        }
    }
    .Panel_Contenido-contacto{
        h2{
            width: 100%;
            text-align: left;
        }
        p{
            font-size: 1.5rem;
            text-align: center;
        }
    }

    .ventas_list{
        display: flex;
        flex-flow: row wrap;
        gap: 8px;
        justify-content: center;

    }
    .ventas_item{
        background-color: gray;
        padding: 8px;
        width: 200px;
    }
`

export default function EmpleadoPerfil() {
    const [empleado, setEmpleado] = useState(null)
    const [Vendidos, setVendidos] = useState(null)

    const { id_empleados } = useParams()

    const [activePanel, setActivePanel] = useState('ventas')



    useEffect(() => {
        let isMounted = true;
        const fetchPerfil = async () => {
            try {
                const res = await api.getEmpleado(id_empleados);
                if (isMounted) {
                    setEmpleado(res.data)
                    setVendidos(res.vendidos)
                }
            } catch (error) { console.error('Error fetching inventario:', error); }
        };
        fetchPerfil();
        return () => {
            isMounted = false;
        };
    }, [])

    return (
        <>
            <Perfil>
                {empleado ? (<>
                    <section className="Empleados_Header">
                        <section className="Empleados_Header_imagen">IMAGEN</section>
                        <section className="Empleados_Header_perfil">
                            <h1>{empleado.nombre}</h1>
                            <h2>id:{empleado.id}</h2>
                        </section>
                    </section>
                    <section className="Panel">
                        <ul className="Panel_nav">
                            <li onClick={() => setActivePanel('ventas')}>ventas</li>
                            <li onClick={() => setActivePanel('contacto')}>contacto</li>
                        </ul>
                        <section className="Panel_Contenindo">
                           <ContenidoVentas  activePanel={activePanel} Vendidos={Vendidos} empleado={empleado}/>
                        </section>
                    </section>
                </>)
                    : (<p>Cargando...</p>)}

            </Perfil>
        </>
    )
}





const ContenidoVentas = ({activePanel,Vendidos,empleado}) => {
    switch (activePanel) {
        case 'contacto':
            return (
                <div className="Panel_item Panel_Contenido-contacto">
                    <h2>Información de Contacto</h2>
                    <h3>Numero</h3>
                    <p>{empleado.contacto.telefono}</p>
                    <h3>Correo electronico</h3>
                    <p>{empleado.contacto.email}</p>
                    <h3>Direccion de local</h3>
                    <p>{empleado.contacto.direccion}</p>
                </div>
            )
        case 'ventas':
            let lista = Vendidos.map(item => <section className="ventas_item" key={item.id}>{item.id}</section>)
                return (
                    <div className="Panel_item Panel_Contenido-ventas">
                        <h2>Información de{lista.length>=3 && ' ultimas 3'} Ventas </h2>
                        {/* {
                            lista.length <= 0? <h3>No hay ventas</h3> :
                                ( lista.length >= 3 ? 
                                    <section className="ventas_list">{lista.slice(0, 3)}</section>
                                    :
                                    <section className="ventas_list">{lista}</section>
                                )
                        } */}
                        { lista.length <= 0 && <h3>No hay ventas</h3>}
                        {lista.length >= 3 ? <section className="ventas_list">{lista.slice(0, 3)}</section>:<section className="ventas_list">{lista}</section>}
                    </div>
                )

        default:
            return null
    }
}
