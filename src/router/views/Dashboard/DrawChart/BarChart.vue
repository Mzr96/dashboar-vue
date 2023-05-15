<template>
  <DxChart
    id="chart"
    palette="Soft"
    :data-source="chart.prepareDataSource()"
    :customize-point="chart.customizePoint"
    @point-click="chartClicked"
  >
    <DxCommonSeriesSettings
      :ignore-empty-points="true"
      argument-field="arg"
      value-field="val"
      type="bar"
      :name="chart.getChartTitle"
    />
    <DxTooltip
      :enabled="true"
      :shared="true"
      :customize-tooltip="customizeTooltip"
    />
    <DxSeriesTemplate name-field="arg" />
    <DxTitle :text="chart.getChartTitle()">
      <DxSubtitle :text="chart.getChartSubtitle()" />
    </DxTitle>
    <DxLegend :visible="false" />
  </DxChart>
</template>
<script>
import {
  DxChart,
  DxLegend,
  DxTitle,
  DxSubtitle,
  DxCommonSeriesSettings,
  DxSeriesTemplate,
  DxTooltip,
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxLegend,
    DxTitle,
    DxSubtitle,
    DxCommonSeriesSettings,
    DxSeriesTemplate,
    DxTooltip,
  },
  props: {
    chart: {
      type: Object,
      required: true,
    },
  },
  methods: {
    chartClicked(e) {
      this.$emit('chart-clicked', e.target.argument)
      console.log(e.target.argument)
    },
  },
}
</script>
