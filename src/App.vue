<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Learning words
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
          icon: "school",
          label: "Home",
          caption: "Cards List",
          toRouteName: "Home"
        },
        {
          icon: "code",
          label: "AddCard",
          caption: "Add more cards",
          toRouteName: "AddCard"
        },
        {
          icon: "chat",
          label: "Tags",
          caption: "Manage your tags",
          toRouteName: "Tags"
        }
      ]
    };
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

<style></style>
