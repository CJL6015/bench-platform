<template>
  <a-form layout="inline" :model="formData" :label-col="labelCol" @finish="submitForm">
    <a-col :md="5">
      <a-form-item label="机组" name="unit">
        <a-select
          v-model:value="formData.unit"
          style="width: 100%"
          @change="onUnitChange"
          :options="unitData.map((unit) => ({ value: unit.id, label: unit.name }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="5">
      <a-form-item label="系统" name="type">
        <a-select
          v-model:value="formData.type"
          style="width: 100%"
          @change="onTypeChange"
          :options="typeData.map((type) => ({ value: type.id, label: type.name }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="5">
      <a-form-item label="子系统" name="system">
        <a-select
          v-model:value="formData.system"
          style="width: 100%"
          :options="systemData.map((system) => ({ value: system.id, label: system.name }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="5">
      <a-form-item name="name">
        <a-input v-model:value="formData.name" style="width: 100%" />
      </a-form-item>
    </a-col>
    <a-col :md="3">
      <a-form-item>
        <a-button type="primary" html-type="submit">查询</a-button>
      </a-form-item>
    </a-col>
  </a-form>
  <a-divider />
</template>
<script lang="ts">
  import { ref } from 'vue';
  import { Form, Select, Button, Col, Divider } from 'ant-design-vue';
  import { optionListApi, subSystemListApi } from '/@/api/benchmark/select';
  import { systemSelectParams } from '/@/api/benchmark/model/optionsModel';

  const optionList = await optionListApi();
  export default {
    components: {
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ACol: Col,
      ADivider: Divider,
    },
    emits: ['optionSelected'],
    setup(props, context) {
      let unitData = ref(optionList.units);
      let typeData = ref(optionList.types);
      let systemData = ref(optionList.systems);

      const formData = ref({
        unit: unitData.value[0].id,
        type: typeData.value[0].id,
        system: systemData.value[0].id,
        name: null,
      });

      //点击查询按钮提交表单触发事件
      const submitForm = (values) => {
        context.emit('optionSelected', values);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const labelCol = { style: { width: '80px' } };

      // 机组下拉框改变事件
      const onUnitChange = async (_value) => {
        const param: systemSelectParams = {
          unitId: formData.value.unit,
          typeId: typeData.value[0].id,
        };
        systemData.value = await subSystemListApi(param);
        formData.value.system = systemData.value[0].id;
        formData.value.type = typeData.value[0].id;
      };

      // 系统下拉框改变事件
      const onTypeChange = async (_value) => {
        const param: systemSelectParams = {
          unitId: formData.value.unit,
          typeId: formData.value.type,
        };
        systemData.value = await subSystemListApi(param);
        formData.value.system = systemData.value[0].id;
      };

      return {
        formData,
        unitData,
        typeData,
        systemData,
        submitForm,
        onFinishFailed,
        labelCol,
        onUnitChange,
        onTypeChange,
      };
    },
  };
</script>
