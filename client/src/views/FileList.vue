<template>
  <div>
    <el-button @click="openUpload()">上传文件</el-button>
    <el-dialog   title="提示"
                 :visible.sync="dialogVisible"
                 width="30%">
      <el-upload
          style="margin-left: 5px;"
          :on-change="handleChange"
          action=""
          ref="upload"
          :auto-upload="false"
          :http-request="uploadFile"
          :file-list="fileList">
        <el-button size="mini" type="info" slot="trigger" style="margin-right: 15px">选取文件</el-button>
        <el-button size="mini" type="info" @click="submitUpload" :loading="importLoad">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">文件后缀为xlsx;单次导入不超过1000条;严格按照校验规则。</div>
      </el-upload>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FileList",
  setup(){

  },
  data(){
    return {
      dialogVisible:false,
      fileList: [],
      importLoad: false,
    }
  },
  methods:{
    openUpload(){
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
      }
    },
    uploadFile(item) {
      this.importLoad = true;
      const form = new FormData();
      form.append('disposeId', '16');
      form.append('file', item.file);
      console.log(form);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  }
}
</script>

<style scoped>

</style>