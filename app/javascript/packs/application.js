/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

console.log('Hello World from Webpacker');
// console.log("Webpack suuuuuucks!");
import Vue from 'vue/dist/vue.esm'
// import paginate from '../components/paginate.vue
// import vueTinymce from '@deveodk/vue-tinymce'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// import '@deveodk/vue-tinymce/dist/@deveodk/vue-tinymce.css'
// Vue.use(vueTinymce)
import posts from '../components/posts.vue'
import post_form from '../components/post_form.vue'

import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

var app = new Vue({
  el: '#app',
  components: {
    // 'paginate': paginate,
    'posts': posts,
    'post_form': post_form,
  },
  methods: {
    // clickCallback: function(pageNum) {
    //   posts.offset = pageNum
    // }
  }
});
// /tinymce/skins/lightgray/skin.min.css

