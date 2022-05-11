import { createRouter, createWebHistory } from 'vue-router';
import { AuthRedirectGuardMiddleware } from 'gmjs';
import config from '@/configs/app';

import routes from './routes';
import { MainLayout } from '@/shared/layouts';
import { RouteName } from '@/shared/constants';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: MainLayout,
      children: routes,
    },
  ],
});
const oidc = config.oidc;

router.beforeEach((to, from, next) => {
  // Get Token from Local Storage
  const accessTokenObj = JSON.parse(localStorage.getItem('ghtk-token-storage') || '{}');
  const accessToken =
    Object.keys(accessTokenObj).length > 0 ? accessTokenObj?.accessToken?.accessToken : null;

  // Redirect to homepage if logged in
  if (RouteName.LOGIN === to.name && accessToken) {
    return next({ name: RouteName.HOMEPAGE });
  }

  // Skip checking if is public route
  if (to.meta.isPublicRoute) {
    return next();
  }

  try {
    // Other request need to be authenticated
    const authRedirectGuardMiddleware = AuthRedirectGuardMiddleware(oidc);
    authRedirectGuardMiddleware.run(to.path, next);
  } catch (e) {
    return next({ name: RouteName.LOGIN });
  }
});

export default router;
