<template>
  <DxPieChart
    id="pie"
    :data-source="chart.prepareDataSource()"
    palette="Bright"
    type="pie"
    resolve-label-overlapping="shift"
    @point-click="chartClicked"
  >
    <DxSeries argument-field="arg" value-field="val">
      <DxSmallValuesGrouping :top-count="5" group-name="سایرین" mode="topN" />
      <DxLabel :visible="true" :customize-text="formatText" position="columns">
        <DxConnector :visible="true" :width="0.5" />
      </DxLabel>
    </DxSeries>
    <DxLegend
      :visible="true"
      :column-count="3"
      orientation="horizontal"
      item-text-position="right"
      horizontal-alignment="center"
      vertical-alignment="bottom"
    />
    <DxTitle :text="chart.getChartTitle()">
      <DxSubtitle :text="chart.getChartSubtitle()" />
    </DxTitle>
  </DxPieChart>
</template>
<script>
import DxPieChart, {
  DxSeries,
  DxLegend,
  DxLabel,
  DxTitle,
  DxSubtitle,
  DxConnector,
  DxSmallValuesGrouping,
} from 'devextreme-vue/pie-chart'
export default {
  components: {
    DxPieChart,
    DxSeries,
    DxLegend,
    DxLabel,
    DxTitle,
    DxSubtitle,
    DxConnector,
    DxSmallValuesGrouping,
  },
  props: {
    chart: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatLabel(pointInfo) {
      return `${pointInfo.valueText} (${pointInfo.percentText})`
    },
    formatText(pointInfo) {
      return `${pointInfo.argumentText} (${pointInfo.value})`
    },

    chartClicked(e) {
      this.$emit('chart-clicked', e.target.argument)
    },
  },
}
</script>
