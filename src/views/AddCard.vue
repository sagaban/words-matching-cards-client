<template>
  <div class="q-pa-md add-card">
    <h4>Add a new card</h4>
    <card-form :tags-object="tags" @submit="onSubmit" />
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
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await store.dispatch("fetchTags");
    next();
  },
  computed: {
    tags() {
      return this.$store.state.tags;
    }
  },
  methods: {
    onSubmit(card) {
      this.$store.dispatch("saveNewCard", card);
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
