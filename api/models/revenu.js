const mongosse=require('mongoose')
const config=require('../../config')

const RevenuSchema=new mongosse.Schema({
    montant:{
        type:Number,
        require:true
    },
    tag:String,
    date:Date,
})

const Revenu=mongosse.model('revenu',RevenuSchema)
exports.Revenu=Revenu;
