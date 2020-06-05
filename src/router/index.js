import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cards",
    name: "Cards",
    component: () =>
      import(/* webpackChunkName: "cards" */ "../views/Cards.vue")
  },
  {
    path: "/cards/new",
    name: "AddCard",
    // route level code-splitting
    // this generates a separate chunk (add-card.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "add-card" */ "../views/AddCard.vue")
  },
  {
    path: "/cards/:id",
    name: "EditCard",
    props: true,
    component: () =>
      import(/* webpackChunkName: "add-card" */ "../views/EditCard.vue")
  },
  {
    path: "/tags",
    name: "Tags",
    component: () =>
      import(/* webpackChunkName: "add-card" */ "../views/Tags.vue")
  },
  {
    path: "/resources",
    name: "Resources",
    component: () =>
      import(/* webpackChunkName: "resources" */ "../views/Resources.vue")
  },
  {
    path: "/words-list",
    name: "WordsList",
    component: () =>
      import(/* webpackChunkName: "words-list" */ "../views/WordsList.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = store.getters;
  if (!isLoggedIn) {
    //try to get the user from the stored cookie
    store.dispatch("getStoredUser");
  }
  if (to.name !== "Home" && !isLoggedIn) next({ name: "Home" });
  else if (to.name === "Home" && isLoggedIn) next({ name: "Cards" });
  else next();
});

export default router;
