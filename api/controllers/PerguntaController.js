/**
 * perguntaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req,res){
      res.view("pages/pergunta/index",{
          titulo: "MathQuiz"
      });
  },

  aluno: function(req, res){
      res.view("pages/pergunta/aluno",{
          notice: req.param("notice"),
          titulo: "MathQuiz",
      });
  },

  user: function(req, res){
      if(req.me.isSuperAdmin){
          res.redirect("/pergunta/professor");
      } else {
          res.redirect("/pergunta/aluno");
      }
  },

  professor: function(req, res){
      res.view("pages/pergunta/professor",{
          notice: req.param("notice"),
          titulo: "MathQuiz",
      });
  },

  edit: async function(req, res){
      var pkid = parseInt(req.param('id'))
      if (pkid && !isNaN(pkid)) {
          var p = await Pergunta.findOne({
              id: pkid
          });
          if (p) {
              res.view("pages/pergunta/edit", {
                  pergunta: p
              });
          } else {
              res.redirect("/pergunta?notice=Erro.");
          }
      } else {
          res.redirect("/pergunta?notice=Não encontrado.");
      }
  },

  question: async function(req, res) { //page responder questões
      var p = await Pergunta.find({
          limit: 5 
      });
      if (p) {
          res.view("pages/pergunta/question", {
              pergunta: p
          });
      } else {
          res.redirect("/pergunta?notice=Erro.");
      } 
  },

  resposta: function(req, res){ //page respostas questões
      var idPergunta;
      var resPergunta;
      var respostaCerta;
      var acertos=0;
      var erros=0;

      for(var i=0; i<5; i++){
          idPergunta[i] = parseInt(req.param("id"));
          resPergunta[i] = req.param("resposta");
      }

      for(var k=0; k<5; k++){
          respostaCerta[k] = Pergunta.find({  
              where: {"id":idPergunta[k]},
              select: ["resposta"]
          });
          
          if(resPergunta[idPergunta[k]] == respostaCerta[k]){
              acertos = acertos + 1;
          } else {
              erros = erros + 1;
          }
      }

      res.view("/pergunta/resposta",{
          acertou: acertos,
          errou: erros,
          me: undefined
      });
  },

  new: function(req, res){ //criar novas questões
      res.view("pages/pergunta/new",{
          titulo: "Inserir Perguntas"
      });
  },

  perguntas: function(req, res){
      Pergunta.find().then(function(data){
          res.view("pages/pergunta/perguntas",{
              notice: req.param("notice"),
              titulo: "Banco de Perguntas",
              perguntas: data
          });
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
              res.redirect("/pergunta/professor?notice=Salvo com sucesso!");
          }else{
              res.redirect("/pergunta/edit?notice=Erro");
          }
          });
      } else {
          Pergunta.create(model).exec(function(err, newmodel) {
          if (!err) { // Salvou!
              console.log(newmodel);
              res.redirect("/pergunta/professor?notice=Salvo com sucesso!");
          } else { // Não Salvou!
              res.redirect("/pergunta/new?notice=não Salvou"+err);
          }
          });
      }
  },

  delete: function(req, res) {
      var pkid = parseInt(req.param('id'))
      if (pkid && !isNaN(pkid)) {
          Pergunta.destroy({
              id: pkid
          }).exec(function(err) {
          if (!err) {
              res.redirect("/pergunta/professor?notice=Removido.");
          } else {
              res.redirect("/pergunta/perguntas?notice=Erro.");
          }
          });
      } else {
          res.redirect("/pergunta/perguntas?notice=Não encontrado.");
      }
  }
};
