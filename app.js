// Semantic UI Basic
$('.ui.dropdown').dropdown();

// App 
const botaoConfig = document.querySelector('#config');

function abrirModal() {
  $('.ui.modal')
    .modal('setting', 'transition', 'fade')
    .modal('setting', 'closable', false)
    .modal('show');
};

function salvarConfig() {
  console.log('Teste');
};

// Artyom
const artyom = new Artyom();

const config = {
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
  action: function (i) {
    if (i == 0 || i == 1) {
      artyom.sayRandom('Oi', 'Olá');
    } else if (i == 2) {
      artyom.say('Bom dia!', {
        onStart: function () {
          artyom.fatality();
          artyom.dontObey();
        },
        onEnd: function () {
          artyom.initialize(config);
        }
      });
    } else if (i == 3) {
      artyom.say('Sou uma máquina, então sim');
    }
  }
};

var funcHoras = {
  indexes: ['Que horas são'],
  action: function (i) {
    if (i == 0) {
      var data = new Date();
      var horas = data.getHours();
      var minutos = data.getMinutes();
      artyom.say(`São ${horas} horas e ${minutos} minutos`);
    }
  }
};

var funcDia = {
  indexes: ['Que dia é hoje'],
  action: function (i) {
    if (i == 0) {
      moment.locale('pt-br');
      var data = new Date();
      var diaSemana = moment(data).format('dddd');
      var dia = moment(data).format('LL');
      artyom.say(`Hoje é ${diaSemana}, dia ${dia}`);
    }
  }
};

var funcPagina = {
  indexes: ['Abra meu *'],
  smart: true,
  action: function (i, str) {
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
  var input = document.querySelector("#texto");

  if (final) {
    input.value = texto;
  } else {
    input.value = '.';
  }
});

artyom.addCommands(funcSaudadao);
artyom.addCommands(funcHoras);
artyom.addCommands(funcDia);
artyom.addCommands(funcPagina);