<template>
    <ALayout class="layout">
        <ALayoutHeader  class="layout-header">
            <AFlex class="layout-header__actions" :gap="24" justify="flex-end" align="center">
                <AButton :class="{ '-active': isButtonActive('users') }">Пользователи</AButton>

                <ADropdown>
                    <AAvatar size="large">
                        <template #icon><UserOutlined /></template>
                    </AAvatar>
                    <template #overlay>
                        <AMenu>
                            <AMenuItem>
                                <AButton danger type="text" @click="authStore.callLogout">Выход</AButton>
                            </AMenuItem>
                        </AMenu>
                    </template>
                </ADropdown>
            </AFlex>
        </ALayoutHeader>

        <ALayoutContent  class="layout-content">
            <RouterView />
        </ALayoutContent>
    </ALayout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute()

const isButtonActive = function(routeName: string) {
  return routeName === route.name;
}
</script>

<style lang="less" scoped>
.layout {
    &-header {
        padding: 24px 50px;
        height: 90px;

        color: @text-invert-color;
        background-color: @navigation-background-color;

        &__actions :deep(.ant-btn) {
            padding: 11.5px 16px;
            height: 42px;
            line-height: 19px;

            background-color: transparent;
            color: @text-invert-color;

            &:hover {
                background-color: #FFFFFF;
                color: @text-color;
                border-color: #FFFFFF;
            }

            &:focus {
               border-color: #FFFFFF;
            }

            &.-active {
                background-color: #FFFFFF;
                color: @text-color;
                border-color: #FFFFFF;
            }


            &.layout-header__user-wrapper,
            &.layout-header__user-wrapper:hover,
            &.layout-header__user-wrapper:active,
            &.layout-header__user-wrapper:focus {
                padding: 0 16px;
                margin: 0;

                border-color: transparent;
                background-color: transparent;

                color: @text-invert-color;
            }
        }

        &__user {
            height: 42px;
        }
    }

    &-content {

    }
}
</style>
