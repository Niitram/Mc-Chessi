class Producto {
    constructor(nombre, precio, id, stock) {
        this.nombre = nombre.toUpperCase();
        this.precio = precio;
        this.id = id;
        this.stock = stock;
    }
}

const papasFritas = new Producto("Porcion de papas fritas", 450, "1", 50);
const hamburguesaConQueso = new Producto("Hamburguesa con queso", 600, "2", 50);
const ensaladaCesar = new Producto("Ensalada Cesar", 150, "3", 50);
const botellaDeAgua = new Producto("Botella de agua", 100, "4", 50);
const productos = [papasFritas, hamburguesaConQueso, ensaladaCesar, botellaDeAgua]
const ordenarProductosMenorPrecio = () => {
    const productoMenorPrecio = productos.sort((a, b) => {
        return a.precio - b.precio
    })
    /* return carritoMenorPrecio */
    console.log(productoMenorPrecio)
}
const ordenarProductosMayorPrecio = () => {
    const productoMayorPrecio = productos.sort((a, b) => {
        return b.precio - a.precio
    })
    /* return productoMayorPrecio */
    console.log(productoMayorPrecio)
}
class Usuario {
    constructor(nombre, pedidoNumero, carritoCliente, cuentaTotal) {
        this.nombre = nombre;
        this.pedidoNumero = pedidoNumero;
        this.carritoCliente = carritoCliente;
        this.cuentaTotal = cuentaTotal;
    }
    pedirProducto() {
        let numeroIngresado = parseInt(prompt('Ingrese el numero de la opción que quiere elegir'))
        let esCorrecto = true
        //se chequea que el valor ingresado este bien
        do {
            if (Number.isNaN(numeroIngresado) || (numeroIngresado < 1 || numeroIngresado > 4)) {
                numeroIngresado = parseInt(prompt('ERROR! Ingrese un numero entre 1 y 4'))
                esCorrecto = false
            } else {
                esCorrecto = true
            }
        } while (esCorrecto == false);
        return numeroIngresado
    }
    agregarProducto(id) {
        productos.forEach(elemento => {
            if (elemento.id == id) {
                return this.carritoCliente.push(elemento)
            }
        });

    }
    sumarProductos() {
        let totalPedido;
        let suma = 0;
        this.carritoCliente.forEach(element => {
            totalPedido = suma += element.precio;
        });
        return totalPedido;
    }
    mostrarTotal(total) {
        alert(`El total a pagar es ${total}`)
    }
}
const clientes = [];
const pedirNombre = () => {
    let esCorrecto = true;
    let nombreUsuario = prompt('Ingrese su nombre para comenzar (tenga en cuente que si luego quiere agregar mas productos a su carrito deberá ingresar el mismo nombre para que sea valido, de lo contrario se creará un nuevo carrito)')
    do {
        if (nombreUsuario === null || nombreUsuario === undefined || nombreUsuario == "") {
            nombreUsuario = prompt('ERROR! Ingrese su nombre para continuar')
            esCorrecto = false
        } else {
            esCorrecto = true
        }
    } while (esCorrecto === false);
    return nombreUsuario
}
const verificarNombre = (nombreUsuario) => {
    /* Si no hay clientes aun crea al primero */
    if (clientes.length <= 0) {
        nombreUsuario = new Usuario(nombreUsuario, [1], [], 0)
        clientes.push(nombreUsuario)
        return nombreUsuario
    } else {
        let fueEncontrado = false;
        /* Si hay clientes busca entre la lista de clientes si ya existe el cliente */
        clientes.forEach(element => {
            if (element.nombre == nombreUsuario) {
                fueEncontrado = true;
                alert(`Hola ${element.nombre} ¿que mas desea agregar a su carrito? `)
                nombreUsuario = element
                return nombreUsuario
            }
        });
        /* Si el cliente no esta ingresado con ese nombre crea un Usuario nuevo */
        if (fueEncontrado == false) {
            nombreUsuario = new Usuario(nombreUsuario, [1], [], 0)
            clientes.push(nombreUsuario)
            return nombreUsuario
        }
    }
    return nombreUsuario
}
const consultaSeguir = (objUsuario) => confirm(`${objUsuario.nombre} ¿Desea seguir agregando mas productos? sino aprete "cancelar" para pedir la cuenta`)
const crearUsuario = () => {
    let nombreUsuario;
    nombreUsuario = pedirNombre()
    nombreUsuario = verificarNombre(nombreUsuario)
    return nombreUsuario
}
const iniciarPedido = () => {
    let usuario = crearUsuario()
    let quiereSeguir;
    /* Mientras quiera seguir le volverá a pedir producto */
    do {
        let productoIngresado = usuario.pedirProducto()
        usuario.agregarProducto(productoIngresado)
        quiereSeguir = consultaSeguir(usuario)
    } while (quiereSeguir);
    let esTotal = usuario.sumarProductos()
    usuario.mostrarTotal(esTotal)
}
const $btnHacerPedido = document.querySelector('#hacerPedido').addEventListener('click', iniciarPedido)
const $btnOrdenarmayor = document.querySelector('#Ordenarmayor').addEventListener('click', ordenarProductosMayorPrecio)
const $btnOrdenarmenor = document.querySelector('#Ordenarmenor').addEventListener('click', ordenarProductosMenorPrecio)