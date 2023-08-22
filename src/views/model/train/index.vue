<template>
  <PageWrapper :title="'对标模型: ' + model?.modelName" contentBackground>
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

    <div>
      <a-card title="模型信息" :bordered="false">
        <a-descriptions size="small" :column="2" bordered>
          <a-descriptions-item label="模型名称"> {{ model?.modelName }} </a-descriptions-item>
          <a-descriptions-item label="创建人"> {{ model?.createName }}</a-descriptions-item>
          <a-descriptions-item label="创建时间"> {{ model?.createTime }} </a-descriptions-item>
          <a-descriptions-item label="备注"> 暂无 </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <a-card title="建模进度" :bordered="false">
        <a-steps :current="1" progress-dot size="small">
          <a-step title="测点选择">
            <template #description>
              <div> {{ model?.createName }}</div>
              <p> {{ model?.createTime }}</p>
            </template>
          </a-step>
          <a-step title="模型训练">
            <template #description>
              <p>{{ model?.createTime }}</p>
            </template>
          </a-step>
          <a-step title="模型下装" />
          <a-step title="回算模型" />
        </a-steps>
      </a-card>
      <a-divider />
      <BasicTable @register="targetTable" />
      <BasicTable @register="boundaryTable" />
      <BasicTable @register="relationTable" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Descriptions, Steps, Tabs } from 'ant-design-vue';
  import { targetTableSchema, relationTableSchema, boundaryTableSchema } from './data';
  import { modelInfoApi } from '/@/api/benchmark/models';
  import { ModelInfo } from '/@/api/benchmark/model/models';

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
      const fetchModelInfo = async () => {
        const modelInfo = await modelInfoApi(id);
        console.log(modelInfo);
        return modelInfo;
      };
      const model = ref<ModelInfo | null>(null);
      onMounted(async () => {
        const info = await fetchModelInfo();
        model.value = info;
      });
      const targetTableData = computed(() => {
        return [model.value?.targetParameter || {}];
      });

      const relationTableData = computed(() => {
        return model.value?.relationParameter || [];
      });

      const boundaryTableData = computed(() => {
        return model.value?.boundaryParameter || [];
      });

      const [relationTable] = useTable({
        title: '相关参数',
        columns: relationTableSchema,
        pagination: false,
        dataSource: relationTableData,
        scroll: { y: 300 },
      });
      const [targetTable] = useTable({
        title: '目标参数',
        columns: targetTableSchema,
        pagination: false,
        dataSource: targetTableData,
        scroll: { y: 300 },
      });

      const [boundaryTable] = useTable({
        title: '边界参数',
        columns: boundaryTableSchema,
        pagination: false,
        dataSource: boundaryTableData,
        scroll: { y: 300 },
      });

      return {
        targetTable,
        relationTable,
        boundaryTable,
        model,
      };
    },
  });
</script>
