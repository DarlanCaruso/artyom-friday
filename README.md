# F.R.I.D.A.Y.

Projeto de reconhecimento de voz e ação com JavaScript utilizando a API [Artyom.js](https://github.com/sdkcarlos/artyom.js).

### Instalação

Baixe os arquivos do projeto, navegue até a pasta e execute o comando abaixo para instalar as depêndencias.

```sh
npm install
```

### Executando projeto

Depois de todas as depêndencias instaladas, execute o comando abaixo para executar o projeto.
É necessário que você tenha um microfone para testar o F.R.I.D.A.Y.

```sh
npm start
```

### SSL Certificate

É gerado uma simulação de um certificado SSL para acessar o microfone no navegador Chrome. Em caso de bloqueio de acesso basta ignora-lo.
Se houver erro em executar o comando *npm start*, seu SSL Key pode ter expirado, para isso basta executar o commando:

```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

E executar o projeto novamente. O novo Key SSL tem validade de 10 dias.