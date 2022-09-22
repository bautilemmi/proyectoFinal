let carritoDeCompras = []

const contenedorCarrito = document.getElementById('carrito-contenedor');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');


function agregarAlCarrito(id) {
    let yaEsta = carritoDeCompras.find(item=> item.id == id)
    if(yaEsta){
        yaEsta.cantidad =+ 1
        document.getElementById(`und${yaEsta.id}`).innerHTML =` <p id=und${yaEsta.id}>Und:${yaEsta.cantidad}</p>`
        actualizarCarrito()
    }else{
       let productoAgregar = stockProductos.find(elemento => elemento.id == id)
    
        productoAgregar.cantidad = 1
        
        carritoDeCompras.push(productoAgregar)
        
        actualizarCarrito()

        mostrarCarrito(productoAgregar) 
    }

    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))

    Swal.fire('Has agregado este producto al carrito')
    
}





function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.className = 'productoEnCarrito'
    div.innerHTML=`
                    <p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    btnEliminar.addEventListener('click',()=>{
        if(productoAgregar.cantidad == 1){
           btnEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(item=> item.id != productoAgregar.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
        }else{
            productoAgregar.cantidad = productoAgregar.cantidad - 1
            document.getElementById(`und${productoAgregar.id}`).innerHTML =` <p id=und${productoAgregar.id}>Und:${productoAgregar.cantidad}</p>`
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
            }
        

    })


}



function  actualizarCarrito (){
    contadorCarrito.innerText = [...carritoDeCompras].reduce((acc,el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}




function recuperar() {
 let recuperarLS = JSON.parse(localStorage.getItem('carrito')) || []
 
     recuperarLS.forEach(el=> {
         mostrarCarrito(el)
         carritoDeCompras.push(el)
         actualizarCarrito()
     })

}


recuperar()


finalizarCompra.addEventListener('click', () => {
       if(carritoDeCompras.length == 0){
         Swal.fire('No agregaste ningún producto al carrito')
       } else{
           carritoDeCompras=[]
           localStorage.clear()
           contenedorCarrito.innerHTML = ''
           actualizarCarrito()
           Swal.fire('Compra finalizada con éxito, gracias por comprar nuestros productos!')
        }
    }
)
   


compraFinalizada()