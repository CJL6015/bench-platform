<template>
  <PageWrapper contentFullHeight>
    <a-card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <BasicTable @register="optimisticTable" />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import UnitSelect from './UnitSelect.vue';
  import { Card } from 'ant-design-vue';
  import { getOptimisticApi } from '/@/api/benchmark/models';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import dayjs, { Dayjs } from 'dayjs';

  const loading = ref<Boolean>(false);
  const selectData = ref(null);
  const systemId = ref(null);
  const search = ref(null);
  const st = ref('');
  const et = ref('');

  const tableSchema: BasicColumn[] = [
    {
      title: '目标参数名称',
      dataIndex: 'targetName',
    },
    {
      title: '边界参数名称',
      dataIndex: 'boundaryName',
    },
    {
      title: '当前目标值',
      dataIndex: 'targetValue',
    },
    {
      title: '当前边界值	',
      dataIndex: 'boundaryValue',
    },
    {
      title: '历史最优值	',
      dataIndex: 'historyBest',
      width: '600px',
    },
  ];

  const [optimisticTable, methods] = useTable({
    columns: tableSchema,
    pagination: true,
    bordered: true,
    canResize: false,
  });

  const handleOptionSelected = (values) => {
    console.log(values);
    selectData.value = values;
    systemId.value = values['system'];
    search.value = values['name'];
    const [startDate, endDate] = values['time'];
    const startDateDate = startDate.toDate();
    const endDateDate = endDate.toDate();
    st.value = dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss');
    et.value = dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss');
    getOptimistic();
  };
  async function getOptimistic() {
    const params = {
      id: systemId.value,
      search: search.value,
      st: st.value,
      et: et.value,
    };
    console.log(params);
    const result = await getOptimisticApi(params);
    methods.setTableData(result);
  }

  export default defineComponent({
    components: {
      PageWrapper,
      UnitSelect,
      ACard: Card,
      BasicTable,
    },
    setup() {
      return {
        loading,
        handleOptionSelected,
        selectData,
        systemId,
        optimisticTable,
      };
    },
  });
</script>
