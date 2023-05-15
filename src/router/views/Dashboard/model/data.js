import axios from 'axios'

export default class Data {
  #dataset = []
  #filteredDataset = []

  async getData(uri) {
    if (!this.#dataset.find((data) => data.uri === uri)) {
      await this._fetchData(uri)
    }
    return this.#filteredDataset[0].data
  }

  getFilteredData() {
    return this.#filteredDataset[0].data
  }

  updateFilteredDataset(filters) {
    this.#filteredDataset[0].data = [...this.#dataset[0].data]

    filters.forEach((filter) => {
      this.#filteredDataset[0].data = this.#filteredDataset[0].data.filter(
        (user) => user[filter.group] === filter.val
      )
    })
  }

  async _fetchData(uri) {
    const apiAddress = `http://192.168.1.116:8000/api/v1/dashboard/dataset/${uri}`
    try {
      const request = await axios.get(apiAddress)
      this.#dataset.push({ uri, data: request.data.result })
      this.#filteredDataset.push({ uri, data: [...this.#dataset[0].data] })
    } catch (err) {
      console.log(err)
    }
  }
}
