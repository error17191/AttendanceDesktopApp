<template>
    <v-app id="inspire">

        <Navigator></Navigator>

        <v-toolbar app></v-toolbar>

        <v-content>
            <v-container fluid>
                <div v-if="view">
                    <v-layout v-if="view =='qrcode'" class="row align-center column">
                        <h1>Please ask admin to scan your machine QR</h1>
                        <div id="placeHolder" class="mt-5"></div>
                    </v-layout>
                    <MainBoard v-else></MainBoard>
                </div>
                <h1 v-if="done">
                    Machine added successfully
                </h1>
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
        components: {Navigator, MainBoard},
        data() {
            return {
                can_access: false,
                done: false,
                view: null
            };
        },
        created() {
            this.user = auth_user;

        },
        mounted() {

            window.Echo.channel('test-event')
                .listen('TestEvent', (e) => {
                    this.done = true;
                    this.view = 'board';
                });
            axios.get(url(`check/user/work/${this.user.id}`)).then(response => {
                if(response.data.work_anywhere.work_anywhere){
                    this.view = 'board';
                }
                else{
                    axios.post(url('/machine/check'), {machine_id: machineId()})
                        .then(response => {
                            if (response.data.status == 'success') {
                                this.view = 'board';
                            }
                            else {
                                this.view = 'qrcode';
                                setTimeout(() => {
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
                                    document.getElementById('placeHolder').appendChild(imgElement);
                                },0);
                            }
                        });
                }
            });


        }
    }
</script>

<style scoped>

</style>