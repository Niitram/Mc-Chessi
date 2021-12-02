//Una vez que se realiza el pago se vacia el carrito del Cliente
const vaciarCliente = () => {
    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    //Se borra el carrito del cliente
    usuarioActual = {
        cantidadProductos: 0,
        carritoCliente: [],
        cuentaTotal: 0,
        nombre: usuarioActual.nombre,
        password: usuarioActual.password,
        pedidoNumero: [1]
    }
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
}

vaciarCliente()
