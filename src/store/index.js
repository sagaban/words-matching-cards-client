import Vue from "vue";
import Vuex from "vuex";
import TagService from "@/services/Tags";
import { Notify } from "quasar";

Vue.use(Vuex);

// TODO: Add pagination

export default new Vuex.Store({
  state: {
    tags: {},
    cards: {}
  },
  mutations: {
    SET_TAGS(state, tags) {
      tags.forEach(tag => Vue.set(state.tags, tag.id, tag));
    }
  },
  actions: {
    fetchTags({ commit }) {
      return TagService.getTags()
        .then(response => {
          commit("SET_TAGS", response.data);
        })
        .catch(error => {
          const notification = {
            type: "negative",
            message: "There was a problem fetching tags: " + error.message
          };
          Notify.create(notification);
        });
    },
    saveNewTag({ commit }, newTag) {
      return TagService.postTag(newTag)
        .then(response => {
          commit("SET_TAGS", [response.data]);
        })
        .catch(error => {
          const notification = {
            type: "negative",
            message: "There was a problem saving new tag: " + error.message
          };
          Notify.create(notification);
        });
    }
  },
  getters: {
    tagsArray: state => {
      return Object.keys(state.tags).map(key => state.tags[key]);
    }
  }
});
