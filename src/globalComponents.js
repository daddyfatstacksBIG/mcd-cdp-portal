import Vue from "vue";

const sharedProps = { inline: Boolean, padLeft: String };
const sharedMixin = {
  computed: {
    styleInline() {
      return {
        display: this.inline ? 'inline' : 'block',
        paddingLeft: this.padLeft
      }
    }
  }
};

Vue.component('p1', {
  mixins: [sharedMixin],
  props: sharedProps,
  template: '<div class="p1" :style="styleInline"><slot /></div>'
});
Vue.component('p2', {
  mixins: [sharedMixin],
  props: sharedProps,
  template: '<div class="p2" :style="styleInline"><slot /></div>'
});
Vue.component('p3', {
  mixins: [sharedMixin],
  props: sharedProps,
  template: '<div class="p3" :style="styleInline"><slot /></div>'
});
Vue.component('p4', {
  mixins: [sharedMixin],
  props: sharedProps,
  template: '<div class="p4" :style="styleInline"><slot /></div>'
});
Vue.component('p5', {
  mixins: [sharedMixin],
  props: sharedProps,
  template: '<div class="p5" :style="styleInline"><slot /></div>'
});
Vue.component('p6', {
  mixins: [sharedMixin],
  props: sharedProps,
  template: '<div class="p6" :style="styleInline"><slot /></div>'
});
