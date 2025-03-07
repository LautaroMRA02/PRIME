

let tabla = ""




var botones = document.querySelectorAll('.button_number')
botones.forEach((boton)=>{
    boton.addEventListener('click',function(e){
        tabla += String(this.dataset.value)
        console.log(tabla)
        console.log(e)
        actualizar_tabla()
        actualizar_pre_value()
    })

})


function actualizar_tabla(){
    document.getElementById('tabla').innerHTML = tabla
}

function actualizar_pre_value(){
    document.getElementById('pre_value').innerHTML = eval(tabla)
}
document.getElementById('total').addEventListener('click',()=>{
    document.getElementById('tabla').innerHTML = eval(tabla)
    document.getElementById('pre_value').innerHTML = ''

})

window.onload = ()=>{

}