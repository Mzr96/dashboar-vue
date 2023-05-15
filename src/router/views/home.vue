<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import DashboardContainer from './Dashboard/DashboardContainer.vue'
export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, DashboardContainer },
}
</script>

<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item"
                ><a href="javascript: void(0);">Adminto</a></li
              >
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
          <h4 class="page-title">داشبورد مدیر اعتبارات</h4>
        </div>
      </div>
    </div>
    <DashboardContainer />
  </Layout>
</template>
