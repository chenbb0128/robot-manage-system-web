<template>
  <div>
    <el-tag
      :key="material.id"
      v-for="material in materials"
      closable
      :disable-transitions="false"
      @close="">
      {{material.type === materialType.IMAGE ? materialType.getName(material.type) : materialType.getName(material.type)}}-{{ material.value.substring(0, 5) }}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="handleSelectMaterial">+ 选择素材</el-button>
    <el-dialog
      title="123"
      :visible.sync="visible"
      :destroy-on-close="true"
    >
      <el-table
        v-loading="materialListLoading"
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
        <el-table-column label="内容">
          <template slot-scope="scope">
            {{ scope.row.value }}
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="materialListQuery.page" :limit.sync="materialListQuery.limit" @pagination="handleGetMaterialList" />
    </el-dialog>
  </div>
</template>

<script>
import materialType from "@/constants/materialType"
import { getTexts, getImages} from "@/api/material";

export default {
  props: {
    materials: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      visible: false,
      materialList: null,
      materialListLoading: true,
      materialType: materialType,
      selectMaterialType: materialType.TEXT,
      total: 0,
      // list params
      materialListQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
      },
    };
  },
  methods: {
    handleClose(keyword) {

    },
    handleSelectMaterial() {
      this.visible = true
    },
    handleInputConfirm() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleGetMaterialList() {
      if (this.selectMaterialType === materialType.TEXT) {
        getTexts(this.materialListQuery).then(response => {
          const data = response.data
          this.list = data.data
          this.total = data.total
          this.listLoading = false
        })
      } else if (this.selectMaterialType === materialType.IMAGE) {
        getImages(this.materialListQuery).then(response => {
          const data = response.data
          this.list = data.data
          this.total = data.total
          this.listLoading = false
        })
      }
    }
  }
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
