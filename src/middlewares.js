export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    next();
}
