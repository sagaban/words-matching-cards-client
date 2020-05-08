import Vue from "vue";
import Vuex from "vuex";
import TagService from "@/services/Tags";
import CardService from "@/services/Cards";
import { Notify, Loading } from "quasar";

Vue.use(Vuex);

// TODO: Add pagination

const errorHandler = (baseErrorMsg, error) => {
  if (error.response && error.response.data && error.response.data.errors) {
    error.response.data.errors.forEach(e => {
      const notification = {
        type: "negative",
        message: baseErrorMsg + ": " + e.message
      };
      Notify.create(notification);
    });
  } else {
    const notification = {
      type: "negative",
      message: baseErrorMsg + ": " + error.message
    };
    Notify.create(notification);
  }
};

export default new Vuex.Store({
  state: {
    tags: {},
    cards: {}
  },
  mutations: {
    SET_TAGS(state, tags) {
      tags.forEach(tag => Vue.set(state.tags, tag.id, tag));
    },
    SET_CARDS(state, cards) {
      cards.forEach(card => Vue.set(state.cards, card.id, card));
    }
  },
  actions: {
    fetchTags({ commit }) {
      Loading.show();
      return TagService.getTags()
        .then(response => {
          commit("SET_TAGS", response.data);
        })
        .catch(error => {
          errorHandler("There was a problem fetching tags", error);
        })
        .finally(() => Loading.hide());
    },
    saveNewTag({ commit }, newTag) {
      return TagService.postTag(newTag)
        .then(response => {
          commit("SET_TAGS", [response.data]);
        })
        .catch(error => {
          errorHandler("There was a problem saving new tag", error);
        });
    },
    saveNewCard({ commit }, newCard) {
      Loading.show();
      return CardService.postCard(newCard)
        .then(response => {
          commit("SET_CARDS", [response.data]);
          Notify.create({
            type: "positive",
            message: `Card successfully created.`
          });
        })
        .catch(error => {
          errorHandler("There was a problem saving new card", error);
        })
        .finally(() => Loading.hide());
    }
  },
  getters: {
    tagsArray: state => {
      return Object.keys(state.tags).map(key => state.tags[key]);
    }
  }
});
