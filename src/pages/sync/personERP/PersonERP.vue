<template>
    <div>
        <a-modal :visible="visibleHistory" title="同步历史" @ok="handleOkHistory" width="100%" wrapClassName="full-modal"
            @cancel="cancel">
            <template>
                <a-table :columns="columnsH" :data-source="dataH" size="middle">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="TYPE" slot-scope="TYPE">
                        <a-tag :key="TYPE" :color="TYPE == '1' ? '#69c0ff' : '#95de64'">
                            <span>
                                {{ (TYPE==1)?'添加新人':'绑定编号' }}
                            </span>
                        </a-tag>

                    </span>
                </a-table>
            </template>
        </a-modal>
        <a-modal title="同步人员信息" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" width="70vh"
            @cancel="handleCancel">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="同步方式" has-feedback validate-status="success">
                    <a-select default-value="2" @change="changeShow">
                        <a-select-option value="1">
                            添加新人(ERP)
                        </a-select-option>
                        <a-select-option value="2">
                            按照编号绑定
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <template v-if="!show">
                    <a-form layout="inline">
                        <a-form-item label="人员号码" has-feedback :validate-status="addPerson.idError"
                            v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]">
                            <a-input allow-clear style="width: 100%" v-model="addPerson.id" />
                        </a-form-item>
                        <a-form-item label="手机号码" has-feedback>
                            <a-input style="width: 100%" v-model="addPerson.phone" />
                        </a-form-item>
                        <a-form-item label="姓名" has-feedback :validate-status="addPerson.nameError">
                            <a-input allow-clear placeholder="with allowClear" style="width: 100%"
                                v-model="addPerson.name" />
                        </a-form-item>

                        <a-form-item label="性别">
                            <a-select :default-value="sex_add" v-model="addPerson.sex" name="addPerson.sex">
                                <a-select-option value="M">
                                    男
                                </a-select-option>
                                <a-select-option value="L">
                                    女
                                </a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item :label="$t('country')" :labelCol="{ span: 5 }"
                            :wrapperCol="{ span: 18, offset: 1 }" @change="changeSex">
                            <a-select v-model="country_id" name="country_id">
                                <template v-for="ct in addPerson.country">
                                    <template>
                                        <a-select-option v-bind:key="ct.CodeID" :value="ct.CodeID">{{
                                                ct.CodeName
                                        }}
                                        </a-select-option>
                                    </template>
                                </template>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </template>
                <template v-if="show">
                    <a-form-item label="人员号码" :validate-status="validate" help="输入照编号或姓名">
                        <a-select show-search placeholder="清选择人员" option-filter-prop="children"
                            :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                            @change="handleChangePersonNo">
                            <template v-for="item in combo_person">
                                <a-select-option :value="item.value" :key="item.value">
                                    {{ `${item.value} - ${item.title}` }}
                                </a-select-option>
                            </template>
                        </a-select>
                    </a-form-item>
                </template>
            </a-form>
        </a-modal>
        <a-card>
            <div :class="advanced ? 'search' : null">
                <a-form layout="horizontal">
                    <div :class="advanced ? null : 'fold'">
                        <a-row>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('personNo')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-input placeholder="请输入" v-model="personNo" name="personNo" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('personName')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-input placeholder="请输入" v-model="personName" name="personName" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('phoneNumber')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-input placeholder="请输入" v-model="phone" name="phone" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('sex')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-select default-value="2" name="sex">
                                        <a-select-option value="2">{{ $t('both') }}</a-select-option>
                                        <a-select-option value="1">{{ $t('men') }}</a-select-option>
                                        <a-select-option value="0">{{ $t('women') }}</a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <template v-if="advanced">
                            <a-row>
                                <a-col :md="6" :sm="24">
                                    <a-form-item :label="$t('Department')" :labelCol="{ span: 5 }"
                                        :wrapperCol="{ span: 18, offset: 1 }">
                                        <a-tree-select v-model="value" style="width: 100%"
                                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                            :tree-data="treeData" placeholder="请选择部门" tree-default-expand-all>
                                        </a-tree-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" :sm="24">
                                    <a-form-item :label="$t('connectstatus')" :labelCol="{ span: 5 }"
                                        :wrapperCol="{ span: 18, offset: 1 }">
                                        <a-select default-value="2" name="connectstatus" @change="handleChangeConnect">
                                            <a-select-option value="2">{{ $t('both') }}</a-select-option>
                                            <a-select-option value="1">{{ $t('connected') }}</a-select-option>
                                            <a-select-option value="0">{{ $t('notconnect') }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>

                                <a-col :md="6" :sm="24">
                                    <a-form-item :label="$t('attendstatus')" :labelCol="{ span: 5 }"
                                        :wrapperCol="{ span: 18, offset: 1 }">
                                        <a-select default-value="2" name="attendstatus" @change="handleChangeAttend">
                                            <a-select-option value="2">{{ $t('both') }}</a-select-option>
                                            <a-select-option value="1">{{ $t('haveattend') }}</a-select-option>
                                            <a-select-option value="0">{{ $t('notattend') }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :md="6" :sm="24">
                                    <a-form-item :label="$t('connectNo')" :labelCol="{ span: 5 }"
                                        :wrapperCol="{ span: 18, offset: 1 }">
                                        <a-input placeholder="请输入" v-model="connectNo" name="connectNo" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </template>

                        <a-row>


                            <a-col :span="24" :style="{ textAlign: 'right' }">

                                <a-button type="primary" :style="{ marginLeft: '8px' }" @click="check"
                                    :loading="loadingBtn" icon="search">
                                    {{ $t('check') }}</a-button>
                                <a @click="toggleAdvanced" style="margin-left: 8px">
                                    {{ advanced ? $t('less') : $t('more') }}
                                    <a-icon :type="advanced ? 'up' : 'down'" />
                                </a>
                            </a-col>
                            <div class="leftMarginTop">
                                <span @click="openHistory">
                                    <a-tag color="blue">
                                        同步历史
                                    </a-tag>
                                </span>
                            </div>
                        </a-row>
                    </div>

                </a-form>
            </div>
        </a-card>
        <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300 }" :loading="loading" size="small"
            :customRow="customRow" :pagination="{
                defaultPageSize: 50,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 30, 40, 50, 100]
            }">
            <a slot="action">{{ $t('sync') }}</a>

            <span slot="sex" slot-scope="sex">
                <span>
                    {{ (sex == '1') ? "男" : "女" }}
                </span>
            </span>
            <span slot="connectStatus" slot-scope="connectStatus">
                <a-tag :key="connectStatus" :color="connectStatus == '已同步' ? '#1890ff' : '#cf1322'">
                    <span>
                        {{ connectStatus }}
                    </span>
                </a-tag>

            </span>
            <span slot="connectStatus" slot-scope="connectStatus">
                <a-tag :key="connectStatus" :color="connectStatus == '已同步' ? '#1890ff' : '#cf1322'">
                    <span>
                        {{ connectStatus }}
                    </span>
                </a-tag>
            </span>
        </a-table>
    </div>
