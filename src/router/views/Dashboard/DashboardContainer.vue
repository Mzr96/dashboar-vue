<template>
  <div>
    <div v-if="role === '0'" class="d-flex flex-row-reverse"
      ><DxButton
        type="default"
        :width="120"
        :font-size="40"
        text="ذخیره داشبورد"
        class="mb-2 "
        @click="saveHandler"
      />
    </div>
    <FiltersContainer
      :filters="allFilters"
      @remove-filter="removeFilterHandler"
    />
    <div class="row">
      <div
        v-for="(chart, index) in allCharts"
        :key="chart ? chart.chart.chartId : index"
        class="col-lg-6"
      >
        <DrawChart
          :role="role"
          :chart="chart"
          @remove-chart="removeChart"
          @single-click="singleClickHandler"
        />
      </div>
      <div v-if="role === '0'" class="col-lg-6">
        <NewChart @new-inputs="newInputsHandler" />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <CreateTable :data-input="tableData" />
      </div>
    </div>
  </div>
</template>
<script>
import Charts from './model/charts'
import NewChart from './NewChart/NewChart'
import DrawChart from './DrawChart/DrawChart'
import FiltersContainer from './Filter/FiltersContainer'
import CreateTable from './Table/CreateTable'
import Filter from './model/filter'
import DxButton from 'devextreme-vue/button'

export default {
  async created() {
    this.chartsContainer = new Charts()
    this.allCharts = this.chartsContainer.getCharts()
    await this.chartsContainer.retriveCharts()
    this.tableData = this.chartsContainer.getChartsData()
    this.filterContainer = new Filter()
    this.allFilters = this.filterContainer.getFilters()
  },
  components: { NewChart, DrawChart, DxButton, FiltersContainer, CreateTable },
  data() {
    return { allCharts: null, allFilters: [], tableData: null, role: '0' }
  },
  methods: {
    async newInputsHandler(inputs) {
      await this.chartsContainer.createChart(inputs)
      this.allCharts = this.chartsContainer.getCharts()
    },

    removeChart(id) {
      this.chartsContainer.removeChart(id)
    },
    singleClickHandler(filter) {
      if (this.filterContainer.isFilterExist(filter)) return
      this.filterContainer.addFilter(filter)
      this.chartsContainer.updateChartsData(this.allFilters)
      this.tableData = this.chartsContainer.getChartsData()
    },
    removeFilterHandler(val) {
      this.filterContainer.removeFilter(val)
      this.allFilters = this.filterContainer.getFilters()
      this.chartsContainer.updateChartsData(this.allFilters)
      this.tableData = this.chartsContainer.getChartsData()
    },
    saveHandler() {
      this.chartsContainer.storeCharts()
    },
  },
}
</script>
