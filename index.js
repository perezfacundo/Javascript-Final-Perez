const formCliente = document.getElementById('formCliente');

// INICIAR PAGINA
document.addEventListener('DOMContentLoaded', function() {
    listarClientes()
})

//GUARDAR NUEVO CLIENTE
//1. Buscar codigo repetido.  ✅Existe? El codigo ingresado ya existe. || ❌No existe? Siguiente paso ->
// const buscarCoincidencia = () => {

// }

//2. Crear nueva clave.
const key = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let cadena = ''

    for (let i = 0; i <= 10; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
        cadena += caracteres[indiceAleatorio]
    }

    return cadena
}

//3. Guardar cliente en bd
//dependiendo de las constantes validacionFomrulario y buscarCoincidencia -> agregar el cliente en el storage
formCliente.addEventListener('submit', (event) => {
    event.preventDefault();

    let clientes = JSON.parse(localStorage.getItem('clientes')) || []

    const nuevoCliente = {
        clave: key(),
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        codigo: document.getElementById('codigo').value,
        telefono: document.getElementById('telefono').value,
        nombreDeco: document.getElementById('nombreDeco').value
    }

    clientes.push(nuevoCliente)

    // Guardar los datos en el Local Storage
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Cerrar el modal
    const myModal = document.getElementById('exampleModal');
    const modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();

    document.getElementById('nombres').value = ''
    document.getElementById('apellidos').value = ''
    document.getElementById('codigo').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('nombreDeco').value = ''

    listarClientes()
});

//LISTAR CLIENTES
function listarClientes() {
    const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || []
    const tbody = document.getElementById('tbody')
    let i = 1

    clientesGuardados.forEach(cliente => {
        const fila = document.createElement('tr')
        
        fila.innerHTML = `
            <td>${i}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.codigo}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.nombreDeco}</td>
            <td>acciones</td>
        `

        tbody.appendChild(fila)

        i++
    });
}

//ELIMINAR CLIENTE


//BUSCAR CLIENTE /S


//EDITAR CLIENTE