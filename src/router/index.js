import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/add-card",
    name: "AddCard",
    // route level code-splitting
    // this generates a separate chunk (add-card.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "add-card" */ "../views/AddCard.vue")
  },
  {
    path: "/tags",
    name: "Tags",
    component: () =>
      import(/* webpackChunkName: "add-card" */ "../views/Tags.vue")
  },
  {
    path: "/Resources",
    name: "Resources",
    component: () =>
      import(/* webpackChunkName: "resources" */ "../views/Resources.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
