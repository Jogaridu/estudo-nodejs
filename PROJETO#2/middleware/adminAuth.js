function adminAuth (req, res, next) {

    if (req.session.user == undefined) {
        next() // next() -> Quer dizer que o usuário pode prosseguir com a rota

    } else {
        res.redirect("/");

    }
}

module.exports = adminAuth;