<template>
    <div>
        <a-card>
            <a-tabs default-active-key="2" @change="callback">

                <a-tab-pane key="1" :tab="$t('title1')">
                    <a-form>
                        <a-row>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('department')" :labelCol="{ span: 8 }"
                                    :wrapperCol="{ span: 15, offset: 1 }" :validate-status="validate.d_department">
                                    <a-tree-select v-model="value" style="width: 100%"
                                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treedata"
                                        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]">
                                        <span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }"
                                            style="color: #08c">
                                            Child Node1 {{ value }}
                                        </span>
                                    </a-tree-select>

                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('startday')" :labelCol="{ span: 8 }"
                                    :wrapperCol="{ span: 15, offset: 1 }" :validate-status="validate.d_startdate">
                                    <a-date-picker style="width: 100%" placeholder="请输入更新日期"
                                        @change="handleChangeStartDate" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('endday')" :labelCol="{ span: 8 }"
                                    :wrapperCol="{ span: 15, offset: 1 }" :validate-status="validate.d_enddate">
                                    <a-date-picker style="width: 100%" placeholder="请输入更新日期"
                                        @change="handleChangeEndDate" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('personno')" :labelCol="{ span: 8 }"
                                    :wrapperCol="{ span: 15, offset: 1 }" has-feedback>
                                    <a-input placeholder="请输入" allowClear="true" v-model="D_personNo" name="D_personNo"
                                        v-decorator="[
                                            'D_personNo',
                                            { rules: [{ required: true, message: 'Please select your country!' }] },
                                        ]" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('personname')" :labelCol="{ span: 8 }"
                                    :wrapperCol="{ span: 15, offset: 1 }">
                                    <a-input allowClear="true" v-model="D_personName" name="formDate.personName" />
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('status')" :labelCol="{ span: 8 }"
                                    :wrapperCol="{ span: 15, offset: 1 }">
                                    <a-select default-value="" style="display:block ;" @change="handleChangeStatusDate"
                                        allowClear="true">
                                        <a-select-option value="0">
                                            {{ $t('normal') }}
                                        </a-select-option>
                                        <a-select-option value="1">
                                            {{ $t('abnormal') }}
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-space>
                                    <a-button type="primary" :style="{ marginLeft: '8px' }" @click="onSearch"
                                        icon="download">
                                        {{ $t('export') }}</a-button>
                                    <a-button :style="{ marginLeft: '8px' }" @click="onSearch" icon="delete">
                                        {{ $t('clear') }}</a-button>
                                    <a-button type="primary" html-type="submit" :style="{ marginLeft: '8px' }"
                                        @click="handleQueryDate" icon="search">
                                        {{ $t('check') }}</a-button>
                                </a-space>
                            </a-col>
                        </a-row>
                    </a-form>
                    <div style="margin-top: 17px;">
                        <a-table :columns="columnsDay" :data-source="dataDay" :pagination="pagination" size="small">
                            <a slot="name" slot-scope="text">{{ text }}</a>
                            <span slot="no"> {{ $t('no') }}</span>
                            <span slot="date"> {{ $t('date') }}</span>
                            <span slot="weekday"> {{ $t('weekday') }}</span>
                            <span slot="weekday" slot-scope="weekday">
                                {{
                                        (weekday == 0) ? $t('sun') : (weekday == 1) ? $t('mon') : (Dweekdayay == 2) ? $t('tue')
                                            : (weekday == 3) ? $t('wed') : (weekday == 4) ? $t('thu') : (weekday == 5) ? $t('fri') :
                                                $t('sat')
                                }}
                            </span>

                            <span slot="personno"> {{ $t('personno') }}</span>
                            <span slot="personname"> {{ $t('personname') }}</span>
                            <span slot="department"> {{ $t('department') }}</span>
                            <span slot="start"> {{ $t('start') }}</span>
                            <span slot="end"> {{ $t('end') }}</span>
                            <span slot="status"> {{ $t('status') }}</span>
                            <span slot="status" slot-scope="status">
                                <a-tag v-for="st in status" :key="st" :color="st === '0' ? 'green' : 'geekblue'">
                                    {{ (st == '0') ? $t('normal') : $t('abnormal') }}
                                </a-tag>
                            </span>
                            <!-- <span slot="customTitle">
                            <a-icon type="smile-o" /> Name
                        </span>
                        <span slot="tags" slot-scope="tags">
                            <a-tag v-for="tag in tags" :key="tag"
                                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                                {{ tag.toUpperCase() }}
                            </a-tag>
                        </span>
                        <span slot="action" slot-scope="text, record">
                            <a>Invite 一 {{ record.name }}</a>
                            <a-divider type="vertical" />
                            <a>Delete</a>
                            <a-divider type="vertical" />
                            <a class="ant-dropdown-link"> More actions
                                <a-icon type="down" />
                            </a>
                        </span> -->
                        </a-table>
                    </div>

                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('title2')">
                    <a-row>
                        <a-col :md="6" :sm="24">
                            <a-form-item :label="$t('department')" :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 15, offset: 1 }" :validate-status="validate.m_department">

                                <a-tree-select v-model="value" style="width: 100%"
                                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treedata"
                                    tree-default-expand-all>
                                    <span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }"
                                        style="color: #08c">
                                        Child Node1 {{ value }}
                                    </span>
                                </a-tree-select>
                            </a-form-item>
                        </a-col>
                        <a-col :md="6" :sm="24">
                            <a-form-item :label="$t('year')" :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 15, offset: 1 }" :validate-status="validate.m_year">
                                <a-select :default-value="defaultYear" style="display:block ;"
                                    @change="handleChangeYear">
                                    <a-select-option v-for="y in combobox.year" :value="y.value" :key="y.value">
                                        {{ y.title }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :md="6" :sm="24">
                            <a-form-item :label="$t('month')" :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 15, offset: 1 }" :validate-status="validate.m_month">
                                <a-select :default-value="defaultMonth" style="display:block ;"
                                    @change="handleChangeMonth">
                                    <a-select-option v-for="y in combobox.month" :value="y.value" :key="y.value">
                                        {{ y.title }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :md="6" :sm="24">
                            <a-form-item :label="$t('personno')" :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 15, offset: 1 }">
                                <a-input placeholder="请输入" v-model="M_personNo" name="formMonth.personNo" allowClear />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6" :sm="24">
                            <a-form-item :label="$t('personname')" :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 15, offset: 1 }">
                                <a-input placeholder="请输入" v-model="M_personName" name="formMonth.personName"
                                    allowClear />
                            </a-form-item>
                        </a-col>
                        <a-col :md="6" :sm="24">
                            <a-form-item :label="$t('status')" :labelCol="{ span: 8 }"
                                :wrapperCol="{ span: 15, offset: 1 }">
                                <a-select default-value="" style="display:block ;" @change="handleChangeStatusMonth"
                                    allowClear="true">
                                    <a-select-option value="0">
                                        {{ $t('normal') }}
                                    </a-select-option>
                                    <a-select-option value="1">
                                        {{ $t('abnormal') }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24" :style="{ textAlign: 'right' }">
                            <a-space>
                                <a-button type="primary" :style="{ marginLeft: '8px' }" @click="handleDownloadMonth"
                                    icon="download">
                                    {{ $t('export') }}</a-button>
                                <a-button :style="{ marginLeft: '8px' }" @click="onSearch" icon="delete">
                                    {{ $t('clear') }}</a-button>
                                <a-button type="primary" :style="{ marginLeft: '8px' }" @click="handleQueryMonth"
                                    icon="search">
                                    {{ $t('check') }}</a-button>
                            </a-space>
                        </a-col>
                    </a-row>
                    <div style="margin-top: 17px;">
                        <!-- <a-table :columns="columns" :data-source="data" bordered size="middle"
                            :scroll="{ x: 'calc(100px + 50%)', y: 240 }" /> -->
                        <a-table ref="table" :columns="columnsMon" :data-source="data"
                            :scroll="{ x: 1300, y: 'calc(100vh - 180px)' }" bordered size="middle"
                            :pagination="pagination">
                            <span slot="no"> {{ $t('no') }}</span>
                            <span slot="personno"> {{ $t('personno') }}</span>
                            <span slot="personname"> {{ $t('personname') }}</span>
                            <span slot="shiftname"> {{ $t('shiftname') }}</span>
                            <span slot="starttime"> {{ $t('starttime') }}</span>
                            <span slot="endtime"> {{ $t('endtime') }}</span>
                            <span slot="count"> {{ $t('count') }}</span>

                        </a-table>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>
<script>
import moment from 'moment';
import { getYear, getMonth, getDepartment, postQueryMonth } from "@/services/FPData";
const pagination = {
    size: "small",
    defaultPageSize: 50,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    showTotal: total => `一共 ${total} record`
}
const columnsDay = [
    {
        dataIndex: 'no',
        key: 'no',
        slots: { title: 'no' },
    },
    {
        dataIndex: 'date',
        key: 'date',
        slots: { title: 'date' },
    },
    {
        key: 'weekday',
        slots: { title: 'weekday' },
        dataIndex: 'weekday',
        scopedSlots: { customRender: 'weekday' },
    },
    {
        dataIndex: 'personno',
        key: 'personno',
        slots: { title: 'personno' },
    },
    {
        dataIndex: 'personname',
        key: 'personname',
        slots: { title: 'personname' },
    },
    {
        dataIndex: 'department',
        key: 'department',
        slots: { title: 'department' },
    },
    {
        dataIndex: 'start',
        key: 'start',
        slots: { title: 'start' },
    },
    {
        dataIndex: 'end',
        key: 'end',
        slots: { title: 'end' },
    },
    {
        dataIndex: 'status',
        key: 'status',
        slots: { title: 'status' },
        scopedSlots: { customRender: 'status' },
    },
];

const dataDay = [
    {
        key: '1',
        no: '1',
        date: '25/06/2022',
        weekday: '1',
        personno: 'I20220516001',
        personname: 'Phan Minh Phúc',
        department: 'IT',
        start: '07:23:23',
        end: '17:12:14',
        status: '0',
    },

];

const data = [];

const datass = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
    },
];

