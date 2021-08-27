const iva = 0.21;
const impPais = 0.08;
const percepcion = 0.35;

let precio;

$('.precioJuego').on('input', () => {
  precio = parseInt($('.precioJuego').val());
})

function precioFinal () {
  let precioConIva = precio * iva;
  let precioConPercepcion = precio * percepcion;
  let precioConImpPais = precio * impPais;
  let precioTotal = precio + precioConIva + precioConPercepcion; + precioConImpPais;
  return (precioTotal)

}

  let formulario = $('.formularioConsultas');
  let nombreJuego = $('.nombreJuego');
  let precioJuego = $('.precioJuego') 
  
  function Consulta(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  let listaConsulta = [];

  if (localStorage.getItem('consultas')) {
    listaConsulta = JSON.parse(localStorage.getItem('consultas'));
  }

  function agregarAlStorage(key, consulta) {
    listaConsulta.push(consulta);
    localStorage.setItem(key, JSON.stringify(listaConsulta));
  }

  function obtenerConsultaDeStorage(key) {
    if(localStorage.getItem(key)){
      return JSON.parse(localStorage.getItem(key));
    }
  }

  formulario.submit(function(event) {
    event.preventDefault();
    
    
    let nombre =  nombreJuego.val();
    //let precio = precioJuego.val();

    const total =  precioFinal()
    console.log(total);
    let consulta = new Consulta(nombre, total)
;

    if(!localStorage.getItem('consultas')){
      crearTabla('body', 'user-table');
      crearHeader(['Nombre', 'Precio Final'], '#user-table');
    }

    agregarAlStorage('consultas', consulta);

    crearFiladeConsulta(consulta, '#user-table');

  });

  if(localStorage.getItem('consultas')){
    crearTabla('body', 'user-table');
    crearHeader(['Nombre','Precio'], '#user-table');
    filas(obtenerConsultaDeStorage('consultas'), '#user-table');
  }


  function crearTabla(element, nombre) {
    const table = `<table id=${nombre}></table>`;
    $(element).append(table);

  $('#user-table').css({"textAlign": "center", 
                        "fontSize": "60px",
                        "marginTop": "40px",
                        "marginLeft": "30%",
                        
                        })
  }

  function crearHeader(data, element) { 
    const header = `<tr>${createDataHeader(data)}</tr>`;
    $(element).append(header);
  }

  function createDataHeader(data) {
    return data.map(headerData => `<th>${headerData}</th>`);
  }

  function crearFiladeConsulta(consulta, element){
    const row = `<tr id=tr-${consulta.nombre}>
      ${populateTableData(consulta.nombre, consulta.precio)}
    </tr>`;
    $(element).append(row);
  }

  function filas(data, element){
    data.map(consulta => {
        crearFiladeConsulta(consulta, element);
    });
  }


  function populateTableData(nombre, precio){ 
    return `
    <td>${nombre} </td>
    <td>${precio}</td>
    `
  }

  $('.mostrarConsultas').click(function(){
    $("#user-table").show()
})

$('.ocultarConsultas').click(function(){
  $("#user-table").fadeOut()
})

$('.borrarConsultas').on('click',function(key){
    localStorage.removeItem(consultas)
  })






 




    
    


  

  