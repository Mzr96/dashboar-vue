<template>
  <b-card class="container">
    <b-overlay
      v-if="chart === null"
      id="overlay-background"
      show
      variant="light"
      opacity="0.55"
      blur="2px"
      rounded="sm"
    />
    <BarChart
      v-else-if="chart.chart.chartType === '1'"
      :chart="chart"
      @chart-clicked="clickHandler"
    />
    <PieChart
      v-else-if="chart.chart.chartType === '2'"
      :chart="chart"
      @chart-clicked="clickHandler"
    />
    <DonutChart
      v-else-if="chart.chart.chartType === '3'"
      :chart="chart"
      @chart-clicked="clickHandler"
    />
    <div v-if="chart" class="right-btn-container">
      <DxButton
        :disabled="chart.chart.activeLevel === 1"
        icon="undo"
        @click="backHandler"
      />
      <DxButton icon="inserttable" @click="modalShow = !modalShow" />
    </div>
    <div v-if="chart && role === '0'" class="left-btn-container">
      <DxButton v-if="chart" icon="trash" @click="removeHandler" />
      <!-- <DxButton v-if="chart" icon="edit" @click="editHandler" /> -->
    </div>
    <b-modal
      v-if="chart"
      v-model="modalShow"
      size="xl"
      :hide-footer="true"
      title="جدول نمودار مربوطه"
    >
      <CreateTable :data-input="chart.localFiltering()" />
    </b-modal>
  </b-card>
</template>
<script>
import PieChart from './PieChart'
import BarChart from './BarChart'
import DonutChart from './DonutChart'
import DxButton from 'devextreme-vue/button'
import CreateTable from '../Table/CreateTable'
export default {
  components: {
    PieChart,
    BarChart,
    DonutChart,
    CreateTable,
    DxButton,
  },
  props: {
    chart: {
      type: Object,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isDouble: 0,
      modalShow: false,
    }
  },
  methods: {
    clickHandler(arg) {
      if (arg === 'سایرین') return
      this.isDouble++
      console.log(arg)
      console.log(this.chart.chart)
      setTimeout(() => {
        console.log(this.isDouble)
        if (this.isDouble === 1) this.singleClick(arg)
        if (this.isDouble === 2) this.chart.nextLevel(arg)
        this.isDouble = 0
      }, 300)
    },
    removeHandler() {
      this.$emit('remove-chart', this.chart.chart.chartId)
    },
    backHandler() {
      this.chart.previousLevel()
    },
    singleClick(arg) {
      const filter = {
        group: this.chart.chart[`groupedBy_${this.chart.chart.activeLevel}`],
        val: arg,
      }
      this.$emit('single-click', filter)
    },
    editHandler() {
      this.chart.toggleEditMode()
    },
  },
}
</script>
<style scoped>
.container {
  height: 480px;
}

.right-btn-container {
  position: absolute;
  top: 30px;
  right: 20px;
  display: flex;
  gap: 5px;
}

.left-btn-container {
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  gap: 5px;
}
</style>
