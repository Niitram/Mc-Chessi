/* captura de los elementos del dom */
const $carritoNavbar = document.getElementById("carritoNavbar");
const $btnAgregarCarrito = document.getElementsByClassName("btnAgregarCarrito");
const carrito = {}
class Producto {
    constructor(nombre, precio, id, stock, img, cantidad) {
        this.nombre = nombre.toUpperCase();
        this.precio = precio;
        this.id = id;
        this.stock = stock;
        this.img = img;
        this.cantidad = cantidad;
    }
}
//Creacion de los productos
const papasFritas = new Producto("Porcion de papas fritas", 450, "1", 50, "../img/papas-fritas.jpg", 0);
const hamburguesaConQueso = new Producto("Hamburguesa con queso", 600, "2", 50, "../img/hamburguesa-con-queso.png", 0);
const ensaladaCesar = new Producto("Ensalada Cesar", 150, "3", 50, "../img/ensalada-Cesar.jpg", 0);
const botellaDeAgua = new Producto("Botella de agua", 100, "4", 50, "../img/botella-de-agua.jpg", 0);

//Array con todos los productos
const productos = [
    papasFritas,
    hamburguesaConQueso,
    ensaladaCesar,
    botellaDeAgua,
];

//Funcion ordenar productos por menor precio
const ordenarProductosMenorPrecio = () => {
    const productoMenorPrecio = productos.sort((a, b) => {
        return a.precio - b.precio;
    });
    /* return carritoMenorPrecio */
    console.log(productoMenorPrecio);
};

//Funcion ordenar productos por mayor precio
const ordenarProductosMayorPrecio = () => {
    const productoMayorPrecio = productos.sort((a, b) => {
        return b.precio - a.precio;
    });
    /* return productoMayorPrecio */
    console.log(productoMayorPrecio);
};



//Agrega el producto al array de productos
const agregarProducto = (usuario) => {
    productos.forEach((elemento) => {
        if (elemento.id == id) {
            return usuario.carritoCliente.push(elemento);
        }
    });
};

//funcion del boton para agreagar al carrito
const AgregarAlCarrito = (e) => {
    if (e.target.id) {
        agarrarCardProducto(e.target.parentElement.parentElement.parentElement);
    }

    e.stopPropagation();
};

//dibuja en el DOM la cantidad del carrito
const crearContadorCarrito = () => {
    let contador = 0;
    let carritoSumando = Object.keys(carrito)
    carritoSumando.forEach((elemento) => {
        contador += carrito[elemento].cantidad;
    })
    if (contador > 0) {
        let spanContador = document.createElement("span");
        if (contador > 1) {
            document.getElementById('cantidadCarritoNavbar').innerHTML = `<span id="carritoNavbar" class="carritoNavbar">${contador}</span>`;
        } else {
            spanContador.innerHTML = `
                <span id="cantidadCarritoNavbar" class="carritoNavbar">${contador}</span>
            `;
            $carritoNavbar.appendChild(spanContador);
        }
    }

}


//funcion que captura el elemento seleccionado en este caso la card
const agarrarCardProducto = (e) => {
    const productoElegido = {
        id: e.id,
        nombre: e.querySelector(".card-text").textContent,
        precio: parseInt(e.querySelector(".precioCard").textContent),
        cantidad: 1,
    }
    if (carrito.hasOwnProperty(productoElegido.id)) {
        productoElegido.cantidad = 1 + carrito[productoElegido.id].cantidad;
    }
    carrito[productoElegido.id] = { ...productoElegido };
    console.log(carrito);
    crearContadorCarrito()
}





//Creacion de la clase usuario
class Usuario {
    constructor(nombre, password, pedidoNumero, carritoCliente, cuentaTotal) {
        this.nombre = nombre;
        this.password = password;
        this.pedidoNumero = pedidoNumero;
        this.carritoCliente = carritoCliente;
        this.cuentaTotal = cuentaTotal;
    }
    pedirProducto() {
        let numeroIngresado = parseInt(
            prompt("Ingrese el numero de la opción que quiere elegir")
        );
        let esCorrecto = true;
        //se chequea que el valor ingresado este bien
        do {
            if (
                Number.isNaN(numeroIngresado) ||
                numeroIngresado < 1 ||
                numeroIngresado > 4
            ) {
                numeroIngresado = parseInt(
                    prompt("ERROR! Ingrese un numero entre 1 y 4")
                );
                esCorrecto = false;
            } else {
                esCorrecto = true;
            }
        } while (esCorrecto == false);
        return numeroIngresado;
    }

    sumarProductos() {
        let totalPedido;
        let suma = 0;
        this.carritoCliente.forEach((element) => {
            totalPedido = suma += element.precio;
        });
        return totalPedido;
    }
    mostrarTotal(total) {
        alert(`El total a pagar es ${total}`);
    }
}



const usuarioActual = [];


//Función pedir nombre por input
const capturarNombre = () => {
    const $inputNombreValue = document.getElementById("nombreCrearUsuario").value;
    return $inputNombreValue;
};

//Función pedir Password por input
const capturarPassword = () => {
    const $inputPasswordValue = document.getElementById("passwordCrearUsuario").value;
    return $inputPasswordValue;
};

//funcion inputs completados
const verificaInputsCompletados = (input1, input2) => {
    if (input1 == "" || input2 == "") {
        return false
    }
    return true;
};

