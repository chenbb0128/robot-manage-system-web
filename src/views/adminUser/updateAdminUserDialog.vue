<template>
  <el-dialog
      title="更新资料"
      :visible.sync="visible"
      :destroy-on-close="true"
  >
    {{adminUser.username}}
    <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('hiddenUpdateAdminUserDialogVisible')">
        取消
      </el-button>
      <el-button type="primary" @click="updateData()">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      updateAdminUserDialogVisible: {
        type: Boolean,
        default: false
      },
      hiddenUpdateAdminUserDialogVisible: Function,
      adminUser: Object
    },
    data() {
      return {
        form: this.adminUser,
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
          email: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
        }
      }
    },
    watch: {

    },
    created() {
    },
    computed: {
      visible: {
        get: function () {
          return this.updateAdminUserDialogVisible
        },
        set: function (val) {
          this.$emit('hiddenUpdateAdminUserDialogVisible')
        }
      }
    },
    methods: {
      updateData() {

      }
    }
  }
</script>
