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
                        <summernote
                                v-validate="'required'"
                                name="post[body]"
                                :model="content"
                                @change="value => { content = value }"
                                :config="config"
                        ></summernote>

                        <p class="text-danger" v-if="errors.has('post_body')">{{ errors.first('post_body') }}</p>
                    </div>
                </div>
            </div>
            <button name="button" type="submit"  class="btn btn-default">Save</button>
        </form>
    </div>
</template>

<script>
  import select2 from './select2.vue'
  import VueSummernote from './summernote.vue'
//  require('summernote/dist/summernote.css')

export default {
    components:{
      'select2': select2,
      'summernote' : VueSummernote,
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
        default:  '{}'
      },
    },
  //<pre><code class="bash">TEXT</code></pre>
    data: function() {
//      var code_style = "" +
//        "code.ruby:before{background: url('/assets/languages/ruby.png') CENTER CENTER NO-REPEAT; content: url('/assets/1x16.png'); width:16px;} " +
//        "code{padding: 1px; padding-left: 4px; border: #AAA 1px solid; border-radius: 8px}"
//
//
//      var LanguagesArray = [
//        'codeblock', 'bash', 'yaml', 'javascript', 'coffeescript',
//        'css', 'json', 'erb', 'slim', 'haml', 'html', 'xml', 'ruby', 'sql'
//      ]
//
//      var language_formats = {}
//      var arrayLength = LanguagesArray.length
//      for (var i = 0; i < arrayLength; i++) {
//        language_formats[LanguagesArray[i]] = {inline: 'code', attributes: {class: LanguagesArray[i]}}
//      }
//      language_formats['pre'] = {block: 'pre'}

      return {
//        content: '',
        content: null,
        // ↓ It is what the configuration object looks like. ↓
        config: {
          height: 100,
          toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['gxcode']], // plugin config: summernote-ext-codewrapper
          ],
        },
//        options: {
//          width: '600',
//          content_style: code_style,
//          branding: false,
////          mode: "textareas",
//          force_br_newlines: false,
//          force_p_newlines: false,
//          forced_root_block: '',
//          menubar: 'edit view format',
//          formats: language_formats,
////          plugins : 'advlist autolink link image lists charmap print preview',
//          toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect',
//          toolbar2: LanguagesArray.join(' | '),
//
//          setup: function (editor) {
//            console.log(language_formats)
//            var arrayLength = LanguagesArray.length;
//            for (var i = 0; i < arrayLength; i++) {
//              var tmpLanguage = LanguagesArray[i]
//              editor.addButton(tmpLanguage, {
//                text: tmpLanguage,
//                icon: false,
//                onclick: function (e) {
////                  addButton(LanguagesArray[i]);
//                  tinymce.activeEditor.formatter.toggle(this.settings.text)
//
//                }
//              })
//            }
//          }
//        },
        post: '',
        csrf_token: undefined,
        categories_list: [],
      }
    },
    methods: {
      changed (editor, content) {
        this.post.post_body = content;
      },

      validate(event) {
        event.preventDefault();
        this.$validator.validateAll().then(result => {
          if (result) {
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
      this.post = JSON.parse(this.post_data);
      this.content = this.post.body;
    },
    computed: {

    }

  }
</script>

<style scoped>

</style>