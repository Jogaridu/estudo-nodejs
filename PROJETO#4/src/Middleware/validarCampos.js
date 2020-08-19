const validarCampos = async (req, res, next) => {

    let {title, year, price} = req.body;
    
    if (typeof(title) === "string" && !isNaN(year) && !isNaN(price)) {

        return next();

    } else {

        res.status(404).send({error: "Falha ao cadastrar! Informe todos os campos"})
    }
}

module.exports = validarCampos;