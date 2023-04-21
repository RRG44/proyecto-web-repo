/*
*NOTAS: 

Al cargar la página se debe ejecutar la función actualizarNumProductos()

Siempre mantendremos un dato en el LocalStorage en formato JSON:

  1. La lista de productos (estos están en forma de objeto llamados rin)

Para llevar La cuenta de los productos en el carrito se tien que cada 
objeto en el carrito tiene una propiedad llamada cantidad que 
por defecto es 1, indica la cantidad de productos del mismo tipos en el carrito

Convenciones:
LS: Local Storage

*/



//Recuperamos todos los botones de la clase agregar del documento
var botones = document.querySelectorAll(".agregar");

/*
*#########################################
*FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
*#########################################
*/

//Agregamos la función a cada botón del tipo agregar
botones.forEach(boton => {
  boton.addEventListener("click", () => {

    carritoLS = localStorage.getItem("carritoLocal"); //revisamos el LS del 

    //Se revisa si existen o no para inicializarlos o convertirlo de string a objeto
    if (carritoLS == null) {
      var carrito = [];
    } else {
      carrito = JSON.parse(carritoLS);
    }

    //Buscamos el div de clase contenedor más cercano a donde está el botón
    var contenedor = boton.closest(".contenedor");

    //Vamos a recuperar la información de los productos con ayuda de las clases y el contendor
    var codigo = contenedor.querySelector(".codigo").textContent;
    var modelo = contenedor.querySelector(".modelo").textContent;
    var tipo = contenedor.querySelector(".tipo").textContent;
    var precio = contenedor.querySelector(".precio").textContent;

    //Creamos nuestro objeto para almacenar el producto en el carrito
    var rin = {
      codigo: codigo,
      modelo: modelo,
      tipo: tipo,
      precio: precio,
      cantidad: 1
    };

    //Buscar si ya hay un producto igual en el carrito parte 1

    let rinEnCarrito = false; //asumimos que no
    let index; //para guardar su posición si existe

    if (carrito.length > 0) {
      for (let i = 0; i < carrito.length; i++) {
        //si hay un producto con el mismo código cambiamos el estado a true y guardamos la posición
        if (carrito[i].codigo == rin.codigo) {
          rinEnCarrito = true;
          index = i;
        }
      }
    }

    //Buscar si ya hay un producto igual en el carrito parte 2

    if (rinEnCarrito == false) {
      //Si no está lo agregamos
      carrito.push(rin);
    } else {
      //Si existe sumamos +1 a su propiedad cantidad
      carrito[index].cantidad++;
    }

    //Al macenamos la info en forma de string en el LS
    localStorage.setItem("carritoLocal", JSON.stringify(carrito));
    actualizarNumProductos(); //Como se agregaron productos debemos actualizar la cuenta del carrito
    console.log(Array.from(carrito));
  });
});


/*
*############################################################
*FUNCIÓN PARA ACTUALIZAR EL NUMERO DE PRODUCTOS EN EL CARRITO
*############################################################
*/

function actualizarNumProductos() {
  carritoLS = localStorage.getItem("carritoLocal");
  var productos = 0;

  if (carritoLS != null) {
    carrito = JSON.parse(carritoLS);
    //Sumamos las cantidades de cada uno de los porductos en el carrito
    carrito.forEach(rin => {
      productos += rin.cantidad;
    });
  }

  //Actualizamos la cuenta en el html 
  var numProductos = document.querySelector("#numero");
  numProductos.innerHTML = "";
  numProductos.innerHTML = productos;
}

/*
*############################################################
*CODIGO PARA HACER FUNCIONALES LOS SLIDES
*############################################################
*/

//Obtenemos todos los slides que hay actuales en el documento
var slides = document.querySelectorAll(".slidebotones");
//Para cada slide que se ha encontrado se hara lo siguiente
slides.forEach(slide => {
  //Obtenemos el padre mas cercano al slide
  var contendor2 = slide.closest(".contenedor");
  //Obtenemos los recursos necesarios para hacer funcionales los slides
  var botonatras = contendor2.querySelector(".anterior");
  var botonsiguiente = contendor2.querySelector(".siguiente");
  var imagenes = contendor2.querySelector(".imagenslide");
  //Obtenemos los elementos para que cada slide cuente con su arreglo dependiendo de los datos que contenga
  var modeloaux = contendor2.querySelector(".modelo").textContent;
  var tipoaux = contendor2.querySelector(".tipo").textContent;
  var arreglo = ["img/Modelos/" + tipoaux + "/" + modeloaux + "/1.jpg", "img/Modelos/" + tipoaux + "/" + modeloaux + "/2.jpg", "img/Modelos/" + tipoaux + "/" + modeloaux + "/3.jpg"];
  //Para cada slide se iniciara un contador en 0
  var contador = 0;
  //Agregamos el evento al boton siguiente para recorrer el arreglo hacia adelante y asignar la nueva imagen
  botonsiguiente.addEventListener("click", function () {
    contador++;
    imagenes.setAttribute("src", arreglo[contador]);
    if (contador > 2) {
      contador = 0;
      imagenes.setAttribute("src", arreglo[contador]);
    }
  });
  //Agregamos el evento al boton siguiente para recorrer el arreglo hacia atras y asignar la nueva imagen
  botonatras.addEventListener("click", function () {
    contador++;
    imagenes.setAttribute("src", arreglo[contador]);
    if (contador > 2) {
      contador = 0;
      imagenes.setAttribute("src", arreglo[contador]);
    }
  });
});