<script>
import axios from "axios";
import cheerio from "cheerio";
import ExcelUpload from './components/ExcelUpload.vue'
import Table from './components/Table.vue'

export default {
  components: {
    "build-table": Table
  },
  data() {
    return {
      excelData: [],
    };
  },

  methods: {
    
    getExcelData() {
      let url = "www.go.espn.com";

      axios({
        method: "get",
        url: url,
      }).then(function (res) {
        console.log(res.data);
        let html = res.data;
        let htmlLoad = cheerio.load(html);
        console.log({ htmlLoad });
      });
    },
  },

  created() {
    this.getExcelData();
  },
};
</script>



<template>
  <header>
    <div class="wrapper">Upload Excel Data</div>
  </header>
  <build-table/>
</template>
<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.blue {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