</template>

<script>
import { getDepartment, getPersonList, getPerson, addNewPerson, setPersonNo, getListSync } from "@/services/PersonERP";
import { message } from "ant-design-vue";
import { getcontry } from '../../../services/data';
import { mapGetters } from 'vuex'
//getPersonList
//import { getRootFromTree } from "@/utils/tool";
//import { message } from "ant-design-vue";

const columns = [
    { title: '程序 ', width: 75, dataIndex: 'key', key: 'key', fixed: 'left' },
    { title: '人员号码', width: 150, dataIndex: 'personNo', key: 'personNo', fixed: 'left' },
    { title: '人员', dataIndex: 'personName', key: 'personName', fixed: 'left' },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        scopedSlots: { customRender: 'sex' },
    },

    { title: '部门', dataIndex: 'department', key: 'department', ellipsis: true },
    { title: '手机号码', dataIndex: 'phone', key: 'phone' },
    { title: '链接状态', dataIndex: 'connectStatus', key: 'connectStatus', scopedSlots: { customRender: 'connectStatus' } },
    { title: '链接编号', dataIndex: 'connectNo', key: 'connectNo' },
    { title: '考勤数量', dataIndex: 'countRecord', key: 'countRecord' },
    { title: '初始化时间', dataIndex: 'CreateAt', key: 'CreateAt' },

    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        scopedSlots: { customRender: 'action' },
    },
];
const columnsH = [
    {
        title: '序号',
        dataIndex: 'key',
        key: 'key',

        scopedSlots: { customRender: 'name' },
    },
    {
        title: '之前修改',
        children: [
            {
                title: '员工号码', dataIndex: 'OPER_ID',
                key: 'OPER_ID',


            },
            {
                title: '姓名', dataIndex: 'OPER_NAME',
                key: 'OPER_NAME',
                width: 250,
            }
        ]

    },
    {
        title: '之后修改',
        children: [
            {
                title: '员工号码', dataIndex: 'NPER_ID',
                key: 'NPER_ID',

            },
            {
                title: '姓名', dataIndex: 'NPER_NAME',
                key: 'NPER_NAME',
                width: 250,

            }
        ]

    },
    {
        title: '同步状态',
        dataIndex: 'TYPE',
        key: 'TYPE',
        scopedSlots: { customRender: 'TYPE' },

    },
    {
        title: '操作人',
        dataIndex: 'USER',
        key: 'address 2',

    },
    {
        title: '时间操作',
        dataIndex: 'DATE',
        key: 'address 3',

    },
];

const dataH = [];
const data = []

