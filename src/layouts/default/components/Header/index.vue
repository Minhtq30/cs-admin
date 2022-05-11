<script lang="ts" setup>
import { RouteName } from '@/shared/constants';

import ShopIcon from './demos/ShopIcon.vue';
import BillIcon from './demos/BillIcon.vue';
import TruckIcon from './demos/TruckIcon.vue';
import TicketIcon from './demos/TicketIcon.vue';
import UserIcon from './demos/UserIcon.vue';
import OtherIcon from './demos/OtherIcon.vue';
import ArrowIcon from './demos/ArrowIcon.vue';

const MENUS = [
  { name: 'Shop', nameUrl: RouteName.SHOP, icon: ShopIcon },
  { name: 'Đơn hàng', nameUrl: RouteName.ABOUT, icon: BillIcon },
  { name: 'COD', nameUrl: RouteName.ABOUT, icon: TruckIcon },
  { name: 'Tickets', nameUrl: RouteName.ABOUT, icon: TicketIcon },
  { name: 'Nhân sự', nameUrl: RouteName.ABOUT, icon: UserIcon },
  { name: 'Khác', nameUrl: RouteName.ABOUT, icon: OtherIcon },
];
</script>

<template>
  <header class="flex h-14 bg-ghtk">
    <router-link to="/">
      <div class="logo flex items-center justify-center w-44 h-full">
        <img src="@/assets/images/logo.png" alt="Logo" />
      </div>
    </router-link>

    <div class="h-full flex items-center">
      <div class="h-4/6 w-px bg-white"></div>
    </div>

    <div class="sidebar flex my-0 ml-6 p-0 list-none text-white mr-auto">
      <router-link
        v-for="(menu, index) in MENUS"
        :key="index"
        :to="{ name: menu.nameUrl }"
        class="sidebar__item h-full flex items-center px-4 text-lg font-medium text-white"
      >
        <div class="mr-2 flex">
          <component :is="menu.icon"></component>
        </div>
        {{ menu.name }}
      </router-link>
    </div>

    <div class="userInfo w-56 flex items-center cursor-pointer">
      <div class="userInfo__avatar">
        <img class="text-white" src="@/assets/images/avatar.jpg" />
      </div>

      <div class="text-white">
        <div class="font-medium max-w-[126px] whitespace-nowrap overflow-hidden text-ellipsis">
          Phạm Minh Anh
        </div>
        <div class="uppercase text-xs">nhân viên bưu cục</div>
      </div>

      <div class="flex text-white ml-2">
        <ArrowIcon />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
