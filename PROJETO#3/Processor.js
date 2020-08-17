class Processor {

    static Process(data) {
        const arrData = data.split("\r\n");
        const rows = [];

        arrData.forEach(row => {
            let arr = row.split(",");
            rows.push(arr);
        });

        return rows

    }

}

module.exports = Processor;