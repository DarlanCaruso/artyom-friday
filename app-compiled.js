'use strict';

// Semantic UI Basic
$('.ui.dropdown').dropdown();

// App 
var botaoConfig = document.querySelector('#config');

function abrirModal() {
  $('.ui.modal').modal('setting', 'transition', 'fade').modal('setting', 'closable', false).modal('show');
};

function salvarConfig() {
  console.log('Teste');
};

// Artyom

var artyom = new Artyom();

var config = {
  lang: 'pt-PT',
  continuous: true,
  debug: true,
  listen: true,
  speed: 1
};

artyom.initialize(config);

artyom.say("Seja bem-vindo. Como posso ajudar?");

var funcSaudadao = {
  indexes: ['Olá', 'Oi', 'Bom dia', 'Tudo bem'],
  action: function action(i) {
    if (i == 0 || i == 1) {
      artyom.sayRandom('Oi', 'Olá');
    } else if (i == 2) {
      artyom.say('Bom dia!', {
        onStart: function onStart() {
          artyom.fatality();
          artyom.dontObey();
        },
        onEnd: function onEnd() {
          artyom.intialize(config);
        }
      });
    } else if (i == 3) {
      artyom.say('Sou uma máquina, então sim');
    }
  }
};

var funcHoras = {
  indexes: ['Que horas são'],
  action: function action(i) {
    if (i == 0) {
      var data = new Date();
      var horas = data.getHours();
      var minutos = data.getMinutes();
      artyom.say('S\xE3o ' + horas + ' horas e ' + minutos + ' minutos');
    }
  }
};

var funcDia = {
  indexes: ['Que dia é hoje'],
  action: function action(i) {
    if (i == 0) {
      moment.locale('pt-br');
      var data = new Date();
      var diaSemana = moment(data).format('dddd');
      var dia = moment(data).format('LL');
      artyom.say('Hoje \xE9 ' + diaSemana + ', dia ' + dia);
    }
  }
};

var funcPagina = {
  indexes: ['Abra meu *'],
  smart: true,
  action: function action(i, str) {
    if (str == 'facebook' || str == 'Facebook') {
      artyom.say("Abrindo o Facebook");
      window.open('https://fb.com', '_blank');
    } else if (str == 'gmail' || str == 'Gmail') {
      artyom.say("Abrindo o Gmail");
      window.open('https://www.gmail.com', '_blank');
    } else if (str == 'twitter' || str == 'Twitter') {
      artyom.say("Abrindo o Twitter");
      window.open('https://www.twitter.com', '_blank');
    } else if (str == 'instagram' || str == 'Instagram') {
      artyom.say("Abrindo o Instagram");
      window.open('https://www.instagram.com', '_blank');
    } else {
      artyom.say('Não entendi qual página deseja abrir. Eu consigo abrir o Facebook, Instagram, Gmail e Twitter');
    }
  }
};

artyom.redirectRecognizedTextOutput(function (texto, final) {
  var span = document.querySelector("#texto");

  if (final) {
    span.innerHTML = texto;
  } else {
    span.innerHTML = '.';
  }
});

artyom.addCommands(funcSaudadao);
artyom.addCommands(funcHoras);
artyom.addCommands(funcDia);
artyom.addCommands(funcPagina);
