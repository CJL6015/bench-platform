import { defHttp } from '/@/utils/http/axios';
import { ModelCardItem, ModelQueryParams, ModelInfo } from './model/models';

enum Api {
  MODEL_CARD_LIST = '/model/card/list',
  MODEL_INFO = '/model/info/',
  MODEL_SAVE = '/model/',
  MODEL_DATA = '/model/data/',
  CALCULATE_BACK = '/model/data/calculate/',
}
export const modelCardListApi = (params?: ModelQueryParams) =>
  defHttp.get<ModelCardItem[]>({ url: Api.MODEL_CARD_LIST, params });

export const modelInfoApi = (id: any) => defHttp.get<ModelInfo>({ url: Api.MODEL_INFO + id });

export const modelSaveApi = (params?: any) =>
  defHttp.post<number>({ url: Api.MODEL_SAVE, data: params });

export const modelDataApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.MODEL_DATA + id, params });

export const calculateBackApi = (id: any, params: any) =>
  defHttp.post<boolean>({ url: Api.CALCULATE_BACK + id, params });
