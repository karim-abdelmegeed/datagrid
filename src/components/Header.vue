<template>
<span>
    {{title}}
    <button
        @click="hideColumn(field)"
        class="k-button k-primary"
        style="float: right;"
    >
      Hide
    </button>
    </span>
</template>
<script>

export default {
  props: {
    field: String,
    title: String,
    sortable: [Boolean, Object],
  },
  methods: {
    hideColumn: function(e){
      this.$emit('hideColumn', e);
    }
  }
}
</script>