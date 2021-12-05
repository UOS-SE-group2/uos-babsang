export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.who = req.session.who;
    next();
}
