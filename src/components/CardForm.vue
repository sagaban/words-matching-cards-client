<template>
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
    <q-input filled v-model="notes" type="textarea" label="Notes" lazy-rules />

    <q-toggle v-model="learned" label="Have I learned this word?" left-label />

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
        v-if="!card"
        label="Reset"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>

<script>
export default {
  name: "CardForm",
  props: {
    tagsObject: {
      type: Object,
      required: true
    },
    card: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      word: null,
      translation: null,
      notes: null,
      learned: null,
      tags: [],
      filteredOptions: [],
      showAddTagButton: false
    };
  },
  created() {
    if (this.card) {
      this.word = this.card.word;
      this.translation = this.card.translation;
      this.notes = this.card.notes;
      this.learned = this.card.learned;
      this.tags = this.card.tags.map(t => this.tagsObject[t.id].name);
    }
  },
  computed: {
    tagsArray() {
      return this.$store.getters.tagsArray;
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
      this.$refs.tagSelectInput.inputValue = "";
    },
    onSubmit() {
      if (this.word && this.translation) {
        const tags = this.tagsArray
          .filter(t => this.tags.includes(t.name))
          .map(t => t.id);
        this.$emit("submit", {
          ...this.card,
          word: this.word,
          translation: this.translation,
          notes: this.notes,
          tags
        });
        if (!this.card) {
          this.onReset();
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

<style lang="scss" scoped></style>
