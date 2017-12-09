/* eslint no console: off */

const tokenService = require('./token-service');

module.exports = function getEnsureAuth() {
    
    return function ensureAuth(req, res, next) {
        const token = req.get('Authorization');
        if (!token) return next({ code: 401, error: 'No Authorization' });

        tokenService.verify(token)
            .then(payload => {
                req.user = payload;
                next();
            }, () => {
                next({ code: 401, error: 'Auth Failed' });
            })
            .catch(err => {
                console.log('unexpected next() failure', err);
            });
    };
};