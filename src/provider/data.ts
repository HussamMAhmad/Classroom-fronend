import { CreateDataProviderOptions, createDataProvider } from "@refinedev/rest";
import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

     buildQueryParams: async ({ pagination, filters , resource}) => {
      const query: Record<string, any> = {};

      query.page = pagination?.currentPage ?? 1;
      query.limit = pagination?.pageSize ?? 10;

      for (const filter of filters ?? []) {
        const field = 'field' in filter ? filter.field : '';

        const value = String(filter.value);

        if(resource === "subjects"){
          if(field === "department") query.department = value;
          if(field === "name" || field === "code") query.search = value;
        }
      }
      return query;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };
