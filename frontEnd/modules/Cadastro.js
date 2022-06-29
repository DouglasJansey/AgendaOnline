const validator = require('validator');
export default class Cadastro{
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }
    init(){
        this.event();
    }
    event(){
        if(!this.form) return;
        this.form.addEventListener('submit',e => {
            e.preventDefault();
            this.validation(e);
        });
    }
    validation(e){
        const el = e.target;
        const nome = el.querySelector('input[name="nome"]');
        const email = el.querySelector('input[name="email"]');
        const telefone = el.querySelector('input[name="telefone"]');
        let error = false;

        if(!nome.value){
            nome.style.border = '2px solid red';
            const errorMsg = document.querySelector('.nome');
            errorMsg.style.color = 'red'
            errorMsg.innerHTML = 'Nome precisa ser preenchido'
            console.log(errorMsg);
            error = true;
        }
        if(!validator.isEmail(email.value) && !telefone.value){
            email.style.border = '2px solid red';
            const errorMsg = document.querySelector('.email');
            errorMsg.style.color = 'red'
            errorMsg.innerHTML = 'Email precisa ser preenchido'
            error = true;
        }
        if(!telefone.value && !email.value){
            telefone.style.border = '2px solid red';
            const errorMsg = document.querySelector('.telefone');
            errorMsg.style.color = 'red'
            errorMsg.innerHTML = 'Telefone precisa ser preenchido'
            error = true;
        }

        if (!error) el.submit();
    }
}