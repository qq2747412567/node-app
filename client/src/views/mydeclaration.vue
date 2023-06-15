<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="projectname"
                label="项目名称"
                width="180">
        </el-table-column>
        <el-table-column
                prop="manname"
                label="负责人"
                width="180">
        </el-table-column>
        <el-table-column
                prop="projectphone"
                label="负责人联系方式">
        </el-table-column>
        <el-table-column
                label="操作"
                align="center"
                width="350">
            <template slot-scope="scope">
                <el-button @click="handle" type="text" size="large">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>




<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tableData: [{

                }]
            }
        },
        methods:{
            handle (){
                //  路径/home对应我在router目录下index.js中定义的path属性值
                this.$router.push('/form');
            }
        }
    }


</script>