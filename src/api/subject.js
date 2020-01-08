import request from '@/utils/request'

export default {
    // 查询课程
    getAllSubjectList() {
        return request({
            url: '/eduservice/subject',
            method: 'get'
        })
    },
    // 删除课程
    removeSubjectId(id) {
        return request({
            url: '/eduservice/subject/'+id,
            method: 'delete'
        })
    },
    // 添加一级分类
    addSubjectOne(subject) {
        return request({
            url: '/eduservice/subject/addOneLevel',
            method: 'post',
            data: subject
        })
    },
    // 添加二级分类
    addSubjectTwo(subject) {
        return request({
            url: '/eduservice/subject/addTwoLevel',
            method: 'post',
            data: subject
        })
    }
}