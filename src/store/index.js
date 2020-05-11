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
    },
    REMOVE_CARD(state, cardId) {
      Vue.delete(state.cards, cardId);
    },
    REMOVE_TAG(state, tagId) {
      Vue.delete(state.tags, tagId);
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
    }
  },
  getters: {
    tagsArray: state => {
      return Object.keys(state.tags).map(key => state.tags[key]);
    },
    cardsArray: state => {
      return Object.keys(state.cards).map(key => state.cards[key]);
    }
  }
});
