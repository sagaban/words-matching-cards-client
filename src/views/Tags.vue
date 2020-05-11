<template>
  <div class="q-pa-md tags">
    <q-list bordered>
      <q-item v-for="tag in tagsArray" :key="tag.id" class="tags__item">
        <q-item-section>{{ tag.name }}</q-item-section>
        <q-item-section avatar class="tags__icon-action" @click="editTag(tag)">
          <q-icon color="indigo-4" name="edit" />
        </q-item-section>
        <q-item-section
          avatar
          class="tags__icon-action"
          @click="deleteTag(tag.id)"
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
  name: "Tags",
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await store.dispatch("fetchTags");
    next();
  },
  computed: {
    tagsArray() {
      return this.$store.getters.tagsArray
        .slice()
        .sort((a, b) => (a.name > b.name ? (a.name < b.name ? 1 : 0) : -1));
    }
  },
  methods: {
    editTag(tag) {
      this.$q
        .dialog({
          title: "Write tag new value",
          prompt: {
            model: "",
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(name => {
          this.$store.dispatch("updateTag", { ...tag, name });
        });
    },
    deleteTag(tagId) {
      this.$q
        .dialog({
          title: "Delete",
          message: "Are you sure you want to delete this tag?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$store.dispatch("deleteTag", tagId);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  max-width: 30rem;
  margin: 0 auto;

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
