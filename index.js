$(document).ready(function() {
    // Definir el JSON con los datos
    var jsonData = [
        {"nombre": "Juan", "edad": 30, "ciudad": "Madrid"},
        {"nombre": "María", "edad": 25, "ciudad": "Barcelona"},
        {"nombre": "Carlos", "edad": 35, "ciudad": "Valencia"},
        {"nombre": "Ana", "edad": 28, "ciudad": "Sevilla"}
    ];

    createTable(jsonData);

    let columnas = [];

    Object.keys(jsonData[0]).forEach(key => {
        columnas.push({data: key});
    });

    // Inicializar DataTable
    $('#miTabla').DataTable({
        data: jsonData,
        columns: columnas
    });
});

function createTable(jsonData){
    let div = document.getElementsByClassName('container')[0];

    let table = document.createElement('table');
    table.classList.add('table', 'table-hover');
    table.setAttribute('id', 'miTabla');

    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let tr = document.createElement('tr');

    Object.keys(jsonData[0]).forEach(key => {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    });

    thead.append(tr);

    table.append(thead);
    table.append(tbody);
    div.append(table);
}