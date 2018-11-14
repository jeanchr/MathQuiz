/**
 * PessoaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: function(req, res){
        Pessoa.find().then(function(data){
            res.view("pages/pessoa/index",{
                notice: req.param("notice"),
                titulo: "MathQuiz",
                perguntas: data
            });
        });
  },

  question: function(req, res) { //page responder questões
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
        perguntaLabel1: p1,
        perguntaLabel2: p2,
        perguntaLabel3: p3,
        perguntaLabel4: p4,
        perguntaLabel5: p5
    });

  },

  resposta: function(req, res){ //page respostas questões
        res.redirect("/pessoa/resposta?notice=Salvo com sucesso");
  },

  new: function(req, res){ //criar novas questões
    res.view("pages/pessoa/new",{
        titulo: "Inserir Perguntas"
    });
  },

  saveOrUpdate: function(req, res) { //salvar novas questões
    var pkid = parseInt(req.param("id"));
    var model = {
      pergunta: req.param("pergunta"),
      resposta: req.param("resposta")
    }

    if(pkid > 0){
      Pessoa.update({
        id:pkid
      }, model).exec(function(err,newmodel){
        if(!err){
          res.redirect("/pessoa?notice=Salvo com sucesso!");
        }else{
          res.redirect("/pessoa?notice=Erro");
        }
      });
    } else {
      Pessoa.create(model).exec(function(err, newmodel) {
      if (!err) { // Salvou!
        console.log(newmodel);
          res.redirect("/pessoa?notice=Salvo com sucesso!");
      } else { // Não Salvou!
          res.redirect("/pessoa?notice=não Salvou");
      }
    });
    }
  }

};
