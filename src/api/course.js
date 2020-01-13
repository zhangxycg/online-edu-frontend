import request from '@/utils/request'

export default {
    // 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course',
            method: 'post',
            data: courseInfo
        })
    },
    // 查询所有的讲师显示到下拉列表
    getAllTeacherList() {
        return request({
            url: '/eduservice/teacher',
            method: 'get',
        })
    }
}