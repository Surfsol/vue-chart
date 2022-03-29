<script>
export default {
  name: "excelUpload",
  props: {},
  data() {
    return { rowData: [], category: "", categoryHeaders: [], body: [] };
  },
  methods: {
    uploadRows() {
      console.log('upload',{ body });
    },
    generateTable(event) {
      let inputData = event.target.value;
      let rows = inputData.split("\n");

      for (var y in rows) {
        var cells = rows[y].split("\t");
        var row = [];
        let rowObj = {};
        for (var x in cells) {
          row.push("<td>" + cells[x] + "</td>");
          if (y === "0") {
            this.categoryHeaders.push(cells[x]);
          } else {
            rowObj[this.categoryHeaders[x]] = cells[x];
          }
        }
        this.body.push(rowObj);
        this.rowData.push(row);
        this.category = this.categoryHeaders[0];
      }
    },
  },
};
</script>

<template>
  <span>Paste Excel Table:</span>
  <textarea
    v-model="table"
    placeholder="add multiple lines"
    @change="generateTable"
  ></textarea>
  <br />
  <tr v-for="item of body" :key="item">
    <td>{{ item }}</td>
  </tr>
  <div>Review category headers</div>
  <div>{{ this.categoryHeaders.length > 0 ? this.categoryHeaders : "" }}</div>
  <br />
  <p style="white-space: pre-line">{{ table }}</p>
  <br />
  <button id="upload" v-on:click="UploadRows">Upload</button>
</template>