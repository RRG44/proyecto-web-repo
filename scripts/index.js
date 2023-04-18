/*
*NOTAS: 

Al cargar la página se debe ejecutar la función actualizarNumProductos()

Siempre mantendremos un dato en el LocalStorage en formato JSON:

  1. La lista de productos (estos están en forma de objeto llamados rin)

Para llevar La cuenta de los productos en el carrito se tiene que cada 
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























// /*
// *###############################################################
// *CODIGO PARA TENER UN SLIDE EN CADA CONTENEDOR DE LOS PRODUCTOS
// *###############################################################
// */

// //Recuperamos cada contenedor que contara con un slide
// var slides = document.querySelectorAll(".slide");
// //Para cada contenedor que se encontro se realizaran las intrucciones para realizar el slide individualmente
// slides.forEach(slide => {
//   //Se especifica quien es el contenedor padre del slide
//   var contenedor = slide.closest(".contenedor");
//   //Se obtienen las imagenes de cada slide asi como los botones de cada uno
//   var imagen = contenedor.querySelector(".imagenslide");
//   var anterior = contenedor.querySelector(".anterior");
//   var siguiente = contenedor.querySelector(".siguiente");
//   //Se obtiene el id del slide para asignarle su arreglo
//   var identificador = contenedor.id;
//   console.log(identificador);
//   //Se asigna el arreglo dependiendo del id del slide
//   switch (identificador) {
//     case "cajaprincipal-street-modelos-0110":
//       arreglo = ["./img/Modelos/Street/0110/1.jpg","./img/Modelos/Street/0110/2.jpg","./img/Modelos/Street/0110/3.jpg"];
//       break;
//     default:
//       arreglo = [];
//       break;
//   }
//   //Se inicia el contador para asignar una imagen en el div
//   contador = 0;
//   //Se le agrega el evento al boton siguiente para recorrer las imagenes
//   siguiente.addEventListener("click", function () {
//     contador++;
//     imagen.setAttribute("src", arreglo[contador]);
//     //Le decimos que vuelva a empezar desde el inicio si ya ha recorrido todo el array
//     if (contador>2) {
//       contador=0;
//       imagen.setAttribute("src", arreglo[contador]);
//     }
//   });
//   //Se le agrega el evento al boton atras para recorrer las imagenes
//   anterior.addEventListener("click", function () {
//     contador--;
//     imagen.setAttribute("src", arreglo[contador]);
//     //Le decimos que vuelva a empezar desde el inicio si ya ha recorrido todo el array
//     if (contador<0) {
//       contador=2;
//       imagen.setAttribute("src", arreglo[contador]);
//     }
//   });
// });

