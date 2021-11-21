//Captura los el id de la card del producto y la retorna
const capturarIdProducto = (e) => {
    const idCard = e.target.parentElement.parentElement.parentElement.id
    return parseInt(idCard)
}
//funcion para agregar cards en el html
const agregaCardProductoCarritoHtml = () => {
    let usuarioActual = capturarClienteActual();
    for (const [key, value] of Object.entries(usuarioActual.carritoCliente)) {
        $("#contenedorCarrito").prepend(`
        <div id="${value.id}" class="cardProductoCarrito d-flex flex-wrap align-items-center justify-content-evenly p-4 my-2">
            <div class="contenedorCarrito__img">
                <img class="imgCarrito" src="${value.img}" alt="">
            </div>
            <div>
                <h4>${value.nombre}</h4>
                <span>descripcion del producto riquísimo</span>
            </div>
            <div class="my-2">
                <span>c/u</span>
                <span>$<span class="precioProducto" >${value.precio}</span></span>
            </div>
            <div class="my-2 cardProductoCarrito__botonera">
                <button id="btnRestarProducto" class="btnRestarCarrito"><i class="fas fa-minus-circle"></i></button>
                <span id="cantidadProductos${value.id}" class="p-2 fs-5">${value.cantidad}</span>
                <button id="btnSumarProducto" class="btnSumarCarrito"><i class="fas fa-plus-circle"></i></button>
            </div>
            <div class="my-2">
                <span>$<span class="sumaProductos${value.id}" >${value.sumaProductos}</span></span>
            </div>
        </div>
        `);
    }
};

//Modifica la cantidad de productos en la card
const modificarCantidadProductosCard = (id, cantidad) => {
    $(`#cantidadProductos${id}`).text(`${cantidad}`)
}
//Modifica el valor de los productos en la card
const modificarValorProductosCard = (id, cantidad) => {
    $(`#sumaProductos${id}`).text(`${cantidad}`)
}

//modifica el texto de un elemento seleccionado
const modificaTextoElemento = (selector, texto, id) => {
    $(`${selector}${id}`).text(`${texto}`)
}

//funcion para mostrar la suma total de los productos en el carrito
const dibujarSumaTotalCarrito = () => {
    let usuarioActual = capturarClienteActual();
    $("#totalCarrito").text(usuarioActual.cuentaTotal);
}

const aumentaCantidadProductosCard = (id) => {
    const cantidad = parseInt($(`#cantidadProductos${id}`).text())
    return cantidad + 1
}

const restaCantidadProductosCard = (id) => {
    const cantidad = parseInt($(`#cantidadProductos${id}`).text())
    if (cantidad === 0) {
        return 0
    }
    return cantidad - 1
}
//Funcion sumar producto desde el carrito
/* const sumarProductoDesdeCarrito = (element) => {
    console.log(element.querySelector("#cantidadProductos").textContent)
    const productoElegido = {
        id: element.id,
        nombre: element.querySelector("h4").textContent,
        precio: parseInt(element.querySelector(".precioProducto").textContent),
        cantidad: parseInt(element.querySelector("#cantidadProductos").textContent),
        img: element.querySelector("img").src,
        sumaProductos: parseInt(element.querySelector(".sumaProductos").textContent)
    }
    if (carrito.hasOwnProperty(productoElegido.id)) {
        //Se aumenta la cantidad del producto en 1
        productoElegido.cantidad = 1 + carrito[productoElegido.id].cantidad;
    }
    //Se suman el precio de los productos por la canntidad del mismo producto
    productoElegido.sumaProductos = productoElegido.cantidad * productoElegido.precio;
    carrito[productoElegido.id] = { ...productoElegido };
    let usuarioActual = capturarClienteActual();
    usuarioActual.carritoCliente = carrito
    //Se suma el total del carrito
    usuarioActual.cuentaTotal = sumaTotalCarrito(usuarioActual);
    console.log(usuarioActual);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    crearContadorCarrito()
} */

//Funcion para dibujar el boton de comprar carrito
const dibujarBotonComprarCarrito = () => {
    $("#ContainerResultadoCarrito").append(`
        <div class="d-flex justify-content-center">
            <button id="btnComprarCarrito" class="btn btn-primary">Comprar</button>
        </div>
    `);
}




window.onload = () => {
    let usuarioActual = capturarClienteActual()

    //los eventos click de los botones
    document.addEventListener("click", (e) => {

        //Evento comprar producto
        if (e.target.id == "btnComprarCarrito") {
            e.stopPropagation

        }

        //Evento sumar producto
        if (e.target.parentElement.id == "btnSumarProducto") {
            e.stopPropagation
            let id = capturarIdProducto(e)
            let cantidad = aumentaCantidadProductosCard(id)
            modificarCantidadProductosCard(id, cantidad)
            aumentaCantidadMismoProducto(usuarioActual, id)
            let sumaMismoProducto = sumaTotalMismoProducto(usuarioActual, id)
            modificaTextoElemento(".sumaProductos", sumaMismoProducto, id)
            let sumaTotalProductos = sumaTotalCarrito(usuarioActual)
            usuarioActual.cuentaTotal = sumaTotalProductos
            $("#totalCarrito").text(usuarioActual.cuentaTotal)
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        }

        //Evento restar producto
        if (e.target.parentElement.id == "btnRestarProducto") {
            e.stopPropagation
            let id = capturarIdProducto(e)
            let cantidad = restaCantidadProductosCard(id)
            if (cantidad <= 0) {
                modificarCantidadProductosCard(id, cantidad)
                modificaTextoElemento(".sumaProductos", cantidad, id)
                let sumaTotalProductos = sumaTotalCarrito(usuarioActual)
                usuarioActual.cuentaTotal = sumaTotalProductos
                $("#totalCarrito").text(usuarioActual.cuentaTotal)
            }
            else {
                modificarCantidadProductosCard(id, cantidad)
                restaCantidadMismoProducto(usuarioActual, id)
                let sumaMismoProducto = sumaTotalMismoProducto(usuarioActual, id)
                modificaTextoElemento(".sumaProductos", sumaMismoProducto, id)
                let sumaTotalProductos = sumaTotalCarrito(usuarioActual)
                usuarioActual.cuentaTotal = sumaTotalProductos
                $("#totalCarrito").text(usuarioActual.cuentaTotal)
            }
            localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
        }

    })

    if (usuarioActual) {
        agregaCardProductoCarritoHtml();
        dibujarSumaTotalCarrito();
        if (usuarioActual.cuentaTotal > 0) {
            dibujarBotonComprarCarrito();
        }
    }

    modificarCantidadProductosCard(5, 8)

}