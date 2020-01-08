<template>
    <div class="app-container">
        <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

        <el-button type="text" @click="addOneLeveldialog">添加一级分类</el-button>
        <el-tree
            ref="subjectTree"
            :data="subjectList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            class="filter-tree"
            default-expand-all
            node-key="id">

            <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                <!-- 使用Chrome的Vue插件调试 
                @click="() => {dialogFormVisible=true;subject.parentId=data.id}">添加二级分类</el-button>
                -->
                <el-button
                    v-if="node.level == 1"
                    type="text"
                    size="mini"
                    @click="() => {dialogFormVisible=true;subject.parentId=data.id}">添加二级分类</el-button>
                <el-button
                    v-if="node.level == 2 || node.level == 1" 
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)">删除</el-button>
                </span>
            </span>
        </el-tree>

        <!-- 弹框 -->
        <el-dialog :visible.sync="dialogFormVisible" title="添加分类">
            <el-form :model="subject" label-width="120px">
                <el-form-item label="分类标题">
                    <el-input v-model="subject.title"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="appendLevel()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import subject from '@/api/subject'

export default {

    data() {
        return {
            filterText: '',
            subjectList: [],
            dialogFormVisible:false, //弹框默认false，不显示
            subject: {  //分类对象初始值
                title:'',
                parentId: ''
            },
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    watch: {
        filterText(val) {
        this.$refs.tree2.filter(val)
        }
    },
    created () {
        this.getAllSubject()
    },
    methods: {
        // 添加一级分类
        appendLevel() {
            subject.addSubjectOne(this.subject)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加分类成功!'
                    })
                    // 关闭弹框
                    this.dialogFormVisible = false
                    // 刷新整个列表的页面
                    this.getAllSubject()
                })
                .catch(response => {
                    this.$message({
                        type: 'success',
                        message: '添加分类成功!'
                    })
                })
        },
        // 点击一级分类，弹出添加框
        addOneLeveldialog() {
            this.dialogFormVisible = true
        },
        //删除分类的方法
        remove(node, data) {
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //调用方法进行删除
                //return 表示后面then还会执行
                return subject.removeSubjectId(data.id)
            }).then(() => {
                //刷新整个页面
                //this.getAllSubject()
                //dom操作
                //document.getElementById("ID").removeChild(node)
                this.$refs.subjectTree.remove(node) // 删除节点
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                //判断点击取消，还是删除失败
                if (response === 'cancel') {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败'
                    })
                }        
            })
        
        },
        // 获取整个页面
        getAllSubject() {
        subject.getAllSubjectList()
            .then(response => {
                this.subjectList = response.data.OneSubjectDto
            })
        },
        filterNode(value, data) {
        if (!value) return true
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
    }
}
</script>

