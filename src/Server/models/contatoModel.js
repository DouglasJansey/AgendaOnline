const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, defaul: '' },
    telefone: { type: String, required: false, defaul: '' },
    email: { type: String, required: false, defaul: '' },
    criadoEm: { type: Date, defaul: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }
    async bucarId(id){
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;

    }
    async edit(id){
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})

    }
    async register() {
        this.valida();

        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body)

    };
    valida() {
        this.cleanUp();
        //Validação
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        if (!this.body.nome) this.errors.push('Nome é obrigatório');
        if (!this.body.email && !this.body.telefone) {
            this.errors.push('Um campo precisa ser preenchido')
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body === {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }

    }
    async bucarContato(){
        const contatos = await ContatoModel.find()
        .sort({criadoEm: -1});
        return contatos;
    }
    async delete(id){
        const contatos = await ContatoModel.findOneAndDelete({_id:id})
        .sort({criadoEm: -1});
        return contatos;
    }

}
module.exports = Contato;