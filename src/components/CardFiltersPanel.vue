<template>
  <div>
    <q-toggle
      :value="showLearnedWords"
      label="Show learned words"
      left-label
      @input="$emit('toggleLearned')"
    />
  </div>
</template>

<script>
export default {
  name: "CardFiltersPanel",
  props: {
    showLearnedWords: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
