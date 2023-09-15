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
          <a-button @click="calculateBack"> 回算 </a-button>
        </template>
        <div>
          <a-form layout="inline" :model="formData" :label-col="labelCol" @finish="submitForm">
            <div style="margin-bottom: 10px" class="grid md:grid-cols-4 gap-4">
              <a-form-item label="边界参数" name="boundary">
                <a-select
                  placeholder="选择边界参数"
                  style="width: 400px"
                  v-model:value="formData.boundary"
                  mode="tags"
                  :maxTagCount="2"
                  @change="onChange"
                  :options="
                    boundarySelectData.map((boundary) => ({
                      value: boundary.id,
                      label: boundary.name,
                    }))
                  "
                />
              </a-form-item>
              <a-form-item label="数据类型" name="type">
                <a-select
                  style="width: 400px"
                  v-model:value="formData.type"
                  :options="typeOptions"
                />
              </a-form-item>
              <a-form-item label="历史时间">
                <a-range-picker
                  v-model:value="value"
                  show-time
                  :placeholder="['开始时间', '结束时间']"
                />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">查询</a-button>
              </a-form-item>
            </div>
          </a-form>
        </div>

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
  import { defineComponent, ref, Ref, onMounted, computed, watch, nextTick, toRaw } from 'vue';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import dayjs, { Dayjs } from 'dayjs';
  import {
    Divider,
    Card,
    Descriptions,
    Steps,
    Tabs,
    Form,
    Select,
    Button,
    RangePicker,
  } from 'ant-design-vue';
  import { targetTableSchema, relationTableSchema, boundaryTableSchema } from './data';
  import { modelInfoApi, modelDataApi, calculateBackApi } from '/@/api/benchmark/models';
  import { ModelInfo } from '/@/api/benchmark/model/models';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useMessage } from '/@/hooks/web/useMessage';

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
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ARangePicker: RangePicker,
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

      type RangeValue = [Dayjs, Dayjs];
      const value = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      value.value = rangeValue;

      const targetTableData = computed(() => {
        return [model.value?.targetParameter || {}];
      });

      const relationTableData = computed(() => {
        return model.value?.relationParameter || [];
      });

      const boundaryTableData = computed(() => {
        return model.value?.boundaryParameter || [];
      });

      const boundarySelectData = computed(() => {
        let data: any[] = [];
        const boundary = boundaryTableData.value;
        for (let i = 0; i < boundary.length; i++) {
          data.push({
            id: i,
            name: `${boundary[i]['description']} (${boundary[i]['targetPoint']})`,
          });
        }
        return data;
      });
      const typeOptions = [
        { value: '', label: '所有值' },
        { value: 'max', label: '最大值' },
        { value: 'min', label: '最小值' },
        { value: 'avg', label: '平均值' },
      ];

      const formData = ref({
        boundary: [],
        type: '',
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
          nextTick(() => {
            resize1();
            resize2();
          });
        }
      });
      const fetchModelData = async (dataParams) => {
        const modelData = await modelDataApi(1, dataParams);
        return modelData;
      };
      const fetchHeatOption = (modelData) => {
        const option = {
          title: {
            text: '热力图名字待定',
          },
          tooltip: {
            position: 'top',
          },
          grid: {
            height: '70%',
            top: '10%',
          },
          xAxis: {
            type: 'category',
            data: Array.from({ length: 10 }, (_, index) => index + 1),
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: 'category',
            data: Array.from({ length: 10 }, (_, index) => index + 1),
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
          },
          series: [
            {
              name: '样本个数',
              type: 'heatmap',
              data: modelData.heatData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };
        return option;
      };

      const fetchBarOption = (modelData) => {
        let option = {
          title: {
            text: '柱状图名字待定',
          },
          xAxis: {
            type: 'category',
            data: Array.from({ length: 10 }, (_, index) => index + 1),
          },
          yAxis: {
            type: 'value',
            name: '样本数量',
          },
          series: [
            {
              data: modelData['sampleValue'],
              type: 'bar',
            },
          ],
        };
        return option;
      };

      const fetchScatterData = (modelData) => {
        let scatterData: Array<[number, number]> = [];
        const targetValue: number[] = modelData.targetValue;
        const b1: number[] = modelData.dataList[0];
        for (let i in targetValue) {
          scatterData.push([targetValue[i], b1[i]]);
        }
        const option = {
          title: {
            text: '散点图名字待定',
          },
          xAxis: {
            min: (Math.min(...targetValue) * 0.9).toFixed(2),
            max: (Math.max(...targetValue) * 1.1).toFixed(2),
          },
          yAxis: {
            min: (Math.min(...b1) * 0.9).toFixed(2),
            max: (Math.max(...b1) * 1.1).toFixed(2),
          },
          series: [
            {
              symbolSize: 4,
              data: scatterData,
              type: 'scatter',
            },
          ] as any,
        };
        return option;
      };

      const submitForm = async (values) => {
        const selectBoundary = toRaw(values.boundary).join(',');
        const [startDate, endDate] = value.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const param = {
          type: values.type,
          index: selectBoundary,
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const modelData = await fetchModelData(param);
        console.log(modelData);

        let options1;
        if (modelData.dataList.length > 1) {
          options1 = fetchHeatOption(modelData);
        } else {
          options1 = fetchBarOption(modelData);
        }
        let options2 = fetchScatterData(modelData);
        setOptions1(options1, true);
        setOptions2(options2, true);
      };

      const onChange = (value) => {
        if (value.length > 2) {
          value = value.splice(2);
        }
      };

      const labelCol = { style: { width: '80px' } };
      const { createMessage } = useMessage();
      const calculateBack = async function () {
        const [startDate, endDate] = value.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: startDateDate,
          et: endDateDate,
        };
        const calculateRes = await calculateBackApi(id, time);
        if (calculateRes) {
          createMessage.success('回算提交成功');
        } else {
          createMessage.error('回算异常');
        }
      };

      return {
        targetTable,
        relationTable,
        boundaryTable,
        model,
        activeKey,
        chartRef1,
        chartRef2,
        labelCol,
        formData,
        submitForm,
        boundarySelectData,
        typeOptions,
        onChange,
        calculateBack,
        value,
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
