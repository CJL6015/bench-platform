<template>
  <PageWrapper contentBackground>
    <template #footer>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="参数配置" />
        <a-tab-pane key="2" tab="数据管理" />
        <a-tab-pane key="3" tab="模型训练" />
        <a-tab-pane key="4" tab="模型评估" />
      </a-tabs>
    </template>
    <div v-show="activeKey === '1'">
      <a-card title="模型信息" :bordered="false">
        <template #extra>
          <a-button> 下装 </a-button>
          <a-button type="primary" style="margin-left: 6px"> 修改模型 </a-button>
        </template>
        <a-descriptions size="small" :column="2" bordered>
          <a-descriptions-item label="模型名称"> {{ model?.modelName }} </a-descriptions-item>
          <a-descriptions-item label="创建人"> {{ model?.createName }}</a-descriptions-item>
          <a-descriptions-item label="创建时间"> {{ model?.createTime }} </a-descriptions-item>
          <a-descriptions-item label="备注"> 暂无 </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <a-card title="建模进度" :bordered="false">
        <a-steps :current="1" progress-dot size="small">
          <a-step title="参数配置">
            <template #description>
              <div> {{ model?.createName }}</div>
              <p> {{ model?.createTime }}</p>
            </template>
          </a-step>
          <a-step title="生成数据">
            <template #description>
              <p>{{ model?.createTime }}</p>
            </template>
          </a-step>
          <a-step title="训练模型" />
          <a-step title="评估完成" />
        </a-steps>
      </a-card>
      <a-divider />
      <a-card title="目标参数" :bordered="false"><BasicTable @register="targetTable" /></a-card>
      <a-card title="相关参数" :bordered="false"><BasicTable @register="boundaryTable" /></a-card>
      <a-card title="边界参数" :bordered="false"><BasicTable @register="relationTable" /></a-card>
    </div>
    <div v-show="activeKey === '2'">
      <a-card title="模型数据">
        <template #extra>
          <a-button> 回算 </a-button>
        </template>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            ref="chartRef1"
            class="border border-gray-400"
            style="width: 100%; height: 500px"
          ></div>
          <div
            ref="chartRef2"
            class="border border-gray-400"
            style="width: 100%; height: 500px"
          ></div>
        </div>
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, computed, watch, nextTick } from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Descriptions, Steps, Tabs } from 'ant-design-vue';
  import { targetTableSchema, relationTableSchema, boundaryTableSchema } from './data';
  import { modelInfoApi } from '/@/api/benchmark/models';
  import { ModelInfo } from '/@/api/benchmark/model/models';
  import { useECharts } from '/@/hooks/web/useECharts';

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
        columns: relationTableSchema,
        pagination: false,
        dataSource: relationTableData,
        scroll: { y: 300 },
      });
      const [targetTable] = useTable({
        columns: targetTableSchema,
        pagination: false,
        dataSource: targetTableData,
        scroll: { y: 300 },
      });

      const [boundaryTable] = useTable({
        columns: boundaryTableSchema,
        pagination: false,
        dataSource: boundaryTableData,
        scroll: { y: 300 },
      });

      const activeKey = ref('1');

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1, resize: resize1 } = useECharts(
        chartRef1 as Ref<HTMLDivElement>,
      );
      const { setOptions: setOptions2, resize: resize2 } = useECharts(
        chartRef2 as Ref<HTMLDivElement>,
      );
      watch(activeKey, (newValue, _) => {
        if (newValue === '2') {
          console.log(activeKey);
          nextTick(() => {
            resize1();
            resize2();
          });
        }
      });

      onMounted(() => {
        setOptions1({
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
            },
          ],
        });
      });
      onMounted(() => {
        setOptions2({
          xAxis: {},
          yAxis: {},
          series: [
            {
              symbolSize: 20,
              data: [
                [10.0, 8.04],
                [8.07, 6.95],
                [13.0, 7.58],
                [9.05, 8.81],
                [11.0, 8.33],
                [14.0, 7.66],
                [13.4, 6.81],
                [10.0, 6.33],
                [14.0, 8.96],
                [12.5, 6.82],
                [9.15, 7.2],
                [11.5, 7.2],
                [3.03, 4.23],
                [12.2, 7.83],
                [2.02, 4.47],
                [1.05, 3.33],
                [4.05, 4.96],
                [6.03, 7.24],
                [12.0, 6.26],
                [12.0, 8.84],
                [7.08, 5.82],
                [5.02, 5.68],
              ],
              type: 'scatter',
            },
          ],
        });
      });

      return {
        targetTable,
        relationTable,
        boundaryTable,
        model,
        activeKey,
        chartRef1,
        chartRef2,
      };
    },
  });
</script>
<style>
  .ant-card-head-title {
    font-weight: bold;
  }

  .el-table .el-table__header th {
    font-weight: bold;
  }
</style>
