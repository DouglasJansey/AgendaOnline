const validator = require('validator');


export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }
    init() {
        this.events();
    }
    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }
  
    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        
        let error = false;


        if (!validator.isEmail(emailInput.value)) {
             if(this.form.className === 'form-login'){  
                emailInput.style.border = '2px solid red';
                const errorMsg = document.querySelector('.emailLogin');
                errorMsg.style.color = 'red'
                errorMsg.innerHTML = 'Email ou senha inválida'
                // alert('E-mail inválido');
                error = true;
             }else{
                emailInput.style.border = '2px solid red';
                const errorMsg = document.querySelector('.emailCadastro');
                errorMsg.style.color = 'red'
                errorMsg.innerHTML = 'Precisa de um email válido'
                // alert('E-mail inválido');
                error = true;
             }
        }
        // A senha deve ter entre 4 e 50 caracteres
        if (passwordInput.value.length < 4 || passwordInput.value.length > 50) {
            if(this.form.className === 'form-login'){  
                passwordInput.style.border = '2px solid red';    
                const errorMsg = document.querySelector('.passwordLogin');
                errorMsg.style.color = 'red'
                errorMsg.innerHTML = 'Email ou senha inválida'
                // alert('E-mail inválido');
                error = true;
             }else{
                passwordInput.style.border = '2px solid red';
                const errorMsg = document.querySelector('.passwordCadastro');
                errorMsg.style.color = 'red'
                errorMsg.innerHTML = 'Sua senha deve ter entre 4 e 50 caracteres'
                // alert('E-mail inválido');
                error = true;
             }
            // alert('A senha precisa ter mais de 4 caracteres e menos de 50');
            error = true;   
        }
        if (!error) el.submit();
    }


}
