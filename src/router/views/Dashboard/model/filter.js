export default class Filter {
  #filters = []

  // filter sample: {group:'branchName',val:'هویزه'}
  addFilter(filter) {
    if (!this.#filters.find((item) => item.val === filter.val))
      this.#filters.push(filter)
  }

  removeFilter(val) {
    this.#filters = this.#filters.filter((item) => item.val !== val)
  }

  isFilterExist(filter) {
    return this.#filters.find((item) => item.val === filter.val)
  }

  getFilters() {
    return this.#filters
  }
}
