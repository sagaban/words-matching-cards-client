<template>
  <div
    class="card"
    @click="isFrontSide = !isFrontSide"
    :class="{ 'card-back_side': !isFrontSide }"
    v-touch-swipe.mouse.right.left="handleSwipe"
  >
    <div class="card__inner">
      <q-card class="card__side card__front">
        <q-card-section>
          <q-checkbox
            class="card__front__learned"
            left-label
            :value="card.learned"
            label="Learned"
            @input="toggleLearnedCard(card)"
          />

          {{ card.word }}
        </q-card-section>
      </q-card>
      <q-card class="card__side card__back">
        <q-card-section>
          <div class="card__back__edit" @click.stop="editCard(card.id)">
            <q-icon name="edit" />
          </div>
          <div class="card__back__delete" @click.stop="deleteCard(card.id)">
            <q-icon name="delete" />
          </div>
          <div class="card__back__word">{{ card.word }}:</div>
          <div class="card__back__translation">
            {{ card.translation }}
          </div>
          <div class="card__back__notes-label">NOTES:</div>
          <div class="card__back__notes">{{ card.notes }}</div>
          <div class="card__back__tags">
            <q-chip
              outline
              color="teal"
              text-color="white"
              v-for="tag in card.tags"
              :key="tag.id"
              >{{ tags[tag.id].name }}</q-chip
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordCard",
  props: {
    card: {
      type: Object,
      required: true
    },
    tags: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFrontSide: true
    };
  },
  methods: {
    handleSwipe({ direction }) {
      this.changeCardSide();
      this.$emit("changeCard", direction);
    },
    changeCardSide(toFrontSide) {
      this.isFrontSide = toFrontSide;
    },
    deleteCard(cardId) {
      this.$emit("deleteCard", cardId);
    },
    editCard(cardId) {
      this.$router.push({ name: "EditCard", params: { id: `${cardId}` } });
    },
    async toggleLearnedCard(card) {
      try {
        const updatedCard = { ...card, learned: !card.learned };
        await this.$store.dispatch("updateCard", updatedCard);
      } catch (error) {
        console.error("There was an error ");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
  max-width: 100%;
  font-size: 2.5rem;

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
    &__learned {
      position: absolute;
      right: 0.5rem;
      top: 0.25rem;
      font-size: 1rem;
      cursor: pointer;
    }
    background-color: #7986cb;
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
    background-color: #e0e0e0;
    color: back;
    transform: rotateY(180deg);
    text-align: left;
    .q-card__section {
      flex-direction: column;
      height: 100%;
    }
    &__delete {
      position: absolute;
      right: 1rem;
      font-size: 1.75rem;
      color: #ef5350;
      top: 0.5rem;
      cursor: pointer;
    }
    &__edit {
      position: absolute;
      right: 3rem;
      font-size: 1.75rem;
      color: #7986cb;
      top: 0.5rem;
      cursor: pointer;
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
      font-size: 1rem;
    }
    &__notes {
      font-size: 1rem;
    }
    &__tags {
      position: absolute;
      bottom: 1rem;
    }
  }
}
</style>
