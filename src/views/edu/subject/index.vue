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

    <el-dialog :visible.sync="dialogFormVisible" title="添加分类">
        <el-form :model="subject" label-width="120px">
            <el-form-item label="分类标题">
                <el-input v-model="subject.title"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="appendSubject()">确 定</el-button>
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

