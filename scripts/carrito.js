/*
*NOTAS: 
Al cargar la página se debe ejecutar la función crearCajasCarrito y actualizarNumProductos()
*/

/*
*############################################################
*FUNCIÓN PARA ACTUALIZAR EL NUMERO DE PRODUCTOS EN EL CARRITO
*############################################################
*/

function actualizarNumProductos(){
  carritoLS=localStorage.getItem("carritoLocal"); 
  var productos=0;
  
  if (carritoLS != null) {
    carrito = JSON.parse(carritoLS);
    //Sumamos las cantidades de cada uno de los porductos en el carrito
    carrito.forEach(rin => {
      productos += rin.cantidad;
    });
  }

  //Actualizamos la cuenta en el html 
  var numProductos=document.querySelector("#etiquetaCarrito");
  numProductos.innerHTML="";
  numProductos.innerHTML=productos;
  actualizarTotal(); //Actualizamos el precio en el carrito
}


/*
*####################################################
*FUNCIÓN PARA ACTUALIZAR EL PRECIO TOTAL DE LA COMPRA
*####################################################
*/

function actualizarTotal(){

  carritoLS=localStorage.getItem("carritoLocal");
  var precioFinal=0;

  if(carritoLS!=null){
    carrito = JSON.parse(carritoLS);
    /*
    Calculamos el precio de la compra con ayuda de
    la cantidad y precio de cada producto en el carrito
    */
    carrito.forEach(rin => {
      precioFinal += rin.cantidad*rin.precio;
    });
  }

  //Actualizamos el html
  var contendor=document.querySelector(".total");
  var total=contendor.querySelector(".total-neto");
  total.innerHTML="";
  total.innerHTML="Total neto: $"+precioFinal;
}


/*
*##############################
*FUNCIÓN PARA VACIAR EL CARRITO
*##############################
*/

//Al único boton lo llamamos y la agregamos una función
var eliminarCarrito=document.querySelector(".vaciar-carrito");
eliminarCarrito.addEventListener("click", ()=>{

  var carrito=[];

  //Vaciamos el contenedor del html
  contendorPrincipal=document.querySelector("#caja-principal");
  contendorPrincipal.innerHTML="";
  //Actualizamos el LS con un carrito vacío
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  //Actualizamos la cuenta de productos y el precio de la compra
  actualizarNumProductos();
  actualizarTotal();
});


/*
*##################################################################
*FUNCIÓN PARA CREAR LOS CONTENEDORES DE LOS PRODCUTOS EN EL CARRITO
*##################################################################
*/

function crearCajasCarrito(){

  carritoLS=localStorage.getItem("carritoLocal"); 
  contendorPrincipal=document.querySelector("#caja-principal");

  let cajas=""; //contien todas las cajas de los productos

  if(carritoLS!=null){

    //Para cada producto vamos a crear una caja personalizada
    carrito=JSON.parse(carritoLS);
    carrito.forEach(rin =>{

      var rinCaja="";
  
      rinCaja+=`
      <div class="contenedor">
        <div class="izquierda">
          <img src="img/Modelos/${rin.tipo}/${rin.modelo}/1.jpg" alt=""></img>
          </div>
          <div class="centro">
          <h3 class="modelo">${rin.modelo}</h3>
          <p class="tipo">${rin.tipo}</p>
          <p class="precio">${rin.precio}</p>
          <p class="codigo">${rin.codigo}</p>
        </div>
        <div class="derecha">
          <p class="cantidad">Cantidad: ${rin.cantidad}</p>
          <button class="menos">-</button>
          <button class="mas">+</button>
          <button class="eliminar">Eliminar del carrito</button>
        </div>
      </div>
      `;
      cajas+=rinCaja; //Agregamos la caja a la colección de cajas
    });
  }

  //Actualizamos el html con las nuevas cajas
  contendorPrincipal.innerHTML = "";
  contendorPrincipal.innerHTML+=cajas;
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));

  /*
  *----------------------------------------------------------
  *A CADA BOTÓN DE LAS CAJAS CREADAS LES ASIGNAMOS SU FUNCION
  *----------------------------------------------------------
  */

  //*PARA LOS BOTONES ELIMINAR
  const botonesEliminar=document.querySelectorAll(".eliminar");

  botonesEliminar.forEach(boton =>{
    boton.addEventListener("click", ()=>{
      carritoLS=localStorage.getItem("carritoLocal");

      carrito=JSON.parse(carritoLS);

      //Buscamos el contenedor donde está el botón
      var contenedor = boton.closest(".contenedor");
        
      //Vamos a recuperar la información de los productos con ayuda de etiquetas y el contendor
      var codigo=contenedor.querySelector(".codigo").textContent;

      for (let i=0; i< carrito.length; i++){
        //si hay un producto con el mismo codigo lo eliminamos
        if(carrito[i].codigo==codigo) {
          carrito.splice(i, 1);
        }
      }

      //Actualizamos el carrito, precio y html con el producto eliminado
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      actualizarNumProductos();
      crearCajasCarrito();
      console.log("Producto eliminado");
    });
  });

  //*PARA LOS BOTONES MAS (AGREGAN OTRO PRODUCTO DEL MISMO TIPO AL CARRITO)
  const botonesMas=document.querySelectorAll(".mas");

  botonesMas.forEach(boton =>{
    boton.addEventListener("click", ()=>{

      //Buscamos el contenedor donde está el botón y su codigo
      carritoLS=localStorage.getItem("carritoLocal");
      carrito=JSON.parse(carritoLS);

      var contenedor = boton.closest(".contenedor");

      var codigo=contenedor.querySelector(".codigo").textContent;
      
      for (let i=0; i< carrito.length; i++){
        //Buscamos el producto por código y aumentados su cantidad en el carrito
        if(carrito[i].codigo==codigo) {
          carrito[i].cantidad+=1;
        }
      }

      //Actualizamos el carrito, precio y html con la nueva cantidad
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      actualizarNumProductos();
      crearCajasCarrito();
      console.log("+1");
    });
  });

  //*PARA LOS BOTONES MAS (AGREGAN OTRO PRODUCTO DEL MISMO TIPO AL CARRITO)
  const botonesMenos=document.querySelectorAll(".menos");

  botonesMenos.forEach(boton =>{
    boton.addEventListener("click", ()=>{
      
      //Buscamos el contenedor donde está el botón
      carritoLS=localStorage.getItem("carritoLocal"); //revisamos el caché
      carrito=JSON.parse(carritoLS);

      var contenedor = boton.closest(".contenedor");

      var codigo=contenedor.querySelector(".codigo").textContent;
      
      for (let i=0; i< carrito.length; i++){
        //Buscamos el producto por código y aumentados su cantidad en el carrito
        //No podemos tener cantidades negativas de productos
        if(carrito[i].codigo==codigo && carrito[i].cantidad>1) {
          carrito[i].cantidad-=1;
        }
      }

      //Actualizamos el carrito, precio y html con la nueva cantidad
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      actualizarNumProductos();
      crearCajasCarrito();
      console.log("-1");
    });
  });
}