module.exports = {
    isLoggedIn:
        function(req, res, next){
            if(!req.isAuthenticated()){
                return res.redirect('/login');
            } else {
                next();
            }
        },
    isAllowtoLogin:
        function(req, res, next){
            if(req.isAuthenticated()) {
                return res.redirect('/');
            } else {
                next();
            }
        },
    isAdmin:
        function(req,res,next) {
            if(req.isAuthenticated() && req.user.role === "admin" ){
                return next();
            } else {
                return res.redirect('/');
            }
        }
}