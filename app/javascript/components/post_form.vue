<template>
    <div>
        <form id="post_form" :action="path" accept-charset="UTF-8" method="post" class="new_post" @submit.prevent="validate($event)" >

            <input v-if="mtd == 'put'" type="hidden" name="_method" value="put">
            <input name="utf8" value="✓" type="hidden">
            <input name="authenticity_token" :value="csrf_token" type="hidden">
            <div class="form-group row">
                <div class="col-xs-6">
                    <div>
                        <label for="post_category">Category</label>
                        <select2 :options="categories_list"
                                 :value="post.category_id"
                                 data-vv-name="category_id"
                                 v-validate="'required'"
                                 v-model="post.category_id"
                                 name="post[category_id]"
                                 id="post_category_id"
                                 placeholder="Select category" >
                        </select2>
                        <p class="text-danger" v-if="errors.has('category_id')">{{ errors.first('category_id') }}</p>
                    </div>
                    <div>
                        <label for="post_name">Name</label>
                        <input v-model="post.name" data-vv-name="post_name" v-validate="'required'" name="post[name]" id="post_name" type="text">
                        <p class="text-danger" v-if="errors.has('post_name')">{{ errors.first('post_name') }}</p>
                    </div>
                    <div>
                        <label for="post_body">Body</label>
                        <textarea v-model="post.body" data-vv-name="post_body" v-validate="'required'" name="post[body]" id="post_body" class="form-control tinymce"></textarea>
                        <p class="text-danger" v-if="errors.has('post_body')">{{ errors.first('post_body') }}</p>
                    </div>
                    tinymce_assets
                    tinymce
                </div>
            </div>
            <button name="button" type="submit"  class="btn btn-default">Save</button>
        </form>
    </div>
</template>

<script>

  import select2 from './select2.vue'

  export default {
    components:{
      'select2': select2,
    },
    props: {
      path: {
        type: String,
        required: true,
      },

      mtd: {
        type: String,
        default: ''
      },
      post_data: {
//        type: Object,
        default:  '{}'
      },
    },
    data: function() {
      return {
        post: '',
        csrf_token: undefined,
        categories_list: [],
      }
    },
    methods: {
      validate(event) {
        event.preventDefault();
        this.$validator.validateAll().then(result => {
          if (result) {
            console.log(document.querySelector('#post_form').method);
            document.querySelector('#post_form').submit();
            return true
//            alert('success');
          }
//          alert('failure');
          return false
        });
      },
    },
    created: function() {
      this.csrf_token = document.getElementsByName('csrf-token')[0].getAttribute('content');
      var that = this;
      $.ajax({
        url: '/categories.json',
        success: function(res) {
          that.categories_list = res;
        }
      });
      console.log(this.post);
      this.post = JSON.parse(this.post_data);
    },
    computed: {

    }

  }
</script>