let dataTable
let dataTableIsInitialized = false

const dataTableOptions = {
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
}

//Inicializacion de datatables
const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy()
    }

    await listarClientes()

    dataTable = $('#tablaClientes').DataTable(dataTableOptions)

    dataTableIsInitialized = true
}

//GUARDAR NUEVO CLIENTE
//1. Crear nueva clave.
const key = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let cadena = ''

    for (let i = 0; i <= 10; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
        cadena += caracteres[indiceAleatorio]
    }

    return cadena
}

//2. Guardar cliente en bd
document.getElementById('btnGuardar').addEventListener('click', async (event) => {
    event.preventDefault();

    let clientes = JSON.parse(localStorage.getItem('clientes')) || []

    const nuevoCliente = {
        // clave: key(),
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        codigo: document.getElementById('codigo').value,
        telefono: document.getElementById('telefono').value,
        nombreDeco: document.getElementById('nombreDeco').value,
        enUso: true
    }

    //Verificar si el codigo ya pertenece a un cliente
    const codigoYaExiste = clientes.some(cliente => cliente.codigo === nuevoCliente.codigo);

    if (codigoYaExiste) {
        console.log('El codigo ya existe')
    } else {
        // Guardar los datos en el Local Storage
        clientes.push(nuevoCliente)
        localStorage.setItem('clientes', JSON.stringify(clientes));

        document.getElementById('nombres').value = ''
        document.getElementById('apellidos').value = ''
        document.getElementById('codigo').value = ''
        document.getElementById('telefono').value = ''
        document.getElementById('nombreDeco').value = ''

        // Cerrar el modal
        const myModal = document.getElementById('agregarClienteModal');
        myModal.style.display = 'none'

        const modalBackdrops = document.querySelectorAll('.modal-backdrop')
        modalBackdrops.forEach(backdrop => {
            backdrop.parentNode.removeChild(backdrop)
        })

        console.log('antes de init datatable')

        await initDataTable()
        console.log('despues de init datatable')
    }
});

//LISTAR CLIENTES con datatables
const listarClientes = async () => {

    const clientes = JSON.parse(localStorage.getItem('clientes')) || []

    let content = ``

    clientes.forEach((cliente, index) => {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.codigo}</td>
            <td>${cliente.nombreDeco}</td>
            <td>${cliente.telefono}</td>
        `
        if (cliente.enUso) {
            content += `<td><i class="fa-solid fa-check" style="color: green;"></i></td>`
        } else {
            content += `<td><i class="fa-solid fa-circle-xmark" style="color: #ed333b;"></i></td>`
        }

        //editar: debe cargar la informacion en el modal editarClienteModal
        //eliminar: debe preguntar si desea eliminar el cliente en el modal eliminarClienteModal
        content += `
            <td>
                <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#editarClienteModal"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarClienteModal"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
        `

    })

    tableBody_users.innerHTML = content;
}

//ELIMINAR CLIENTE


//BUSCAR CLIENTE /S


//EDITAR CLIENTE


// INICIAR PAGINA
window.addEventListener('load', async () => {
    await initDataTable()
})
