<template>
  <div class="app-container">
    123123
  </div>
</template>

<script>
import { getReplies } from '@/api/reply'

export default {
  components: { },
  filters: {
  },
  data() {
    return {
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      this.listLoading = true
      getReplies(this.listQuery).then(response => {
        const data = response.data
        this.list = data.data
        this.total = data.total
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
