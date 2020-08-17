const Reader = require("./Reader");
const Processor = require("./Processor");
const Table = require("./Table");
const HtmlParser = require("./HtmlParser");
const WriterHtml = require("./WriterHtml");
const PdfWriter = require("./PdfWriter");

const leitor = new Reader();
const escritor = new WriterHtml();

async function main() {

    const dataArchive = await leitor.Read("./Users.csv");

    const dataProcess = Processor.Process(dataArchive);

    const users = new Table(dataProcess);

    const html = await HtmlParser.Parser(users);

    escritor.Write(`${Date.now()}.html`, html);

    PdfWriter.WritePdf(`${Date.now()}.PDF`, html);
}

main();