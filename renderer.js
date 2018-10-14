const {machineIdSync} = require('node-machine-id');
const machine_id = machineIdSync();
// const qrcode = require('qrcode-generator');
//
// var typeNumber = 4;
// var errorCorrectionLevel = 'L';
// var qr = qrcode(typeNumber, errorCorrectionLevel);
// qr.addData('Hi!');
// qr.make();
// document.getElementById('placeHolder').innerHTML = qr.createImgTag();
//
// document.querySelector('#check').addEventListener('click',() => {
//     axios.post(url('/request_work_machine'), {machine_id : machineId })
//         .then(response => {
//
//         });
// });

//
// document.getElementById('signin').addEventListener('click', () => {
//     axios.post(url('api/login'), {
//
//     }).then(response => {
//             console.log(response.data);
//         })
// });

const fs = require('fs');
const p = require('path');

require(p.resolve('./env.js'));

global.makeFile = function () {
    fs.writeFileSync('example.txt', 'Hello');
};

global.url = function (path) {
    let url = env.api_url;
    if(path.startsWith('/')){
        url += path;
    }else{
        url += '/' + path
    }

    return url;
};

global.path = function (path) {
    let fullPath = p.resolve('./public/index.html');
    if(path.startsWith('/')){
        fullPath += path;
    }else{
        fullPath += '/' + path
    }

    return fullPath;
};

global.machineId = function () {
    return machine_id;
};