<template>
  <div class="app-container">
    <h2>关键词回复</h2>
    <el-alert
      title="当好友或群聊好友@机器人并发送预设关键词时，会自动回复设置的内容"
      type="success">
    </el-alert>
    <el-form label-position="top" label-width="80px">
      <el-form-item label="关键词">
        <keyword-tag :keywords="keywords" @handleChangeKeywords="handleChangeKeywords"></keyword-tag>
      </el-form-item>
      <el-form-item label="匹配模式">
        <el-radio-group size="small" v-model="reply.match_type">
          <el-radio border label="0">精确匹配</el-radio>
          <el-radio border label="1">模糊匹配</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="回复内容">
        <el-tag
          :key="material.id"
          v-for="material in materials"
          closable
          :disable-transitions="false"
          @close="">
          {{material.type === materialType.IMAGE ? materialType.getName(material.type) : materialType.getName(material.type)}}-{{ material.value.substring(0, 5) }}
        </el-tag>
        <el-button class="button-new-tag" size="small">+ 选择素材</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitReply()">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getReply } from '@/api/reply'
import keywordTag from "@/views/reply/components/keywordTag";
import materialType from "@/constants/materialType"

export default {
  components: { keywordTag },
  data() {
    return {
      replyId: this.$route.params && this.$route.params.id,
      reply: {},
      materialType: materialType,
      keywords: [],
      materials: []
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      this.listLoading = true
      getReply(this.replyId).then(response => {
        this.reply = response.data
        this.keywords = this.reply.keywords
        this.materials = this.reply.materials
      })
    },
    handleFilter() {
      this.handleGetList()
    },
    handleChangeKeywords(keywords) {
      this.keywords = keywords
    },
    submitReply() {

    }
  }
}
</script>
