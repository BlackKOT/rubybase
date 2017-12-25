<template>
    <form>
        <input placeholder="Please input search substring here ..." type="text" v-model="searchString" />

        <ul>
            <li v-for="post in paginated(filteredPosts) ">
                <a v-bind:href="post.path">
                    {{post.name}}

                </a></li></ul>
    </form>
    <div>
        <paginate :click-handler="clickCallback" :page-count="10" container-class="pagination" next-text="next" prev-text="prev">
          <span slot="prevContent">
            Changed previous button
          </span>

            <span slot="nextContent">
            Changed next button
          </span>
        </paginate>
    </div>

</template>

<script>

//  const paginate = require('../components/paginate.vue');
  import paginate from './paginate.vue'

  export default {
    components: {
       'paginate': paginate,
    },
    data: function() {
      return {
        posts: [],
        searchString: "",
        offset: 1,
        limit: 10
      }
    },
//  created: function () {
//    console.log( '[clock] created' );
//    this.dt = new Date( Date.UTC( 2000, 0, 1, this.initHour, this.initMin - 1, 0 ) );
//    this.tick();
//    window.setInterval( this.tick, 60000 );
//  },
    filters: {
      uppercase(post){
        return post.toUpperCase();
      }
    },
    methods:{
      paginated(posts_array) {
        var shift = this.offset * this.limit;
        return posts_array.slice(shift, shift + this.limit)
      },

      clickCallback: function(pageNum) {
        posts.offset = pageNum
      }
    },
    created: function() {
      console.log('Creted!!!!!!');
      var that = this;
      $.ajax({
        url: '/posts.json',
        success: function(res) {
          that.posts = res;
        }
      });
//      true
    },
    computed: {
      filteredPosts: function () {
        var posts_array = this.posts,
          searchString = this.searchString;

        if(!searchString){
          return posts_array;
        }

        searchString = searchString.trim().toLowerCase();

        posts_array = posts_array.filter(function(item){
          if(item.name.toLowerCase().indexOf(searchString) !== -1){
            return item;
          }
        })


        return posts_array
      },

    },

//  methods: {
//    tick: function() {
//      console.log( '[clock] tick' );
//      this.dt.setUTCMinutes( this.dt.getUTCMinutes() + 1 );
//      this.hour = ( ( this.dt.getUTCHours() < 10 ) ? '0' : '' ) + this.dt.getUTCHours();
//      this.min = ( ( this.dt.getUTCMinutes() < 10 ) ? '0' : '' ) + this.dt.getUTCMinutes();
//    }
//  }
  };

</script>

<style scoped>
</style>