
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class DepositService {
  static async update(id, data) {
    const body = {
      id,
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/deposit/${id}`,
      body,
    );

    return response.data;
  }

  static async destroyAll(ids) {
    const params = {
      ids,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.delete(
      `/tenant/${tenantId}/deposit`,
      {
        params,
      },
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/deposit`,
      body,
    );

    return response.data;
  }

  static async depositStatus(data) {
    const body = {
      data,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.post(
      `/tenant/${tenantId}/depositStatus`,
      body,
    );

    return response.data;
  }



  static async import(values, importHash) {
    const body = {
      data: values,
      importHash,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/deposit/import`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/deposit/${id}`,
    );

    return response.data;
  }

  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/deposit`,
      {
        params,
      },
    );

    return response.data;
  }

  static async listAutocomplete(query, limit) {
    const params = {
      query,
      limit,
    };
    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.get(
      `/tenant/${tenantId}/deposit/autocomplete`,
      {
        params,
      },
    );

    return response.data;
  }
}
