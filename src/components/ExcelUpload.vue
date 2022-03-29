<script type="text/javascript">
export default {
  name: "excelUpload",
  props: {},
  methods: {
    UploadProcess(event) {
      //Reference the FileUpload element.
     // var fileUpload = document.getElementById("fileUpload");
     let fileUpload = event.target.files[0]
      console.log(fileUpload);
      //Validate whether File is valid Excel file.
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
      if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof FileReader != "undefined") {
          var reader = new FileReader();
          console.log({ reader });
          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
            reader.onload = function (e) {
              GetTableFromExcel(e.target.result);
            };
            reader.readAsBinaryString(fileUpload.files[0]);
          } else {
            //For IE Browser.
            reader.onload = function (e) {
              var data = "";
              var bytes = new Uint8Array(e.target.result);
              for (var i = 0; i < bytes.byteLength; i++) {
                data += String.fromCharCode(bytes[i]);
              }
              GetTableFromExcel(data);
            };
            reader.readAsArrayBuffer(fileUpload.files[0]);
          }
        } else {
          alert("This browser does not support HTML5.");
        }
      } else {
        alert("Please upload a valid Excel file.");
      }
    },
    GetTableFromExcel(data) {
      //Read the Excel File data in binary
      var workbook = XLSX.read(data, {
        type: "binary",
      });

      //get the name of First Sheet.
      var Sheet = workbook.SheetNames[0];

      //Read all rows from First Sheet into an JSON array.
      var excelRows = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[Sheet]
      );
      console.log({ excelRows });
      //Create a HTML Table element.
      var myTable = document.createElement("table");
      myTable.border = "1";

      //Add the header row.
      var row = myTable.insertRow(-1);

      //Add the header cells.
      var headerCell = document.createElement("TH");
      headerCell.innerHTML = "Id";
      row.appendChild(headerCell);

      headerCell = document.createElement("TH");
      headerCell.innerHTML = "Name";
      row.appendChild(headerCell);

      headerCell = document.createElement("TH");
      headerCell.innerHTML = "Country";
      row.appendChild(headerCell);

      headerCell = document.createElement("TH");
      headerCell.innerHTML = "Age";
      row.appendChild(headerCell);

      headerCell = document.createElement("TH");
      headerCell.innerHTML = "Date";
      row.appendChild(headerCell);

      headerCell = document.createElement("TH");
      headerCell.innerHTML = "Gender";
      row.appendChild(headerCell);

      //Add the data rows from Excel file.
      for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = myTable.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Id;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Name;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Country;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Age;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Date;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Gender;
      }

      var ExcelTable = document.getElementById("ExcelTable");
      ExcelTable.innerHTML = "";
      ExcelTable.appendChild(myTable);
    },
    previewFiles(event) {
      console.log(event.target.files);
    },
  },
};
</script>

<template>
  <input type="file" @change="previewFiles" multiple />
  <input type="file" id="fileUpload" @change="UploadProcess"/>
  <button id="upload" v-on:click="UploadProcess">Upload</button>
  <br />

  <div id="ExcelTable"></div>
</template>
