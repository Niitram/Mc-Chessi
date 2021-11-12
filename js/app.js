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
const papasFritas = new Producto("Porcion de papas fritas", 450, "1", 50, "papas-fritas.jpg", 0);
const hamburguesaConQueso = new Producto("Hamburguesa con queso", 600, "2", 50, "hamburguesa-con-queso.png", 0);
const ensaladaCesar = new Producto("Ensalada Cesar", 150, "3", 50, "ensalada-Cesar.jpg", 0);
const botellaDeAgua = new Producto("Botella de agua", 100, "4", 50, "botella-de-agua.jpg", 0);

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

//funcion del boton para agreagar al carrito
const AgregarAlCarrito = (e) => {
    if (e.target.id) {
        agarrarProductoElegido(e.target.parentElement.parentElement.parentElement);
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
//funcion para agregar cards en el html
const agregarCardsProductolIndex = () => {
    productos.forEach((element) => {
        const $cardProducto = document.createElement("div");
        $cardProducto.id = element.id;
        $cardProducto.className = "col-12 col-md-6 col-lg-4 col-xl-3 my-3";
        $cardProducto.innerHTML += `
                        <div class="card" style="width: 18rem;">
                            <img src="/img/${element.img}" class="card-img-top" alt="...">
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



//funcion que captura el elemento seleccionado en este caso la card
const agarrarProductoElegido = (e) => {
    const productoElegido = {
        id: e.id,
        nombre: e.querySelector(".card-text").textContent,
        precio: parseInt(e.querySelector(".precioCard").textContent),
        cantidad: 1,
        img: e.querySelector("img").src
    }
    if (carrito.hasOwnProperty(productoElegido.id)) {
        productoElegido.cantidad = 1 + carrito[productoElegido.id].cantidad;
    }
    carrito[productoElegido.id] = { ...productoElegido };
    let clienteActual = capturarClienteActual();
    clienteActual.carritoCliente = carrito
    console.log(clienteActual);
    localStorage.setItem("usuarioActual", JSON.stringify(clienteActual));
    crearContadorCarrito()
}


/*-------------- EMPIEZA LOGICA USUARIO -------------- */

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

//Crea el usuario actual y lo agrega al localStorage
const crearUsuarioActual = (usuarioActual) => {
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    return usuarioActual;
}

//Se captura al cliente Actual
const capturarClienteActual = () => {
    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    return usuarioActual;
}

//Elimina el usuario actual del localStorage
const eliminarUsuarioActual = () => {
    localStorage.removeItem("usuarioActual");
}

const saludarUsuario = () => {
    let usuarioActual = capturarClienteActual();
    alert(`Bienvenido ${usuarioActual.nombre}`);
}

//Función captura valor del input
const capturarInput = (IDinput) => {
    let valorInput = document.getElementById(`${IDinput}`).value;
    return valorInput;
};

//funcion inputs completados
const verificaInputsCompletados = (input1, input2) => {
    if (input1 == "" || input2 == "") {
        return false
    }
    return true;
};

//agrega el btn de iniciar sesion y el btn de cerrar sesion
const agregaBtnsLoginYCrearUsuario = (estaLogueado) => {
    if (!estaLogueado) {
        $("#dropdownUsuario").children().remove();
        $("#dropdownUsuario").prepend(`
            <li>
                <button class="btn dropdown-item" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Ingresar</button>
            </li>
            <li>
                <button class="btn dropdown-item" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTop1" aria-controls="offcanvasTop1">Crear
                    Usuario</button>
            </li>
        `);

    } else {
        $("#dropdownUsuario").children().remove();
        $("#dropdownUsuario").prepend(`
            <li>
                <a href="../perfil_usuario.html" class="btn dropdown-item">Mi perfil</a>
            </li>
            <li>
                <button id="btnCerrarSesion" class="btn dropdown-item" type="button">Cerrar sesion</button>
            </li>
        `);
    }
}
//Verifica si el usuario actual existe
const verificaUsuarioActual = () => {
    return localStorage.getItem("usuarioActual") != null ? true : false;
}
//Se crean los botones para el usuario en el navBar
const crearBtnsUsuarioNavBar = () => {
    let estaConectado = verificaUsuarioActual()
    agregaBtnsLoginYCrearUsuario(estaConectado)
    agregarEventBtnCerrarSesion()
}

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
        agregarNombreUsuarioNavBar(nombreUsuario.nombre)
        crearUsuarioActual(nombreUsuario);
        document.getElementById("btnCerrarcanvas").click();
        if (document.getElementById("btnCerrarAlertIngresarUsuario") != null) {
            document.getElementById("btnCerrarAlertIngresarUsuario").click();
        }
        return;
    } else {
        /* Si hay clientes busca entre la lista de clientes si ya existe el cliente */
        let fueEncontrado = false;
        for (const element of clientesStorage) {
            if (element.nombre === nombreUsuario && element.password === password) {
                fueEncontrado = true;
                alertUsuarioExistente();
                return
            }
        }
        /* Si el cliente no esta ingresado con ese nombre crea un Usuario nuevo */
        if (!fueEncontrado) {
            nombreUsuario = new Usuario(nombreUsuario, password, [1], [], 0);
            clientesStorage.push(nombreUsuario);
            localStorage.setItem("Clientes", JSON.stringify(clientesStorage));
            alert(`Usuario ${nombreUsuario.nombre} creado con exito`);
            agregarNombreUsuarioNavBar(nombreUsuario.nombre);
            crearUsuarioActual(nombreUsuario);
            document.getElementById("btnCerrarcanvas").click();
            if (document.getElementById("btnCerrarAlertIngresarUsuario") != null) {
                document.getElementById("btnCerrarAlertIngresarUsuario").click();
            }
            return
        }
    }
};

//Agrega en el navBar el nombre del usuario y le pone la clase con color color
const agregarNombreUsuarioNavBar = (nombreUsuario) => {
    if ($(".usuarioNavBar span")) {
        $(".usuarioNavBar span").remove()
    }
    $(".usuarioNavBar").prepend(`<span class="fw-bolder color-viridian-green">${nombreUsuario}</span>`);
    $(".usuarioNavBar i").addClass("color-viridian-green");
}

// se captura el usuario ingresado en los inputs "Crear Usuario"
document.querySelector("#btnCrearUsuario").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let nombreUsuario = capturarInput("nombreCrearUsuario");
    let password = capturarInput("passwordCrearUsuario");
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
        agregarNombreUsuarioNavBar(nombreUsuario)
        crearBtnsUsuarioNavBar();
        agregarEventBtnCerrarSesion()
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

//logica Login
const login = (nombreUsuario, password) => {
    let fueEncontrado = false;
    let clientesStorage = JSON.parse(localStorage.getItem("Clientes"));
    clientesStorage.forEach((element) => {
        if (element.nombre == nombreUsuario && element.password == password) {
            fueEncontrado = true;
            agregarNombreUsuarioNavBar(element.nombre);
            //desafio clase 12
            $('body header').append(`
            <div id="bienvenidaUsuario" class="alert mb-0 alert-success d-flex justify-content-center align-items-center" role="alert">
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
                Bienvenid@ ${nombreUsuario}
                </div>
            </div>
            `);
            crearBtnsUsuarioNavBar()
            agregarNombreUsuarioNavBar(nombreUsuario)
            crearUsuarioActual(element)

            //Si no se cerro el alert previamente lo cierra con el btn cerrar
            if (document.getElementById("btnCerrarAlertIngresarUsuario") != null) {
                document.getElementById("btnCerrarAlertIngresarUsuario").click();
            }
            document.getElementById("btnCerrarCanvasLogIn").click();
            setTimeout(function () {
                $('#bienvenidaUsuario').remove("#bienvenidaUsuario");
            }, 3000);
            return false;
        }
    });
    //si el usuario no fue encontrado avisa con una alerta
    if (!fueEncontrado) {
        let spanAlerta = document.createElement("span");
        spanAlerta.style.color = "red";
        spanAlerta.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
        </svg>
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
            <use xlink:href="#info-fill" />
        </svg>
        El usuario ${nombreUsuario} o la contraseña son incorrectos`;
        document.querySelector("#erroresIngreso").appendChild(spanAlerta);
        setTimeout(function () {
            document.querySelector("#erroresIngreso").removeChild(spanAlerta);
        }, 3000);
        return
    }
}


// se captura el usuario ingresado en los inputs "Ingresar" y se hace login
document.querySelector("#btnIngresarUsuario").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let nombreUsuario = capturarInput("inputIngresarUsuario");
    let password = capturarInput("inputIngresarPassword");
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
        document.querySelector("#erroresIngreso").appendChild(spanAlerta);
        setTimeout(function () {
            document.querySelector("#erroresIngreso").removeChild(spanAlerta);
        }, 2000);
        return
    } else {
        login(nombreUsuario, password)
        crearBtnsUsuarioNavBar();
    }
})

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

//Agregado de los eventos a los botones de cerrar sesion usuario
const agregarEventBtnCerrarSesion = (e) => {
    $("#btnCerrarSesion").on("click", () => {
        localStorage.removeItem("usuarioActual")
        crearBtnsUsuarioNavBar()
        $(".usuarioNavBar span").remove()
        $(".usuarioNavBar i").removeClass("color-viridian-green");
    })
}


console.log(document.location)
window.onload = function () {
    //Si el usuario esta logueado se crean los botones de usuario
    if (localStorage.getItem("usuarioActual")) {
        crearBtnsUsuarioNavBar()
        let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"))
        agregarNombreUsuarioNavBar(usuarioActual.nombre);
        agregarEventBtnCerrarSesion()
    } else {
        alertIngresarUsuario();
    }

    //si el documento que se carga tiene es el index
    if (document.location.pathname === "/index.html" || document.location.pathname === "/Mc-Chessi/") {
        //Se cargan las cards en el html
        agregarCardsProductolIndex()
        document
            .querySelector("#Ordenarmayor")
            .addEventListener("click", ordenarProductosMayorPrecio);
        document
            .querySelector("#Ordenarmenor")
            .addEventListener("click", ordenarProductosMenorPrecio);
    }
};