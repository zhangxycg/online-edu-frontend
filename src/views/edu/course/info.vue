<template>

    <div class="app-container">

        <h2 style="text-align: center;">发布新课程</h2>

        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"/>
        <el-step title="创建课程大纲"/>
        <el-step title="提交审核"/>
        </el-steps>

        <el-form label-width="120px">

            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
            </el-form-item>

            <!-- 所属分类：级联下拉列表 -->
            <!-- 一级分类 -->
            <el-form-item label="课程类别">
            <el-select
                v-model="courseInfo.subjectParentId"
                placeholder="请选择" @change="subjectLevelOneChanged">
                <el-option
                v-for="subject in oneLevelSubjectList"
                :key="subject.id"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
            <!-- 二级分类 -->
                <el-select v-model="courseInfo.subjectId" placeholder="请选择">
                <el-option
                    v-for="subject in twoLevelSubjectList"
                    :key="subject.value"
                    :label="subject.title"
                    :value="subject.id"/>
                </el-select>
            </el-form-item>

            <!-- 课程讲师 -->
            <el-form-item label="课程讲师">
                <el-select
                    v-model="courseInfo.teacherId"
                    placeholder="请选择">
                    <el-option
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id"/>
                </el-select>
            </el-form-item>

            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
            </el-form-item>

            <!-- 课程简介 TODO -->
            <el-form-item label="课程简介">
                <tinymce :height="300" v-model="courseInfo.description"/>
            </el-form-item>

            <!-- 课程封面 TODO -->
            <el-form-item label="课程封面">
                <el-upload
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :action="BASE_API+'/eduservice/oss/upload'"
                    class="avatar-uploader">
                    <img :src="courseInfo.cover">
                </el-upload>
            </el-form-item>

            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import course from '@/api/course'
import subject from '@/api/subject'
import Tinymce from '@/components/Tinymce'

const defaultForm = {
        title: '',
        subjectId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg',
        price: 0
}

export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled: false, // 保存按钮是否禁用
            teacherList: [], // 存储所有的讲师的信息 集合
            oneLevelSubjectList: [], // 一级分类集合
            twoLevelSubjectList: [], // 二级分类集合
            courseInfo: defaultForm,
            BASE_API: process.env.BASE_API // 接口API地址
        }
    },
    created() {
        console.log('info created')
        this.init()
        // 调用获取所有讲师的方法
        this.getTeacherList()
        // 调用获取一级分类信息的方法
        this.getLevelAll()
    },
    methods: {
        // 判断路由是否有id值
        init() {
            if (this.$router.params && this.$router.params.id) {
                // 根据id进行查询，做数据回显
                const id = this.$router.params.id 
            } else {
                // 没有id值，清空数据
                this.courseInfo = { ... defaultForm }
            }
        },
        // 上传封面之前调用的方法
        beforeAvatarUpload(file) {
            // 设置允许上传图片的格式、上传图片的大小
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M

        },
        // 上传封面成功之后调用的方法
        handleAvatarSuccess(res,file) {
            // 上传成功之后，获取上传图片的OSS路径，赋值给课程封面字段
            this.courseInfo.cover = res.data.imgurl
        },
        // 触发change事件，显示一级分类里面所有的二级分类
        subjectLevelOneChanged(value) {
            // 获取选择一级分类的Id值
            // 根据一级分类Id值，获取下面所有二级分类

            // 1. 遍历所有一级分类集合
            // 2. 获取每个一级分类
            // 3. 判断value值和遍历出来的每一个一级分类id值是否一样
            // 如果一样，获取下面二级分类，是children
            for(var i = 0; i < this.oneLevelSubjectList.length; i++) {
                // 获取每一个一级分类
                var levelOne = this.oneLevelSubjectList[i]
                // 判断value值和遍历出来的每一个一级分类id值是否一样
                if (levelOne.id === value) {
                    // 获取下面的二级分类，是children
                    this.twoLevelSubjectList = levelOne.children
                    this.courseInfo.subjectId = ''
                }

            }
        },
        // 获取所有分类的信息
        getLevelAll() {
            subject.getAllSubjectList()
                .then(response => {
                    this.oneLevelSubjectList = response.data.OneSubjectDto
                })
        },

        // 获取所有讲师的方法
        getTeacherList() {
            course.getAllTeacherList()
                .then(response => {
                    this.teacherList = response.data.items
                })
        },
        // 保存课程
        next() {
            // 判断是添加还是修改，判断课程对象里面是否有id值
            if (!this.courseInfo.id) {
                // 添加
                this.addCourse()
            } else {
                // 修改
                this.updateCourse()
            }
            
        },
        // 添加课程
        addCourse() {
            // 调用方法
            course.addCourseInfo(this.courseInfo)
                .then(response => {
                    console.log('***** '+response)
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    })                  
                    //路由跳转，到编写大纲页面
                    this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })
                .catch(response => {
                    console.log('###### '+response)
                    this.$message({
                        type: 'success',
                        message: '添加课程信息失败!'
                    })
                })
        },
        // 修改课程
        updateCourse() {

        }
    }
}
</script>
<style scoped>
.tinymce-container {
    line-height: 29px;
}
</style>