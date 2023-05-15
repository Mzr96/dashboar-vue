<template>
  <div class="row">
    <div dir="rtl" class="col-lg-12">
      <b-card body-class="d-flex flex-row gap-3 test">
        <p v-if="filters.length === 0"
          >برای اعمال فیلتر بر روی بخش های نمودار کلیک کنید.</p
        >
        <FilterTag
          v-for="filter in filters"
          :key="filter.id"
          :filter="filter"
          class="ml-2"
          @remove-filter="removeFilter"
        />
      </b-card> </div
  ></div>
</template>
<script>
import FilterTag from './FilterTag.vue'
export default {
  components: { FilterTag },
  props: {
    filters: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeFilter(val) {
      this.$emit('remove-filter', val)
    },
  },
}
</script>
<style scoped>
.test {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 1rem;
}
</style>
