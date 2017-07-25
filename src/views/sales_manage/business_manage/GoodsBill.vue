<template>
    <div>
        <div>
            <el-row type="flex" :gutter="10">
                <el-col :span="2">
                    <el-button @click="queryDialogVisible = true">查询</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button :disabled="multipleSelection.length !== 1" @click="detailDialogVisible = true">查看</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button :disabled="multipleSelection.length !== 1" @click="changeDialogVisible = true">修改</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button @click="addDialogVisible = true">新增</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button :disabled="!multipleSelection.length" @click="deleteBillList">删除</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table_goods_bill">
            <el-table ref="multipleTable" :data="billList" border tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <!--<el-table-column label="日期" width="120">-->
                <!--<template scope="scope">{{ scope.row.date }}</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="billNumber" label="单据编号" width="120">
                </el-table-column>
                <el-table-column prop="billDate" label="业务日期" width="120">
                </el-table-column>
                <el-table-column prop="billOrg" label="业务组织" width="120">
                </el-table-column>
                <el-table-column prop="salesName" label="业务员" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <!--<div style="margin-top: 20px">-->
            <!--<el-button @click="toggleSelection([billList[1], billList[2]])">切换第二、第三行的选中状态</el-button>-->
            <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
            <!--</div>-->
        </div>
        <div>
            <el-dialog
                title="输入查询条件"
                :visible.sync="queryDialogVisible"
                size="tiny">
                <el-form class="small-space" :model="queryOptions" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                    <el-form-item label="业务组织">
                        <el-select class="filter-item" v-model="queryOptions.billOrg" placeholder="请选择">
                            <el-option v-for="item in orgOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务员姓名">
                        <el-input v-model="queryOptions.salesName" style="width: 50%;"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="queryDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="queryBillList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                title="详情"
                :visible.sync="detailDialogVisible"
                size="tiny"
                :before-close="handleCloseDetail">
                <span v-if="multipleSelection[0]">{{multipleSelection[0].detail}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="detailDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                title="修改"
                :visible.sync="changeDialogVisible"
                size="tiny"
                :before-close="handleCloseDetail">
                <el-form class="small-space" :model="changeOptions" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                    <el-form-item label="业务组织">
                        <el-select class="filter-item" v-model="changeOptions.billOrg" placeholder="请选择">
                            <el-option v-for="item in orgOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务员姓名">
                        <el-input v-model="changeOptions.salesName" style="width: 50%;"></el-input>
                    </el-form-item>
                    <el-form-item label="详情">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="changeOptions.detail" style="width: 60%">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="changeDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeBillList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                title="新增"
                :visible.sync="addDialogVisible"
                size="tiny">
                <el-form class="small-space" :model="addOptions" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                    <el-form-item label="业务组织">
                        <el-select class="filter-item" v-model="addOptions.billOrg" placeholder="请选择">
                            <el-option v-for="item in orgOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务员姓名">
                        <el-input v-model="addOptions.salesName" style="width: 50%;"></el-input>
                    </el-form-item>
                    <el-form-item label="详情">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="addOptions.detail" style="width: 60%">
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBillList">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import * as goodsBillService from 'api/goodsBill';
    export default {
        data () {
            return {
                data: [],
                queryOptions: {
                    billOrg: '',
                    salesName: ''
                },
                addOptions: {
                    billOrg: '',
                    salesName: '',
                    detail: ''
                },
                multipleSelection: [],
                queryDialogVisible: false,
                changeDialogVisible: false,
                detailDialogVisible: false,
                addDialogVisible: false
            };
        },
        computed: {
            billList () {
                return this.data.billList || [];
            },
            orgOptions () {
                return this.data.orgOptions || [];
            },
            changeOptions () {
                return this.multipleSelection[0] || {};
            }
        },
        created () {
            // get不传参默认查询全部
            goodsBillService.queryBillList().then(response => {
                if (response.responseCode === '000000') {
                    this.data = response.data;
//                    this.billList = data.billList;
                } else {
                    console.log(response.errMsg || '错误');
                }
            }).catch(response => {
            });
        },
        methods: {
            toggleSelection (rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange (val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            handleCloseDetail (done) {
//                this.$confirm('确认关闭？')
//                    .then(_ => {
//                        done();
//                    })
//                    .catch(_ => {});
            },
            // 输入条件查询
            queryBillList () {
//                this.billList = this.billList.filter(item => !this.multipleSelection.includes(item.billNumber));
//                let delArr = this.multipleSelection.map(item => item.billNumber);
                console.log(this.queryOptions);
                // post传参数delArr说明是删除
                this.queryDialogVisible = false;
                goodsBillService.queryBillList({queryOptions: this.queryOptions}).then(response => {
                    if (response.responseCode === '000000') {
                        this.data = response.data;
//                        this.billList = data.billList;
                    } else {
                        console.log(response.errMsg || '错误');
                    }
                }).catch(response => {
                });
            },
            // 增加新项
            changeBillList () {
//                this.billList = this.billList.filter(item => !this.multipleSelection.includes(item.billNumber));
                this.changeDialogVisible = false;
                // post传参数delArr说明是删除
//                this.changeOptions.billNumber = this.multipleSelection[0].billNumber;
                console.log(this.changeOptions);
                goodsBillService.fetchBillList({changeOptions: this.changeOptions}).then(response => {
                    if (response.responseCode === '000000') {
                        this.data = response.data;
//                        this.billList = data.billList;
                    } else {
                        console.log(response.errMsg || '错误');
                    }
                }).catch(response => {
                });
            },
            // 增加新项
            addBillList () {
//                this.billList = this.billList.filter(item => !this.multipleSelection.includes(item.billNumber));
                this.addDialogVisible = false;
                // post传参数delArr说明是删除
                console.log(this.addOptions);
                goodsBillService.fetchBillList({addOptions: this.addOptions}).then(response => {
                    if (response.responseCode === '000000') {
                        this.data = response.data;
                        this.addOptions = {
                            billOrg: '',
                            salesName: '',
                            detail: ''
                        };
//                        this.billList = data.billList;
                    } else {
                        console.log(response.errMsg || '错误');
                    }
                }).catch(response => {
                });
            },
            // 删除指定项
            deleteBillList () {
//                this.billList = this.billList.filter(item => !this.multipleSelection.includes(item.billNumber));
                let delArr = this.multipleSelection.map(item => item.billNumber);
                console.log(delArr);
                // post传参数delArr说明是删除
                goodsBillService.fetchBillList({delArr: delArr}).then(response => {
                    if (response.responseCode === '000000') {
                        this.data = response.data;
//                        this.billList = data.billList;
                    } else {
                        console.log(response.errMsg || '错误');
                    }
                }).catch(response => {
                });
            }
        }
    };
</script>
<style scoped>
    .table_goods_bill {
        margin-top: 20px;
    }
</style>
