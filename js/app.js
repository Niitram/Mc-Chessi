/* captura de los elementos del dom */
const $carritoNavbar = document.getElementById("carritoNavbar");
const carrito = {}
class Producto {
    constructor(nombre, precio, id, stock, img, cantidad) {
        this.nombre = nombre;
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
const ensaladaCesar = new Producto("Ensalada cesar", 150, "3", 50, "ensalada-Cesar.jpg", 0);
const hamburguesaConQuesoVegetariana = new Producto("Hamburguesa con queso vegetariana", 500, "4", 50, "hamburguesa-con-queso-vegetariana.jpg", 0);
const hamburguesaVegana = new Producto("Hamburguesa vegana", 500, "5", 50, "hamburguesa-vegana.jpg", 0);

//Array con todos los productos
const productos = [
    papasFritas,
    hamburguesaConQueso,
    ensaladaCesar,
    hamburguesaConQuesoVegetariana,
    hamburguesaVegana
];

class Bebida {
    constructor(nombre, precio, id, stock, img, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
        this.stock = stock;
        this.img = img;
        this.cantidad = cantidad;
    }
}

const botellaDeAgua = new Bebida("Botella de agua", 100, "4", 50, "botella-de-agua.jpg", 0);



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
//Sumar producto al carrito
const sumarUnProductoCarrito = () => {
    const usuarioActual = capturarClienteActual();
    usuarioActual.cantidadProductos++;
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    crearContadorCarrito()
}
//dibuja en el DOM la cantidad del carrito
const crearContadorCarrito = () => {
    const usuarioActual = capturarClienteActual();
    if (usuarioActual.cantidadProductos > 1) {
        $("#contadorCarritoNavbar").remove();
        $('#carritoNavbar').append(`<span id="contadorCarritoNavbar" class="carritoNavbar">${usuarioActual.cantidadProductos}</span>`)
    }
}

//Suma cantidad del mismo producto
const aumentaCantidadMismoProducto = (usuario, id) => {
    let encontrado = false;
    const carritoValues = Object.values(usuario.carritoCliente);
    carritoValues.forEach(producto => {
        if (producto.id === id) {
            producto.cantidad = producto.cantidad + 1;
            encontrado = true
        }
    })
    return encontrado;
}

//Calcula suma total del los mismos productos
const sumaTotalMismoProducto = (usuarioActual, id) => {
    const carritoValues = Object.values(usuarioActual.carritoCliente);
    carritoValues.forEach(producto => {
        if (producto.id === id) {
            producto.sumaProductos = producto.precio * producto.cantidad;
        }
    })

}

//Agrega producto nuevo al carrito
const agregarProductoNuevoCarrito = (usuarioActual, productoCapturado) => {
    const carritoValues = Object.values(usuarioActual.carritoCliente);
    carritoValues.push(productoCapturado);
    usuarioActual.carritoCliente = carritoValues;
}

//Suma el total de los productos en el carrito
const sumaTotalCarrito = (usuarioActual) => {
    let sumaTotal = 0;
    for (const [productos, producto] of Object.entries(usuarioActual.carritoCliente)) {
        sumaTotal = producto.sumaProductos + sumaTotal;
    }
    return sumaTotal;
}



//funcion para capturar la card seleccionada y retorna un objeto con los datos del producto
const capturarDatosProductoElegido = (element) => {
    const productoElegido = {
        id: element.id,
        nombre: element.querySelector(".card-text").textContent,
        precio: parseInt(element.querySelector(".precioCard").textContent),
        cantidad: 1,
        img: element.querySelector("img").src,
        sumaProductos: parseInt(element.querySelector(".precioCard").textContent)
    }
    return productoElegido;
}


//Captura el elemento seleccionado en este caso la card y suma la cantidad y el producto al carrito
const agarrarProductoElegido = (element) => {
    let usuarioActual = capturarClienteActual();
    //Se crea un array con el carrito del usuario
    const carritoValues = Object.values(usuarioActual.carritoCliente);
    //Se crea un objeto con los valores de la card seleccionada
    const productoCapturado = capturarDatosProductoElegido(element)
    console.log("Producto elegido antes del for", productoCapturado)
    //Si el carrito esta vacio
    if (carritoValues.length <= 0) {
        agregarProductoNuevoCarrito(usuarioActual, productoCapturado)
    } else {
        let esMismoProducto = aumentaCantidadMismoProducto(usuarioActual, productoCapturado.id)
        sumaTotalMismoProducto(usuarioActual, productoCapturado.id)
        if (!esMismoProducto) {
            console.log("Estoy adentro")
            agregarProductoNuevoCarrito(usuarioActual, productoCapturado)
        }
    }
    console.log(usuarioActual.carritoCliente)
    //Se suma el total del carrito
    usuarioActual.cuentaTotal = sumaTotalCarrito(usuarioActual);
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    sumarUnProductoCarrito()
}

/*-------------- EMPIEZA LOGICA USUARIO -------------- */

//Creacion de la clase usuario
class Usuario {
    constructor(nombre, password, pedidoNumero, carritoCliente, cuentaTotal, cantidadProductos) {
        this.nombre = nombre;
        this.password = password;
        this.pedidoNumero = pedidoNumero;
        this.carritoCliente = carritoCliente;
        this.cuentaTotal = cuentaTotal;
        this.cantidadProductos = parseInt(cantidadProductos);
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

//Animacion creando usuario
//Crea el html con el gif
const creandoUsuarioEmergente = () => {
    $('body').prepend(`
        <div id="creandoUsuarioEmergente" class="contenedorUsuarioEmergente" style="display:none">
            <div class="ventana-emergente">
                <div class="text-center bg-dark color-goldenrod fs-3  w-100">
                    <span>Creando usuario</span>
                </div>
                <div>
                    <img src="img/creando-usuario-cocinando.gif" alt="gif de comida cocinando">
                </div>
            </div> 
        </div>
    `)
}
//Alerta de usuario creado
const alertaUsuarioCreado = () => {
    setTimeout(() => {
        $('body header').append(`
            <div id="usuarioCradoAlert" class="alert mb-0 alert-success d-flex justify-content-center align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </symbol>
                </svg>
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                    <use xlink:href="#info-fill" />
                </svg>
                <div>
                Usuario creado con exito
                </div>
            </div>
        `);
        $("#usuarioCradoAlert").slideToggle(4000);
    }, 3000);
    setTimeout(() => {
        $("#usuarioCradoAlert").remove();
    }, 7000)
}

//Animacion Login usuario
//Crea el html con el gif login usuario
const loginUsuarioEmergente = () => {
    $('body').prepend(`
        <div id="loginUsuarioEmergente" class="contenedorUsuarioEmergente" style="display:none">
            <div class="ventana-emergente">
                <div class="text-center bg-dark color-goldenrod fs-3  w-100">
                    <span>Conectando con su usuario</span>
                </div>
                <div>
                    <img src="img/login-usuario-hamburguesa.gif" alt="gif de hamburguesa con persona rebotando encima">
                </div>
            </div> 
        </div>
    `)
}
//Animacion de creacion de usuario emergente
const animacionEmergente = (elemento) => {
    $(`${elemento}`).fadeIn(1000).delay(2000).fadeOut(1000)
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
        nombreUsuario = new Usuario(nombreUsuario, password, [1], [], 0, 0);
        clientesStorage.push(nombreUsuario);
        localStorage.setItem("Clientes", JSON.stringify(clientesStorage));
        creandoUsuarioEmergente()
        animacionEmergente('#creandoUsuarioEmergente')
        alertaUsuarioCreado()
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
            nombreUsuario = new Usuario(nombreUsuario, password, [1], [], 0, 0);
            clientesStorage.push(nombreUsuario);
            localStorage.setItem("Clientes", JSON.stringify(clientesStorage));
            creandoUsuarioEmergente()
            animacionEmergente('#creandoUsuarioEmergente')
            alertaUsuarioCreado()
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

//Agrega en el navBar el nombre del usuario y le pone la clase con color
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
//funcion alerta el usuario fue creado con exito
const alertaBienvenidaUsuario = (usuario) => {
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
                Bienvenid@ ${usuario}
                </div>
            </div>
            `);
}

//logica Login
const login = (nombreUsuario, password) => {
    let fueEncontrado = false;
    let clientesStorage = JSON.parse(localStorage.getItem("Clientes"));
    clientesStorage.forEach((element) => {
        if (element.nombre == nombreUsuario && element.password == password) {
            fueEncontrado = true;
            agregarNombreUsuarioNavBar(element.nombre);
            alertaBienvenidaUsuario(nombreUsuario)
            crearBtnsUsuarioNavBar()
            agregarNombreUsuarioNavBar(nombreUsuario)
            crearUsuarioActual(element)
            loginUsuarioEmergente()
            animacionEmergente('#loginUsuarioEmergente')
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

$(window).on("load", function () {
    //Si el usuario esta logueado se crean los botones de usuario
    if (localStorage.getItem("usuarioActual")) {
        crearBtnsUsuarioNavBar()
        let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"))
        agregarNombreUsuarioNavBar(usuarioActual.nombre);
        crearContadorCarrito()
        agregarEventBtnCerrarSesion()
    } else {
        alertIngresarUsuario();
    }
    //si el documento que se carga tiene es el index
    if (document.location.pathname === "/index.html" || document.location.pathname === "/Mc-Chessi/" || document.location.pathname === "/Mc-Chessi/index.html") {
        document
            .querySelector("#Ordenarmayor")
            .addEventListener("click", ordenarProductosMayorPrecio);
        document
            .querySelector("#Ordenarmenor")
            .addEventListener("click", ordenarProductosMenorPrecio);
    }
});
