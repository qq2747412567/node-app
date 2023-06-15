<template>

    <div>
        <div v-for="(data, index) in form" :key="index">
            <p class="xmsq">项目申请</p>
            <p class="projectname">项目名称: {{ data.projectname }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目负责人: {{ data.manname }}
            </p>
            <p class="projectphone">联系电话: {{ data.projectphone }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学号: {{ data.projectaccount }}
            </p>
            <p class="teachername">指导老师: {{ data.teachername }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请时间: {{ data.reporttime }}
            </p>
            <p class="projecttypes">项目类型: {{ data.projecttypes }}</p>
            <p class="membersaccount">成员一学号: {{ data.membersaccount }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成员一姓名: {{ data.membersname }}
            </p>
            <p class="membersprofessionalclass">成员一所在班级: {{ data.membersprofessionalclass }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成员一所在学院: {{ data.memberswhereschool }}
            </p>
            <p class="twomembersaccount">成员二学号: {{ data.twomembersaccount }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成员二姓名: {{ data.twomembersname }}
            </p>
            <p class="twomembersprofessionalclass">成员二所在班级: {{ data.twomembersprofessionalclass }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成员二所在学院: {{ data.twomemberswhereschool }}
            </p>
            <p class="thrmembersaccount">成员三学号: {{ data.thrmembersaccount }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成员三姓名: {{ data.thrmembersname }}
            </p>
            <p class="thrmembersprofessionalclass">成员三所在班级: {{ data.thrmembersprofessionalclass }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成员三所在学院: {{ data.thrmemberswhereschool }}
            </p>
            <p class="projectintroduction">项目简介: {{ data.projectintroduction }}</p>
            <p class="researchobjective">研究目的: {{ data.researchobjective }}</p>
            <p class="researchcontents">研究内容: { data.researchcontents }}</p>
            <p class="researchathomeandabroad">国内外研究现状: {{ data.researchathomeandabroad }}</p>
            <p class="projectinnovate">项目特色或创新点: {{ data.projectinnovate }}</p>
            <p class="technologyroadmap">技术路线及预期成果: {{ data.technologyroadmap }}</p>
            <p class="scheduling">项目进度安排: {{ data.scheduling }}</p>
            <p class="teacheropinion">指导老师意见: {{ data.teacheropinion }}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "fangwen",
        data() {
            return {
                // currentPage: 1, //当前页数
                // pageSize: 8, //每页获取条数（页面大小）
                form: [], //存放从后端传来的数据
            };
        },
        mounted() {
            this.fetchformdata()
        },
        methods: {
            //获取后端数据
            fetchformdata() {
                axios.get("/api/profiles").then(
                    response => {
                        this.form = response.data;
                        //console.log(response.data)
                    },
                    response => {
                        console.log("error");
                        alert("请求失败");
                    }
                );
            },
        }

    }
</script>

<style scoped>
    div {width: 666px;
        font-size: 20px;
    }
    p {text-indent: 36px;
    }
    .xmsq {font-weight: bold;
        font-size: 36px;
        line-height: 36px;
        text-align: center;
        text-indent: 250px;
    }
    .projectname {width: 666px;
    }
    .projectphone {width: 666px;
    }
    .teachername {width: 666px;
    }
    .projecttypes {width: 666px;
    }
    .membersaccount {width: 666px;
    }
    .membersprofessionalclass {width: 666px;
    }
    .twomembersaccount {width: 666px;
    }
    .twomembersprofessionalclass {width: 666px;
    }
    .thrmembersaccount {width: 666px;
    }
    .thrmembersprofessionalclass {width: 666px;
    }
    .projectintroduction {width: 666px;
    }
    .researchobjective {width: 666px;
    }
    .researchcontents {width: 666px;
    }
    .researchathomeandabroad {width: 666px;
    }
    .projectinnovate {width: 666px;
    }
    .technologyroadmap {width: 666px;
    }
    .scheduling {width: 666px;
    }
    .teacheropinion {width: 666px;
    }
</style>