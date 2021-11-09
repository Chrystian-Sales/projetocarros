const express = require ('express')
require ('dotenv').config()
const InicializaMongoServer = require('./config/dbConcessionaria')
const rotasMarcas = require ('./routes/ModelCars')

InicializaMongoServer()

const app = express()

const port = process.env.port
app.use(express.json())

app.get('/', (req, res)=>{
    res.json({
        mensagem: 'API 100% funcional',
        versao: '1.0.0',
    })
})

app.use('/ModelCars', rotasMarcas)

app.use(function(req,res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, (req, res)=> {
    console.log(`Servidor web rodando na porta ${port}`)
})