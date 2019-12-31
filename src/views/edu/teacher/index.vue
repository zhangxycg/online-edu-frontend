<template>
  <div class="app-container">
    讲师列表
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 分页 -->
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getListTeacher"
      />
    </el-table>
  </div>
</template>

<script>
import teacher from '@/api/teacher'
export default {
  // 定义变量和初始值
  data() {
    return {
      listLoading: true, // 是否显示loading信息
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
      this.listLoading = true
      teacher.getTeacherPageList(this.page,this.limit,this.searchObj)
        .then(response => { // 如果请求成功，返回状态码20000，执行then里面的操作
          // console.log(response)
          // 每页数据
          this.list = response.data.items
          // 总记录数
          this.total = response.data.total

          this.listLoading = false
        }) 
        .catch(response => { // 如果请求失败，执行catch里面的操作
          console.log(response)
        })
    }
  }
}
</script>