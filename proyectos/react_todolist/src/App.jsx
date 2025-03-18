import { useState, useEffect } from 'react'
import './App.css'
import { nanoid } from 'nanoid'


const api = {
	getListaAPI: () => new Promise((resolve,reject) => {
		try {
			const list =  window.localStorage.getItem("Lista");
			setTimeout(() => resolve({
				status: 'ok',
				data: list ? JSON.parse(list) : []
			}), 1500)

		} catch (error) {
			reject({
				status: 'erro',
				data: []
			})
		}
	}),
	setListaAPI: (data) => new Promise((resolve,reject) => {
		try {
			window.localStorage.setItem("Lista", JSON.stringify(data))
			resolve('guardado')
		} catch (err) {
			reject('error al guardar')
		}
	})
}


function App() {
	// const [count, setCount] = useState(0)
	const [lista, setLista] = useState([])
	const [isInitialized, setIsInitialized] = useState(false)
	const [itemPlantilla, setItemPlantilla] = useState({
		nota: ''
	})
	const baseItemPlantilla = { nota: '' }

	const [isOpenAdd, setIsOpenAdd] = useState(false)
	const [isOpenEdit, setIsOpenEdit] = useState(false)


	function handlerItem(e) {
		setItemPlantilla(prevData => {
			return { ...prevData, [e.target.name]: e.target.value }
		})
	}

	function addItem() {
		setLista(prev => [...prev, { ...itemPlantilla, id: nanoid() }])
		setItemPlantilla(baseItemPlantilla)
		closeAdd()
	}
	function deleteListaItem(e) {
		setLista(prev => prev.filter(item => item.id !== e.target.dataset.id))
	}


	function editListaItem(e) {
		setIsOpenEdit(prev => true)
		setItemPlantilla(lista.filter(item => item.id === e.target.dataset.id)[0])
	}
	function saveEdit() {
		setLista(prev => { return prev.map(item => item.id === itemPlantilla.id ? itemPlantilla : item) })
		setItemPlantilla(baseItemPlantilla)
		closeEdit()
	}
	const openAdd = () => setIsOpenAdd(prev => true)
	const closeAdd = () => setIsOpenAdd(prev => false)
	const openEdit = (e) => { }
	const closeEdit = () => setIsOpenEdit(prev => false)

	function ListaItemComponent({ listaItems }) {
		return (
			<>
				<ul className='container_list'>
				{listaItems.length > 0 ? listaItems.map(element => (
						<li className='element_list' key={element.id}>
							<p>{element?.nota}</p>
							<button data-id={element.id} onClick={editListaItem}>edit</button>
							<button data-id={element.id} onClick={deleteListaItem}>x</button>
						</li>
					
				)) : <p className='w-100'>no hay items!</p> }
				</ul>
			</>
		)
	}
	useEffect(() => {
		api.getListaAPI()
			.then(response => {
				setLista(response.data)
				setIsInitialized(true)
			})
			.catch(console.log)
	}, [])

	useEffect(() => {
		if (isInitialized){
			api.setListaAPI(lista)
		}
	}, [lista,isInitialized])
	
	return (
		<>
			<section className='todolist'>
				<section>
					<h1>Todo list react js</h1>
					<button onClick={openAdd} className='w-100'>Agregar</button>
					{isInitialized?<ListaItemComponent listaItems={lista} />:<p className='spinner'>imagina un spinner!</p>}
				</section>
				<section className={`modal not_modal ${isOpenEdit ? 'yes_modal' : ''}`}>
					<h2>editar item</h2>
					<label htmlFor="nota">nota</label>
					<input id="nota" type="text" name="nota" value={itemPlantilla?.nota} onChange={handlerItem} />
					<button onClick={saveEdit}>Editar</button>
					<button onClick={closeEdit}>Cerrar</button>
				</section>
				<section className={`modal not_modal ${isOpenAdd ? 'yes_modal' : ''}`}>
					<h2>agregar item</h2>
					<form id='form-add'>
						<label htmlFor="nota">nota</label>
						<input id="nota" type="text" name="nota" value={itemPlantilla.nota} onChange={handlerItem} />
					</form>
					<button onClick={addItem}>agregar</button>
					<button onClick={e => setIsOpenAdd(false)}>Cerrar</button>
				</section>
			</section>
		</>
	)
}

export default App
