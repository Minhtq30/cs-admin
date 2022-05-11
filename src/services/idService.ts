import { AxiosResponse } from 'axios';

import { idClient } from '@/core';

class IdService {
  async getUserInfo() {
    const res: AxiosResponse = await idClient.get('api/v1/oauth2/userinfo');
    return res.data;
  }
}

export const idService = new IdService();
