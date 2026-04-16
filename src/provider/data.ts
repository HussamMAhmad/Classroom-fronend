import { Subject } from "@/types";
import {
  BaseRecord,
  DataProvider,
  GetListParams,
  GetListResponse,
} from "@refinedev/core";

export const MockDataProvider : Subject[] = [{
  id: 1,
  name: "Mathematics",
  code: "MATH101",
  description: "An introduction to mathematical concepts and techniques.",
  department: "Mathematics",
  createAt: new Date().toISOString(),
}];

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return {
        data: [] as TData[],
        total: 0,
      };
    }

    return {
      data: MockDataProvider as unknown as TData[],
      total: MockDataProvider.length,
    };
  },

  getOne: async () => {
    throw new Error("Method not implemented.");
  },
  create: async () => {
    throw new Error("Method not implemented.");
  },
  update: async () => {
    throw new Error("Method not implemented.");
  },
  deleteOne: async () => {
    throw new Error("Method not implemented.");
  },
  getApiUrl: () => "",
};
