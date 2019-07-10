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
    isAdmin:
        function(req,res,next) {
            if(req.isAuthenticated() && req.user.admin === "admin" ){
                next();
            }
            return res.redirect('/');
        }
}