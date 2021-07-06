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
      <el-table-column label="Email" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ adminUserStatus.getName(scope.row.status) }}</el-tag>
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
          <el-button v-if="row.status != adminUserStatus.DISABLED" size="mini" type="danger" @click="handleStatus(row, adminUserStatus.DISABLED)">
            禁用
          </el-button>
          <el-button v-else size="mini" type="success" @click="handleStatus(row, adminUserStatus.ENABLED)">
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
  import {getAdminUsers, updateAdminUser} from '@/api/adminUser'
import Pagination from '@/components/Pagination'
import UpdateAdminUserDialog from './updateAdminUserDialog'
import adminUserStatus from "@/constants/adminUserStatus";

export default {
  components: { Pagination, UpdateAdminUserDialog },
  filters: {
    statusFilter(status) {
      return adminUserStatus.getButton(status)
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
      adminUserStatus: adminUserStatus
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
    changeList(data, mode = 'update') {
      if (mode === 'add') {
        this.list.unshift(data)
      } else {
        const index = this.list.findIndex(v => v.id === data.id)
        this.list.splice(index, 1, data)
      }
    },
    handleStatus(row, status) {
      console.log(status)

      this.$confirm(`此操作将${adminUserStatus.getName(status)}该用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = Object.assign({}, row)
        data.status = status
        updateAdminUser(data).then((res) => {
          this.$message({
            type: 'success',
            message: `操作成功!`
          });
          this.changeList(data)
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `操作失败!`
          });
        })
      });
    }
  }
}
</script>
