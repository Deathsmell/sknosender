const sender = require('./scripts/sknoreportsender.js');
const ejs = require('ejs');

let clients = [{name: 'Vasa', serial: '1111111'}, {name: 'Catya', serial: '9999999'}]
const filePath = `${__dirname}/templates/message.ejs`;

ejs.renderFile(filePath, {clients},{}).then(content => {
    sender.sendEmail(content)
})

