<script setup lang="ts"></script>

<template>
  <a-row>
    <a-col :span="3">
      <a-menu mode="vertical" :default-selected-keys="['1']">
        <a-menu-item key="1">开发平台</a-menu-item>
        <a-menu-item key="2">测试1</a-menu-item>
        <a-menu-item key="3">测试2</a-menu-item>
        <a-menu-item key="4">测试3</a-menu-item>
      </a-menu>
    </a-col>

    <a-col :span="21">
      <a-space direction="vertical" fill>
        <a-card title="开发者密钥">
          <span>AcessKey: </span> <span>1 </span>
          <br />
          <br />
          <span>SecretKey: </span> <span>2 </span>
        </a-card>

        <a-card title="开发者SDK" class="">
          <a-button type="primary"> 下载SDK</a-button>
        </a-card>
      </a-space>
    </a-col>
  </a-row>
</template>

<style scoped></style>
