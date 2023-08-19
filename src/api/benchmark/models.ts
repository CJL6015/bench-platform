import { defHttp } from '/@/utils/http/axios';
import { ModelCardItem, ModelQueryParams } from './model/models';

enum Api {
  MODEL_CARD_LIST = '/model/card/list',
}
export const modelCardListApi = (params?: ModelQueryParams) =>
  defHttp.get<ModelCardItem[]>({ url: Api.MODEL_CARD_LIST, params });
