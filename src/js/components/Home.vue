<template>
    <v-app id="inspire">
        <v-navigation-drawer app
                             :mini-variant.sync="mini"
                             v-model="drawer"
                             hide-overlay
                             stateless>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{user.name}}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn
                                    icon
                                    @click.stop="mini = !mini"
                            >
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click=""
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app></v-toolbar>
        <v-content>
            <v-container fluid>
                <h1 v-if="done">
                    Machine Added Successfully
                </h1>
                <div v-else>
                    <h1>HOME</h1>
                    <h1 v-if="!can_access">{{message}}</h1>
                    <h1 v-if="can_access">Here are what you can access</h1>
                    <div id="placeHolder"></div>
                </div>
            </v-container>
        </v-content>
        <v-footer app></v-footer>
    </v-app>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                can_access: false,
                message: null,
                done: false,
                items:[
                    { title: 'Dashboard', icon: 'home' },
                    { title: 'stats', icon: 'info' }
                ],
                mini: true,
                right: null,
                drawer: true,
                user:null


            };
        },
        created(){
            this.user=auth_user;

        },
        mounted() {

            window.Echo.channel('test-event')
                .listen('TestEvent', (e) => {
                    this.done = true;
                });

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