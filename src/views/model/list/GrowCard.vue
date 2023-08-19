<template>
  <div class="grid md:grid-cols-4 gap-4">
    <template v-for="item in growCardList" :key="item.title">
      <Card size="small" :loading="loading" :title="item.title" :hoverable="true" class="w-full">
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <span class="text-2xl">{{ item.description }}</span>
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>测点个数</span>
          <CountTo :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import Icon from '@/components/Icon/Icon.vue';
  import { Tag, Card } from 'ant-design-vue';
  import { growCardList } from './data';

  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
