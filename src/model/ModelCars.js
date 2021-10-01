const mongoose = require ('mongoose')

const MarcasSchema = mongoose.Schema({
    nome: {type: String},
    modelo:{type: String},
    categoria:{type: String},
    nacionalidade:{type: String},
    ano:{type: Number},
    preço:{type: Number},
    status: {type: String, enum:['Ativo estoque','Inativo estoque'], default: 'Ativo estoque'}
}, {timestamps: true})
    

module.exports = mongoose.model('marcas', MarcasSchema)