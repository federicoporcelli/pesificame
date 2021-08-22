$(document).ready(function(){

    //Selecciono los elementos del dom
  
    let formulario = $('.formularioConsultas');
    let nombreJuego = $('.nombreJuego');
    let precioJuego = $('.precioJuego');

    
  
    //Separo los datos que voy a necesitar
    function Consulta(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  
    let listaConsulta = [];
  
    //Valido si en el storage hay users si hay asigno mi listUser a los datos del storage
    if (localStorage.getItem('Consultas')) {
      listaConsulta = JSON.parse(localStorage.getItem('Consultas'));
    }
  
    //Agrego a la lista y guardo en el storage un usuario
    function saveToStorage(key, consulta) {
      listaConsulta.push(consulta);
      localStorage.setItem(key, JSON.stringify(listaConsulta));
    }
  
    //Obtengo los datos del storage
    function getUserFromStorage(key) {
      if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
      }
    }
  
    //Escucho el evento submit del formulario
    formulario.submit(function(event) {
      event.preventDefault();
  
      //Obtengo los valores ingresados por el usuario
      let nombre = nombreJuego.val();
      let precio = precioJuego.val();
      
      
  
      let consulta = new Consulta(nombre, precio);
  
      
  
      //guardo el usuario en localstorage
      saveToStorage('Consultas', consulta);
  
      
    });
  
});
  