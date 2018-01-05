<template>
    <div>
        <form id="new_post" :action="path" accept-charset="UTF-8" :method="method" class="new_post" @submit.prevent="validate" >
            <input name="utf8" value="✓" type="hidden">
            <input name="authenticity_token" :value="csrf_token" type="hidden">
            <div class="form-group row">
                <div class="col-xs-6">
                    <div>
                        <label for="post_category">Category</label>
                        <select2 :options="categories_list"
                                 data-vv-name="category_id"
                                 v-validate="'required'"
                                 v-model="category_id"
                                 name="post[category_id]"
                                 id="post_category_id"
                                 placeholder="Select category" >
                        </select2>
                        <p class="text-danger" v-if="errors.has('category_id')">{{ errors.first('category_id') }}</p>
                    </div>
                    <div>
                        <label for="post_name">Name</label>
                        <input v-model="post_name" data-vv-name="post_name" v-validate="'required'" name="post[name]" id="post_name" type="text">
                        <p class="text-danger" v-if="errors.has('post_name')">{{ errors.first('post_name') }}</p>
                    </div>
                    <div>
                        <label for="post_body">Body</label>
                        <textarea v-model="post_body" data-vv-name="post_body" v-validate="'required'" name="post[body]" id="post_body" class="form-control tinymce"></textarea>
                        <p class="text-danger" v-if="errors.has('post_body')">{{ errors.first('post_body') }}</p>
                    </div>
                    tinymce_assets
                    tinymce
                </div>
            </div>
            <button name="button" type="submit"  class="btn btn-default">Create Post</button>
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

      method: {
        type: String,
        required: true,
      },
    },
    data: function() {
      return {
        csrf_token: undefined,
        post_name: '',
        post_body: '',
        category_id: undefined,
        categories_list: [],
      }
    },
    methods: {
      validate() {
        this.$validator.validateAll().then(result => {
          if (result) {
            return alert('success');
          }

          alert('failure');
        })
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

    },
    computed: {

    }

  }
</script>