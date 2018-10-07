<template>
    <v-content>
        <h1 v-if="!can_access">{{message}}</h1>
        <h1 v-if="can_access">Here are what you can access</h1>
        <div id="placeHolder"></div>
    </v-content>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                can_access: false,
                message: null
            };
        },
        mounted() {
            axios.post(url('/machine/check'), {machine_id: machineId()})
                .then(response => {
                    if (response.data.status != 'success') {
                        this.message = response.data.message;
                    }
                    if (response.data.status == 'not_exists') {
                        let payload = window.auth_user.id + '__' + machineId();
                        let typeNumber = 4;
                        let errorCorrectionLevel = 'L';
                        let qr = qrcode(typeNumber, errorCorrectionLevel);
                        qr.addData(payload);
                        qr.make();
                        let img = qr.createImgTag();
                        window.temp = document.createElement('div');
                        temp.innerHTML = img;
                        let imgElement = temp.querySelector('img');
                        imgElement.width = '128';
                        imgElement.height = '128';
                        document.getElementById('placeHolder').appendChild(imgElement)
                    }
                });
        }
    }
</script>

<style scoped>

</style>