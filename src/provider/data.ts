import { CreateDataProviderOptions, createDataProvider } from "@refinedev/rest";
import { BACKEND_BASE_URL } from "@/constants";
import { CreateResponse, ListResponse } from "@/types";

const buildHttpError = async (response: Response) => {
  let message = "Request Failed";
  try {
    const payload = (await response.json()) as { message?: string };

    if (payload?.message) message = payload.message;
  } catch {
    // Ignore Error
  }

  return {
    message,
    statusCode: response.status,
  };
};

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({ pagination, filters, resource }) => {
      const query: Record<string, any> = {};

      query.page = pagination?.currentPage ?? 1;
      query.limit = pagination?.pageSize ?? 10;

      for (const filter of filters ?? []) {
        const field = "field" in filter ? filter.field : "";

        const value = String(filter.value);

        if (resource === "subjects") {
          if (field === "department") query.department = value;
          if (field === "name" || field === "code") query.search = value;
        }

        if (resource === "users") {
          if (field === "role") query.role = value;
        }

        if (resource === "classes") {
          if (field === "name") {
            query.search = value;
          }
        }
      }
      return query;
    },

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },

  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const payload: CreateResponse = await response.json();
      return payload.data ?? [];
    },
  },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };
