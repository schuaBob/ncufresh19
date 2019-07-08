module.exports = {
    isLoggedIn:
        function(req, res, next){
            if(!req.isAuthenticated())
                return res.redirect('/login');
            next();
        },
    isAllowtoLogin:
        function(req, res, next){
            if(req.isAuthenticated())
                return res.redirect('/');
            next();
        },
}