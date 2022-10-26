const fs = require('fs');
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3003;

app.get('/', (_req, res) =>{
    res.status(200).json({
        success: true
    });
});

app.listen(PORT, () =>{
    console.info(`Server ${PORT} corriendo correctamente`)
})

class Contenedor {
    constructor(file) {
        this.file = file;
    }

    async getAll() {
        const response = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(response)
    }
} 

const producto1 = new Contenedor('./productos.txt');

app.get('/productos', (_req, res) => {
    producto1.getAll().then((response) => res.send(response))
});

app.get('/productoRandom', (_req, res) => {
    const randNumber = Math.floor(Math.random() * 3);
    producto1.getAll().then((response) => res.send(response[randNumber]))
});