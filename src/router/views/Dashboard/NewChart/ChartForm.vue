<template>
  <b-form @submit.prevent="formSubmitHandler">
    <!-- Chart Title -->
    <b-form-group
      id="input-group-1"
      label-text-align="center"
      label-for="input-1"
    >
      <label for="input-1">عنوان نمودار</label>
      <b-form-input
        id="input-1"
        v-model="inputs.chartTitle"
        required
        type="text"
        placeholder="Sample 1"
      >
      </b-form-input>
    </b-form-group>
    <!-- Data Title -->
    <b-form-group id="input-group-2" label="نوع دیتا" label-for="input-group-2">
      <v-select
        id="input-group-2"
        v-model="inputs.datasetURI"
        label="label"
        :options="computeDatasetTitleOptions"
        :reduce="(label) => label.value"
      >
        <template slot="no-options">
          <div v-if="fetchingData">
            <b-spinner class="ml-1" small label="Small Spinning"></b-spinner>
            <span>در حال دریافت اطلاعات</span>
          </div>
          <div v-else>
            <span>خطا در برقراری ارتباط</span>
          </div>
        </template>
      </v-select>
    </b-form-group>
    <!-- Chart Type -->
    <b-form-group id="input-group-3" label-for="input-3" label="نوع نمودار">
      <b-form-radio-group
        id="radio-group-1"
        v-model="inputs.chartType"
        :options="chartTypeOptions"
        :aria-describedby="ariaDescribedby"
        name="chart-types"
      ></b-form-radio-group>
    </b-form-group>

    <!-- Groupe By -->
    <b-form-group
      id="input-group-4"
      label="گروه بندی براساس"
      label-for="input-4"
    >
      <v-select
        id="input-4"
        v-model="inputs.groupedBy_1"
        dir="rtl"
        :options="computeGroupedByOptions"
        :reduce="(label) => label.value"
      ></v-select>
    </b-form-group>
    <!-- Operation -->
    <b-form-group v-slot="{ ariaDescribedby }" label="نوع عملگر">
      <b-form-radio-group
        id="btn-radios-2"
        v-model="inputs.aggFunction"
        :options="chartAggFunctionOptions"
        class="radio-btns"
        :aria-describedby="ariaDescribedby"
        name="radios-btn-default"
        button-variant="outline-secondary"
      ></b-form-radio-group>
    </b-form-group>
    <!-- Operated -->
    <b-form-group id="input-group-6" label="نمایش بر اساس" label-for="input-6">
      <v-select
        id="input-6"
        v-model="inputs.operated"
        :disabled="inputs.aggFunction === '2'"
        dir="rtl"
        :options="computeOperatedOptions"
        :reduce="(label) => label.value"
      ></v-select>
    </b-form-group>

    <b-form-group
      id="input-group-7"
      label="گروه بندی براساس (سطح 2)"
      label-for="input-4"
    >
      <v-select
        id="input-7"
        v-model="inputs.groupedBy_2"
        :disabled="!isSecondLevelActive"
        dir="rtl"
        :options="computeGroupedByOptions"
        :reduce="(label) => label.value"
      ></v-select>
      <b-form-checkbox
        id="checkbox-1"
        v-model="isSecondLevelActive"
        class="mt-1"
        name="checkbox-1"
        :value="true"
        :unchecked-value="false"
      >
        فعال سازی سطح 2
      </b-form-checkbox>
    </b-form-group>

    <b-form-group
      id="input-group-8"
      label="گروه بندی براساس (سطح 3)"
      label-for="input-4"
    >
      <v-select
        id="input-8"
        v-model="inputs.groupedBy_3"
        :disabled="!isThirdLevelActive"
        dir="rtl"
        :options="computeGroupedByOptions"
        :reduce="(label) => label.value"
      ></v-select>
      <b-form-checkbox
        id="checkbox-2"
        v-model="isThirdLevelActive"
        class="mt-1"
        name="checkbox-2"
        :value="true"
        :unchecked-value="false"
      >
        فعال سازی سطح 3
      </b-form-checkbox>
    </b-form-group>

    <div class="mt-4">
      <b-button type="submit" variant="primary">ثبت</b-button>
      <b-button class="ml-2" variant="danger" @click="$emit('close-form')"
        >انصراف</b-button
      >
    </div>
  </b-form>
</template>
<script>
import Mapper from '../utils/mapper'
import vSelect from 'vue-select'
import axios from 'axios'
import 'vue-select/dist/vue-select.css'

export default {
  components: { vSelect },
  async created() {
    await this.fetchDatasetTitleOptions()
  },
  props: {
    defaultFormInput: {
      type: Object,
      required: false,
      default() {
        return {
          chartTitle: 'نمودار اعتبار اولیه',
          datasetURI: 'usersInfo',
          chartType: '1',
          groupedBy_1: 'branchName',
          groupedBy_2: 'lastTransactionDate',
          groupedBy_3: 'fullName',
          aggFunction: '2',
          operated: 'startingCredit',
          onEditMode: false,
          chartId: null,
        }
      },
    },
  },

  data() {
    return {
      chartTypeOptions: [
        { text: 'میله ای', value: '1' },
        { text: 'دایره ای', value: '2' },
        { text: 'دونات', value: '3' },
      ],
      chartAggFunctionOptions: [
        { text: 'مجموع', value: '1' },
        { text: 'تعداد', value: '2' },
      ],
      datasetTitle: [],
      inputs: { ...this.defaultFormInput },
      fetchingData: true,
      isSecondLevelActive: Boolean(this.defaultFormInput.groupedBy_2),
      isThirdLevelActive: Boolean(this.defaultFormInput.groupedBy_3),
    }
  },
  watch: {
    isSecondLevelActive(cur) {
      if (!cur) {
        this.inputs.groupedBy_2 = null
        this.inputs.groupedBy_3 = null
        this.isThirdLevelActive = false
      }
    },
    isThirdLevelActive(cur) {
      if (!cur) this.inputs.groupedBy_3 = null
    },
  },
  computed: {
    computeGroupedByOptions() {
      return Mapper.getStringTypeValue().map((label) => {
        return { label: label, value: Mapper.reverseMap(label) }
      })
    },
    computeOperatedOptions() {
      return Mapper.getNumericTypeValue().map((label) => {
        return { label: label, value: Mapper.reverseMap(label) }
      })
    },
    computeDatasetTitleOptions() {
      return this.datasetTitle.map((item) => {
        return { label: item.title, value: item.uri }
      })
    },
  },
  methods: {
    async fetchDatasetTitleOptions() {
      const apiURL = 'http://192.168.1.116:8000/api/v1/dashboard/dataset'
      try {
        const request = await axios.get(apiURL)
        this.datasetTitle = request.data
      } catch (err) {
        this.fetchingData = false
        alert('Problem in getting dataset titles.')
      }
    },
    formSubmitHandler(e) {
      e.preventDefault()
      this.$emit('new-inputs', this.inputs)
    },
  },
}
</script>
<style scoped></style>
