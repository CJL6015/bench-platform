<template>
  <PageWrapper contentFullHeight>
    <a-card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <ModelCard :loading="loading" :systemId="systemId" :selectData="selectData" class="enter-y" />
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
  const systemId = ref(null);

  const handleOptionSelected = (values) => {
    selectData.value = values;
    systemId.value = values['system'];
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
        systemId,
      };
    },
  });
</script>
