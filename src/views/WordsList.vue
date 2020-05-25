<template>
  <div class="q-pa-md words-list">
    <span class="words-list__counter">
      There are {{ cardsArray.length }} word(s)</span
    >
    <q-list bordered>
      <q-item v-for="card in cardsArray" :key="card.id" class="cards__item">
        <q-item-section>{{ card.word }}</q-item-section>
        <q-item-section
          avatar
          class="words-list__icon-action"
          @click="editCard(card.id)"
        >
          <q-icon color="indigo-4" name="edit" />
        </q-item-section>
        <q-item-section
          avatar
          class="words-list__icon-action"
          @click="deleteCard(card.id)"
        >
          <q-icon color="red-4" name="delete" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "WordsList",
  async beforeRouteEnter(routeTo, routeFrom, next) {
    store.dispatch("fetchCards");
    next();
  },
  computed: {
    cardsArray() {
      return this.$store.getters.cardsArray
        .slice()
        .sort((a, b) => (a.name > b.name ? (a.name < b.name ? 1 : 0) : -1));
    }
  },
  methods: {
    editCard(cardId) {
      this.$router.push({ name: "EditCard", params: { id: `${cardId}` } });
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
          this.$store.dispatch("deleteCard", cardId);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.words-list {
  max-width: 30rem;
  margin: 0 auto;

  &__counter {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  &__item:nth-child(2n) {
    background-color: #e8eaf6;
  }

  &__icon-action {
    cursor: pointer;
    &:last-child {
      padding-left: 0;
      min-width: 2.5rem;
    }
  }
}
</style>
