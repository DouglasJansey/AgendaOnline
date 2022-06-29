const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
    
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async login(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email})
        
        if(!this.user){
            this.errors.push('Usuário ou senha inválida');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('senha inválida');
            this.user = null;
            return;
        }
    }

    async register(){
        this.valida();
        if(this.errors.length > 0) return
        
        await this.userExists();
        if(this.errors.length > 0) return
        
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt); 

       
        this.user = await LoginModel.create(this.body);
    
    }
    async userExists(){
       const user = await LoginModel.findOne({email: this.body.email})
        if(user) this.errors.push('Usuário já existe')
    }
    valida(){
        this.cleanUp();
        //Validação
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        // A senha deve ter entre 4 e 50 caracteres
        if(this.body.password.length < 4 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter mais de 4 caracteres e menos de 50');
        } 
    }

    cleanUp(){
        for(const key in this.body){
           if(typeof this.body[key] !== 'string'){
            this.body[key] = '';   
           }
        }
       this.body === {
           email: this.body.email,
           password: this.body.password
       }
        
    }
    
}

module.exports = Login;