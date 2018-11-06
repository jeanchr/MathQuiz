/**
 * PessoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	index: function(req, res){
		Pessoa.find().then(function(data){
			res.view("pages/pessoa/index",
			{
				notice: req.param("notice"),
				pessoas: data
			});
		});
	},

	new: function(req, res){
		res.view("pages/pessoa/new");
	},

	edit: function(req, res){
		var pkid = parseInt(req.param('id'))
		if(pkid && !isNaN(pkid)){
			Pessoa.find({
				id: pkid
			}).exec(function(err){
				if(!err){
					res.view("pages/pessoa/edit", {
						pessoa: data[0]
					});
				} else {
					res.redirect("/pessoa?notice=Erro");
				}
				return res.json(rt);
			});
		} else {
			res.redirect("/pessoa?notice=Não encontrado");
		}
	},

	saveOrUpdate: function(req, res){
		var pkid = parseInt(req.param("id"));
		var model = {
			nome: req.param("nome"),
			sobrenome: req.param("sobrenome"),
			sexo: req.param("sexo")
		}
		Pessoa.create(model).exec(function(err, newmodel){
			if(!err){ //salvou
				res.redirect("/pessoa?notice=Salvo com sucesso!");
			} else { //não salvou
			}
		});
	},

	delete: function(req,res){
		var pkid = parseInt(req.param('id'))
		if(pkid && !isNaN(pkid)){
			Pessoa.destroy({
				id: pkid
			}).exec(function(err){
				if(!err){
					res.redirect("/pessoa?noice=Removido");
				} else {
					res.redirect("/pessoa?notice=Erro");
				}
				return res.json(rt);
			});
		} else {
			res.redirect("/pessoa?notice=Não encontrado");
		}
	}

};

