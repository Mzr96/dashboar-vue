import Chart from './chart'
import Data from './data'

import axios from 'axios'

// rename to dashboard or chartContainer
export default class Charts {
  #charts = []
  #data = new Data()

  async createChart(inputs) {
    // if (!this.#charts.findIndex((chart) => chart === null))
    this.#charts.push(null)
    try {
      const data = await this.#data.getData(inputs.datasetURI)
      const indexOfNull = this.#charts.findIndex((chart) => chart === null)
      const newChart = new Chart(inputs, data)
      this.#charts.splice(indexOfNull, 1, newChart)
    } catch (err) {
      alert(err)
    }
  }

  updateChartsData(filters) {
    this.#data.updateFilteredDataset(filters)
    this.#charts.forEach(
      (chart) =>
        (chart.chart.data = this.#data.getFilteredData(chart.chart.datasetURI))
    )
  }

  removeChart(chartId) {
    const selectedChartIndex = this.#charts.findIndex(
      (chart) => chart.chart.chartId === chartId
    )
    this.#charts.splice(selectedChartIndex, 1)
  }

  getCharts() {
    return this.#charts
  }

  createPlaceHolderForLazyLoading(length) {
    for (let i = 0; i < length; i++) {
      this.#charts.push(null)
    }
  }

  async retriveCharts() {
    const apiURL = 'http://192.168.1.116:8000/api/v1/dashboard/charts'
    try {
      const response = await axios.get(apiURL)
      // this.createPlaceHolderForLazyLoading(response.data.length)
      for (const chart of response.data) {
        console.log(chart)
        await this.createChart(chart)
      }
    } catch (err) {
      alert(err)
    }
  }

  prepareChartForDB() {
    const data = []
    this.getCharts().forEach((chart, index) => {
      data.push({
        chartTitle: chart.chart.chartTitle,
        datasetURI: chart.chart.datasetURI,
        chartType: chart.chart.chartType,
        groupedBy_1: chart.chart.groupedBy_1,
        groupedBy_2: chart.chart.groupedBy_2,
        groupedBy_3: chart.chart.groupedBy_3,
        aggFunction: chart.chart.aggFunction,
        operated: chart.chart.operated,
        orderNum: index,
      })
    })
    return data
  }

  async storeCharts() {
    const data = this.prepareChartForDB()
    const apiURL = 'http://192.168.1.116:8000/api/v1/dashboard/charts'
    try {
      const response = await axios.post(apiURL, data)
      if (response.statusText === 'OK') alert('Charts Saved.')
    } catch (err) {
      alert('Something happen in storing data.\nGo and find it!!')
    }
  }

  // Bad design !
  getChartsData() {
    return this.#data.getFilteredData()
  }
}
