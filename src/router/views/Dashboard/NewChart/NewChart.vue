<template>
  <b-card>
    <NewChartButton v-if="isFormHidden" @click.native="toggleForm" />
    <ChartForm
      v-else
      @new-inputs="newInputsHandler"
      @submit.native="toggleForm"
      @close-form="toggleForm"
    />
  </b-card>
</template>
<script>
import ChartForm from './ChartForm'
import NewChartButton from './NewChartButton'

export default {
  components: { ChartForm, NewChartButton },
  data() {
    return {
      isFormHidden: true,
    }
  },
  methods: {
    toggleForm() {
      this.isFormHidden = !this.isFormHidden
    },
    newInputsHandler(inputs) {
      this.$emit('new-inputs', inputs)
    },
  },
}
</script>
