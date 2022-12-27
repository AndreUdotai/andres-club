const protectRoute = (req, res, next) =>{
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/user/login');
}

// const allowIf = (req, res, next) =>{
//     if (!req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/');      
// }

module.exports = {
      protectRoute,
      // allowIf,
};