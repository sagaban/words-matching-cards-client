<template>
  <div class="q-pa-md add-card">
    <h4>Edit an existing card</h4>
    <card-form :tags-object="tags" :card="card" @submit="onSubmit" />
  </div>
</template>

<script>
import store from "@/store";
import CardForm from "@/components/CardForm";

export default {
  name: "EditCard",
  components: {
    CardForm
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await store.dispatch("fetchTags");
    await store.dispatch("fetchCard", routeTo.params.id);
    next();
  },
  computed: {
    tags() {
      return this.$store.state.tags;
    },
    card() {
      return this.$store.state.cards[this.id];
    }
  },
  methods: {
    async onSubmit(card) {
      try {
        await this.$store.dispatch("updateCard", card);
        window.history.back();
      } catch (error) {
        console.error("There was an error ");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-card {
  max-width: 30rem;
  margin: 0 auto;
}
</style>
