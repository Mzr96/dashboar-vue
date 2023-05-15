<template>
  <DxDataGrid
    id="gridContainer"
    :data-source="dataInput"
    :rtl-enabled="true"
    :show-borders="true"
    :allow-column-reordering="true"
    :allow-column-resizing="true"
    :column-auto-width="true"
  >
    <DxColumnChooser :enabled="true" title="انتخاب ستون" />
    <DxExport :enabled="true" :allow-export-selected-data="true" />

    <DxColumnFixing :enabled="true" />
    <DxColumn data-field="fullName" caption="نام"></DxColumn>
    <DxColumn data-field="branchName" caption="شعبه"></DxColumn>
    <DxColumn
      :format="{ type: 'fixedPoint', precision: 0 }"
      data-field="totalAssetValue"
      caption="ارزش روز دارایی"
    ></DxColumn>
    <DxColumn
      :format="{ type: 'fixedPoint', precision: 0 }"
      data-field="startingCredit"
      caption="اعتبار اولیه بورس سهام"
    ></DxColumn>
    <DxColumn
      :format="{ type: 'fixedPoint', precision: 0 }"
      data-field="comexCredit"
      caption="اعتبار اولیه بورس کالا"
      :visible="false"
    ></DxColumn>
    <DxColumn
      :format="{ type: 'fixedPoint', precision: 0 }"
      :rtl-enabled="false"
      data-field="interest"
      caption="کارمزد خلق شده"
    ></DxColumn>
    <DxColumn
      :format="{ type: 'fixedPoint', precision: 0 }"
      :rtl-enabled="false"
      data-field="remain"
      caption="مانده حساب"
    ></DxColumn>
    <DxColumn
      :format="{ type: 'fixedPoint', precision: 0 }"
      :rtl-enabled="false"
      data-field="marginAccountValue"
      caption="ارزش حساب تضمین"
    ></DxColumn>
    <DxColumn
      data-field="lastTransactionDate"
      caption="تاریخ آخرین درخواست"
      :visible="false"
    ></DxColumn>
    <DxColumn
      data-field="nationalCode"
      caption="کد ملی"
      :visible="false"
    ></DxColumn>
    <DxScrolling column-rendering-mode="virtual" />
    <DxPaging :page-size="15" />
  </DxDataGrid>
</template>

<script>
import 'devextreme/dist/css/dx.light.css'

import {
  DxDataGrid,
  DxColumn,
  DxExport,
  DxScrolling,
  DxPaging,
  DxColumnChooser,
  DxColumnFixing,
} from 'devextreme-vue/data-grid'

export default {
  props: {
    dataInput: {
      type: undefined,
    },
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxExport,
    DxScrolling,
    DxPaging,
    DxColumnChooser,
    DxColumnFixing,
  },
}
</script>

<style>
tr td:nth-child(6n) {
  direction: ltr;
}

#gridContainer {
  padding: 0rem;
  border: 1rem solid #fff;
}

.grid-btn {
  margin: 1rem;
  padding: 1rem;
  border: 1rem;
  color: red !important;
}
</style>
