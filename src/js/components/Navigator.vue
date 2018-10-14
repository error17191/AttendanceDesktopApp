<template>
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
</template>

<script>
    export default {
        name: "Navigator",
        data() {
            return {
                can_access: false,
                message: null,
                done: false,
                items: [
                    {title: 'Dashboard', icon: 'home'},
                    {title: 'stats', icon: 'info'}
                ],
                mini: true,
                right: null,
                drawer: true,
                user: null


            };
        },
        created() {
            this.user = auth_user;
            if(this.user.is_admin){
                this.items.push({title:'Monitor',icon:''});
                this.items.push({title:'Users',icon:''})
            }
            else{

            }

            console.log(auth_user);
        },

    }
</script>

<style scoped>

</style>