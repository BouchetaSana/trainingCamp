const mongosse=require('mongoose')
const config=require('../../config')

const DepenseSchema=new mongosse.Schema({
    montant:{
        type:Number,
        require:true
    },
    tag:String,
    date:Date,
})

const Depense=mongosse.model('depense',DepenseSchema)
exports.Depense=Depense
