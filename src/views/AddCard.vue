<template>
  <div class="q-pa-md add-card">
    <h4>Add a new word</h4>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      ref="cardForm"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="word"
        label="Word to learn"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="translation"
        label="Word translation"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="notes"
        type="textarea"
        label="Notes"
        lazy-rules
      />

      <q-select
        use-input
        input-debounce="0"
        multiple
        use-chips
        @new-value="createTag"
        @filter="tagFilter"
        v-model="tags"
        :options="filteredOptions"
        label="Tags"
        ref="tagSelectInput"
      >
        <template v-slot:append v-if="showAddTagButton">
          <q-btn round dense flat icon="add" @click="addTagButtonHandler" />
        </template>
      </q-select>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "AddWord",
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await store.dispatch("fetchTags");
    next();
  },
  data() {
    return {
      word: null,
      translation: null,
      notes: null,
      tags: [],
      filteredOptions: [],
      showAddTagButton: false
    };
  },
  computed: {
    tagsArray() {
      return this.$store.getters.tagsArray;
    },
    tagsStringArray() {
      return this.tagsArray.map(tag => tag.name);
    }
  },
  methods: {
    tagFilter(val, update) {
      if (val === "") {
        this.showAddTagButton = false;

        update(() => {
          this.filteredOptions = this.tagsStringArray;
        });
        return;
      }
      this.showAddTagButton = true;

      update(() => {
        if (this.tagsStringArray && this.tagsStringArray.length) {
          const needle = val.toLowerCase();
          this.filteredOptions = this.tagsStringArray.filter(v =>
            v.toLowerCase().includes(needle)
          );
        }
      });
    },
    createTag(val, done = () => {}) {
      if (val.length > 0) {
        const tags = (this.tags || []).slice();
        val
          .split(/[,;|]+/)
          .map(v => v.trim())
          .filter(v => v.length > 0)
          .forEach(v => {
            if (!this.tagsStringArray.includes(v)) {
              this.$store.dispatch("saveNewTag", { name: v });
            }
            if (!tags.includes(v)) {
              tags.push(v);
            }
          });

        done(tags);
        this.tags = tags;
      }
    },
    addTagButtonHandler() {
      this.createTag(this.$refs.tagSelectInput.inputValue);
    },
    async onSubmit() {
      if (this.word && this.translation) {
        try {
          const tags = this.tagsArray
            .filter(t => this.tags.includes(t.name))
            .map(t => t.id);
          this.$store.dispatch("saveNewCard", {
            word: this.word,
            translation: this.translation,
            notes: this.notes,
            tags
          });
          this.onReset();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$w.notify({
          type: "warning",
          message: `'Word and Translation field are mandatory.`
        });
      }
    },

    onReset() {
      this.word = null;
      this.translation = null;
      this.notes = null;
      this.tags = [];
      this.$refs.cardForm.resetValidation();
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
