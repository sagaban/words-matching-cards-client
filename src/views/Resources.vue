<template>
  <div>
    <h4 class="title">Resources</h4>
    <q-list bordered separator class="list">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="link" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <a href="https://vuejs.org/">Vue.js</a></q-item-section
        >
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="link" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <a href="https://quasar.dev/">Quasar</a></q-item-section
        >
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="link" color="grey-9" />
        </q-item-section>
        <q-item-section>
          <a href="https://es.vecteezy.com/vectores-gratis/chinchilla"
            >Chinchilla Vectores por Vecteezy</a
          ></q-item-section
        >
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
  margin: 1rem;
}
.list {
  margin: 1rem;
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
  }
}
</style>
