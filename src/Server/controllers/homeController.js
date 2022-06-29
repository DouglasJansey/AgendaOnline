const Contato = require('../models/contatoModel');

exports.index = async (req, res) =>{
      const contato =  new Contato();
      const contatos = await contato.bucarContato();
      return res.render('index', {contatos})    
// req.flash('error', 'mensagem a ser exibida')
// req.session.usuario = {nome: 'Douglas', logado:true};
   
}
