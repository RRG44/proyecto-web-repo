//TODO: Hacer que se guarde en un archivo local 
var carrito=[]; //Va a guardar los productos
var productos=0; //Va a llevar cuenta de la cantidad de productos en el carrito


//Recuperamos todos los botones del documento
var botones=document.querySelectorAll(".agregar");

//Vamos a agregar una funció a todos los botones
botones.forEach(boton =>{
  boton.addEventListener("click", () => {
    
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
      productos++;
    }else{
      /*
      Si está solo agregamos +1 a su cantidad
      y a la cuenta de productos en el carrito
      */
      carrito[index].cantidad++;
      productos++;
    }
    
    actualizarNumProductos(); //Para actualizar el número en el carrito al añadir productos
    // crearCajasCarrito(); //Para crear cajas de productos en el html carrito
    console.log(Array.from(carrito));
    console.log(productos);
  });
});

//
function actualizarNumProductos(){
  var numProductos=document.querySelector("#etiquetaCarrito");
  numProductos.innerHTML=productos;
}

function crearCajasCarrito(){
  html="";
  //Creamos las cajitas con la información guardada
  carrito.forEach((rin)=> {
    html=html+`
    <div class="contenedor">
      <div class="izquierda">
        <img src="img/Modelos/Offroad/RT107/1.png" alt=""></img>
        <h3 class="modelo">${rin.modelo}</h3>
        <p class="tipo">${rin.tipo}</p>
        <p class="precio">${rin.precio}</p>
        <p class="codigo">${rin.codigo}</p>
      </div>
      <div class="derecha">
        <button class="menos">-</button>
        <p>Cantidad: ${rin.cantidad}</p>
        <button class="mas">+</button>
        <button class="eliminar">Eliminar del carrito</button>
      </div>
    </div>
    `;
  });
}