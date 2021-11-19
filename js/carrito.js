
//funcion para agregar cards en el html
const agregaCardProductoCarritoHtml = () => {
    let clienteActual = capturarClienteActual();
    for (const [key, value] of Object.entries(clienteActual.carritoCliente)) {
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
                <span id="cantidadProductos" class="p-2 fs-5">${value.cantidad}</span>
                <button id="btnSumarProducto" class="btnSumarCarrito"><i class="fas fa-plus-circle"></i></button>
            </div>
            <div class="my-2">
                <span>$<span class="sumaProductos" >${value.sumaProductos}</span></span>
            </div>
        </div>
        `);
    }
};

//funcion para mostrar la suma total de los productos en el carrito
const dibujarSumaTotalCarrito = () => {
    let usuarioActual = capturarClienteActual();
    $("#totalCarrito").text(usuarioActual.cuentaTotal);
}

//Funcion sumar producto desde el carrito
const sumarProductoDesdeCarrito = (element) => {
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
}

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
    if (usuarioActual) {
        console.log("hola ", usuarioActual.nombre);
        agregarNombreUsuarioNavBar(usuarioActual.nombre)
        crearBtnsUsuarioNavBar()
        crearContadorCarrito()
        agregaCardProductoCarritoHtml();
        dibujarSumaTotalCarrito();
        if (usuarioActual.cuentaTotal > 0) {
            dibujarBotonComprarCarrito();
        }
        $("#btnSumarProducto").on("click", (e) => {
            sumarProductoDesdeCarrito(e.target.parentElement.parentElement.parentElement);
        })
    }



}