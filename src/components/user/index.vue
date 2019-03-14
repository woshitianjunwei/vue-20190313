<template>
    <div>
        <div>
            <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table> -->
            <!-- <Button @click="handleSelectAll(true)">全选</Button> -->
            <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
            <Button type="primary" @click="modal = true" style=" float:left">添加用户</Button>  
            <Button type="warning" @click="removeSelection">删除选中</Button>  
        </div>
            
        <Modal v-model="modal" draggable scrollable title="用户添加" 
        @on-ok="ok"
        @on-cancel="cancel">
           <Form ref="columns" :label-width="80" :label-padding="10">
                <FormItem label="" prop="id">
                    <Input v-model="formValidate.id"></Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
                </FormItem>
                <FormItem label="身份证" prop="sfz">
                    <Input v-model="formValidate.sfz" placeholder="Enter your sfz"></Input>
                </FormItem>
                <FormItem label="年龄" prop="age">
                    <Input v-model="formValidate.age" placeholder="Enter your age"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
                </FormItem>
                <FormItem label="身高" prop="personHeight">
                    <Input v-model="formValidate.personHeight" placeholder="Enter your personHeight"></Input>
                </FormItem>
                <FormItem label="婚姻" prop="marry">
                    <!-- <Input v-model="formValidate.marry" placeholder="Enter your Marriage Status"></Input> -->
                    <input v-model="formValidate.marry" placeholder="Enter your Marriage Status">
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <RadioGroup v-model="formValidate.sex">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="爱好" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input v-model="formValidate.desc" 
                    type="textarea" 
                    :autosize="{minRows: 2,maxRows: 5}" 
                    placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('columns')">Submit</Button>
                    <Button @click="handleReset('columns')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Modal>

        
        <Table border ref="selection" :columns="columns" :data="list"></Table>
        <Page :total="total" show-sizer @on-change="onChangePage"/>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    id:'',
                    name: '',
                    password: '',
                    sfz:undefined,
                    age:undefined,
                    email:'',
                    personHeight:undefined,
                    marry:true,
                    sex: '',
                    interest:[],
                    desc:'',
                },
               
                modal:false,
                columns: [
                    {type: 'selection',align: 'center'},
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person',
                                        required: true
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {title: '密码',key: 'password',trigger: 'blur'},
                    {title: '身份证',key: 'sfz'},
                    {title: '年龄',key: 'age'},
                    {title: '邮箱',key: 'email'},
                    {title: '身高',key: 'personHeight'},
                    {title: '婚姻',key: 'marry'},
                    {title: '性别',key: 'sex'},
                    {title: '爱好',key: 'interest'},
                    {title: '描述',key: 'desc'},
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal=true;
                                            
                                            this.axios({
                                                url:`http://localhost:3000/users/${params.row._id}`,
                                                method:'get',
                                                
                                            }).then(res=>{
                                               this.formValidate =res.data
                                               this.formValidate.id=this.formValidate._id
                                            })
                                        }
                                    }
                                }, 'Update'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row._id)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                list:[],
                rows:10,
                total:0,//记录
                page:1
            }
            

        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            removeSelection(id){
                this.$refs.selection.remove(id);
            },
            ok () {
                this.$Message.info('Clicked ok');
                this.resetFields();
            },
            cancel () {
                this.$Message.info('Clicked cancel');
                this.resetFields();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) { 
                        if(this.formValidate._id){
                            console.log(this.formValidate._id)
                            this.axios({
                                url:`http://localhost:3000/users/${this.formValidate._id}`,//通配符
                                method:'put',
                                data:this.formValidate,
                            }).then(res=>{
                                this.getList();
                            })
                        }else{
                            // console.log('添加')
                            this.axios({
                                url:`http://localhost:3000/users`,
                                method:'post',
                                data:this.formValidate,
                            }).then(res=>{
                                this.getList();
                                // console.log(this.formValidate)
                                this.modal=false;
                            })
                        }                       
                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            resetFields(){//表单重置
                Object.assign(this.$data.formValidate,this.$options.data().formValidate)
            },
            getList(){//获取数据库数据
                this.axios({
                    url:'http://localhost:3000/users/list',
                    method:'post',
                    data:{
                        rows:this.rows,
                        page:this.page
                    }
                }).then(res=>{
                    this.list=res.data.rows;
                    this.total=res.data.total;
                })
            },
            onChangePage(page){
                 this.page=page;
                 this.getList();
            },
            
            remove (id) {
                this.$Modal.confirm({
                    title: '确认删除？',
                    content: '<p>Are You Sure？</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                        this.axios({
                            url:`http://localhost:3000/users/${id}`,//通配符
                            method:'delete'
                        }).then(res=>{
                            this.getList();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            },        
        },
        mounted() {//钩子函数，进入页面自动出现数据
            this.getList();
        },
    }
</script>
