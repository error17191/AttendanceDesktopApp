<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                        v-model="email"
                                        prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                                <v-text-field
                                        v-model="password"
                                        prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="login" color="primary">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                email: null,
                password: null
            }
        },
        methods: {
            login(){
                axios.post(url('/api/login'),{email: this.email,password: this.password})
                    .then(response => {
                        localStorage.setItem('access_token',response.data.access_token);
                        window.access_token = response.data.access_token;
                        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
                        window.auth_user = response.data.user;
                        this.$router.push(path('/'));
                    });
            }
        }
    }
</script>

<style scoped>

</style>