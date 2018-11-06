/**
 * TesteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	index: function(requisicao, resposta){
		var lista = [
			"Led Zepellin", "ACDC", "Guns'n' Roses", "Calipson", "Djavu", "Furacão 2000"
		]
		resposta.view("pages/teste/index",
			{
				titulo: "bandas",
				bandas: lista,
				parametros: Object.keys(
					requisicao.allParams(),
				),
				requisicao: requisicao
			})
	}

};

