<template>
  <div id="app">
    <div class="grid">

      <Navbar />

      <article id="view"><router-view /></article>

      <Sidebar />

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss">
@import "styles/app.scss";

aside.sidebar-left {
  grid-area: navbar;
  background: #222;
}
article#content {
  grid-area: view;
}
aside.sidebar-right {
  background: #fff;
  box-shadow: -1px 0px 3px rgba(159, 159, 159, 0.25);
}

#app > .grid {
  display: grid;
  grid-template-columns: 80px 1fr 315px;
  grid-template-areas: "navbar view sidebar";
  @include respond-to(m) {
    grid-template-columns: 1fr;
    grid-template-rows: 80px auto;
    grid-template-areas: "navbar" "view";
  }
}

#view {
  padding: 55px 32px 0 32px;
  background: #f6f8f9;
}

</style>
