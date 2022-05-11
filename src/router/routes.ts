import type { RouteRecordRaw } from 'vue-router';

import { RouteName } from '@/shared/constants';
import Homepage from '@/modules/homepage/index.vue';
import NotFound from '@/modules/notFound/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: RouteName.HOMEPAGE,
    component: Homepage,
  },
  {
    path: 'shops',
    name: RouteName.SHOP,
    component: () => import('@/modules/shop/pages/List/index.vue'),
  },
  {
    path: 'about',
    name: RouteName.ABOUT,
    component: () => import('@/modules/about/index.vue'),
    meta: { layout: 'defaultNoHeader' },
  },
  {
    path: '/login',
    name: RouteName.LOGIN,
    component: () => import('@/modules/login/index.vue'),
    meta: {
      isPublicRoute: true,
      layout: 'defaultNoHeader',
    },
  },
  {
    path: '/callback',
    name: RouteName.LOGIN_CALL_BACK,
    component: () => import('@/modules/callback/index.vue'),
    meta: {
      layout: 'defaultNoHeader',
      isPublicRoute: true,
    },
  },
  {
    path: 'logout',
    name: RouteName.LOGOUT,
    component: () => import('@/modules/logout/index.vue'),
    meta: { isPublicRoute: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.NOT_FOUND,
    component: NotFound,
    meta: { layout: 'defaultNoHeader' },
  },
];

export default routes;
