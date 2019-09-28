import Vue from "vue"
import VueRouter from "vue-router"  //引入vue-router

import Logined from "@/components/common/Login.vue"
import Shome from "@/components/Students/Home.vue"  //引入学生端的主页面
import Major from "@/components/Students/Major.vue" //引入学生端我的专业页面
import Class from "@/components/Students/Class.vue" //引入学生端我的课程页面
import GrowUp from "@/components/Students/GrowUp.vue" //引入学生端我的成长页面
import Join from "@/components/Students/Join.vue" //引入学生端我的参与页面
import Exam from "@/components/Students/Exam.vue" //引入学生端我的参与页面
import StuPersonal from "@/components/Students/StuPersonal.vue"   //引入学生端的个人中心页面


import Thome from "@/components/Teachers/Home.vue"  //引入教师端的主页面
import MyMajor from "@/components/Teachers/MyMajor.vue" //引入教师端我教的专业页面
import MyExam from "@/components/Teachers/MyExam.vue"   //引入教师端的考试管理页面
import TPersonal from "@/components/Teachers/TPersonal.vue"   //引入教师端的个人中心页面

import myPersonal from "@/components/common/myPersonal.vue"   //引入个人资料与修改密码页面

import Stu from "@/components/Teachers/Stu.vue"   //引入学生管理页面
import SetCourse from "@/components/Teachers/SetCourse.vue"   //引入课程管理页面
import MyCon from "@/components/Teachers/MyCon.vue"   //引入我的贡献页面


Vue.use(VueRouter)  //在vue对象中使用vue-router

// 1.router：一般指的是路由实例。如：路由编程式导航的$router.push()

// 2.routes：指创建vue-router路由实例的配置项。用来配置多个route路由对象

// 3.route：指路由对象。如：this.$route指的就是当前路由对象

const routes = [
    {
        path: "/",
        redirect: "/logined"  //路由重定向：访问根目录时，重定向到logined目录
    },
    {
        path: "/logined",
        component: Logined
    },
    {
        path: "/teacher",   //教师端的路由配置
        component: Thome,
        children: [
            {
                path: "MyMajor",
                component: MyMajor,
                name: "MyMajor"
            },
            {
                path: "MyExam",
                component: MyExam,
                name: "MyExam"
            },
            {
                path: "TPersonal",
                component: TPersonal,
                name: "TPersonal"
            },
            {
                path: "myPersonal",
                component: myPersonal,
                name: "myPersonal"
            },
            {
                path: "Stu",
                component: Stu,
                name: "Stu"
            },
            {
                path: "SetCourse",
                component: SetCourse,
                name: "SetCourse"
            },
            {
                path: "MyCon",
                component: MyCon,
                name: "MyCon"
            }
        ]
    },
    {
        path: "/student",   //学生端的路由配置
        component: Shome,
        children: [
            {
                path: "Major",
                component: Major,
                name: "Major"
            },
            {
                path: "Class",
                component: Class,
                name: "Class"
            },
            {
                path: "GrowUp",
                component: GrowUp,
                name: "GrowUp"
            },
            {
                path: "Join",
                component: Join,
                name: "Join"
            },
            {
                path: "Exam",
                component: Exam,
                name: "Exam"
            },
            {
                path: "StuPersonal",
                component: StuPersonal,
                name: "StuPersonal"
            },
            {
                path: "myPersonal",
                component: myPersonal,
                name: "myPersonal"
            }
        ]
    }
]

const router = new VueRouter({  //将routes注册到router中
    routes
})

export default router;