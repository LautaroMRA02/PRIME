import {Outlet,Link} from "react-router-dom"
import styled from "styled-components"



const NavElement = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 70px;
    align-items: center;
    ul{
        padding: 8px;
        list-style: none;
        display: flex;
        flex-flow: row nowrap;
        gap: 8px;
    }
`

export default function Root(){

    
    return (
        <>
        <NavElement>
            <ul>
                <li>
                    <Link to={'empleados'}>Empleados</Link>
                </li>
                <li>
                    <Link to={'productos'}>productos</Link>
                </li>
                <li>
                    <Link to={'stock'}>stock</Link>
                </li>
                <li>
                    <Link to={'ventas'}>ventas</Link>
                </li>
            </ul>
        </NavElement>
        <Outlet />
        </>
    )
}