for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        no: i + 1,
        personno: 'I20220516001',
        personname: 'Phan Minh Phúc 潘明福',
        start25: '12:12:20',
        end25: '17:12:20',
        count: 2035,
    });
}

export default {
    name: 'Repair',
    i18n: require('./i18n'),
    data() {
        return {
            test: '05',
            columnsDay,
            dataDay,
            pagination,
            data,
            columnsMon: [],
            datass,
            //Formdate
            D_personNo: '',
            D_personName: '',
            M_personNo: '',
            M_personName: '',
            combobox: {
                department: [],
                year: [],
                month: [],
            },
            formMonth: {
                department: '',
                year: '',
                month: '',
                personNo: '',
                personName: '',
                status: ''
            },
            formDate: {
                department: '',
                startDate: '',
                endDate: '',
                personNo: '',
                personName: '',
                status: ''
            },
            isDownload: false,
            treedata: [],
            value: undefined,
            v_department_d: 'error',
            validate: {
                d_department: 'error',
                d_startdate: 'error',
                d_enddate: 'error',
                m_department: 'error',
                m_year: 'error',
                m_month: 'error'
            }
            //default value
        }
    },
    methods: {
        handleQueryMonth() {
            this.formMonth.personNo = this.M_personNo;
            this.formMonth.personName = this.M_personName;
            this.fillTableColumn();
            console.log(this.formMonth);

            postQueryMonth(this.formMonth);
        },
        handleQueryDate() {
            this.formDate.personNo = this.D_personNo;
            this.formDate.personName = this.D_personName;

            console.log(this.formDate)
            console.log(this.test)
        },
        fillTableColumn() {
            const mon = this.formMonth.month;
            const year = this.formMonth.year;

            const columnsMontemp = [
                { width: 50, dataIndex: 'no', key: 'no', slots: { title: 'no' }, fixed: 'left' },
                { width: 150, dataIndex: 'personno', key: 'personno', slots: { title: 'personno' }, fixed: 'left' },
                { width: 230, dataIndex: 'personname', key: 'personname', slots: { title: 'personname' }, fixed: 'left' },
                { width: 100, dataIndex: 'shiftname', key: 'shiftname', slots: { title: 'shiftname' }, fixed: 'left' },
            ];

            const days = this.getDaysInMonth(mon, year);
            days.map((e) => {
                const fullMonth = (mon < 10) ? `0${mon}` : mon;
                const fullDate = (e < 10) ? `0${e}` : e;
                columnsMontemp.push({
                    title: `2022/${fullMonth}/${fullDate}`,
                    children: [
                        {
                            slots: { title: 'starttime' },
                            dataIndex: `start${e}`,
                            key: `start${e}`,
                            width: 75,
                        },
                        {
                            slots: { title: 'endtime' },
                            dataIndex: `end${e}`,
                            key: `end${e}`,
                            width: 75,
                        },
                    ],
                },
                )
            })

            columnsMontemp.push({
                title: '上班数量',
                key: 'count',
                fixed: 'right',
                dataIndex: 'count',
                width: 75,

            })
            this.columnsMon = columnsMontemp;
        },
        getDaysInMonth(month, year) {
            month = month - 1;
            var date = new Date(year, month, 1);
            console.log(date.getMonth())
            var days = [];
            while (date.getMonth() === month) {
                let dt = new Date(date)
                days.push(dt.getDate());
                date.setDate(date.getDate() + 1);
            }
            return days;
        },
        handleChangeStartDate(value) {
            const dateAfterFormat = this.FormatDate(value)
            console.log(`selected ${dateAfterFormat}`);
            this.formDate.startDate = dateAfterFormat;
        },
        handleChangeEndDate(value) {
            const dateAfterFormat = this.FormatDate(value)
            console.log(`selected ${dateAfterFormat}`);
            this.formDate.endDate = dateAfterFormat;
        },
        handleChangeMonth(value) {
            console.log(`selected ${value}`);
            this.formMonth.month = value;
            this.validate.m_month = '';
        },
        handleChangeYear(value) {
            console.log(`selected ${value}`);
            this.formMonth.year = value;
            this.validate.m_month = 'error';
            this.validate.m_year = '';
            getMonth({ year: value }).then((res) => {
                const data = res.data.response;
                this.getMonthFromServer(data);
            })


        },
        handleChangeStatusMonth(value) {
            console.log(`selected ${value}`);
            this.formMonth.status = value;
        },
        handleChangeStatusDate(value) {
            console.log(`selected ${value}`);
            this.formDate.status = value;
        },
        getYearFromServer(data) {
            let offlineData = [
                { YEAR: '2020' },
                { YEAR: '2021' }
            ]
            let combobox = (data) ? data : offlineData;
            var ArrayYear = [];
            var maxYear = 2000;

            combobox.map((e) => {
                maxYear = (maxYear < e.YEAR) ? e.YEAR : maxYear;
                ArrayYear.push({
                    value: e.YEAR,
                    title: e.YEAR
                })
            })
            this.combobox.year = ArrayYear;
            this.formMonth.year = maxYear;
            //default select year with max year;
            this.defaultYear = maxYear;
            console.log(this.defaultYear);
        },
        getMonthFromServer(data) {
            let offlineData = [
                { MONTH: '01' },
                { MONTH: '02' },
                { MONTH: '03' },
                { MONTH: '04' },
                { MONTH: '05' },
                { MONTH: '06' }
            ];

            let combobox = (data) ? data : offlineData;
            var ArrayMonth = [];
            var maxMonth = 1;

            combobox.map((e) => {
                maxMonth = (maxMonth < e.MONTH) ? e.MONTH : maxMonth;
                ArrayMonth.push({
                    value: e.MONTH,
                    title: e.MONTH
                })
            })
            this.combobox.month = ArrayMonth;
            this.formMonth.month = maxMonth;
            //default select year with max year;
        },
        FormatDate(date) {
            return (date) ? moment(date).format('YYYY-MM-DD') : "";
        },
        // handleDownloadMonth() {

        //     this.isDownload = true;
        //     this.$nextTick(() => {

        //         export_table_to_excel({
        //             ref: this.$refs.table
        //         });
        //         this.isDownload = false;
        //     });
        // },
    },
    watch: {
        value(value) {
            console.log(value);
            this.formMonth.department = value;
            this.formDate.department = value;
            this.validate.d_department = '';
            this.validate.m_department = '';
        },
    },
    mounted() {
        getYear().then((res) => {
            const data = res.data.response
            this.getYearFromServer(data);
        })
        this.fillTableColumn();
        getDepartment().then((res) => {
            console.log(res.data.response)
            this.treedata = res.data.response;
            console.log(this.treedata)
        })


    }
}
</script>
<style lange="less" scoped>


</style>