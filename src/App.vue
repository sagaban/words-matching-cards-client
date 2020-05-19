<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-indigo-6">
        <q-btn
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

        <div>Para patatina</div>
      </q-toolbar>
    </q-header>

    <q-drawer
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
          label: "Home",
          caption: "Cards List",
          toRouteName: "Home"
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
    }
  },
  methods: {
    navigateTo(routeName) {
      if (this.$route.name !== routeName)
        this.$router.push({ name: routeName });
      else {
        this.leftDrawerOpen = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chinchilla-logo {
  bottom: 1rem;
  position: absolute;
}
</style>
