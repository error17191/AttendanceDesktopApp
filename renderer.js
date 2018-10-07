// const {machineIdSync} = require('node-machine-id');
// const machineId = machineIdSync();
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


document.getElementById('signin').addEventListener('click', () => {
    axios.post(url('api/login'), {

    }).then(response => {
            console.log(response.data);
        })
});