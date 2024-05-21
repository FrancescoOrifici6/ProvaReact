// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
const createProxyMiddleware = require('http-proxy-middleware');
module.exports = function (app) {
    app.use('/cope',
        createProxyMiddleware({
            "target": "http://cont.multidatagroup.it/cope/api/cope/v1",
            "secure": false,
            "logLevel": "debug",
            "changeOrigin": true,
            "pathRewrite": {
                "^/cope": ""
            }
        })
    );
};