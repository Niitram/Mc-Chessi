
//funcion para agregar cards en el html
const agregaCardProductoCarritoHtml = () => {
    let clienteActual = capturarClienteActual();
    console.log(clienteActual);
    for (const [key, value] of Object.entries(clienteActual.carritoCliente)) {
        console.log(`value`, value.img);
        $("#contenedorCarrito").prepend(`
        <div class="cardProductoCarrito d-flex flex-wrap align-items-center justify-content-evenly p-4 my-2">
            <div class="contenedorCarrito__img">
                <img class="imgCarrito" src="${value.img}" alt="">
            </div>
            <div>
                <h4>${value.nombre}</h4>
                <span>descripcion del producto riquísimo</span>
            </div>
            <div class="my-2">
                <span>c/u</span>
                <span>$${value.precio}</span>
            </div>
            <div class="my-2 cardProductoCarrito__botonera">
                <button id="btnRestarProducto" class="btnRestarCarrito"><i class="fas fa-minus-circle"></i></button>
                <span id="cantidadProductos" class="p-2 fs-5">${value.cantidad}</span>
                <button id="btnSumarProducto" class="btnSumarCarrito"><i class="fas fa-plus-circle"></i></button>
            </div>
            <div class="my-2">
                <span>$169</span>
            </div>
        </div>
        `);
    }
};

agregaCardProductoCarritoHtml();