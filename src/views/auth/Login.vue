<template>
    <div class="login-container">
        <ASpin :spinning="appStore.loader">
            <ACard class="login" style="width: 300px">
                <template #title>
                    <div class="login-title">
                        <ATypographyTitle :level="3">Вход</ATypographyTitle>
                    </div>
                </template>

                <template #cover>
                    <div class="login-form">
                        <AForm :model="authStore.model">
                            <AFormItem
                                label="Логин"
                                name="login"
                                label-align="left"
                                :label-col="{ span: 24 }"
                                :rules="[{ required: true, message: 'Пожалуйста введите ваш логин!' }]"
                            >
                                <AInput v-model:value="authStore.model.login" />
                            </AFormItem>

                            <AFormItem
                                label="Пароль"
                                name="password"
                                label-align="left"
                                :label-col="{ span: 24 }"
                                :rules="[{ required: true, message: 'Пожалуйста введите ваш пароль!' }]"
                            >
                                <AInputPassword v-model:value="authStore.model.password" />
                            </AFormItem>
                        </AForm>
                    </div>
                </template>

                <template #actions>
                    <div class="login-actions">
                        <AButton type="primary" :disabled="isLoginButtonDisabled" @click="handleLoginButtonClick">Войти</AButton>
                    </div>
                </template>
            </ACard>
        </ASpin>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { isEmpty } from 'lodash-es';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const authStore = useAuthStore();
const router = useRouter();

const isLoginButtonDisabled = computed(() => isEmpty(authStore.model.login) || isEmpty(authStore.model.password));

const handleLoginButtonClick = async function() {
  await authStore.callLogin();
  if (authStore.isLoggedIn) router.push({ name: 'users' })
};
</script>

<style lang="less" scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
}

.login {
    margin: 0 auto;

    &-title {
        text-align: center;
    }

    &-form {
        padding: 20px 24px 0;

        :deep(.ant-form-item-label) label {
            height: auto;
        }
    }

    &-actions {
      padding: 0 24px;
      text-align: right;
    }
}
</style>