const treeData = [];

export default {

    name: 'PersonERP',
    i18n: require('./i18n'),
    computed: {
        ...mapGetters('account', ['user']),
    },
    data() {
        return {
            columnsH,
            dataH,
            value: undefined,
            treeData,
            data,
            columns,
            advanced: true,
            loading: false,
            depart_id: '',
            organizeID: '',
            keypost: '',
            post_id: '',
            country_id: '2',
            loadingBtn: true,
            personNo: '',
            personName: '',
            phone: '',
            status: '0',
            sex: 2,
            connectstatus: '2',
            attendstatus: '2',
            connectNo: '',
            department: '',
            show: true,
            ModalText: 'Content of the modal',
            visible: false,
            visibleHistory: false,
            confirmLoading: false,
            validate: 'error',
            combo_person: [],
            combo_person1: [],
            person_id: '',
            card_type: false,
            combo_insert: '2',
            Per_id: '',
            defaultCombo: '1',
            Per_name: '',
            addPerson: {
                name: '',
                phone: '',
                id: '',
                sex: 'L',
                contry: '1',
                nameError: '',
                phoneError: '',
                idError: '',
                country: []
            },

        };
    },
    watch: {
        value(value) {
            console.log(value);
            this.department = value;
        },
    },
    methods: {
        cancel() {
            this.visibleHistory = false
        },
        handleOkHistory() {
            this.visibleHistory = false;
        },
        openHistory() {

            getListSync().then((res) => {
                const dataset = [];
                res.data.response.map((e, i) => {
                    dataset.push({
                        key: i + 1,
                        OPER_ID: e.OLD_PersonID,
                        OPER_NAME: e.OLD_PersonName,
                        NPER_ID: e.NEW_PersonID,
                        NPER_NAME: e.NEW_PersonName,
                        TYPE: e.Sync_status,
                        USER: e.User_ID,
                        DATE: e.CreateAt
                    })
                })
                this.dataH = dataset;
                this.visibleHistory = true;
            })

        },
        changeSex(value) {
            this.addPerson.sex = value;
            console.log(this.addPerson.sex)
        },
        handleBlur() {
            console.log('blur');
        },
        handleFocus() {
            console.log('focus');
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        handleChangePersonNo(value) {
            this.validate = 'success',
                this.Per_id = value;
            const name = this.combo_person.filter(e => e.value == value)
            this.Per_name = name[0].title;

        },
        changeShow(value) {
            this.combo_insert = value;
            this.show = (value == 2) ? true : false;
        },
        showModal() {
            this.visible = true;
        },
        handleOk() {

            this.confirmLoading = true;
            if (this.addPerson.id.trim().length < 8) {
                this.$notification.open({
                    message: '添加人员信息有问题！',
                    description:
                        '员工号码必须至少 9 个字符',
                    icon: <a-icon type="info" style="color: #f20" />,
                });
                return;
            }
            if (this.addPerson.name.trim().length == 0) {
                this.$notification.open({
                    message: '添加人员信息有问题！',
                    description:
                        '员工姓名不能为空',
                    icon: <a-icon type="info" style="color: #f20" />,
                });
                return;
            }

            const data = {
                OLD_ID: this.person_id,
                PER_ID_: this.addPerson.id,
                PER_NAME_: this.addPerson.name,
                SEX_: this.addPerson.sex,
                COUNTRY_: this.country_id,
                CALL_: this.addPerson.phone,
                Type: '1',
                user_id: this.user.name
            }

            if (this.combo_insert == '1') {

                addNewPerson(data).then((res) => {
                    this.visible = false;
                    this.confirmLoading = false;
                    if (res.data.success) {
                        message.success("增加新人成功");
                    } else {
                        message.error("操作发生错误!");
                    }
                    var perList = [];
                    getPerson().then((res) => {
                        res.data.response.map(e => {
                            perList.push({
                                value: e.value,
                                title: e.title
                            })
                        })
                        this.combo_person = perList;
                        this.combo_person1 = perList;
                    })

                    this.check();

                })

            } else {
                setPersonNo({
                    personNo: this.person_id,
                    N_PersonNo: this.Per_id,
                    N_PersonName: this.Per_name,
                    Type: '2',
                    user_id: this.user.name
                }).then((res) => {
                    this.visible = false;
                    this.confirmLoading = false;
                    if (res.data.success) {
                        message.success("同步编号成功");
                    } else {
                        message.error("操作发生错误!");
                    }
                    this.confirmLoading = false;
                    var perList = [];
                    getPerson().then((res) => {
                        res.data.response.map(e => {
                            perList.push({
                                value: e.value,
                                title: e.title
                            })
                        })
                        this.combo_person = perList;
                        this.combo_person1 = perList;
                    })

                    this.check();
                })
            }

            this.confirmLoading = false;
        },
        handleCancel(e) {
            console.log(e)
            console.log('Clicked cancel button');
            this.visible = false;
        },
        handleChangeSex(value) {
            this.sex = value;
        },
        handleChangeConnect(value) {
            this.connectstatus = value;
        },
        handleChangeAttend(value) {
            this.attendstatus = value;
        },
        customRow(record) {

            return {
                on: {
                    click: event => {
                        console.log(record)
                        this.addPerson.name = record.personName;
                        this.addPerson.phone = record.phone;
                        this.addPerson.id = record.personNo;

                        // this.addPerson.nameError = (this.addPerson.name != '') ? "success" : "error";
                        // this.addPerson.phoneError = (this.addPerson.phone != '') ? "success" : "error";
                        // this.addPerson.idError = (this.addPerson.id.length != '') ? "success" : "error";

                        this.person_id = '';
                        this.person_id = record.personNo;
                        if (event.target['innerHTML'] == this.$t('sync')) {

                            if (record.connect) {
                                message.success("人员已经同步了");
                            } else {
                                if (!this.card_type) {
                                    this.defaultCombo = '2';
                                } else {
                                    this.defaultCombo = '1';
                                }
                                this.card_type = record.CardType;

                                this.visible = true;
                            }
                        }
                    }
                }
            };
        },
        handleChange(value) {
            this.status = value;
            // console.log(value)
        },
        toggleAdvanced() {
            this.advanced = !this.advanced
        },
        check() {
            const data = {
                "personNO": this.personNo,
                "personName": this.personName,
                "sex": this.sex,
                "phone": this.phone,
                "department": this.department,
                "statusConnect": this.connectstatus,
                "statusAttend": this.attendstatus,
                "connectNo": this.connectNo,
            }

            this.loading = true;
            getPersonList(data).then((res) => {

                var arr = [];
                res.data.response.map((e, i) => {
                    //   const info = getRootFromTree(this.departmen_for_check, e.PostID);
                    const listDepart = e.RFullPath.split('|');
                    var dt = new Date(e.EnterTime);
                    const d = dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
                    arr.push({
                        key: i + 1,
                        personNo: e.PER_ID,
                        personName: e.PER_NAME,
                        phone: e.Tel1,
                        department: listDepart[listDepart.length - 1],
                        connectStatus: (e.connect) ? "已同步" : "未同步",
                        connect: e.connect,
                        connectNo: e.connectNo,
                        countRecord: e.record,
                        CreateAt: d,
                        sex: e.Gender,
                        CardType: e.CardType
                    })
                })

                this.data = arr;
                this.loading = false;

            })
        },
        getElementFromRoot(arr, ArrDepart) {
            // console.log(arr.length, ArrDepart)
            var end = 0;


            for (let index = 0; index < ArrDepart.length; index++) {
                const e = ArrDepart[index];

                for (let j = 0; j < arr.length; j++) {
                    const l = arr[j];

                    if (l.parentID == e.key) {
                        end = 1;
                        ArrDepart[index].children.push({
                            title: l.Name,
                            key: l.RGGUID,
                            value: l.RGGUID,
                            children: []
                        })
                    }

                }

            }

            if (end > 0) {

                for (let index = 0; index < ArrDepart.length; index++) {
                    const e = ArrDepart[index];

                    if (e.children.length > 0) {
                        this.getElementFromRoot(arr, e.children)
                    }

                }

            }
        },
        getPositonArrayElement(arr, value) {
            console.log(value)
            return arr.findIndex(e => e.parentID == value);
        }
    },
    async mounted() {
        // this.loading = true;
        const root = '5a9dc528-e7ad-4952-9f21-a885b6564a1c';

        var arr = [];
        var dpt = [];

        getDepartment().then((res) => {
            arr = res.data.response;
            arr.map((e) => {
                if (e.RGGUID == root) {
                    dpt.push({
                        title: e.Name,
                        key: e.RGGUID,
                        value: e.RGGUID,
                        children: []
                    })
                }
            })
            this.treeData = dpt
            this.getElementFromRoot(arr, this.treeData);
        })

        console.log(dpt)
        var perList = [];


        getcontry().then((res) => {
            const arrCountry = [];
            res.data.response.map((e) => {
                arrCountry.push({
                    CodeID: e.CodeID,
                    CodeName: e.CodeName
                })
            })
            this.addPerson.country = arrCountry;
        })


        getPerson().then((res) => {
            res.data.response.map(e => {
                perList.push({
                    value: e.value,
                    title: e.title
                })
            })
            this.combo_person = perList;
            this.combo_person1 = perList;
        })

        this.loadingBtn = false;
    }
}

</script>
<style lang="less">
.leftMarginTop {
    position: absolute;
    margin-top: 7px;
}

.full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }

    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }

    .ant-modal-body {
        flex: 1;
    }
}
</style>