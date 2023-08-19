export interface ModelCardItem {
  id: number;
  name: string;
  status: number;
  algorithm: string;
  creatName: string;
  creatTime: string;
}

export interface ModelQueryParams {
  unitId: number;
  typeId: number;
  systemId: number;
  name?: string | null;
  status?: number | null;
  visible?: number | null;
  trash?: number | null;
}
