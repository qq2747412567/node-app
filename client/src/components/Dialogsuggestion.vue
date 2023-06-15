<template>
    <div class="logFund">
        <vue-scroll :ops="ops">
            <el-dialog
                    :title="dialog.title"
                    :visible.sync="dialog.show"
                    :close-on-click-modal='false'
                    :close-on-press-escape='false'
                    :modal-append-to-body="false">
                <div class="form">
                    <el-form


                            ref="form"
                            :model="form"
                            :rules="form_rules"
                            label-width="120px"
                            style="margin:10px;width:auto;">

                        <el-form-item label="审核意见">
                            <el-radio-group v-model="form.judgment">
                                <el-radio label="项目立项"></el-radio>
                                <el-radio label="不予立项"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="立项建议">
                            <el-input type="textarea" v-model="form.teacheropinion" style="width: 400px;" rows="10px"></el-input>
                        </el-form-item>

                        <el-form-item label="中期审核意见">
                            <el-input type="textarea" v-model="form.midteacheropinion" style="width: 400px;" rows="10px"></el-input>
                        </el-form-item>

                        <el-form-item label="结项审核意见">
                            <el-radio-group v-model="form.Ejudgment">
                                <el-radio label="项目结项"></el-radio>
                                <el-radio label="不予结项"></el-radio>
                            </el-radio-group>
                        </el-form-item>


                        <el-form-item label="结项意见">
                            <el-input type="textarea" v-model="form.endteacheropinion" style="width: 400px;" rows="10px"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
            </el-dialog>
        </vue-scroll>
    </div>
</template>

<script>
    import vueScroll from "vuescroll";
    import "vuescroll/dist/vuescroll.css";
    export default {
        name: "logAudit",
        props: {
            dialog: Object,
            form: Object
        },
        components: {
            vueScroll,
        },
        data() {
            return {
                form_rules: {

                }
            };
        },
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        //表单数据验证完成之后，提交数据;
                        const url =
                            this.dialog.option === "add" ? "add" : `edit/${this.form.id}`;
                        this.$axios.post(`/api/teacherprofiles/${url}`, this.form).then(res => {
                            // 操作成功
                            // this.$message({
                            //     message: "保存成功！",
                            //     type: "success"
                            // });
                            this.dialog.show = false;
                            this.$emit("update");
                        });
                    }
                });
            }
        }
    };
</script>

