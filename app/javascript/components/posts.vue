<template>
    <form>
        <input placeholder="Please input search substring here ..." type="text" v-model="searchString" />

        <ul>
            <li v-for="post in filteredPosts">
                <a v-bind:href="post.path">
                    {{post.name}}

                </a></li></ul></form>
</template>

<script>
  module.exports = {

    data: function() {
      return {
        posts: [],
        searchString: "",
      }
    },
//  created: function () {
//    console.log( '[clock] created' );
//    this.dt = new Date( Date.UTC( 2000, 0, 1, this.initHour, this.initMin - 1, 0 ) );
//    this.tick();
//    window.setInterval( this.tick, 60000 );
//  },

    created: function() {
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
      }
    }
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