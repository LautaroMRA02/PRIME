import { useState, useEffect } from "react"
import api from "../api/api.js"
function Ventas1() {
    const [filtro, setFiltro] = useState(null)
    const [inventario, setInventario] = useState([])
    const [filtros, setFiltros] = useState([])


    useEffect(() => {
        let isMounted = true;

        const fetchInventario = async () => {
            try {
                const res = await api.getVentas();
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
    }, [inventario])

    function Items({ InvetarioSTATE, Filtro }) {
        if (Filtro !== null && Filtro !== "all") {
            const filtrado = InvetarioSTATE.filter(item => item.nombre_producto == Filtro)
            return (<>{filtrado ? filtrado.map(item => <div key={item.id}>{item.nombre_producto}</div>) : ""}</>)
        } else {
            return (
                <>
                    {
                        InvetarioSTATE ?
                            InvetarioSTATE.map(item => <div key={item.id}>{item.nombre_producto}</div>)
                            :
                            ""
                    }
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
            <section>
                <Items InvetarioSTATE={inventario} Filtro={filtro} />
            </section>

        </>)
}




import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [

    {
        name:'test',
        david: 200,
        ruben: 200,
        matias: 200,
        maria: 300,
    },
    {
        name:'test',
        david: 200,
        ruben: 200,
        matias: 200,
        maria: 300,
    },

];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];
const getMonthName = (monthNumber) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[parseInt(monthNumber) - 1];
};



export default function Ventas() {
    const [ventasData, setVentasData] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    useEffect(() => {
        // Aquí iría tu llamada a la API
        const fetchData = async () => {
            try {
                const response = await api.getVentas();
                const data = response.data;
                console.log(data);
                setVentasData(transformData(data));
                const empleadosList = [...new Set(data.map(item => item.vendedor_id))];
                console.log(empleadosList);
                setEmpleados(empleadosList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const transformData = (rawData) => {
        // Agrupar por mes
        const groupedByMonth = rawData.reduce((acc, item) => {
            const month = item.fecha_venta.split('-')[1]; // Asumiendo formato YYYY-MM-DD
            if (!acc[month]) {
                acc[month] = {};
            }
            if (!acc[month][item.vendedor_id]) {
                acc[month][item.vendedor_id] = 0;
            }
            // acc[month][item.vendedor_id] += item.fecha_venta;
            acc[month][item.vendedor_id] += 1;
            return acc;
        }, {});
        return Object.entries(groupedByMonth).map(([month, ventas]) => ({
            name: getMonthName(month),
            ...ventas
        }));
    }

    return (
        <div style={{ width: '30%', height: 400 }}>
            <h2>Ventas </h2>
            <ResponsiveContainer >
                <BarChart
                    data={ventasData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <YAxis /> 
                    {/* <Legend /> */}
                    {empleados.map((empleado,index)=>(<Bar stackId="1"  key={empleado} dataKey={empleado}  name={empleado}  fill={COLORS[index % COLORS.length]}/>)
                    )}
                 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
