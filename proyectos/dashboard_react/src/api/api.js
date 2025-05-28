import { default as dataEmpleados } from './data/empleados-mock.json';
import { default as dataInvetario } from './data/inventario-mock.json';


const api = {
    getEmpleados:()=> new Promise((resolve,reject) => {
        try{
            setTimeout(() => resolve({
				status: 'ok',
				data: dataEmpleados 
			}), 1500)
        }catch(error){
            reject({
				status: 'erro',
				data: []
			})
        }
    })
    ,
    getEmpleado:(id)=> new Promise((resolve,reject) => {
        try{
            setTimeout(() => {
                const data = dataEmpleados.empleados.find(item => item.id === id)
                const vendidos = dataInvetario.inventario.filter(item=>item.vendedor_id === id)
                resolve({
                    status: 'ok',
                    data:  data,
                    vendidos: vendidos
                })
            }, 1500)
        }catch(error){
            reject({
				status: 'erro',
				data: []
			})
        }
    })
    ,
    getInvetario:()=> new Promise((resolve,reject) => {
        try{
            setTimeout(() => resolve({
				status: 'ok',
				data: dataInvetario 
			}), 1500)
        }catch(error){
            reject({
				status: 'erro',
				data: []
			})
        }
    }) 
    ,
    getVentas:()=> new Promise((resolve,reject) => {
        try{
            setTimeout(() => {
                const data  = dataInvetario.inventario
                resolve({
                    status: 'ok',
                    data: data.filter(item=>item.fecha_venta!=null) 
                })
            }, 1500)
        }catch(error){
            reject({
				status: 'erro',
				data: [],
                info: error
			})
        }
    }) 
    ,
    getProductos:()=> new Promise((resolve,reject) => {
        try{
            setTimeout(() => {
                const data  = dataInvetario.inventario
                resolve({
                    status: 'ok',
                    data: data.filter(item=>item.fecha_venta==null) 
                })
            }, 1500)
        }catch(error){
            reject({
				status: 'erro',
				data: [],
                info: error
			})
        }
    }) 
}


export default api