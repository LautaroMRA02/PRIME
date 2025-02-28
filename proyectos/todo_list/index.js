
 

class TodoListPOO{
    constructor(){
        // ejem ITEM {id;nombre;cantidad;nota;precio}
        this.Data_Items = JSON.parse(localStorage.getItem('Data_Items')) || []
        this.Item_edit = {}
        this.index 
        this.iniciar_POO()
    }

    iniciar_POO(){
        localStorage.setItem('Data_Items',JSON.stringify(this.Data_Items))
        this.actualizar()
    }

    agregar(){
        const formElements = document.getElementById('formulario')
        this.Data_Items.push({
            nombre:formElements.elements['nombre'].value,
            cantidad:formElements.elements['cantidad'].value,
            nota:formElements.elements['nota'].value,
            precio:formElements.elements['precio'].value,
        })
        console.log(this.Data_Items);
        formElements.reset()
        this.actualizar()
    }

    agregar_modal(){
        const modal = document.getElementById('modal-agregar')
        modal.classList.remove('none')
    }

    agregar_modal_cerrar(){
        const modal = document.getElementById('modal-agregar')
        modal.classList.add('none')
    }

    agregar_modal_agregar(){
        const formElements = document.getElementById('formulario_modal_add')
        this.Data_Items.push({
            nombre:formElements.elements['nombre'].value,
            cantidad:formElements.elements['cantidad'].value,
            nota:formElements.elements['nota'].value,
            precio:formElements.elements['precio'].value,
        })
        formElements.reset()
        this.actualizar()
        const modal = document.getElementById('modal-agregar')
        modal.classList.add('none')
    }
    eliminar(index){
        this.Data_Items = this.Data_Items.filter((item, i)=> i != index)
        this.actualizar()
    }

    editar(index){
        const modal = document.getElementById('modal-editar')
        modal.classList.remove('none')
        this.Item_edit = this.Data_Items[index]
        this.index = index
        let formulario = document.getElementById('formulario_modal_editar')
        formulario.elements['nombre'].value = this.Item_edit['nombre']
        formulario.elements['cantidad'].value = this.Item_edit['cantidad']
        formulario.elements['nota'].value = this.Item_edit['nota']
        formulario.elements['precio'].value = this.Item_edit['precio']
    }

    editar_guardar(){
        if (this.index == null){
            return
        }
        let formulario = document.getElementById('formulario_modal_editar')
        console.log(this.Data_Items[this.index]);
        this.Data_Items[this.index] = { nombre:formulario.elements['nombre'].value,
            cantidad:formulario.elements['cantidad'].value,
            nota:formulario.elements['nota'].value,
            precio:formulario.elements['precio'].value,}
        console.log(this.Data_Items[this.index]);
        formulario.reset()
        this.Item_edit = {}
        this.index = null
        const modal = document.getElementById('modal-editar')
        modal.classList.add('none')
        this.actualizar()
    }

    editar_cancelar(){
        document.getElementById('formulario_modal_editar').reset()
        this.Item_edit = {}
        this.index = null
        const modal = document.getElementById('modal-editar')
        modal.classList.add('none')
    }

    actualizar(){
        if (JSON.parse(localStorage.getItem('Data_Items'))==0){document.getElementById('ListaItems').innerHTML='No hay items'}
        localStorage.setItem('Data_Items', JSON.stringify(this.Data_Items));
        const data =  this.Data_Items.reduce((html, item, index)=> html += this.generar_item_html(item.nombre,item.cantidad,item.nota,item.precio,index),'')
        document.getElementById('ListaItems').innerHTML= data

    }

    generar_item_html(nombre,cantidad,nota,precio,index){
        return` <li class="Item" id="${index}">
                    <div>${nombre}</div> 
                    <div>${cantidad}</div> 
                    <div>${nota}</div> 
                    <div>${precio}</div>
                    <section>
                    <button class="green" onclick="Handler.editar(${index})">editar</button>
                    <button class="red" onclick="Handler.eliminar(${index})">X</button>
                    </section>
                </li>`
    }

}




window.addEventListener('load',()=>{
    Handler = new TodoListPOO()
})