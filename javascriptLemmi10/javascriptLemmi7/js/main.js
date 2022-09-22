


const contenedorProductos = document.getElementById('contenedor-productos');
const selecVinos = document.getElementById('selecVinos')
const buscador = document.getElementById('search')



//filtro
selecVinos.addEventListener('change',()=>{
    console.log(selecVinos.value);
    if(selecVinos.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(elemento => elemento.marca == selecVinos.value))
    }
})

//Buscador
buscador.addEventListener('input', ()=>{
    mostrarProductos(stockProductos.filter(item=> item.nombre.toUpperCase().includes( buscador.value.toUpperCase())))
})


mostrarProductos(stockProductos)

//logica Ecommerce
function mostrarProductos(array){
    contenedorProductos.innerHTML= ""
    
   array.forEach(item => {

    const {img, nombre, id, marca, precio} = item

       let div = document.createElement('div')
       div.classList.add('producto')
    div.innerHTML += `
                    <div class="card" >
                        <div class="card-image">
                            <img src=${img}>
                            <span class="card-title" id="${id}">${nombre}</span>
                            <a  id="agregar${id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                           
                            <p>Marca: ${marca}</p>
                            <p> $${precio}</p>
                        </div>
                    </div>
    `
    contenedorProductos.appendChild(div)

        let nombreDetalle = document.getElementById(`${item.id}`)
        nombreDetalle.addEventListener('click',()=>{
            let guardarLS = stockProductos.find(elemento => elemento.id == item.id)
            localStorage.setItem('producto', JSON.stringify(guardarLS))
            location.href = 'http://127.0.0.1:5501/pages/detalle.html'
        })

        let btnAgregar = document.getElementById(`agregar${item.id}`)
        btnAgregar.addEventListener('click',()=>{
           agregarAlCarrito(item.id)
        })

   })
}






