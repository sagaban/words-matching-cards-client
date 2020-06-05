<template>
  <div class="q-pa-md row items-start q-gutter-md home">
    <card-filters-panel
      :showLearnedWords="showLearnedWords"
      @toggleLearned="toggleLearned"
    />
    <div class="card-container" v-if="this.cardsArray.length">
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
import CardFiltersPanel from "@/components/CardFiltersPanel";

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
    WordCard,
    CardFiltersPanel
  },
  data() {
    return {
      currentIndex: 0,
      isTransitioning: false,
      showLearnedWords: true
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
      const { showLearnedWords } = this;
      return this.$store.getters.cardsArray.filter(
        card => showLearnedWords || !card.learned
      );
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
    },
    toggleLearned() {
      this.showLearnedWords = !this.showLearnedWords;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  justify-content: space-evenly;
  .card-container {
    max-width: 100%;
  }
  .no-cards-message {
    margin: 2rem 1rem;
    font-size: 2rem;
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
