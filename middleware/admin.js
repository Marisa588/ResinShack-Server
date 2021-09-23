function Admin(req, res, next) {
    
    if(req.user.role == "true") {
        res.status(200)
        return res.send('Welcome Admin')
    } else {
        return res.send('Welcome User')
    }
}

module.exports = {
    Admin
}