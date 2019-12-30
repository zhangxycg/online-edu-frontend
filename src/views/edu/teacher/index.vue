<template>
  <div class="app-container">
    讲师列表,haha
  </div>
</template>

<script>
import teacher from '@/api/teacher'
export default {
  // 定义变量和初始值
  data() {
    return {
      list:null, // 每页数据list集合
      total:0, // 总记录数
      page:1, // 当前页
      limit:10, // 每页记录数
      searchObj:{} // 查询条件
    }
  },
  // 在页面渲染之前调用，调用具体的方法
  created() {
    // 调用方法
    this.getListTeacher()
  },
  // 写具体的方法调用
  methods: {
    getListTeacher(page=1) {
      this.page = page
      teacher.getTeacherPageList(this.page,this.limit,this.searchObj)
        .then(response => { // 如果请求成功，返回状态码20000，执行then里面的操作
          console.log(response)
        }) 
        .catch(response => { // 如果请求失败，执行catch里面的操作

        })
    }
  }
}
</script>