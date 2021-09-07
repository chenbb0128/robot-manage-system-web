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
      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column label="子订单号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sub_order_no }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.goods_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单类别" width="200">
        <template slot-scope="scope">
          {{ scope.row.order_type }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" width="200">
        <template slot-scope="scope">
          {{ scope.row.order_status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算状态" width="200">
        <template slot-scope="scope">
          {{ scope.row.settle_account_status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.order_created_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.payment_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="淘宝支付时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.tb_payment_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付金额" width="200">
        <template slot-scope="scope">
          {{ scope.row.payment_money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算金额" width="200">
        <template slot-scope="scope">
          {{ scope.row.settle_account_money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="淘宝结算时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.tb_settle_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="服务费" width="200">
        <template slot-scope="scope">
          {{ scope.row.service_money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="服务费" width="200">
        <template slot-scope="scope">
          {{ scope.row.service_money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="佣金比率" width="200">
        <template slot-scope="scope">
          {{ scope.row.commission_rate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款预估收入" width="200">
        <template slot-scope="scope">
          {{ scope.row.pre_payment_income }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算预估收入" width="200">
        <template slot-scope="scope">
          {{ scope.row.pre_settle_account_income }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否维权" width="200">
        <template slot-scope="scope">
          {{ scope.row.rights_protection }}
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="提现状态" width="200">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.user_order_map.draw_money_status || 0 }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column align="center" label="提现金额" width="200">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.user_order_map.draw_money || 0 }}-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handleGetList" />
  </div>
</template>

<script>
import { getTbOrders } from '@/api/order'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
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
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleGetList() {
      this.listLoading = true
      getTbOrders(this.listQuery).then(response => {
        const data = response.data
        this.list = data.data
        this.total = data.total
        this.listLoading = false
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
  }
}
</script>
