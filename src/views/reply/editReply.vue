<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">123213</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">123213</el-col>
      <el-col :span="12">123123</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">2131</el-col>
      <el-col :span="8">2131</el-col>
      <el-col :span="4">2131</el-col>
      <el-col :span="4">2131</el-col>
    </el-row>
  </div>
</template>

<script>
import { getReply } from '@/api/reply'

export default {
  components: { },
  filters: {
  },
  data() {
    return {
      replyId: this.$route.params && this.$route.params.id
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      this.listLoading = true
      getReply(this.replyId).then(response => {
        const data = response.data
        console.log(response)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.handleGetList()
    },
  }
}
</script>
