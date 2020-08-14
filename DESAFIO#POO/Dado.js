class Dado {
    constructor(numFace) {
        this.numeroFace = numFace;
    }

    // Rola o dado retornando um número aleátorio
    rolar() {

        const faceEscolhida = Math.floor(Math.random() * this.numeroFace);

        console.log(`Dentre um dado de ${this.numeroFace} faces, caiu a face de lado ${faceEscolhida}`);
    }
}

const faceSeis = new Dado(6);
const faceDez = new Dado(10);

faceDez.rolar();
faceSeis.rolar();