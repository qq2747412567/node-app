<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">创新创业能力培养管理系统</span>
            </div>
            <el-form :model="registerUser" :rules="rules" class="registerForm" ref="registerForm" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="registerUser.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="registerUser.telephone" type="number"
                              placeholder="请输入电话号码"> </el-input>
                </el-form-item>
                <el-form-item label="院系" prop="memberschool">
                <el-input v-model="registerUser.memberschool" placeholder="请输入院系"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="registerUser.identity" placeholder="请选择身份">
                        <el-option label="教师" value="teacher"></el-option>
                        <el-option label="学生" value="student"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>



<script>
    export default {
        name: "register",
        components: {},
        data(){

            var validatePass2 = (rule, value, callback) => {
                 if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return{
                registerUser: {
                    name: "",
                    telephone: "",
                    memberschool: "",
                    password: "",
                    password2: "",
                    identity: ""
                },
            rules:{
                name:[
                    { required: true, message: "用户名不能为空", trigger: "change" },
                    { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
                ],
                telephone: [
                    {min:11, max:11, message:'请输入11位数字号码', required: true, trigger: "blur"}
                ],
                memberschool:[
                    { required: true, message: "院系不能为空", trigger: "blur" }],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" },
                    { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ],
                password2: [
                    { required: true, message: "确认密码不能为空", trigger: "blur" },
                    {
                        min: 6,
                        max: 30,
                        message: "长度在 6 到 30 个字符",
                        trigger: "blur"
                    },
                    { validator: validatePass2, trigger: "blur" }
                ]

            }

            }
    },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios
                            .post("/api/users/register", this.registerUser)
                            .then(res => {
                                // 注册成功
                                this.$message({
                                    message: "注册成功！",
                                    type: "success"
                                });
                                 this.$router.push("/login");
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    };

</script>

<style scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/bj.jpg) no-repeat center center;
        background-size: 100% 100%;
    }
    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }
    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
</style>