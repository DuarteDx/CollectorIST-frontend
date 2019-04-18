var connect = require('connect');
var https = require('https');
var proxy = require('http-proxy-middleware');
var serveStatic = require('serve-static')
var fs = require('fs')
 
var app = connect();

app.use('/api', proxy({target: 'http://backend:8000', changeOrigin: true}));
//Repeat because ** doesn't seem to work on pathRewrite
app.use('/tickets', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/tickets' : '/'}}));
app.use('/ticket-validator', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/ticket-validator' : '/'}}));
app.use('/trips', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/trips' : '/'}}));
app.use('/routes', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/routes' : '/'}}));
app.use('/scheduler', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/scheduler' : '/'}}));
app.use('/notifications', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/notifications' : '/'}}));
app.use('/totp-challenge', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/totp-challenge' : '/'}}));
app.use('/u2f-challenge', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/u2f-challenge' : '/'}}));
app.use('/totp-register', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/totp-register' : '/'}}));
app.use('/u2f-register', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/u2f-register' : '/'}}));
app.use('/porg-admin', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/porg-admin' : '/'}}));
//Porg endpoints were not added
app.use('/porg-admin', proxy({target: 'https://localhost:8080', secure: false , pathRewrite: {'^/porg-admin' : '/'}}));

app.use(serveStatic('dist', {'index': ['index.html']}))

//create node.js http server and listen on port
var options = {
    key:    fs.readFileSync('build/key.pem'),
    cert:   fs.readFileSync('build/cert.pem')
}
https.createServer(options, app).listen(8080);
