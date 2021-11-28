const vaciarCliente = () => {
    let usuarioActual = capturarClienteActual()
    //Se borra el carrito del cliente
    usuarioActual = {
        cantidadProductos: 0,
        carritoCliente: [],
        cuentaTotal: 0,
        nombre: usuarioActual.nombre,
        password: usuarioActual.password,
        pedidoNumero: [1]
    }
    console.log(usuarioActual)
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
}

window.onload = () => {
    vaciarCliente()
}