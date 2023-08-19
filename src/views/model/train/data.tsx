import { BasicColumn } from '/@/components/Table/src/types/table';

import { Badge } from 'ant-design-vue';

export const refundTimeTableSchema: BasicColumn[] = [
  {
    title: '描述',
    width: 150,
    dataIndex: 't1',
  },
  {
    title: '点号',
    width: 150,
    dataIndex: 't2',
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 't3',
    customRender: ({ record }) => {
      return <Badge status="success" text={record.t3} />;
    },
  },
  {
    title: '上限	',
    width: 150,
    dataIndex: 't4',
  },
  {
    title: '下限',
    width: 150,
    dataIndex: 't5',
  },
];

export const refundTimeTableData: any[] = [
  {
    t1: '送风机B出口压力',
    t2: 'U2_AI_22HLB10CP101',
    t3: 'kPa',
    t4: '3200',
    t5: '800',
  },
  {
    t1: 'B送风机风量',
    t2: 'U2_AI_22HLA10CF901',
    t3: 't/h',
    t4: '140',
    t5: '60',
  },
];
