<template>
  <PageWrapper title="模型中心" contentFullHeight>
    <a-card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <ModelCard :loading="loading" :selectData="selectData" class="enter-y" />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import ModelCard from './ModelCard.vue';
  import UnitSelect from './UnitSelect.vue';
  import { Card } from 'ant-design-vue';

  const loading = ref(true);
  const selectData = ref(null);

  const handleOptionSelected = (values) => {
    console.log(values);
    selectData.value = values;
  };

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      PageWrapper,
      ModelCard,
      UnitSelect,
      ACard: Card,
    },
    setup() {
      return {
        loading,
        handleOptionSelected,
        selectData,
      };
    },
  });
</script>
