<template>
  <div class="q-pa-md row items-start q-gutter-md home">
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
</template>

<script>
import store from "@/store";
import WordCard from "@/components/WordCard";

const DIRECTIONS = {
  RIGHT: "right",
  LEFT: "left"
};

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
      return this.cardsArray[this.currentIndex];
    },
    cardsArray() {
      return this.$store.getters.cardsArray;
    },
    tags() {
      return this.$store.state.tags;
    }
  },
  methods: {
    changeCard(direction) {
      this.isTransitioning = true;
      const vm = this;
      setTimeout(function() {
        if (direction === DIRECTIONS.RIGHT) {
          vm.currentIndex =
            vm.currentIndex === 0
              ? vm.cardsArray.length - 1
              : vm.currentIndex - 1;
        } else {
          vm.currentIndex = (vm.currentIndex + 1) % vm.cardsArray.length;
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
          this.$refs.wordCard.changeCardSide();
          if (this.currentIndex === this.cardsArray.length - 1) {
            this.currentIndex = this.currentIndex - 1;
          }
          this.$store.dispatch("deleteCard", cardId);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  justify-content: space-evenly;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
