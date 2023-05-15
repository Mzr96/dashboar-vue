<template>
  <h4
    ><b-badge class="p-1" variant="info">
      {{ filter.val }}
      <span @click="removeFilter">
        <SvgIcon class="filter-tag__btn" type="mdi" :path="path" />
      </span> </b-badge
  ></h4>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiWindowClose } from '@mdi/js'
export default {
  components: {
    SvgIcon,
  },
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      path: mdiWindowClose,
    }
  },
  methods: {
    removeFilter() {
      console.log('remove')
      this.$emit('remove-filter', this.filter.val)
    },
  },
}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.filter-tag {
  font-family: sans-serif;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 2px 8px;
  border: 1px solid #ffa94d;
  background-color: #e67700;
  color: #fff;
  font-weight: 600;
  border-radius: 200px;
  font-size: 16px;
}

.filter-tag__btn {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

span {
  display: inline-block;
  cursor: pointer;
}
</style>
