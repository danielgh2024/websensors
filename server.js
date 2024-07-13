const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});
