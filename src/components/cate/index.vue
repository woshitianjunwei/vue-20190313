<template>
    <div>
        <Button type="primary" @click="modal = true">添加分类</Button>
        <Button type="warning" @click="remove">删除选中</Button>
        <Modal v-model="modal" draggable scrollable title="addCate" @on-ok="ok" @on-cancel="cancel">
            <Input v-model="value" placeholder="Enter addCate" clearable/>
        </Modal>

        <Button type="info">新闻</Button>
        <Button type="success">产品</Button>
<!-- type=1是新闻，type=2是产品 -->
        <Tree :data="data1" @on-select-change="ocClick"></Tree>
        
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
               data1:[
                   {title:'',},
                   {type:'',},
               ],
               modal:false,
               modal1:false,
               value:'',
               treeSelect:'',
            }
        },
        methods:{
            getCate(){
                this.axios({
                    url:`http://localhost:3000/cate/list/1`,
                    method:'post'
                }).then(res=>{
                    this.data1=res.data
                })
            },
            ok () {
                this.$Message.info('Clicked ok');
                this.axios({//添加分类
                    url:`http://localhost:3000/cate`,
                    method:'post',
                    data:{
                        title:this.value,
                        type:this.treeSelect[0].type,
                        parentId:this.treeSelect[0]._id,
                        expand: true,
                    }
                }).then(res=>{
                    this.getCate();
                })
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            ocClick(getClick){
                this.treeSelect=getClick;
                console.log(this.treeSelect)
            },
            remove(){
                console.log(this.treeSelect);
                this.$Modal.confirm({
                    title: '确认删除？',
                    content: '<p>Are You Sure？</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                        this.axios({
                            url:`http://localhost:3000/cate/${this.treeSelect[0]._id}`,//通配符
                            method:'delete',
                        }).then(res=>{
                            this.getCate()         
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            }
        },
        mounted(){
            this.getCate()
        }
    }
</script>
