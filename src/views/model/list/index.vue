<template>
  <PageWrapper title="模型中心" contentFullHeight>
    <a-card>
      <UnitSelect />
      <GrowCard :loading="loading" class="enter-y" />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import GrowCard from './GrowCard.vue';
  import UnitSelect from './UnitSelect.vue';
  import { Card } from 'ant-design-vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      PageWrapper,
      GrowCard,
      UnitSelect,
      ACard: Card,
    },
    setup() {
      return {
        loading,
      };
    },
  });
</script>
