/**
 * Los datos que recibe la tabla debe ser un objeto o un array de objetos:
 * [
 *      {id: 1, prop1: valor, ...},
 *      {id: 1, prop1: valor, ...}
 * ]
 * 
 * Si utilizamos un objeto tipo {tabla1: [objeto1, objeto2], tabla2: [objeto1, objeto2...]...} se descompone el objeto en tablas
 */

const TableGenerator = {

    init(idElement, tableData, options){
        if(Array.isArray(tableData)){
            $(idElement).append(this.createTable(tableData, options));
        }
        else if(Object.keys(tableData).length > 0){
            let that = this;
            $.each(Object.values(tableData), function(index, table){
                $(idElement).append(that.createTable(table, options));
            })
        }
    },

    createTable(tableData, options){
        return $('<table>', {class: options.tableClasses.join(' ')}).append(
            this.createHeader(tableData[0]),
            this.createTbody(tableData)
        )
    },

    createHeader(rowInfo){
        let tr = $('<tr>');

        $.each(Object.keys(rowInfo), (index, key) => {
            tr.append($('<th>').text(key));
        });

        return $('<thead>').append(tr);
    },

    /**
     * 
     * @param {*} rows Es un array de objetos
     */
    createTbody(rows){
        let tbody = $('<tbody>');
        let that = this;
        $.each(rows, function(index, rowInfo){
            tbody.append(
                that.createRow(rowInfo)
            );
        });
        return tbody;
    },

    /**
     * Crea una fila por cada objeto del array
     * @param {*} rowInfo Es un objeto
     */
    createRow(rowInfo){
        let tr = $('<tr>');
        $.each(Object.values(rowInfo), function(index, value){
            console.log(value);
            tr.append($('<td>').text(value))
        });

        return tr;
    }
}

let data = {
    usuarios:[
        {id: 1, nombre: 'Juan'},
        {id: 2, nombre: 'Michael'}
    ]
};

let options = {
    tableClasses: ['table', 'table-hover'],
    tHeadClasses: [],
    tRowClasses: [],
    tdClasses: []
}

window.addEventListener('load', () => TableGenerator.init('#example', data, options));

