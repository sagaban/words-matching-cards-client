<template>
  <div class="q-pa-md row items-start q-gutter-md home">
    <div v-if="this.cardsArray.length">
      <transition name="fade">
        <word-card
          v-show="!this.isTransitioning"
          :card="currentCard"
          :tags="tags"
          @changeCard="changeCard"
          @deleteCard="deleteCard"
          ref="wordCard"
        />
      </transition>
    </div>
    <div v-else>
      <span class="no-cards-message">
        There is not cards.
        <router-link :to="{ name: 'AddCard' }">Add them!</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import WordCard from "@/components/WordCard";

// const DIRECTIONS = {
//   RIGHT: "right",
//   LEFT: "left"
// };

export default {
  name: "Home",
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await Promise.all([
      store.dispatch("fetchTags"),
      store.dispatch("fetchCards")
    ]);
    next();
  },
  components: {
    WordCard
  },
  data() {
    return {
      currentIndex: 0,
      isTransitioning: false
    };
  },
  computed: {
    currentCard() {
      if (this.currentIndex < this.cardsArray.length) {
        return this.cardsArray[this.currentIndex];
      } else {
        return this.cardsArray[0];
      }
    },
    cardsArray() {
      return this.$store.getters.cardsArray;
    },
    tags() {
      return this.$store.state.tags;
    }
  },
  methods: {
    changeCard(/* direction */) {
      this.isTransitioning = true;
      this.$refs.wordCard.changeCardSide(true);
      const vm = this;
      setTimeout(function() {
        if (vm.cardsArray.length > 0) {
          let newIndex = vm.currentIndex;
          while (newIndex === vm.currentIndex) {
            newIndex = Math.round(Math.random() * (vm.cardsArray.length - 1));
          }
          vm.currentIndex = newIndex;
        } else {
          vm.currentIndex = 0;
        }
        vm.isTransitioning = false;
      }, 300);
    },
    deleteCard(cardId) {
      this.$q
        .dialog({
          title: "Delete",
          message: "Are you sure you want to delete this card?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.changeCard();
          this.$store.dispatch("deleteCard", cardId);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  justify-content: space-evenly;

  .no-cards-message {
    margin: 2rem 1rem;
    font-size: 2rem;
    a:link,
    a:visited,
    a:hover,
    a:active {
      text-decoration: none;
      color: #3f51b5;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
