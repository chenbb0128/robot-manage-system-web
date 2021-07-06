<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Email" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ adminUserStatus[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status != 1" size="mini" type="danger" @click="handleStatus(row, )">
            禁用
          </el-button>
          <el-button v-else size="mini" type="success" @click="handleStatus(row, )">
            启用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleGetList" />
    <UpdateAdminUserDialog
        :update-admin-user-dialog-visible="updateAdminUserDialogVisible"
        @hiddenUpdateAdminUserDialogVisible="hiddenUpdateAdminUserDialogVisible"
        :admin-user="currentAdminUser"
        @changeList="changeList"
    ></UpdateAdminUserDialog>
  </div>
</template>

<script>
import { getAdminUsers } from '@/api/adminUser'
import Pagination from '@/components/Pagination'
import UpdateAdminUserDialog from './updateAdminUserDialog'

export default {
  components: { Pagination, UpdateAdminUserDialog },
  filters: {
    statusFilter(status) {
      const statusMap = ['success', 'danger']
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      // list params
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id'
      },
      currentAdminUser: {},
      updateAdminUserDialogVisible: false,
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      this.listLoading = true
      getAdminUsers(this.listQuery).then(response => {
        const data = response.data
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      })
    },
    handleUpdate(row) {
      console.log(row)
      this.currentAdminUser = row
      this.updateAdminUserDialogVisible = true
    },
    hiddenUpdateAdminUserDialogVisible() {
      this.updateAdminUserDialogVisible = false
    },
    changeList(data, mode) {
      if (mode === 'add') {
        this.list.unshift(data)
      } else {
        const index = this.list.findIndex(v => v.id === data.id)
        this.list.splice(index, 1, data)
      }
    },
    handleStatus(row, status) {
      this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
