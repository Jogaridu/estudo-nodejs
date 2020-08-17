class Table {
    constructor(arr) {
        this.header = arr[0];
        arr.shift();
        this.rows = arr;
    }

    // get na frente dos métodos transforma em "atributos" e é obrigatório o retorno de algum valor
    get RowCount() {
        return this.rows.length;
    }

    get ColumnCount() {
        return this.header.length
    }
}

module.exports = Table; 