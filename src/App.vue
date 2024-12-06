<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <!-- <div id="app">
    <div id="nav" class="fixTopLeft">
      <router-link
        v-if="authenticated"
        to="/login"
        v-on:click="logout()"
        replace
        class="logoutButton"
        >Logout</router-link
      >
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div> -->
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      // authenticated: sessionStorage.Token !== undefined ? true : false,
    };
  },
  mounted() {
    // if (sessionStorage.Token) {
    //   this.$router.replace({ name: "chat" });
    // }
    // if (!this.authenticated) {
    //   this.$router.replace({ name: "timer" });
    // }
  },
  methods: {
    // setAuthenticated(status) {
    //   this.authenticated = status;
    // },
    // logout() {
    //   this.authenticated = false;
    //   sessionStorage.removeItem("Token");
    // },
  },
};
</script>

<style>
body {
  background-color: #f0f0f0;
}
h1 {
  padding: 0;
  margin-top: 0;
}
#app {
  width: 1024px;
  margin: auto;
}
.fixTopLeft {
  position: fixed;
  top: 30px;
  right: 59px;
}
.logoutButton {
  box-sizing: border-box;
  background-color: orangered;
  color: white;
  border-radius: 6px;
  padding: 17%;
}
</style>
