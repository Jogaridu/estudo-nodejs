import api from "./../services/api.js";

const $listCards = document.querySelector("#listCards");

const main = async () => {
    updateWindow($listCards);

    const $btnRegister = document.getElementById("btnRegister");

    $btnRegister.addEventListener("click", (event) => postGames(event));

    const $btnUpdate = document.getElementById("btnUpdate");

    $btnUpdate.addEventListener("click", (event) => updateGame(event));

}

const getGames = async () => await api.get("/games");

const getDataWeb = (option) => {

    let data = ""

    switch (option.toUpperCase()) {

        case "REGISTER":
            const $inpTitleRegister = document.getElementById("title").value;
            const $inpPriceRegister = document.getElementById("price").value;
            const $inpYearRegister = document.getElementById("year").value;
            data = {
                title: $inpTitleRegister,
                price: $inpPriceRegister,
                year: $inpYearRegister
            }

            break;

        case "UPDATE":
            const $id = document.getElementById("id").value;
            const $inpTitleEdit = document.getElementById("titleEdit").value;
            const $inpPriceEdit = document.getElementById("priceEdit").value;
            const $inpYearEdit = document.getElementById("yearEdit").value;
            data = {
                id: $id,
                title: $inpTitleEdit,
                price: $inpPriceEdit,
                year: $inpYearEdit
            }
            break;

        default:

            data = undefined;

            break;
    }
    
    return data;
    
}

const postGames = async (event) => {

    const data = getDataWeb("register");

    event.preventDefault();

    const response = await api.post("/games", data);

    alert(response.data);

    await updateWindow($listCards);
}

const deleteGame = async (id) => {

    const response = await api.delete(`/game/${id}`);

    alert(response.data);

    await updateWindow($listCards);

};

const updateGame = async (event) => {

    event.preventDefault();

    const data = getDataWeb("update");
    
    await api.put(`/game/${data.id}`, data);

    lockUnlockInput(true);

    await updateWindow($listCards);

    alert("Jogo atualizado com sucesso");

}

const lockUnlockInput = (bool) => {
    const inputs = Array.from(document.querySelectorAll("[data-form=edit]"));

    inputs.shift();

    inputs.forEach(input => {
        input.disabled = bool;
    });
}

const editFields = async (id) => {

    let response = await api.get(`/game/${id}`);

    response = response.data;

    const inputs = Array.from(document.querySelectorAll("[data-form=edit]"));

    inputs[0].value = response.id;
    inputs[1].value = response.title;
    inputs[2].value = response.price;
    inputs[3].value = response.year;

    lockUnlockInput(false);
}

const updateWindow = async (listCards) => {

    const response = await getGames();
    const dataApi = response.data;

    listCards.innerHTML = "";

    dataApi.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("shadow-sm");
        card.classList.add("rounded");

        card.innerHTML = `
            <div class="card-header">
                <h3 class="text-center">${data.title}</h3>
            </div>
            <div class="card-body">
                <p class="text-center">Preço atual: R$${data.price}</p>
                <p class="text-center">Ano lançamento: ${data.year}</p><br>
            </div>
            <div class="card-footer">
                <button class="btn btn-secondary ml-5 edit" data-id="${data.id}">Editar</button>
                <button class="btn btn-danger ml-5 delete" data-id="${data.id}">Excluir</button>
            </div>
        `;

        listCards.appendChild(card);
    });

    const $btnDelete = Array.from(document.querySelectorAll(".delete"));

    $btnDelete.forEach(button => {
        button.addEventListener("click", (event) => deleteGame(event.target.getAttribute("data-id")))
    });

    const $btnEdit = Array.from(document.querySelectorAll(".edit"));

    $btnEdit.forEach(button => {
        button.addEventListener("click", (event) => editFields(event.target.getAttribute("data-id")))
    });
    
}

main();