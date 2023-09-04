import { BasicColumn } from '/@/components/Table/src/types/table';

export const targetTableSchema: BasicColumn[] = [
  {
    title: '描述',
    width: 150,
    dataIndex: 'description',
    edit: true,
  },
  {
    title: '点号',
    width: 150,
    dataIndex: 'targetPoint',
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 'unit',
    edit: true,
  },
  {
    title: '上限	',
    width: 150,
    dataIndex: 'upperlimit',
    edit: true,
  },
  {
    title: '下限',
    width: 150,
    dataIndex: 'lowerlimit',
    edit: true,
  },
  {
    title: '时实值',
    width: 150,
    dataIndex: 'realTimeValue',
  },
];

export const boundaryTableSchema: BasicColumn[] = [
  {
    title: '描述',
    width: 150,
    dataIndex: 'description',
    edit: true,
  },
  {
    title: '点号',
    width: 150,
    dataIndex: 'targetPoint',
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 'unit',
    edit: true,
  },
  {
    title: '上限	',
    width: 150,
    dataIndex: 'upperlimit',
    edit: true,
  },
  {
    title: '下限',
    width: 150,
    dataIndex: 'lowerlimit',
    edit: true,
  },
  {
    title: '网格数',
    width: 150,
    dataIndex: 'gridNumber',
    edit: true,
  },
];

export const relationTableSchema: BasicColumn[] = [
  {
    title: '描述',
    width: 150,
    dataIndex: 'description',
    edit: true,
  },
  {
    title: '点号',
    width: 150,
    dataIndex: 'targetPoint',
  },
  {
    title: '单位',
    width: 150,
    dataIndex: 'unit',
    edit: true,
  },
  {
    title: '上限	',
    width: 150,
    dataIndex: 'upperlimit',
    edit: true,
  },
  {
    title: '下限',
    width: 150,
    dataIndex: 'lowerlimit',
    edit: true,
  },
];
