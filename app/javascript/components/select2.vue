<template>
    <select class="select2-enable">
        <slot></slot>
    </select>
</template>

<script>
  import $ from 'jquery';
  import 'select2';
  // globally assign select2 fn to $ element
//  require('select2/dist/css/select1.css');
//  require('select2/dist/css/select2.css');
  import 'select2/dist/css/select2.css';

  export default {
    props: {
      options: {},
      value: {},
      placeholder: {
        default: false
      },
    },
    mounted: function () {
      var vm = this;
      $(this.$el).ready(() => {
        $(this.$el)
        // init select2
          .select2({data: this.options, placeholder: vm.placeholder})
          .val(this.value)
          .trigger('change')
          // emit event on change.
          .on('change', function () {
            vm.$emit('input', this.value)
          })
      })
    },
    watch: {
      value: function (value) {
        // update value
        $(this.$el).val(value)
      },
      options: function (options) {
        // update options
        $(this.$el).empty().select2({ data: options })
      }
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  }

</script>

<style>
    .select2 {
        min-width: 200px;
    }
</style>