import uniqid from 'uniqid'
import Mapper from '../utils/mapper'
import randomcolor from 'randomcolor'

export default class Chart {
  chart = {}
  constructor(inputs, data) {
    this.chart = {
      ...inputs,
      onEditMode: false,
      clickedArg_1: null,
      clickedArg_2: null,
      activeLevel: 1,
      chartId: uniqid(),
      data,
    }
  }

  toggleEditMode() {
    console.log('Edit')
    console.log(this.chart)
    this.chart.onEditMode = !this.chart.onEditMode
  }

  nextLevel(clickedArg) {
    // console.log(this.chart[`groupedBy_${this.chart.activeLevel + 1}`])
    if (this.chart[`groupedBy_${this.chart.activeLevel + 1}`]) {
      this.chart[`clickedArg_${this.chart.activeLevel}`] = clickedArg
      this.chart.activeLevel++
    }
  }

  previousLevel() {
    if (this.chart[`groupedBy_${this.chart.activeLevel - 1}`]) {
      this.chart.activeLevel -= 1
      this.chart[`clickedArg_${this.chart.activeLevel}`] = null
    }
  }

  getData() {
    return this.chart.data
  }

  setData(newData) {
    this.chart.data = newData
  }

  localFiltering() {
    if (!this.chart.clickedArg_1) return this.chart.data
    else if (this.chart.clickedArg_1 && !this.chart.clickedArg_2)
      return this.chart.data.filter(
        (user) => user[this.chart.groupedBy_1] === this.chart.clickedArg_1
      )
    else if (this.chart.clickedArg_1 && this.chart.clickedArg_2)
      return this.chart.data.filter(
        (user) =>
          user[this.chart.groupedBy_1] === this.chart.clickedArg_1 &&
          user[this.chart.groupedBy_2] === this.chart.clickedArg_2
      )
  }

  prepareDataSource() {
    const localData = this.localFiltering()
    if (this.chart.aggFunction === '1')
      return localData
        .reduce((result, user) => {
          const group = result.find(
            (item) =>
              item.arg ===
              user[this.chart[`groupedBy_${this.chart.activeLevel}`]]
          )
          group !== undefined
            ? (group.val += user[this.chart.operated])
            : result.push({
                arg: user[this.chart[`groupedBy_${this.chart.activeLevel}`]],
                val: user[this.chart.operated],
              })
          return result
        }, [])
        .sort((first, sec) => sec.val - first.val)

    if (this.chart.aggFunction === '2')
      return localData
        .reduce((result, user) => {
          const group = result.find(
            (item) =>
              item.arg ===
              user[this.chart[`groupedBy_${this.chart.activeLevel}`]]
          )
          group !== undefined
            ? (group.val += 1)
            : result.push({
                arg: user[this.chart[`groupedBy_${this.chart.activeLevel}`]],
                val: 1,
              })
          return result
        }, [])
        .sort((first, sec) => sec.val - first.val)
  }

  getChartSubtitle() {
    let subtitile = `بر حسب  ${Mapper.directMap(
      this.chart[`groupedBy_${this.chart.activeLevel}`]
    )} \n \n `
    if (this.chart.activeLevel >= 2)
      subtitile += `${Mapper.directMap(
        this.chart[`groupedBy_1`]
      )}: <span style="font-weight: 900;"> ${this.chart['clickedArg_1']}<span/>`
    if (this.chart.activeLevel === 3)
      subtitile += `<span style="font-weight: 400;"> > ${Mapper.directMap(
        this.chart[`groupedBy_2`]
      )}<span/>: <span style="font-weight:900;"> ${
        this.chart[`clickedArg_2`]
      }<span/>`
    return subtitile
  }

  getChartTitle() {
    return this.chart.chartTitle
  }

  customizePoint({ argument }) {
    return {
      color: randomcolor({ seed: argument, luminosity: 'dark' }),
      hoverStyle: { color: randomcolor({ seed: argument }) },
    }
  }
}
