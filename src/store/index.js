import Vue from "vue";
import Vuex from "vuex";
import TagService from "@/services/Tags";
import CardService from "@/services/Cards";
import { Notify, Loading } from "quasar";
import { JET_KEY_NAME } from "@/utils/constants";
import axios from "axios";

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
    cards: {},
    user: null
  },
  mutations: {
    SET_TAGS(state, tags) {
      tags.forEach(tag => Vue.set(state.tags, tag.id, tag));
    },
    SET_CARDS(state, cards) {
      cards.forEach(card => Vue.set(state.cards, card.id, card));
    },
    REMOVE_CARD(state, cardId) {
      Vue.delete(state.cards, cardId);
    },
    REMOVE_TAG(state, tagId) {
      Vue.delete(state.tags, tagId);
    },
    SET_USER(state, user) {
      state.user = user;
    },
    REMOVE_USER(state) {
      state.user = null;
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
    fetchCards({ commit }) {
      Loading.show();
      return CardService.getCards()
        .then(response => {
          commit("SET_CARDS", response.data);
        })
        .catch(error => {
          errorHandler("There was a problem fetching cards", error);
        })
        .finally(() => Loading.hide());
    },
    fetchCard({ commit }, cardId) {
      Loading.show();
      return CardService.getCard(cardId)
        .then(response => {
          commit("SET_CARDS", [response.data]);
        })
        .catch(error => {
          errorHandler("There was a problem fetching a card", error);
        })
        .finally(() => Loading.hide());
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
    },
    updateCard({ commit }, card) {
      Loading.show();
      return CardService.putCard(card)
        .then(() => {
          commit("SET_CARDS", [card]);
          Notify.create({
            type: "positive",
            message: `Card successfully updated.`
          });
        })
        .catch(error => {
          errorHandler("There was a problem saving new card", error);
        })
        .finally(() => Loading.hide());
    },
    deleteCard({ commit }, cardId) {
      Loading.show();
      return CardService.deleteCard(cardId)
        .then(() => {
          commit("REMOVE_CARD", cardId);
          Notify.create({
            type: "positive",
            message: `Card successfully deleted.`
          });
        })
        .catch(error => {
          errorHandler("There was a problem deleting the card", error);
        })
        .finally(() => Loading.hide());
    },
    updateTag({ commit }, tag) {
      return TagService.putTag(tag)
        .then(() => {
          Notify.create({
            type: "positive",
            message: `Tag updated.`
          });
          commit("SET_TAGS", [tag]);
        })
        .catch(error => {
          errorHandler("There was a problem updating the tag", error);
        });
    },
    deleteTag({ commit }, tagId) {
      Loading.show();
      return TagService.deleteTag(tagId)
        .then(() => {
          commit("REMOVE_TAG", tagId);
          Notify.create({
            type: "positive",
            message: `Tag successfully deleted.`
          });
        })
        .catch(error => {
          errorHandler("There was a problem deleting the tag", error);
        })
        .finally(() => Loading.hide());
    },
    async noopLogin({ dispatch }) {
      try {
        const response = await axios.get("http://localhost:3000/auth/noop");
        Vue.$cookies.set(JET_KEY_NAME, response.data);
        dispatch("getStoredUser");
        return true;
      } catch (error) {
        console.error(error);
      }
    },
    getStoredUser({ commit }) {
      const payload = Vue.$jwt.decode();
      if (payload) {
        commit("SET_USER", payload.data);
      }
    },
    logOut({ commit }) {
      Vue.$cookies.remove(JET_KEY_NAME);
      commit("REMOVE_USER");
    }
  },
  getters: {
    tagsArray: state => {
      return Object.keys(state.tags).map(key => state.tags[key]);
    },
    cardsArray: state => {
      return Object.keys(state.cards).map(key => state.cards[key]);
    },
    isLoggedIn: state => {
      return !!state.user;
    }
  }
});
