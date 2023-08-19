<template>
  <BasicForm
    autoFocusFirstItem
    :labelWidth="80"
    :schemas="schemas"
    :actionColOptions="{ span: 0 }"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, FormSchema } from '/@/components/Form/index';

  const provincesOptions = [
    {
      id: 'guangdong',
      label: '4号机组',
      value: '1',
      key: '1',
    },
    {
      id: 'jiangsu',
      label: '江苏省',
      value: '2',
      key: '2',
    },
  ];
  const citiesOptionsData = {
    guangdong: [
      {
        label: '汽机',
        value: '1',
        key: '1',
      },
      {
        label: '深圳市',
        value: '2',
        key: '2',
      },
      {
        label: '广州市',
        value: '3',
        key: '3',
      },
    ],
    jiangsu: [
      {
        label: '南京市',
        value: '1',
        key: '1',
      },
      {
        label: '无锡市',
        value: '2',
        key: '2',
      },
      {
        label: '苏州市',
        value: '3',
        key: '3',
      },
    ],
  };

  const schemas: FormSchema[] = [
    {
      field: 'province',
      component: 'Select',
      label: '机组',
      colProps: {
        span: 5,
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          onChange: (e: any) => {
            // console.log(e)
            let citiesOptions =
              e == 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id];
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = [];
            }
            formModel.city = undefined; //  reset city value
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions,
              },
            });
          },
        };
      },
    },
    {
      field: 'city',
      component: 'Select',
      label: '系统',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [], // defalut []
        placeholder: '省份与城市联动',
      },
    },
    {
      field: 'search',
      component: 'InputSearch',
      label: '搜索条件',
      colProps: {
        span: 5,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
  ];

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      BasicForm,
    },
    setup() {
      return {
        schemas,
      };
    },
  });
</script>
