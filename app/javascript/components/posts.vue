<template>
    <div v-if="is_index">
        <form>
            <input placeholder="Please input search substring here ..." type="text" v-model="searchString" />

            <ul>
                <li v-for="post in paginated(filteredPosts)">
                    <a :href="post.path" @click.stop.prevent="display_post(post.path)">
                        {{post.name}}

                    </a></li></ul>
        </form>
        <div>
            <paginate :click-handler="clickCallback" :page-count="pagesAmount" :items-limit="8" container-class="pagination" next-text="next" prev-text="prev" ref="paginator">
              <span slot="prevContent">
                Changed previous button
              </span>

                <span slot="nextContent">
                Changed next button
              </span>
            </paginate>
        </div>
    </div>
    <div v-else-if="!is_index">
        <div v-html="post_html">

        </div>
        <a @click.stop.prevent="return_back()">
          Back to post list
        </a>
    </div>

</template>

<script>

  import paginate from './paginate.vue'

  export default {
    components: {
       'paginate': paginate,
    },
    data: function() {
      return {
        posts: [],
        searchString: "",
        offset: 0,
        limit: 10,
        is_index: true,
        post_html: ""
      }
    },
//  created: function () {
//    console.log( '[clock] created' );
//    this.dt = new Date( Date.UTC( 2000, 0, 1, this.initHour, this.initMin - 1, 0 ) );
//    this.tick();
//    window.setInterval( this.tick, 60000 );
//  },
//    filters: {
//      uppercase(post){
//        return post.toUpperCase();
//      }
//    },
    methods: {
      return_back() {
        history.back();
      },
      display_post(path) {
        this.is_index = false;
        history.pushState({}, null, path);
        var that = this;
        $.ajax({
          url: path + '.json',
          success: function(res) {
            that.post_html = res.data;
            console.log(that.post_html);
            that.post_html
          }
        });

      },
      paginated(posts_array) {
        var shift = this.offset * this.limit;
        return posts_array.slice(shift, shift + this.limit)
      },

      clickCallback(pageNum) {
        this.offset = pageNum-1
      },
    },
    created: function() {
      var that = this;
      $.ajax({
        url: '/posts.json',
        success: function(res) {
          that.posts = res;
        }
      });
      this.$on('limit', function (val) {
        that.limit = Number(val);

      });
      window.onpopstate = function(e){
        that.is_index = true
      };
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
        this.offset = 0;
        return posts_array
      },
      pagesAmount(){
        return Math.ceil((this.filteredPosts || this.posts).length / this.limit)
      }


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