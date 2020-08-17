const pdf = require("html-pdf");

class PdfWriter {
    static WritePdf(fileName, html) {
        pdf.create(html, {}).toFile(fileName, error => {
            if(error) {
                console.log("Ocorreu um erro");
            }
        });
    }
}

module.exports = PdfWriter;