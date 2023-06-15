<template>
    <div class="logFund">
        <vue-scroll :ops="ops">
            <el-dialog
                    :title="dialog.title"
                    :visible.sync="dialog.show"
                    :disabled="dialog.disabled"
                    :close-on-click-modal='false'
                    :close-on-press-escape='false'
                    :modal-append-to-body="false">
                <div class="form">
                    <el-form
                            v-if="!isView"

                            ref="form"
                            :model="form"
                            :rules="form_rules"
                            label-width="120px"
                            style="margin:10px;width:auto;">

                        <el-form-item prop='projectname' label="项目名称:">
                            <el-input type="projectname" v-model="form.projectname"></el-input>
                        </el-form-item>

                        <el-form-item prop='manname'  label="项目负责人:">
                            <el-input type="manname" v-model="form.manname"></el-input>
                        </el-form-item>

                        <el-form-item prop='projectphone' label="联系电话:">
                            <el-input type="projectphone" v-model="form.projectphone"></el-input>
                        </el-form-item>

                        <el-form-item prop='projectaccount' label="学号:">
                            <el-input type="projectaccount" v-model="form.projectaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='teachername' label="指导老师:">
                            <el-input type="teachername" v-model="form.teachername"></el-input>
                        </el-form-item>

                        <el-form-item prop='reporttime' label="申请时间:">
                            <el-input type="reporttime" v-model="form.reporttime"></el-input>
                        </el-form-item>

                        <el-form-item label="项目类型">
                            <el-radio-group v-model="form.projecttypes">
                                <el-radio label="创新创业项目"></el-radio>
                                <el-radio label="科研提升项目"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item prop='membersaccount' label="成员一学号:">
                            <el-input type="membersaccount" v-model="form.membersaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='membersname' label="成员一姓名:">
                            <el-input type="membersname" v-model="form.membersname"></el-input>
                        </el-form-item>

                        <el-form-item prop='membersprofessionalclass' label="成员一所在班级:">
                            <el-input type="membersprofessionalclass" v-model="form.membersprofessionalclass"></el-input>
                        </el-form-item>

                        <el-form-item prop='memberswhereschool' label="成员一所在学院:">
                            <el-input type="memberswhereschool" v-model="form.memberswhereschool"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomembersaccount' label="成员二学号:">
                            <el-input type="twomembersaccount" v-model="form.twomembersaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomembersname' label="成员二姓名:">
                            <el-input type="twomembersname" v-model="form.twomembersname"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomembersprofessionalclass' label="成员二所在班级:">
                            <el-input type="twomembersprofessionalclass" v-model="form.twomembersprofessionalclass"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomemberswhereschool' label="成员二所在学院:">
                            <el-input type="twomemberswhereschool" v-model="form.twomemberswhereschool"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmembersaccount' label="成员三学号:">
                            <el-input type="thrmembersaccount" v-model="form.thrmembersaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmembersname' label="成员三姓名:">
                            <el-input type="thrmembersname" v-model="form.thrmembersname"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmembersprofessionalclass' label="成员三所在班级:">
                            <el-input type="thrmembersprofessionalclass" v-model="form.thrmembersprofessionalclass"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmemberswhereschool' label="成员三所在学院:">
                            <el-input type="thrmemberswhereschool" v-model="form.thrmemberswhereschool"></el-input>
                        </el-form-item>

                        <el-form-item label="项目简介">
                            <el-input type="textarea" v-model="form.projectintroduction" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="研究目的">
                            <el-input type="textarea" v-model="form.researchobjective" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="研究内容">
                            <el-input type="textarea" v-model="form.researchcontents" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="国内外研究现状">
                            <el-input type="textarea" v-model="form.researchathomeandabroad" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="项目特色或创新点">
                            <el-input type="textarea" v-model="form.projectinnovate" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="技术路线及预期成果">
                            <el-input type="textarea" v-model="form.technologyroadmap" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="项目进度安排">
                            <el-input type="textarea" v-model="form.scheduling" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item  class="text_right">
                            <el-button @click="dialog.show = false">取 消</el-button>
                            <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                        </el-form-item>

                    </el-form>

                    <el-form
                            v-else
                            ref="form"
                            :model="form"
                            :rules="form_rules"
                            label-width="120px"
                            style="margin:10px;width:auto;">

                        <el-form-item prop='projectname' label="项目名称:">
                            <el-input type="projectname" v-model="form.projectname"></el-input>
                        </el-form-item>

                        <el-form-item prop='manname'  label="项目负责人:">
                            <el-input type="manname" v-model="form.manname"></el-input>
                        </el-form-item>

                        <el-form-item prop='projectphone' label="联系电话:">
                            <el-input type="projectphone" v-model="form.projectphone"></el-input>
                        </el-form-item>

                        <el-form-item prop='projectaccount' label="学号:">
                            <el-input type="projectaccount" v-model="form.projectaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='teachername' label="指导老师:">
                            <el-input type="teachername" v-model="form.teachername"></el-input>
                        </el-form-item>

                        <el-form-item prop='reporttime' label="申请时间:">
                            <el-input type="reporttime" v-model="form.reporttime"></el-input>
                        </el-form-item>

                        <el-form-item label="项目类型">
                            <el-radio-group v-model="form.projecttypes">
                                <el-radio label="创新创业项目"></el-radio>
                                <el-radio label="科研提升项目"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item prop='membersaccount' label="成员一学号:">
                            <el-input type="membersaccount" v-model="form.membersaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='membersname' label="成员一姓名:">
                            <el-input type="membersname" v-model="form.membersname"></el-input>
                        </el-form-item>

                        <el-form-item prop='membersprofessionalclass' label="成员一所在班级:">
                            <el-input type="membersprofessionalclass" v-model="form.membersprofessionalclass"></el-input>
                        </el-form-item>

                        <el-form-item prop='memberswhereschool' label="成员一所在学院:">
                            <el-input type="memberswhereschool" v-model="form.memberswhereschool"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomembersaccount' label="成员二学号:">
                            <el-input type="twomembersaccount" v-model="form.twomembersaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomembersname' label="成员二姓名:">
                            <el-input type="twomembersname" v-model="form.twomembersname"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomembersprofessionalclass' label="成员二所在班级:">
                            <el-input type="twomembersprofessionalclass" v-model="form.twomembersprofessionalclass"></el-input>
                        </el-form-item>

                        <el-form-item prop='twomemberswhereschool' label="成员二所在学院:">
                            <el-input type="twomemberswhereschool" v-model="form.twomemberswhereschool"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmembersaccount' label="成员三学号:">
                            <el-input type="thrmembersaccount" v-model="form.thrmembersaccount"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmembersname' label="成员三姓名:">
                            <el-input type="thrmembersname" v-model="form.thrmembersname"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmembersprofessionalclass' label="成员三所在班级:">
                            <el-input type="thrmembersprofessionalclass" v-model="form.thrmembersprofessionalclass"></el-input>
                        </el-form-item>

                        <el-form-item prop='thrmemberswhereschool' label="成员三所在学院:">
                            <el-input type="thrmemberswhereschool" v-model="form.thrmemberswhereschool"></el-input>
                        </el-form-item>

                        <el-form-item label="项目简介">
                            <el-input type="textarea" v-model="form.projectintroduction" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="研究目的">
                            <el-input type="textarea" v-model="form.researchobjective" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="研究内容">
                            <el-input type="textarea" v-model="form.researchcontents" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="国内外研究现状">
                            <el-input type="textarea" v-model="form.researchathomeandabroad" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="项目特色或创新点">
                            <el-input type="textarea" v-model="form.projectinnovate" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="技术路线及预期成果">
                            <el-input type="textarea" v-model="form.technologyroadmap" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item label="项目进度安排">
                            <el-input type="textarea" v-model="form.scheduling" style="width: 400px;" rows="18px"></el-input>
                        </el-form-item>

                        <el-form-item  class="text_right">
                            <el-button @click="dialog.show = false">关闭</el-button>

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

        computed: {
            isView() {
                return this.dialog.option === 'view';
            },
        },

        name: "logfound",
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
                    projectname: [
                        { required: true, message: "项目名称不能为空！", trigger: "blur" }
                    ],
                    manname: [
                        { required: true, message: "项目负责人不能为空！", trigger: "blur" }
                    ],
                    projectphone: [
                        { required: true, message: "联系电话不能为空！", trigger: "blur" }
                    ],
                    teachername: [
                        { required: true, message: "指导老师不能为空！", trigger: "blur" }
                    ],
                    projectaccount: [
                        { required: true, message: "学号不能为空！", trigger: "blur" }
                    ],
                    reporttime: [
                        { required: true, message: "申请时间不能为空！", trigger: "blur" }
                    ],
                    projecttypes: [
                        { required: true, message: "项目类型不能为空！", trigger: "blur" }
                    ],
                    membersaccount: [
                        { required: true, message: "成员一学号不能为空！", trigger: "blur" }
                    ],
                    membersname: [
                        { required: true, message: "成员一姓名不能为空！", trigger: "blur" }
                    ],
                    membersprofessionalclass: [
                        { required: true, message: "成员一所在班级不能为空！", trigger: "blur" }
                    ],
                    memberswhereschool: [
                        { required: true, message: "成员一所在学院不能为空！", trigger: "blur" }
                    ],
                    twomembersaccount: [
                        { required: true, message: "成员二学号不能为空！", trigger: "blur" }
                    ],
                    twomembersname: [
                        { required: true, message: "成员二姓名不能为空！", trigger: "blur" }
                    ],
                    twomembersprofessionalclass: [
                        { required: true, message: "成员二所在班级不能为空！", trigger: "blur" }
                    ],
                    twomemberswhereschool: [
                        { required: true, message: "成员二所在学院不能为空！", trigger: "blur" }
                    ],
                    thrmembersaccount: [
                        { required: true, message: "成员三学号不能为空！", trigger: "blur" }
                    ],
                    thrmembersname: [
                        { required: true, message: "成员三姓名不能为空！", trigger: "blur" }
                    ],
                    thrmembersprofessionalclass: [
                        { required: true, message: "成员三所在班级不能为空！", trigger: "blur" }
                    ],
                    thrmemberswhereschool: [
                        { required: true, message: "成员三所在学院不能为空！", trigger: "blur" }
                    ],
                    projectintroduction: [
                        { required: true, message: "项目简介不能为空！", trigger: "blur" }
                    ],
                    researchobjective: [
                        { required: true, message: "研究目的不能为空！", trigger: "blur" }
                    ],
                    researchcontents: [
                        { required: true, message: "研究内容不能为空！", trigger: "blur" }
                    ],
                    researchathomeandabroad: [
                        { required: true, message: "国内外研究现状不能为空！", trigger: "blur" }
                    ],
                    projectinnovate: [
                        { required: true, message: "项目特色或创新点不能为空！", trigger: "blur" }
                    ],
                    technologyroadmap: [
                        { required: true, message: "技术路线及预期成果不能为空！", trigger: "blur" }
                    ],
                    scheduling: [
                        { required: true, message: "项目进度安排不能为空！", trigger: "blur" }
                    ]
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
                        this.$axios.post(`/api/profiles/${url}`, this.form).then(res => {
                            // 操作成功
                            this.$message({
                                message: "保存成功！",
                                type: "success"
                            });
                            this.dialog.show = false;
                            this.$emit("update");
                        });
                    }
                });
            }
        }
    };
</script>


