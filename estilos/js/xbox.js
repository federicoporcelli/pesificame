$(document).ready(function() {

const iva = 0.21;
const impPais = 0.08;
const percepcion = 0.35;

let precio;

$('.precioJuego').on('input', () => {
  precio = parseInt($('.precioJuego').val());
})

function confirmar(){  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tu consulta fue procesada!!',
    showConfirmButton: false,
    timer: 1500,
  })
}

  



function precioFinal () {
  let precioConIva = precio * iva;
  let precioConPercepcion = precio * percepcion;
  let precioConImpPais = precio * impPais;
  let precioTotal = precio + precioConIva + precioConPercepcion + precioConImpPais;
  return (precioTotal.toFixed(2))

}

  let formulario = $('.formularioConsultasXbox');
  let nombreJuego = $('.nombreJuego');
  let precioJuego = $('.precioJuego') 
  
  function ConsultaXbox(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }

  let listaConsultaXbox = [];

  if (sessionStorage.getItem('consultasxbox')) {
    listaConsultaXbox = JSON.parse(sessionStorage.getItem('consultasXbox'));
  }

  function agregarAlStorageXbox(key, consultaXbox) {
    listaConsultaXbox.push(consultaXbox);
    sessionStorage.setItem(key, JSON.stringify(listaConsultaXbox));
  }

  function obtenerConsultaDeStorageXbox(key) {
    if(sessionStorage.getItem(key)){
      return JSON.parse(sessionStorage.getItem(key));
    }
  }

  formulario.submit(function(e) {
    e.preventDefault();
    confirmar()

    
    
    let nombre =  nombreJuego.val();
    let precio = precioJuego.val();

    const total =  precioFinal()
    console.log(total);
    let consultaXbox = new ConsultaXbox(nombre, total)

  
;

    if(!sessionStorage.getItem('consultasXbox')){
      crearTabla('body', 'user-table1');
      crearHeader(['Nombre', 'Precio Final'], '#user-table1');
    }

    agregarAlStorageXbox('consultasXbox', consultaXbox);

    crearFiladeConsultaXbox(consultaXbox, '#user-table1');


    $(".botonConsultaXbox").trigger("reset");
  });

  if(sessionStorage.getItem('consultasXbox')){
    crearTabla('body', 'user-table1');
    crearHeader(['Nombre','Precio Final'], '#user-table1');
    filas(obtenerConsultaDeStorageXbox('consultasXbox'), '#user-table1');
  }


  function crearTabla(element, nombre) {
    const table = `<table id=${nombre}></table>`;
    $(element).append(table);

  $('#user-table1').css({"textAlign": "center", 
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

  function crearFiladeConsultaXbox(consultaXbox, element){
    const row = `<tr id=tr-${consultaXbox.nombre}>
      ${populateTableData(consultaXbox.nombre, consultaXbox.precio)}
    </tr>`;
    $(element).append(row);
    
  }

  function filas(data, element){
    data.map(consultaXbox => {
        crearFiladeConsultaXbox(consultaXbox, element);
    });
  }


  function populateTableData(nombre, precio){ 
    return `
    <td>${nombre} </td>
    <td>${precio}</td>
    `

    
  }

  $('.mostrarConsultasXbox').click(function(){
    $("#user-table1").show()
})

$('.ocultarConsultasXbox').click(function(){
  $("#user-table1").fadeOut()
})

$('.borrarConsultasXbox').click(function(){
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
})






})




    
    

  