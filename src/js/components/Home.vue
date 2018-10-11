<template>
    <v-app id="inspire">

        <Navigator></Navigator>

        <v-toolbar app></v-toolbar>

        <v-content>
            <v-container fluid>
                <h1 v-if="done">
                    Machine added successfully
                    <MainBoard></MainBoard>
                </h1>
                <div v-else>
                    <h2 class="text-md-center">{{message}}</h2>

                    <div v-if="can_access">
                        <MainBoard></MainBoard>
                    </div>


                    <div id="placeHolder" class="mt-5 ml-5"></div>
                </div>
            </v-container>
        </v-content>

        <v-footer app></v-footer>
    </v-app>

</template>

<script>
    import Navigator from "./Navigator";
    import MainBoard from "./MainBoard";

    export default {
        name: "Home",
        components: {Navigator,MainBoard},
        data() {
            return {
                can_access: false,
                message: null,
                done: false
            };
        },
        created() {
            this.user = auth_user;

        },
        mounted() {

            window.Echo.channel('test-event')
                .listen('TestEvent', (e) => {
                    this.done = true;
                });

            axios.post(url('/machine/check'), {machine_id: machineId()})
                .then(response => {
                    if (response.data.status != 'success') {
                        this.can_access=true;
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
                        imgElement.width = '256';
                        imgElement.height = '256';
                        document.getElementById('placeHolder').appendChild(imgElement)
                    }
                });
        }
    }
</script>

<style scoped>

</style>