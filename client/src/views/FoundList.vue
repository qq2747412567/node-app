<template>
    <div class="fillcontain">
        <div>
            <el-form :inline="true" ref="search_data" :model="search_data">
                <el-form-item label="项目申请时间筛选:">
                    <el-date-picker
                            v-model="search_data.startTime"
                            type="datetime"
                            placeholder="选择开始时间"
                    >
                    </el-date-picker>
                    --
                    <el-date-picker
                            v-model="search_data.endTime"
                            type="datetime"
                            placeholder="选择结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button
                            type="primary"
                            size="small"
                            icon="search"
                            @click="onScreeoutMoney()"
                    >筛选</el-button
                    >
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button
                            type="primary"
                            size="small"
                            icon="view"
                            @click="onAddMoney()"
                    >添加</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table

                    :data="filteredData"
                    max-height="450"
                    border
                    :default-sort="{ prop: 'date', order: 'descending' }"
                    style="width: 100%"
            >
                <el-table-column type="index" label="序号" align="center" width="70">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="创建时间"
                        align="center"
                        width="250"
                        sortable
                >
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="projectname"
                        label="项目名称"
                        align="center"
                        width="280"
                >
                </el-table-column>
                <el-table-column
                        prop="manname"
                        label="项目负责人"
                        align="center"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="judgment"
                        label="立项状态"
                        align="center"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="Ejudgment"
                        label="结项状态"
                        align="center"
                        width="100"
                >
                </el-table-column>
                <el-table-column prop="projectphone" label="联系电话" align="center" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="projectaccount" label="学号" align="center" width="160">
                    <template slot-scope="scope">
                        <span>{{ scope.row.projectaccount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teachername"
                        label="指导老师"
                        align="center"
                        width="150"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.teachername }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="projecttypes" label="项目类型" align="center" width="200">
                </el-table-column>
                <el-table-column
                        prop="operation"
                        align="center"
                        label="操作"
                        fixed="right"
                        width="240"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                icon="view"
                                size="small"
                                @click="Look(scope.row)">查看</el-button>
                        <el-button
                                v-if="scope.row.judgment !== '项目立项'"

                                type="danger"
                                icon="edit"
                                size="small"
                                @click="onEditMoney(scope.row, scope.$index)">编辑</el-button>
                        <el-button
                                v-else
                                type="danger"
                                icon="edit"
                                size="small"
                                disabled>编辑</el-button>
                        <el-button
                                v-if="scope.row.judgment !== '项目立项'"
                                type="danger"
                                icon="delete"
                                size="small"
                                @click="onDeleteMoney(scope.row, scope.$index)">删除</el-button>
                        <el-button
                                v-else
                                type="danger"
                                icon="delete"
                                size="small"
                                disabled>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                v-if="paginations.total > 0"
                                :page-sizes="paginations.page_sizes"
                                :page-size="paginations.page_size"
                                :layout="paginations.layout"
                                :total="paginations.total"
                                :current-page.sync="paginations.page_index"
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                        >
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 弹框页面 -->
        <DialogFound
                :dialog="dialog"
                :modal="false"
                :form="form"
                @update="getProfile"
        ></DialogFound>
    </div>
</template>

<script>
    import DialogFound from "../components/DialogFound";
    export default {
        name: "fundlist",

        computed: {
            user() {
                return this.$store.getters.user;
            },
        },


        data() {
            return {
                tableData: [],
                filteredData:[],
                allTableData: [],
                filterTableData: [],
                dialog: {
                    show: false,
                    title: "",
                    option: "edit",
                },
                form: {
                    projectname: "",
                    manname: "",
                    projectphone: "",
                    projectaccount: "",
                    teachername: "",
                    reporttime: "",
                    id: "",
                },
                //需要给分页组件传的信息
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 5, // 1页显示多少条
                    page_sizes: [5, 10, 15, 20], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
                },
                search_data: {
                    startTime: "",
                    endTime: "",
                },
            };
        },

        components: {
            DialogFound,
        },
        created() {
            this.getProfile();
        },
        methods: {

            filterData() {
                this.filteredData = this.allTableData.filter((item) => {
                    return item.manname === this.user.name;
                });
            },

            getProfile() {
                // 获取表格数据
                this.$axios("/api/profiles").then((res) => {

                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    this.filterData();
                    // 设置分页数据
                    this.setPaginations();
                });

                },


            Look(row) {
                this.dialog = {
                    show: true,
                    title: "查看",
                    option: "view",
                };
                this.form = {
                    projectname: row.projectname,
                    manname: row.manname,
                    projectphone: row.projectphone,
                    projectaccount: row.projectaccount,
                    teachername: row.teachername,
                    reporttime: row.reporttime,
                    projecttypes: row.projecttypes,
                    membersaccount: row.membersaccount,
                    membersname: row.membersname,
                    membersprofessionalclass: row.membersprofessionalclass,
                    memberswhereschool: row.memberswhereschool,
                    twomembersaccount: row.twomembersaccount,
                    twomembersname: row.twomembersname,
                    twomembersprofessionalclass: row.twomembersprofessionalclass,
                    twomemberswhereschool: row.twomemberswhereschool,
                    thrmembersaccount: row.thrmembersaccount,
                    thrmembersname: row.thrmembersname,
                    thrmembersprofessionalclass: row.thrmembersprofessionalclass,
                    thrmemberswhereschool: row.thrmemberswhereschool,
                    projectintroduction: row.projectintroduction,
                    researchobjective: row.researchobjective,
                    researchcontents: row.researchcontents,
                    researchathomeandabroad: row.researchathomeandabroad,
                    projectinnovate: row.projectinnovate,
                    technologyroadmap: row.technologyroadmap,
                    scheduling: row.scheduling,
                    id: row._id,
                };
            },
            onEditMoney(row) {
                // 编辑
                this.dialog = {
                    show: true,
                    title: "修改申报信息",
                    option: "edit",
                };
                this.form = {
                    projectname: row.projectname,
                    manname: row.manname,
                    projectphone: row.projectphone,
                    projectaccount: row.projectaccount,
                    teachername: row.teachername,
                    reporttime: row.reporttime,
                    projecttypes: row.projecttypes,
                    membersaccount: row.membersaccount,
                    membersname: row.membersname,
                    membersprofessionalclass: row.membersprofessionalclass,
                    memberswhereschool: row.memberswhereschool,
                    twomembersaccount: row.twomembersaccount,
                    twomembersname: row.twomembersname,
                    twomembersprofessionalclass: row.twomembersprofessionalclass,
                    twomemberswhereschool: row.twomemberswhereschool,
                    thrmembersaccount: row.thrmembersaccount,
                    thrmembersname: row.thrmembersname,
                    thrmembersprofessionalclass: row.thrmembersprofessionalclass,
                    thrmemberswhereschool: row.thrmemberswhereschool,
                    projectintroduction: row.projectintroduction,
                    researchobjective: row.researchobjective,
                    researchcontents: row.researchcontents,
                    researchathomeandabroad: row.researchathomeandabroad,
                    projectinnovate: row.projectinnovate,
                    technologyroadmap: row.technologyroadmap,
                    scheduling: row.scheduling,
                    id: row._id,
                };
                this.filterData();
            },
            onDeleteMoney(row, index) {
                // 删除
                this.$axios.delete(`/api/profiles/delete/${row._id}`).then((res) => {
                    this.$message("删除成功");
                    this.getProfile();
                });
                this.filterData();
            },
            onAddMoney() {
                // 添加
                this.dialog = {
                    show: true,
                    title: "添加申报信息",
                    option: "add",
                };
                this.form = {
                    projectname: "",
                    manname: "",
                    projectphone: "",
                    projectaccount: "",
                    teachername: "",
                    reporttime: "",
                    projecttypes: "",
                    membersaccount: "",
                    membersname: "",
                    membersprofessionalclass: "",
                    memberswhereschool: "",
                    twomembersaccount: "",
                    twomembersname: "",
                    twomembersprofessionalclass: "",
                    twomemberswhereschool: "",
                    thrmembersaccount: "",
                    thrmembersname: "",
                    thrmembersprofessionalclass: "",
                    thrmemberswhereschool: "",
                    projectintroduction: "",
                    researchobjective: "",
                    researchcontents: "",
                    researchathomeandabroad: "",
                    projectinnovate: "",
                    technologyroadmap: "",
                    scheduling: "",
                    // teacheropinion: "",
                    id: "",
                };
                this.filterData();
            },
            handleCurrentChange(page) {
                // 获取当前页
                let sortnum = this.paginations.page_size * (page - 1);
                //数据总数
                //let nums = this.paginations.page_size * page
                let table = this.allTableData.filter((item, index) => {
                    return index >= sortnum;//容器
                });
                // 设置默认分页数据
                this.filterData = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
                this.filterData();
            },
            handleSizeChange(page_size) {
                // 切换size
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.filteredData = this.allTableData.filter((item, index) => {
                    return index < page_size;
                });
                this.filterData();
            },
            setPaginations() {
                // 总页数
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                // 设置默认分页数据
                this.filteredData = this.allTableData.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
                this.filterData();
            },
            onScreeoutMoney() {
                // 筛选
                if (!this.search_data.startTime || !this.search_data.endTime) {
                    this.$message({
                        type: "warning",
                        message: "请选择时间区间",
                    });
                    this.getProfile();
                    return;
                }
                const stime = this.search_data.startTime.getTime();
                const etime = this.search_data.endTime.getTime();
                this.allTableData = this.filterTableData.filter((item) => {
                    let date = new Date(item.date);
                    let time = date.getTime();
                    return time >= stime && time <= etime;
                });
                // 分页数据的调用
                this.setPaginations();
                this.filterData();
            },
        },

    };
</script>
<style scoped>
    .fillcontain {
        width: 100%;
        height: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
    .btnRight {
        float: right;
    }
    .pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>
