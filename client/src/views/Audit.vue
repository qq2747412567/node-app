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

            </el-form>
        </div>
        <div class="table_container">
            <el-table
                    v-if="tableData.length > 0"
                    :data="tableData"
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
                        width="333"
                >
                </el-table-column>
                <el-table-column
                        prop="manname"
                        label="项目负责人"
                        align="center"
                        width="180"
                >
                </el-table-column>
                <el-table-column prop="projectphone" label="联系电话" align="center" width="160">
                    <template slot-scope="scope">
                        <span >{{ scope.row.projectphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="projectaccount" label="学号" align="center" width="160">
                    <template slot-scope="scope">
                        <span >{{ scope.row.projectaccount }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="teachername"
                        label="指导老师"
                        align="center"
                        width="170"
                >
                    <template slot-scope="scope">
                        <span >{{ scope.row.teachername }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="projecttypes" label="项目类型" align="center" width="220">
                </el-table-column>
                <el-table-column
                        prop="operation"
                        align="center"
                        label="操作"
                        fixed="right"
                        width="180"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                icon="view"
                                size="small"
                                @click="Look(scope.row)">查看</el-button>
                        <el-button
                                type="danger"
                                icon="delete"
                                size="small"
                                @click="Audit(scope.row, scope.$index)">审核意见</el-button>
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
        <DialogAudit
                :dialog="dialog"
                :form="form"
                @update="getProfile"
        ></DialogAudit>
    </div>
</template>

<script>
    import DialogAudit from "../components/DialogAudit";

    export default {
        name: "fundlist",
        data() {
            return {
                tableData: [],
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
            DialogAudit,
        },
        created() {
            this.getProfile();
        },
        methods: {
            getProfile() {
                // 获取表格数据
                this.$axios("/api/profiles").then((res) => {
                    // this.tableData = res.data;
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
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
                this.form = Object.assign({}, row);
            },



            Audit(row) {
                // 审核
                this.dialog = {
                    show: true,
                    title: "审核",
                    option: "edit",
                };
                this.form = {
                    judgment:row.judgment,
                    teacheropinion: row.teacheropinion,
                    id: row._id,
                };
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
                this.tableData = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            handleSizeChange(page_size) {
                // 切换size
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < page_size;
                });
            },
            setPaginations() {
                // 总页数
                this.paginations.total = this.allTableData.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                // 设置默认分页数据
                this.tableData = this.allTableData.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
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
