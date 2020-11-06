<template>
  <div>
    <div class="example-config">
      <button @click="restoreColumns" class="k-button">Restore hidden columns</button>
    </div>
    <grid
        :style="{height: '280px'}"
        :data-items="items"
        :columns="columns"
        @hidecolumn="hidecolumn">
      <template v-slot:myTemplate="{props}">
        <custom :field="props.field"
                :title="props.title"
                @hidecolumn="hidecolumn" />
      </template>
    </grid>
  </div>
</template>
<script>
import { Grid } from '@progress/kendo-vue-grid';
import Header from './Header';

export default {
  components: {
    'grid': Grid,
    custom: Header
  },
  data: function () {
    return {
      columns: [
        { field: 'ProductID', title:'ID',  headerCell: 'myTemplate'},
        { field: 'ProductName', title: 'Product Name', headerCell: 'myTemplate' },
        { field: 'UnitPrice', title: 'Unit Price',  headerCell: 'myTemplate' }
      ],
      items: [{
        "ProductID": 1,
        "ProductName": "Chai",
        "UnitPrice": 18.0000,
      },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19.0000,
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10.0000,
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22.0000,
        }]
    };
  },
  methods: {
    hidecolumn: function(field){
      this.columns.map(function(column){
        if(column.field===field){
          column.hidden = true;
        }
      })
    },
    restoreColumns: function(){
      this.columns.map(function(column){
        if(column.hidden){
          column.hidden = false;
        }
      })
    }
  }
};

</script>
