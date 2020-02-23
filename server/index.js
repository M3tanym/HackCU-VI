// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('/home/Ben/cert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/home/Ben/cert/cert.pem', 'utf8');
const ca = fs.readFileSync('/home/Ben/cert/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use((req, res) => {
	res.send('Yay Recyclable!');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// set up a route to redirect http to https
app.use('*', function(req, res) {
	res.redirect('https://' + req.headers.host + req.url);
});

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 8080');
});

httpsServer.listen(8443, () => {
	console.log('HTTPS Server running on port 8443');
});
