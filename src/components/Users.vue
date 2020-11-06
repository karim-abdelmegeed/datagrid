<template>
  <div class="datatable">
    <div class="actions">
      <button @click="exportExcel" class="btn btn-primary">Export Excel</button>
      <button @click="exportPdf" class="btn btn-danger">Export PDF</button>
    </div>
    <div>
      <pdfexport ref="gridPdfExport">
        <Grid ref="grid"
              :style="{height: '400px'}"
              :sortable=true
              :filterable="true"
              :filter="filter"
              :sort="sort"
              :data-items="result"
              :edit-field="'inEdit'"
              :selected-field="selectedField"
              :columns="columns"
              @hideColumn="hideColumn"
              @rowclick="rowClick"
              @itemchange="itemChange"
              @sortchange="sortChangeHandler"
              @selectionchange="onSelectionChange"
              @headerselectionchange="onHeaderSelectionChange"
              @filterchange="filterChange"
        >
          <template v-slot:myTemplate="{props}">
            <custom :field="props.field"
                    :title="props.title"
                    @hideColumn="hideColumn"/>
          </template>
        </Grid>
      </pdfexport>
    </div>
  </div>
</template>
<script>
import {Grid} from '@progress/kendo-vue-grid';
import {filterBy, orderBy} from '@progress/kendo-data-query';
import {saveExcel} from '@progress/kendo-vue-excel-export';
import {GridPdfExport} from '@progress/kendo-vue-pdf';
import Header from "@/components/Header";
import data from "../dataset/dataset"

export default {
  components: {
    Grid,
    custom: Header,
    'pdfexport': GridPdfExport
  },
  data: function () {
    return {
      updatedData: [],
      filter: {
        logic: "and",
        filters: []
      },
      editID: null,
      selectedField: 'selected',
      expandedItems: [],
      sort: [{"field": "id", dir: "desc"}],
      staticColumns: [
        {field: 'id', editable: false, title: 'ID', filterable: false},
        {field: 'name', title: 'Name', headerCell: 'myTemplate'},
        {field: 'email', title: 'Email', headerCell: 'myTemplate'},
        {field: 'salary', title: 'Salary', headerCell: 'myTemplate'},
        {field: 'mobile', title: 'Mobile', headerCell: 'myTemplate'},
        {
          field: 'birth',
          editor: 'date',
          title: 'Birth Date',
          format: '{0:d}',
          headerCell: 'myTemplate',
          filter: 'date'
        },
      ],
      gridData: data.map(item => {
        return {...item, selected: false}
      }),

    };
  },
  computed: {
    result: {
      get: function () {
        this.gridData.map(
            (item) => Object.assign({inEdit: item.id === this.editID}, item));
        return orderBy(filterBy(this.gridData, this.filter), this.sort)
      },
      set: function () {

      }
    },
    columns() {
      return [
        {field: 'selected', width: '50px', headerSelectionValue: this.areAllSelected},
        ...this.staticColumns
      ]
    },
    areAllSelected() {
      return this.result.findIndex(item => item.selected === false) === -1;
    },
  },
  methods: {
    itemChange: function (e) {
      const data = this.result.slice();
      const index = data.findIndex(d => d.id === e.dataItem.id);
      data[index] = {...data[index], [e.field]: e.value};
      this.result = data;
      if (e.dataItem) {
        e.dataItem[e.field] = e.value;
      }
    },
    rowClick: function (e) {
      this.editID = e.dataItem.id;
      e.dataItem.inEdit = true;
      e.dataItem[this.selectedField] = !e.dataItem[this.selectedField];

    },
    sortChangeHandler: function (e) {
      this.sort = e.sort;
    },
    hideColumn: function (field) {
      this.staticColumns.map(function (column) {
        if (column.field === field) {
          column.hidden = true;
        }
      })
    },
    exportExcel() {
      saveExcel({
        data: this.result,
        fileName: "users.xlsx",
        columns: [
          {field: 'id'},
          {field: 'name', title: 'User Name'},
          {field: 'email', title: 'Email'},
          {field: 'birth', title: 'Birth Date'},
          {field: 'mobile', title: 'Mobile'},
          {field: 'salary', title: 'Salary'},
        ]
      });
    },
    exportPdf: function () {
      (this.$refs.gridPdfExport).save(this.result);
    },
    onHeaderSelectionChange(event) {
      let checked = event.event.target.checked;
      this.result = this.result.map((item) => {
        return {...item, selected: checked}
      });
    },
    onSelectionChange(event) {
      event.dataItem[this.selectedField] = !event.dataItem[this.selectedField];
    },
    filterChange: function (ev) {
      this.filter = ev.filter;
    }
  }
};

</script>

<style>
.datatable {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.actions {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-around;
}
</style>