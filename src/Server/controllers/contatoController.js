const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
   return res.render('contato', {
        contato: {}
   });

}
exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('index'));
            return;
        }
        req.flash('success', 'Seu contato foi salvo com sucesso!');
        req.session.save(() => res.redirect(`/contato/index`));
        return;
    } catch (e) {
        console.log(e)
       return res.render('error');
    }
}
exports.saveContato = async (req, res) =>{
    if(!req.params.id) return res.render('error');
    
    const novoContato = new Contato(req.body);
    
    const contato = await novoContato.bucarId(req.params.id)
    

    if(!contato) return res.render('error');
    
    res.render('contato', {contato});
}
exports.editContato = async(req,res)=>{
    try{
        if(!req.params.id) return res.render('error');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id)
    
    
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect(`/contato/index/${req.params.id}`));
            return;
        }
        req.flash('success', 'Seu contato foi atualizado com sucesso!');
        req.session.save(() => res.redirect(`back`));
        return;

    }catch(e){
        res.render('error'); 
        console.log(e); 
    }    
}
exports.deleteContato = async (req, res) =>{
    if(!req.params.id) return res.render('error');
    
    const novoContato = new Contato(req.body);
    
    const contato = await novoContato.delete(req.params.id)
    

    if(!contato) return res.render('error');
    req.flash('success', 'Contato apagado com sucesso.')
    req.session.save(()=> res.redirect('back'));
}