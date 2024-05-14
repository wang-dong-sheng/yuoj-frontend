<template>
  <div>
    <a-split
      :style="{
        border: '1px solid var(--color-border)',
      }"
    >
      <template #first>
        <a-typography-paragraph>
          <a-tabs default-active-key="question">
            <a-tab-pane key="question" title="题目">
              <a-card v-if="question" :title="question.title">
                <a-descriptions
                  title="判题条件"
                  :column="{ xs: 1, md: 2, lg: 3 }"
                >
                  <a-descriptions-item label="时间限制">
                    {{ question.judgeConfig.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="内存限制">
                    {{ question.judgeConfig.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label="堆栈限制">
                    {{ question.judgeConfig.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
                <MdViewer :value="question.content || ''" />
                <template #extra>
                  <a-space wrap>
                    <a-tag
                      v-for="(tag, index) of question.tags"
                      :key="index"
                      color="green"
                      >{{ tag }}
                    </a-tag>
                  </a-space>
                </template>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>
            <a-tab-pane key="answer" title="答案"> 暂时无法查看答案</a-tab-pane>
          </a-tabs>
        </a-typography-paragraph>
      </template>
      <template #second>
        <div>
          <a-split direction="vertical" :style="{ height: '520px' }">
            <template #first>
              <a-typography-paragraph>
                <a-form :model="form" layout="inline">
                  <a-form-item
                    field="language"
                    label="编程语言"
                    style="min-width: 240px"
                  >
                    <a-select
                      v-model="form.language"
                      :style="{ width: '320px' }"
                      placeholder="选择编程语言"
                    >
                      <a-option>java</a-option>
                      <a-option>cpp</a-option>
                      <a-option>go</a-option>
                      <a-option>html</a-option>
                    </a-select>
                  </a-form-item>
                </a-form>
                <CodeEditor
                  :value="form.code as string"
                  :language="form.language"
                  :handle-change="changeCode"
                  style="
                     {
                      width: 80%;
                      height: 200px;
                    }
                  "
                />
                <a-divider size="0" />
                <a-button
                  type="primary"
                  style="
                     {
                      min-width: 140px;
                      margin-left: 20px;
                    }
                  "
                  @click="doSubmit"
                >
                  提交代码
                </a-button>
              </a-typography-paragraph>
            </template>
            <template #second>
              <a-typography-paragraph>
                <div class="containerss">
                  <div class="item">
                    <div class="item-left">
                      <div @click="currentTab = 0" class="item-left-item">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          width="18"
                          height="18"
                          data-icon="square-check"
                          class="svg-inline--fa fa-square-check absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            :fill="currentTab === 0 ? '#02B128' : '#98DDA7'"
                            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                          ></path>
                        </svg>
                        <span
                          :style="
                            currentTab === 0 ? 'color: black' : 'color:gray'
                          "
                        >
                          测试用例</span
                        >
                      </div>
                      <div @click="currentTab = 1" class="item-left-item">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="far"
                          width="18"
                          height="18"
                          data-icon="terminal"
                          class="svg-inline--fa fa-terminal absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            :fill="currentTab === 1 ? '#02B128' : '#98DDA7'"
                            d="M6.3 72.2c-9-9.8-8.3-24.9 1.4-33.9s24.9-8.3 33.9 1.4l184 200c8.5 9.2 8.5 23.3 0 32.5l-184 200c-9 9.8-24.2 10.4-33.9 1.4s-10.4-24.2-1.4-33.9L175.4 256 6.3 72.2zM248 432H552c13.3 0 24 10.7 24 24s-10.7 24-24 24H248c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                          ></path>
                        </svg>
                        <span
                          :style="
                            currentTab === 1 ? 'color: black' : 'color:gray'
                          "
                        >
                          测试结果</span
                        >
                      </div>
                    </div>
                  </div>
                  <div v-if="currentTab === 0" class="content">
                    <p>
                      <a-tabs
                        type="card-gutter"
                        :editable="true"
                        @add="handleAdd"
                        @delete="handleDelete"
                        show-add-button
                        auto-switch
                      >
                        <a-tab-pane
                          v-for="(item, index) of data"
                          :key="item.key"
                          :title="item.title"
                          :closable="index !== 2"
                        >
                          <a-form
                            :model="form"
                            :style="{ width: '600px' }"
                            @submit="handleSubmit"
                          >
                            <a-form-item
                              field="name"
                              tooltip="根据题目测试你的内容"
                              label="测试用例"
                            >
                              <a-input
                                v-model="form.name"
                                placeholder="请输入测试用例"
                              />
                            </a-form-item>
                          </a-form>
                        </a-tab-pane>
                      </a-tabs>
                    </p>
                  </div>
                  <div v-if="currentTab === 1" class="content">
                    <p>这里是测试结果</p>
                  </div>
                </div>
              </a-typography-paragraph>
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";

const currentTab = ref(0);

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  //await QuestionControllerService.doQuestionSubmitUsingPost
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
let count = 5;

const data = ref([
  {
    key: "1",
    title: "Case1",
    content: "Content of Tab Panel 1",
  },
  {
    key: "2",
    title: "Case2",
    content: "Content of Tab Panel 2",
  },
  {
    key: "3",
    title: "Case3",
    content: "Content of Tab Panel 3",
  },
  {
    key: "4",
    title: "Case4",
    content: "Content of Tab Panel 4",
  },
]);

const handleAdd = () => {
  const number = count++;
  data.value = data.value.concat({
    key: `${number}`,
    title: `Case${number}`,
    content: `Content of New Tab Panel ${number}`,
  });
};

const handleDelete = (key: string) => {
  data.value = data.value.filter((item) => item.key !== key);
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.containerss {
  display: flex;
  flex-direction: column;
  background-color: rgb(249, 249, 249);
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow: hidden;
  min-height: 40px;
  background-color: rgb(249, 249, 249);
  padding: 1px 1px;
  border-radius: 0px 0px 10px 10px;
}

.item {
  border-radius: 10px 10px 0px 0px;
  position: relative;
  height: 40px;
  min-height: 40px;
  display: flex;
  background-color: rgb(249, 249, 249);
  align-items: center;
}

.item-left {
  display: flex;
  height: 100%;
  width: 200px;
  position: relative;
  align-items: center;
  transition: 0.5s;
}

.item-left-item {
  border-radius: 10px;
  height: 80%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
}

.item-left-item:hover {
  background-color: #e6e6e6;
}

.item-right {
  display: flex;
  height: 100%;
  position: relative;
  align-items: center;
  transition: 0.5s;
}

.item-right-item {
  border-radius: 10px;
  height: 80%;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
}

.item-right-item:hover {
  background-color: #e6e6e6;
}
</style>
