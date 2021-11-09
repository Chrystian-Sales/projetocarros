const express = require ('express')
const router = express.Router()
const {check, validationResult}= require('express-validator')

const ModelCars = require ('../model/ModelCars')
const validaDados = [
    check("nome", "Atenção, nome da Marca é obrigatório").not().isEmpty(),
    check("modelo", "Atenção, o modelo do veículo é obrigatório").not().isEmpty(),
    check("categoria", "Atenção, categoria é obrigatório(SUV, Utilitário, Esportivo, Sedan)").not().isEmpty(),
    check("nacionalidade", "Atenção, informe o pais de origem da Marca").not().isEmpty(),
    check("ano", "Atenção, ano é obrigatório(somente números)").not().isEmpty().isNumeric(),
    check("preço", "Atenção, ano é obrigatório(somente números)").not().isEmpty().isNumeric(),
    check("status", "Informe disponibilidade em estoque").isIn(['Ativo estoque', 'Inativo estoque'])
]

router.get ('/', async(req, res)=> {
    try{
        const ModelsCars = await ModelCars.find()
        res.json (ModelsCars)
    }catch (err){
        res.status(500).send({
            erros: [{message: 'Não foi possivel obter marcas!'}]
        })
    }
})

/*************listar uma unica marca***********/
router.get ('/:id', async(req, res)=>{
    try {
        const ModelsCars = await ModelCars.find({"_id" : req.params.id})
        res.json(ModelsCars)
    }catch (err){
        res.status(400).send({
            errors:[{message:`Não foi possivel localizar a marca com o id ${req.params.id}`}]
        })

    }
})

router.post("/", validaDados, async(req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try{
        let montadora = new ModelCars (req.body)
        await montadora.save()
        res.send(montadora)
    }catch (err){
        return res.status(400).json({
            errors: [{message: `Erro ao salvar montadora!: ${err.message}`}]
        })
    }
})

    /*************Delete - apagar registros***********/
router.delete('/:id', async(req, res) =>{
    await ModelCars.findByIdAndDelete (req.params.id)
    .then (ModelsCars =>{
        res.send ({message: `Registro removido com sucesso`})
    }).catch(err =>{
        errors: [{message: 'Exclusão não realizada'}]
    })
})
    /*************Put - alterar registros***********/
router.put('/', validaDados, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await ModelCars.findByIdAndUpdate(req.body._id, {$set: dados})
    .then(ModelsCars => {
        res.send({message: `Registros alterados!`})
    }).catch(err => {
        return res.status(400).send({
            errors: [{message: 'Não foi possível alterar os registros!'}]
        })
    })
})

module.exports = router