//Funcion verificar si el nombre existe y si no existe crea el objeto usuario y los mete en el arreglo clientes
const creaObjetoUsuario = (nombreUsuario, password) => {
    /* Si no hay clientes aun crea al primero */
    let clientesStorage = JSON.parse(localStorage.getItem("Clientes"));
    if (clientesStorage == null) {
        //Arreglo clientes para tener la lista de los clientes
        const clientes = [];
        localStorage.setItem("Clientes", JSON.stringify(clientes));
        clientesStorage = JSON.parse(localStorage.getItem("Clientes"));
        nombreUsuario = new Usuario(nombreUsuario, password, [1], [], 0);
        clientesStorage.push(nombreUsuario);
        localStorage.setItem("Clientes", JSON.stringify(clientesStorage));
        alert(`Usuario ${nombreUsuario.nombre} creado con exito`)
        usuarioActual.push(nombreUsuario);
        document.getElementById("btnCerrarcanvas").click();
        if (document.getElementById("btnCerrarAlertIngresarUsuario") != null) {
            document.getElementById("btnCerrarAlertIngresarUsuario").click();
        }
        return;
    } else {
        let fueEncontrado = false;
        /* Si hay clientes busca entre la lista de clientes si ya existe el cliente */
        for (const element of clientesStorage) {
            if (element.nombre === nombreUsuario && element.password === password) {
                fueEncontrado = true;
                alertUsuarioExistente();
                return
            }
        }
        /* clientesStorage.forEach((element) => {
                if (element.nombre == nombreUsuario && element.password == password) {
                    fueEncontrado = true;
                    alertUsuarioExistente()
                    nombreUsuario = element;
                    return false;
                }
            }); */
        /* Si el cliente no esta ingresado con ese nombre crea un Usuario nuevo */
        if (!fueEncontrado) {
            nombreUsuario = new Usuario(nombreUsuario, password, [1], [], 0);
            clientesStorage.push(nombreUsuario);
            localStorage.setItem("Clientes", JSON.stringify(clientesStorage));
            alert(`Usuario ${nombreUsuario.nombre} creado con exito`)
            usuarioActual.push(nombreUsuario);
            document.getElementById("btnCerrarcanvas").click();
            if (document.getElementById("btnCerrarAlertIngresarUsuario") != null) {
                document.getElementById("btnCerrarAlertIngresarUsuario").click();
            }
            return
        }
    }
};

// se captura el usuario ingresado en los inputs "Crear Usuario"
document.querySelector("#btnCrearUsuario").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let nombreUsuario = capturarNombre();
    let password = capturarPassword();
    let tieneContenido = verificaInputsCompletados(nombreUsuario, password);
    if (!tieneContenido) {
        let spanAlerta = document.createElement("span");
        spanAlerta.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
        </svg>
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
            <use xlink:href="#info-fill" />
        </svg>
        Debe ingresar ambos campos`;
        document.querySelector("#errorCamposIncompletos").appendChild(spanAlerta);
        setTimeout(function () {
            document.querySelector("#errorCamposIncompletos").removeChild(spanAlerta);
        }, 2000);
        return
    } else {
        creaObjetoUsuario(nombreUsuario, password)
    }
})


//funcion alerta el usuario ya existe ingresar usuario
const alertUsuarioExistente = () => {
    let alertIngresar = document.createElement("div");
    alertIngresar.innerHTML = `
        <div class="alert mb-0 alert-danger d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
            </svg>
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                <use xlink:href="#info-fill" />
            </svg>
            <div>
                El usuario ya existe, ingrese en la seccion usuario-Ingresar para continuar comprando con el mismo usuario o ingrese un nombre y apellido distinto
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    let contenedor = document.getElementById("offcanvasTop1");
    contenedor.appendChild(alertIngresar);
};

//desafio complementario clase 9
//funcion para agregar cards en el html
const agregarCardsProductolHtml = () => {
    productos.forEach((element) => {
        const $cardProducto = document.createElement("div");
        $cardProducto.id = element.id;
        $cardProducto.className = "col-12 col-md-6 col-lg-4 col-xl-3 my-3";
        $cardProducto.innerHTML += `
                        <div class="card" style="width: 18rem;">
                            <img src="${element.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${element.nombre}</p>
                                <span>$<span class="precioCard">${element.precio}</span></span>
                            </div>
                            <div class="d-flex justify-content-center my-2">
                                <button type="button" id="${element.id}" class="btn btn-primary btnAgregarCarrito">Agregar al
                                    carrito</button>
                            </div>
                        </div>
        `;
        document.getElementById("contenedorProductos").appendChild($cardProducto);
        document.getElementById(element.id).addEventListener("click", (e) => {
            if (e.target.className == "btn btn-primary btnAgregarCarrito") {
                AgregarAlCarrito(e)
            }
            e.stopPropagation();
        })
    });

};

//funcion alerta de ingresar usuario
const alertIngresarUsuario = () => {
    let alertIngresar = document.createElement("div");
    alertIngresar.innerHTML = `
        <div class="alert mb-0 alert-primary d-flex align-items-center" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </symbol>
            </svg>
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                <use xlink:href="#info-fill" />
            </svg>
            <div>
                Para poder comprar cualquier producto primero debera ingresar o crear un usuario
            </div>
            <button type="button" id="btnCerrarAlertIngresarUsuario" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    document.querySelector("body header").appendChild(alertIngresar);
};

//Agregado de los eventos a los botones
/* const $btnHacerPedido = document
    .querySelector("#hacerPedido")
    .addEventListener("click", iniciarPedido); */
const $btnOrdenarmayor = document
    .querySelector("#Ordenarmayor")
    .addEventListener("click", ordenarProductosMayorPrecio);
const $btnOrdenarmenor = document
    .querySelector("#Ordenarmenor")
    .addEventListener("click", ordenarProductosMenorPrecio);


window.onload = function () {
    alertIngresarUsuario();
    agregarCardsProductolHtml()

};
