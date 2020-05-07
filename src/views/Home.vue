<template>
  <div class="q-pa-md row items-start q-gutter-md home">
    <transition name="fade">
      <div
        class="card"
        @click="isFrontSide = !isFrontSide"
        :class="{ 'card-back_side': !isFrontSide }"
        v-touch-swipe.mouse.right.left="handleSwipe"
        v-show="!this.isTransitioning"
      >
        <div class="card__inner">
          <q-card class="card__side card__front">
            <q-card-section>
              <h2>{{ currentCard.word }}</h2>
            </q-card-section>
          </q-card>
          <q-card class="card__side card__back">
            <q-card-section>
              <div class="card__back__word">{{ currentCard.word }}:</div>
              <div class="card__back__translation">
                {{ currentCard.translation }}
              </div>
              <div class="card__back__notes-label">NOTES:</div>
              <div class="card__back__notes">{{ currentCard.notes }}</div>
              <div class="card__back__tags">
                <q-chip
                  outline
                  color="teal"
                  text-color="white"
                  v-for="tag in currentCard.tags"
                  :key="tag"
                  >{{ tag }}</q-chip
                >
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          id: 1,
          word: "home",
          translation: "hogar",
          notes: "Where people leave",
          tags: ["building"]
        },
        {
          id: 2,
          word: "dog",
          translation: "perro",
          notes: "My setellites",
          tags: ["animals"]
        },
        {
          id: 3,
          word: "orange",
          translation: "naranja",
          notes: "",
          tags: ["fruits", "food"]
        },
        {
          id: 4,
          word: "congratulations",
          translation: "felicitaciones",
          notes:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
          tags: ["talk"]
        }
      ],
      currentIndex: 3,
      isFrontSide: true,
      isTransitioning: false
    };
  },
  computed: {
    currentCard() {
      return this.cards[this.currentIndex];
    }
  },
  methods: {
    handleSwipe({ direction }) {
      this.isTransitioning = true;
      const vm = this;
      setTimeout(function() {
        vm.isFrontSide = true;
        if (direction === "rigth") {
          vm.currentIndex = vm.currentIndex
            ? vm.cards.length - 1
            : vm.currentIndex - 1;
        } else {
          vm.currentIndex = (vm.currentIndex + 1) % vm.cards.length;
        }
        vm.isTransitioning = false;
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  justify-content: space-evenly;
}

.card-back_side {
  .card__inner {
    transform: rotateY(180deg);
  }
}
.card {
  perspective: 1000px;
  margin-top: 5rem;
  width: 30rem;
  height: 20rem;
  user-select: none;

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.4s;
    transform-style: preserve-3d;
  }

  /* Position the front and back side */
  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  /* Style the front side (fallback if image is missing) */
  &__front {
    background-color: #99a0c9;
    color: black;
    .q-card__section {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      overflow-wrap: anywhere;
    }
  }

  /* Style the back side */
  &__back {
    background-color: #dbdbdb;
    color: back;
    transform: rotateY(180deg);
    text-align: left;
    .q-card__section {
      flex-direction: column;
      height: 100%;
    }
    &__word {
      font-size: 1.5rem;
    }
    &__translation {
      font-weight: bold;
      font-size: 2rem;
      text-align: center;
    }
    &__notes-label {
      font-weight: bold;
    }
    &__tags {
      position: absolute;
      bottom: 1rem;
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
