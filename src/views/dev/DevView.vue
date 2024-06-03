<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  UserControllerService,
  UserAkSkVO,
} from "../../../generated/services/user";
import message from "@arco-design/web-vue/es/message";

const akSK = ref<UserAkSkVO>();

function getKey() {
  UserControllerService.getAkSkByIdUsingGet().then((res) => {
    if (res.code === 0) {
      akSK.value = res.data;
    } else {
      message.error("获取失败，" + res.message);
    }
  });
}

function resetKey() {
  UserControllerService.updateAkSkByIdUsingGet().then((res) => {
    if (res.code === 0) {
      getKey();
      message.success("重置成功");
    } else {
      message.error("重置失败，" + res.message);
    }
  });
}

onMounted(() => {
  getKey();
});
</script>

<template>
  <a-row>
    <a-col :span="3">
      <a-menu mode="vertical" :default-selected-keys="['1']">
        <a-menu-item key="1">开发平台</a-menu-item>
      </a-menu>
    </a-col>

    <a-col :span="21">
      <a-space direction="vertical" fill>
        <a-card title="开发者密钥">
          <template #extra>
            <a-button type="primary" @click="resetKey"> 重置密钥</a-button>
          </template>
          <span>AcessKey: </span> <span> {{ akSK?.accessKey }} </span>
          <br />
          <br />
          <span>SecretKey: </span> <span> {{ akSK?.secretKey }} </span>
        </a-card>

        <a-card title="开发者SDK" class="">
          <a-button
            type="primary"
            href="http://127.0.0.1:8101/api/user/file/download"
          >
            下载SDK</a-button
          >
        </a-card>
      </a-space>
    </a-col>
  </a-row>
</template>

<style scoped></style>
