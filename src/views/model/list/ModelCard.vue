<template>
  <div class="grid md:grid-cols-4 gap-4">
    <template v-for="item in modelCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        :hoverable="true"
        :bodyStyle="item.bodyStyle"
        :headStyle="item.headStyle"
        @click="changeModel(item.id)"
      >
        <template #extra>
          <Icon :icon="item.icon" :size="30" color="white" />
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <span class="text-2xl">{{ item.description }}</span>
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
  import { Card } from 'ant-design-vue';
  import { ModelItem } from './data';
  import { modelCardListApi } from '/@/api/benchmark/models';
  import { ModelQueryParams } from '/@/api/benchmark/model/models';
  import { watch, ref } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';

  const props = defineProps({
    loading: {
      type: Boolean,
    },
    selectData: {
      type: Object,
    },
  });

  //点击模型卡片跳转训练页面
  const go = useGo();
  const changeModel = (id) => {
    go(`/model/train/${id}`);
  };

  const modelCardList = ref<Array<ModelItem>>([]);
  const colors = ['#8dc63f', '#dbb09e'];
  const statusStr = ['未下装', '已下装'];
  const icons = ['material-symbols:lock-open-right-outline', 'material-symbols:lock-outline'];

  watch(
    () => props.selectData,
    async (value) => {
      console.log(value);
      const queryParams: ModelQueryParams = {
        unitId: value?.unit,
        typeId: value?.type,
        systemId: value?.system,
        name: value?.name,
      };
      const modelList = await modelCardListApi(queryParams);
      const cardList: ModelItem[] = [];
      for (const modelCard of modelList) {
        console.log(modelCard);
        modelCard.status = 0;
        const card: ModelItem = {
          id: modelCard.id,
          title: modelCard.name,
          icon: icons[modelCard.status],
          value: 1,
          total: 1,
          color: colors[modelCard.status],
          status: statusStr[modelCard.status],
          creator: modelCard.creatName,
          description: modelCard.creatTime,
          headStyle: {
            backgroundColor: colors[modelCard.status],
          },
          bodyStyle: {
            borderColor: colors[modelCard.status],
            borderWidth: '1px',
          },
        };
        cardList.push(card);
      }
      modelCardList.value = cardList;
    },
  );
</script>
