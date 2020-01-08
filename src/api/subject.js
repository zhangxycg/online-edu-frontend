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
    
}