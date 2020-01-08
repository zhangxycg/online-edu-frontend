import request from '@/utils/request'

export default {
    // 查询课程
    getAllSubjectList() {
        return request({
            url: '/eduservice/subject',
            method: 'get'
        })
    }
    
}