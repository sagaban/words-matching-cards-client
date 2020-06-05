<template>
  <q-layout view="lHh Lpr lFf" class="app">
    <q-header elevated>
      <q-toolbar class="bg-indigo-6">
        <q-btn
          v-if="isLoggedIn"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <div v-if="isLoggedIn">
          <span>{{ user.name }}</span>

          <q-btn flat round color="white" icon="cancel" @click="logOut" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isLoggedIn"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          v-for="item in navigationItems"
          :key="item.toRouteName"
          clickable
          @click="navigateTo(item.toRouteName)"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
            <q-item-label caption>{{ item.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <img
        class="chinchilla-logo"
        src="@/assets/chinchilla.svg"
        alt="logo_chinchilla"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-grey-5 text-black">
      <span class="footer-text">
        From
        <a href="//www.twitter.com/sagaban" target="_blank">@sagaban</a> to
        Patatina
      </span>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: false,
      navigationItems: [
        {
          icon: "home",
          label: "Cards",
          caption: "Cards List",
          toRouteName: "Cards"
        },
        {
          icon: "add",
          label: "AddCard",
          caption: "Add more cards",
          toRouteName: "AddCard"
        },
        {
          icon: "label",
          label: "Tags",
          caption: "Manage your tags",
          toRouteName: "Tags"
        },
        {
          icon: "format_align_left",
          label: "Words List",
          caption: "All stored words as a list",
          toRouteName: "WordsList"
        },
        {
          icon: "webhook",
          label: "Resources",
          caption: "Resources used in this app",
          toRouteName: "Resources"
        }
      ]
    };
  },
  computed: {
    title() {
      return this.$route.name
        ? this.$route.name.replace(/([A-Z])/g, " $1").trim()
        : "Word cards";
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    navigateTo(routeName) {
      if (this.$route.name !== routeName)
        this.$router.push({ name: routeName });
      else {
        this.leftDrawerOpen = false;
      }
    },
    logOut() {
      this.$q
        .dialog({
          title: "Log Out",
          message: "Are you sure you want log out?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$store.dispatch("logOut");
          this.$router.push({ name: "Home" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.app::v-deep {
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: #3f51b5;
  }
}

.chinchilla-logo {
  bottom: 1rem;
  position: absolute;
}
.footer-text {
  margin: 0.2rem 1rem;
}
</style>
