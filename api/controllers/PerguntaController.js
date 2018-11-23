/**
 * perguntaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: function(req, res){
            res.view("pages/pergunta/index",{
                notice: req.param("notice"),
                titulo: "MathQuiz",
            });
  },

  professor: function(req, res){
        Pergunta.find().then(function(data){
            res.view("pages/pergunta/professor",{
                notice: req.param("notice"),
                titulo: "MathQuiz",
                perguntas: data
            });
        });
  },

  edit: function(req, res){
      Pergunta.find().then(function(data){
          res.view("pages/pergunta/index",{
              notice: req.param("notice"),
              titulo: "Editar",
             perguntas: data
          });
      });
  }

  question: function(req, res) { //page responder questões
    var p1 = ["Quanto é 2 + 4 + 8"]
    var p2 = ["Quanto é 4 + 4 + 8"]
    var p3 = ["Quanto é 6 + 4 + 8"]
    var p4 = ["Quanto é 8 + 4 + 8"]
    var p5 = ["Quanto é 10 + 4 + 8"]
        

    res.view("pages/pergunta/question",{
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
        res.view("pages/pergunta/resposta",{
            me: undefined
        });
  },

  new: function(req, res){ //criar novas questões
    res.view("pages/pergunta/new",{
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
      Pergunta.update({
        id:pkid
      }, model).exec(function(err,newmodel){
        if(!err){
          res.redirect("/pergunta?notice=Salvo com sucesso!");
        }else{
          res.redirect("/pergunta?notice=Erro");
        }
      });
    } else {
      Pergunta.create(model).exec(function(err, newmodel) {
      if (!err) { // Salvou!
        console.log(newmodel);
          res.redirect("/pergunta?notice=Salvo com sucesso!");
      } else { // Não Salvou!
          res.redirect("/pergunta?notice=não Salvou"+err);
      }
    });
    }
  }

};
