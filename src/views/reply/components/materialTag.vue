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
    <material-dialog :visible.sync="materialDialogVisible" :materials="materials"></material-dialog>
  </div>
</template>

<script>
import materialType from "@/constants/materialType"
import materialDialog from "@/views/reply/components/materialDialog";

export default {
  components: { materialDialog },
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
      materialDialogVisible: false,
      materialType: materialType,
    };
  },
  methods: {
    handleClose(keyword) {

    },
    handleSelectMaterial() {
      this.materialDialogVisible = true
    },
    handleInputConfirm() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

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
