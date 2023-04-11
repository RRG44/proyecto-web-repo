
//Recuperamos todos los botones del documento
var botones=document.querySelectorAll(".agregar");

//Vamos a agregar una funció a todos los botones
botones.forEach(boton =>{
  boton.addEventListener("click", () => {
    
    carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché
    productosGuardado=localStorage.getItem("productosLocal"); //revisamos el caché

    if(carritoGuardado==null){
      var carrito=[];
      var productos=0;
    }else{
      carrito=JSON.parse(carritoGuardado); //vamos a conseguir el arreglo previo convertir de JSON a notas
      productos=JSON.parse(productosGuardado);
    }

    //Buscamos el contenedor donde está el botón
    var contenedor = boton.closest(".contenedor");
    
    //Vamos a recuperar la información de los productos con ayuda de etiquetas y el contendor
    var codigo=contenedor.querySelector(".codigo").textContent;
    var modelo=contenedor.querySelector(".modelo").textContent;
    var tipo=contenedor.querySelector(".tipo").textContent;
    var precio=contenedor.querySelector(".precio").textContent;
    
    //Creamos nuestro objeto
    var rin={
      codigo: codigo,
      modelo: modelo,
      tipo: tipo,
      precio: precio,
      cantidad: 1
    };

    //Vamos a buscar si ya hay un producto igual en el carrito

    let rinEnCarrito=false; //asumimos que no
    let index; //para guardar su posición en el array

    if (carrito.length>0) {
      for (let i=0; i< carrito.length; i++){
        //si hay un producto con el mismo código cambiamos el estado a true y guardamos la posición
        if(carrito[i].codigo==rin.codigo) {
          rinEnCarrito=true;
          index=i;
        }        
      }
    }

    if(rinEnCarrito==false){
      /*
      Si no está lo agregamos
      y sumamos+1 a la cantidad de productosen el carrito
      */
      carrito.push(rin);
    }else{
      /*
      Si está solo agregamos +1 a su cantidad
      y a la cuenta de productos en el carrito
      */
      carrito[index].cantidad++;
    }
    
    // crearCajasCarrito(); //Para crear cajas de productos en el html carrito
    localStorage.setItem("carritoLocal", JSON.stringify(carrito));
    localStorage.setItem("productosLocal", JSON.stringify(productos));
    actualizarNumProductos(); //Para actualizar el número en el carrito al añadir productos
    console.log(Array.from(carrito));
    console.log(productos);
  });
});

//
function actualizarNumProductos(){
  carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché
  var productos=0;
  
 
  if (carritoGuardado != null) {
    carrito = JSON.parse(carritoGuardado); //vamos a conseguir el arreglo previo convertir de JSON a notas
    carrito.forEach(rin => {
      productos += rin.cantidad;
    });
  }

  var numProductos=document.querySelector("#etiquetaCarrito");
  numProductos.innerHTML=productos;
  actualizarTotal();
}


//*ACTUALIZAR TOTAL

function actualizarTotal(){

  carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché
  var precioFinal=0;

  if(carritoGuardado!=null){
    carrito = JSON.parse(carritoGuardado); //vamos a conseguir el arreglo previo convertir de JSON a notas
    carrito.forEach(rin => {
      precioFinal += rin.cantidad*rin.precio;
    });
  }else{
    precioFinal=0;
  }

  var contendor=document.querySelector(".total");
  var total=contendor.querySelector(".total-neto");

  total.innerHTML="";
  total.innerHTML="Total neto: $"+precioFinal;
}


function crearCajasCarrito(){

  carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché
  contendorPrincipal=document.querySelector("#caja-principal");

  let cajas="";

  if(carritoGuardado!=null){
    carrito=JSON.parse(carritoGuardado); //vamos a conseguir el arreglo previo convertir de JSON a notas
    
    carrito.forEach(rin =>{

      var rinCaja="";
  
      rinCaja+=`
      <div class="contenedor">
        <div class="izquierda">
          <img src="img/Modelos/${rin.tipo}/${rin.modelo}/1.jpg" alt=""></img>
          <h3 class="modelo">${rin.modelo}</h3>
          <p class="tipo">${rin.tipo}</p>
          <p class="precio">${rin.precio}</p>
          <p class="codigo">${rin.codigo}</p>
        </div>
        <div class="derecha">
          <button class="menos">-</button>
          <p class="cantidad">Cantidad: ${rin.cantidad}</p>
          <button class="mas">+</button>
          <button class="eliminar">Eliminar del carrito</button>
        </div>
      </div>
      `;
      cajas+=rinCaja;
    });
  }
  contendorPrincipal.innerHTML = "";
  contendorPrincipal.innerHTML+=cajas;

  //*PARA LOS BOTONES ELIMINAR
  const botonesEliminar=document.querySelectorAll(".eliminar");

  botonesEliminar.forEach(boton =>{
    boton.addEventListener("click", ()=>{
      carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché

      carrito=JSON.parse(carritoGuardado); //vamos a conseguir el arreglo previo convertir de JSON a notas

      //Buscamos el contenedor donde está el botón
      var contenedor = boton.closest(".contenedor");
        
      //Vamos a recuperar la información de los productos con ayuda de etiquetas y el contendor
      var codigo=contenedor.querySelector(".codigo").textContent;

      for (let i=0; i< carrito.length; i++){
        //si hay un producto con el mismo código cambiamos el estado a true y guardamos la posición
        if(carrito[i].codigo==codigo) {
          carrito.splice(i, 1);
        }
      }

      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      actualizarNumProductos();
      crearCajasCarrito();
      console.log("Producto eliminado");
    });
  });

  //*PARA LOS BOTONES MÁS Y MENOS
  const botonesMas=document.querySelectorAll(".mas");

  botonesMas.forEach(boton =>{
    boton.addEventListener("click", ()=>{

      //Buscamos el contenedor donde está el botón
      carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché
      carrito=JSON.parse(carritoGuardado);
      var contenedor = boton.closest(".contenedor");
      var codigo=contenedor.querySelector(".codigo").textContent;
      
      for (let i=0; i< carrito.length; i++){
        if(carrito[i].codigo==codigo) {
          carrito[i].cantidad+=1;
        }
      }
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      actualizarNumProductos();
      crearCajasCarrito();
      console.log("+1");
    });
  });

  const botonesMenos=document.querySelectorAll(".menos");

  botonesMenos.forEach(boton =>{
    boton.addEventListener("click", ()=>{
      
      //Buscamos el contenedor donde está el botón
      carritoGuardado=localStorage.getItem("carritoLocal"); //revisamos el caché
      carrito=JSON.parse(carritoGuardado);
      var contenedor = boton.closest(".contenedor");
      var codigo=contenedor.querySelector(".codigo").textContent;
      
      for (let i=0; i< carrito.length; i++){
        if(carrito[i].codigo==codigo && carrito[i].cantidad>1) {
          carrito[i].cantidad-=1;
        }
      }
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      actualizarNumProductos();
      crearCajasCarrito();
      console.log("-1");
    });
  });
}
