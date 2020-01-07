import request from '@/utils/request' // 模板提供的组件，axios封装

export default {
    // 分页条件查询的方法
    // 三个参数：当前页、每页的记录数、条件封装的对象
    getTeacherPageList(page, limit, searchObj) {
        return request({
            // 后端controller的路径
            url: '/eduservice/teacher/moreConditonPageList/' + page + '/' + limit,
            // 提交方式
            method: 'post',
            // 传递条件对象，如果传递json数据，使用data
            data: searchObj
        })
    },
    // 删除
    deleteTeacherId(id) {
        return request({
            // 后端controller的路径
            url: '/eduservice/teacher/' + id,
            // 提交方式
            method: 'delete'
        })
    },
    // 添加
    saveTeacher(teacher) {
        return request({
            // 后端controller的路径
            url: '/eduservice/teacher/addTeacher',
            // 提交方式
            method: 'post',
            data: teacher
        })
    },
    // 根据id进行查询
    getTeacherId(id) {
        return request({
            // 后端controller的路径
            url: '/eduservice/teacher/getTeacherInfo/'+id,
            // 提交方式
            method: 'get',
        })
    },
    // 修改讲师 
    updateTeacherId(id,teacher) {
        return request({
            // 后端controller的路径
            url: '/eduservice/teacher/updateTeacher/'+id,
            // 提交方式
            method: 'post',
            data: teacher
        })
    }
}
