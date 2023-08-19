<template>
  <PageWrapper title="动态对标：4号机组" contentBackground>
    <template #extra>
      <a-button> 回算 </a-button>
      <a-button> 下装 </a-button>
      <a-button type="primary"> 修改模型 </a-button>
    </template>

    <template #footer>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="详情" />
        <a-tab-pane key="2" tab="规则" />
      </a-tabs>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="模型名称"> 汽轮机电流模型 </a-descriptions-item>
        <a-descriptions-item label="描述"> 汽轮机电流模型，监测电流 </a-descriptions-item>
        <a-descriptions-item label="创建时间"> 2023-07-10 10:12:12</a-descriptions-item>
        <a-descriptions-item label="最近修改时间"> 2023-07-31 10:12:12 </a-descriptions-item>
        <a-descriptions-item label="备注"> 请于两个工作日内确认 </a-descriptions-item>
      </a-descriptions>
      <a-card title="建模进度" :bordered="false">
        <a-steps :current="1" progress-dot size="small">
          <a-step title="测点选择">
            <template #description>
              <div>王东南</div>
              <p>2023-7-12 12:32</p>
            </template>
          </a-step>
          <a-step title="边界调整">
            <template #description>
              <p>Chad</p>
            </template>
          </a-step>
          <a-step title="回算模型" />
          <a-step title="模型下装" />
        </a-steps>
      </a-card>
      <BasicTable @register="registerTimeTable" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Descriptions, Steps, Tabs } from 'ant-design-vue';
  import { refundTimeTableSchema, refundTimeTableData } from './data';

  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const route = useRoute();
      const id = route.params.id;
      console.log(id);
      const [registerTimeTable] = useTable({
        title: '相关参数',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });

      return {
        registerTimeTable,
      };
    },
  });
</script>
