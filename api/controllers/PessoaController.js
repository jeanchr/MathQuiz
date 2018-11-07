/**
 * PessoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res) {
    Pessoa.find().then(function(data) {
      res.view("pages/pessoa/index",
        {
          notice: req.param("notice"),
          pessoas: data
        });
    });
  },
  new: function(req, res) {
    var p1 = ["Quanto é 2 + 4 + 8"]
    var p2 = ["Quanto é 4 + 4 + 8"]
    var p3 = ["Quanto é 6 + 4 + 8"]
    var p4 = ["Quanto é 8 + 4 + 8"]
    var p5 = ["Quanto é 10 + 4 + 8"]
        

    res.view("pages/pessoa/new",
    titulo: "Perguntas",
        pergunta1: p1,
        pergunta2: p2,
        pergunta3: p3,
        pergunta4: p4,
        pergunta5: p5
    );
    res.view("pages/pessoa/new");
  },
  
  },
  saveOrUpdate: function(req, res) {
    var pkid = parseInt(req.param("id"));
    var model = {
      questao: re.param("questão"),
      resposta: req.param("sobrenome"),
     
    }
    if(pkid > 0){
      Pessoa.update({
        id:pkid
      }, model).exec(function(err,newmodel){

      });
    } else {
      Pessoa.create(model).exec(function(err, newmodel) {
    
      }
    });
    }
  },

};
