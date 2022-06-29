const Login = require('../models/loginModel')

exports.index = (req, res)=>{
  if(req.session.user) return res.render('logado')
    res.render('login');
}
exports.register = async function(req, res){
    try{
    const login = new Login(req.body);
    await login.register();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
              req.session.save(function(){
              return res.redirect('index')
             });
             return;
            }
            req.flash('success', 'Seu usuário foi criado com sucesso!');
            req.session.save(function(){
            return res.redirect('index')
           });
    
    }catch(e){
        console.log(e)
      return res.render('error')
    }
 
}
exports.login = async function(req, res){
    try{
    const login = new Login(req.body);
    await login.login();
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
              req.session.save(function(){
              return res.redirect('index')
             });
             return;
            }
        if(!login.user){
            req.flash('errors', login.errors);
              req.session.save(function(){
              return res.redirect('index')
             });
             return;
            }

            req.flash('success', 'Você está conectado agora!');
            req.session.user = login.user;
        
            req.session.save(function(){
            return res.redirect('index')
           });
    
    }catch(e){
        console.log(e)
      return res.render('error')
    }
}
exports.logout = function(req, res){
     req.session.destroy();
     res.redirect('index')
    
}