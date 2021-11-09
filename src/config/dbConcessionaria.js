const moongose = require ('mongoose')
const MONGOURI = process.env.MONGODB_URL
const InicializaMongoServer = async ()=>{
    try{
        await moongose.connect(MONGOURI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('🚗 Conectado ao MongoDB!!!')

    }catch(e){
        console.error(e)
        throw e
    }
}
module.exports = InicializaMongoServer