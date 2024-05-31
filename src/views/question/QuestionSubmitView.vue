<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #judgeInfoMeesage="{ record }">
        <!--        {{ JSON.stringify(record.judgeInfo) }}-->
        <a-tag :color="getMessageColor(record.judgeInfo.message)"
          >{{ record.judgeInfo.message ?? "未知" }}
        </a-tag>
        <!--        <a-tag>{{ record.judgeInfo.time ?? "未知" }} </a-tag>-->
        <!--        <a-tag>{{ record.judgeInfo.memory ?? "未知" }} </a-tag>-->
      </template>

      <template #judgeInfoTime="{ record }">
        <a-tag>{{ record.judgeInfo.time ?? "N/A" }} </a-tag>
      </template>

      <template #judgeInfoMemory="{ record }">
        <a-tag>{{ getMemory(record.judgeInfo.memory) }} </a-tag>
      </template>

      <template #status="{ record }">
        <a-tag v-if="record.status === 0" color="orange"> 等待中 </a-tag>
        <a-tag v-else-if="record.status === 1" color="blue"> 判题中 </a-tag>
        <a-tag v-else-if="record.status === 2" color="green"> 成功 </a-tag>
        <a-tag v-else-if="record.status === 3" color="orange">失败 </a-tag>
      </template>

      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated/services/question";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  //const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    {
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    }
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    children: [
      {
        title: "信息",
        slotName: "judgeInfoMeesage",
      },
      {
        title: "时间",
        slotName: "judgeInfoTime",
      },
      {
        title: "内存",
        slotName: "judgeInfoMemory",
      },
    ],
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

function getMessageColor(status: string) {
  if (status === "Accepted") {
    return "green";
  } else if (status === "Wrong Answer") {
    return "red";
  } else {
    return "orange";
  }
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
function getMemory(text: string) {
  const size = Number(text);
  if (isNaN(size)) {
    return "Invalid input";
  }

  if (size === 0) {
    return "N/A";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  let memory = size;
  while (memory >= 1024 && unitIndex < units.length - 1) {
    memory /= 1024;
    unitIndex++;
  }

  return `${memory.toFixed(2)} ${units[unitIndex]}`;
}
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
