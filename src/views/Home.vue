<template>
  <div class="home">
    <h1 class="home__title">Word cards</h1>
    <img
      class="home__chinchilla-logo"
      src="@/assets/chinchilla.svg"
      alt="logo_chinchilla"
    />
    <a href="/auth/google" class="home__google-login-link login-link">
      <q-btn
        class="home__login-button"
        color="primary"
        icon="mail"
        label="Login with Google"
      />
    </a>
    <a
      v-if="showNoopLogin"
      href="#"
      @click="noopLogin"
      class="home__noop-login-link login-link"
    >
      <q-btn
        class="home__login-button"
        color="primary"
        icon="account_box"
        label="Noop login"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: "Home",
  beforeCreate() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ name: "Cards" });
    }
  },
  computed: {
    showNoopLogin() {
      return process.env.NODE_ENV === "development";
    }
  },
  methods: {
    async noopLogin() {
      await this.$store.dispatch("noopLogin");
      this.$router.push({ name: "Cards" });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  &__title {
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  &__chinchilla-logo {
    max-height: 70vh;
    margin: 0 2rem 2rem 2rem;
  }

  .login-link {
    margin: 0.5rem auto;
  }

  &__login-button {
    min-width: 15rem;
  }
}
</style>
