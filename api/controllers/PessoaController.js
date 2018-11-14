/**
 * PessoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res) {
    Pessoa.find().then(function(data) {
      res.view("pages/pessoa/question",
        {
          notice: req.param("notice"),
          pessoas: data
        });
    });
  },

  question: function(req, res) {
    var p1 = ["Quanto é 2 + 4 + 8"]
    var p2 = ["Quanto é 4 + 4 + 8"]
    var p3 = ["Quanto é 6 + 4 + 8"]
    var p4 = ["Quanto é 8 + 4 + 8"]
    var p5 = ["Quanto é 10 + 4 + 8"]
        

    res.view("pages/pessoa/question",{
        titulo: "Perguntas",
        resposta1: "1",
        resposta2: "2",
        resposta3: "3",
        resposta4: "4",
        resposta5: "5",
        pergunta1: p1,
        pergunta2: p2,
        pergunta3: p3,
        pergunta4: p4,
        pergunta5: p5
        });
  },

  resposta: function(req, res){
    res.view("pages/pessoa/resposta");
  },

  new: function(req, res){
    res.view("pages/pessoa/new",{
      titulo: "Inserir Perguntas"
    });
  },

  saveOrUpdate: function(req, res) {
    var pkid = parseInt(req.param("id"));
    var model = {
      questao: re.param("questão"),
      resposta: req.param("resposta"),
    }
    res.redirect("/pessoa");
    if(pkid > 0){
      Pessoa.update({
        id:pkid
      }, model).exec(function(err,newmodel){

      });
    } else {
      Pessoa.create(model).exec(function(err, newmodel) {
    });
    }
  },

};
