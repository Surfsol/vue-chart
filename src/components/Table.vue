<script>
export default {
  name: "excelUpload",
  props: {},
  data() {
    return { rowData: [] };
  },
  methods: {
    getInput(event) {
      console.log(event.target.value);
    },
    generateTable(event) {
      let inputData = event.target.value;
      console.log({ inputData });
      let rows = inputData.split("\n");
      console.log({ rows });

      for (var y of rows) {
        console.log({ y });
        var cells = y.split("\t");
        var row = [];
        for (var x in cells) {
          row.push("<td>" + cells[x] + "</td>");
        }
        this.rowData.push(row);
      }
      console.log( this.rowData);
      // Insert into DOM
      //$("#excel_table").html(table);

      var tblJSON = $("#excel_table tr")
        .get()
        .map(function (row) {
          return $(row)
            .find("td")
            .get()
            .map(function (cell) {
              return $(cell).html();
            });
        });
      tblJSON = JSON.stringify(tblJSON);

      $("#templateForm").append(
        '<input type="hidden" name="tableValue" value=\'' + tblJSON + "' /> "
      );
      $("#pricesSubmit").prop("disabled", false);
    },
  },
};
</script>

<template>
  <span>Multiline table is:</span>
  <p style="white-space: pre-line">{{ table }}</p>
  <br />
  <textarea
    v-model="table"
    placeholder="add multiple lines"
    @change="generateTable"
  ></textarea>
  <tr v-for="item of rowData" :key="item"> 
      <td>{{item}}</td>
</tr>
</template>

      // $( "#pricesSubmit" ).click(function() {
    //   $( "#templateForm" ).submit();
    // });