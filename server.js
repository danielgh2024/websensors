const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

// Leer los certificados SSL
const privateKey = fs.readFileSync('ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Crear el servidor HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, '0.0.0.0', () => {
  console.log(`Servidor HTTPS escuchando en https://localhost:${port}`);
});