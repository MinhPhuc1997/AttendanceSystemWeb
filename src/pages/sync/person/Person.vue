<template>
    <div>
        <a-card>
            <div :class="advanced ? 'search' : null">
                <a-form layout="horizontal">
                    <div :class="advanced ? null : 'fold'">
                        <a-row>
                            <a-col :md="6" :sm="24">
                                <a-form-item default-value="" :label="$t('organize')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-select v-model="organizeID" name="organizeID" @change="changeOrganize">
                                        <template v-for="org in combo_organize">
                                            <template>
                                                <a-select-option v-bind:key="org.UCML_OrganizeOID"
                                                    :value="org.UCML_OrganizeOID">{{ org.OrgName
                                                    }}
                                                </a-select-option>
                                            </template>
                                        </template>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('Department')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-select default-value="" v-model="depart_id" name="depart_id"
                                        @change="changeDepartment">
                                        <template v-for="drp in combo_department">
                                            <template>
                                                <a-select-option v-bind:key="drp.derpartment_id"
                                                    :value="drp.derpartment_id">{{
                                                            drp.departmentName
                                                    }}
                                                </a-select-option>
                                            </template>
                                        </template>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('post')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-select v-model="post_id" name="post_id">
                                        <template v-for="pst in combo_post">
                                            <template>
                                                <a-select-option v-bind:key="pst.PostID" :value="pst.PostID">{{
                                                        pst.PostName
                                                }}
                                                </a-select-option>
                                            </template>
                                        </template>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :md="6" :sm="24">
                                <a-form-item :label="$t('country')" :labelCol="{ span: 5 }"
                                    :wrapperCol="{ span: 18, offset: 1 }">
                                    <a-select v-model="country_id" name="country_id">
                                        <template v-for="ct in combo_country">
                                            <template>
                                                <a-select-option v-bind:key="ct.CodeID" :value="ct.CodeID">{{
                                                        ct.CodeName
                                                }}
                                                </a-select-option>
                                            </template>
                                        </template>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <template v-if="advanced">
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
                                    <a-form-item :label="$t('status')" :labelCol="{ span: 5 }"
                                        :wrapperCol="{ span: 18, offset: 1 }">
                                        <a-select default-value="0" name="status" @change="handleChange">
                                            <a-select-option value="0">{{ $t('both') }}</a-select-option>
                                            <a-select-option value="2">{{ $t('create') }}</a-select-option>
                                            <a-select-option value="1">{{ $t('update') }}</a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </template>

                        <a-row>
                            <a-col :md="8" :sm="24">
                            </a-col>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-button type="primary" :style="{ marginLeft: '8px' }" @click="check"
                                    :loading="loadingBtn" icon="search">
                                    {{ $t('check') }}</a-button>
                                <a @click="toggleAdvanced" style="margin-left: 8px">
                                    {{ advanced ? $t('less') : $t('more') }}
                                    <a-icon :type="advanced ? 'up' : 'down'" />
                                </a>
                            </a-col>
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
            <span slot="type" slot-scope="type">
                <a-tag :key="tag" :color="type ? '#1890ff' : 'green'">
                    <span>
                        {{ (type == false) ? "初始化" : "更新" }}
                    </span>
                </a-tag>
            </span>
        </a-table>
    </div>
</template>

<script>
import { getPersonList, updatePerson, insertPerson } from "@/services/person";
import { getDepartment, getPost, getcontry, getOrganize } from '../../../services/data';
import { getRootFromTree } from "@/utils/tool";
import { message } from "ant-design-vue";
const columns = [
    { title: '程序 ', width: 75, dataIndex: 'key', key: 'key', fixed: 'left' },
    { title: '人员号码', width: 150, dataIndex: 'personNo', key: 'personNo', fixed: 'left' },
    { title: '人员', width: 250, dataIndex: 'personName', key: 'personName', fixed: 'left' },
    { title: '中心', dataIndex: 'organize', key: 'organize' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '岗位', dataIndex: 'postName', key: 'postName' },
    {
        title: '性格',
        dataIndex: 'sex',
        key: 'sex',
        scopedSlots: { customRender: 'sex' },
    },
    { title: '手机号码', dataIndex: 'phone', key: 'phone' },
    { title: '图片', width: 350, dataIndex: 'image', key: 'image' },
    { title: '转态', dataIndex: 'type', key: 'type', scopedSlots: { customRender: 'type' } },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        scopedSlots: { customRender: 'action' },
    },
];

const data = []

export default {

    name: 'Person',
    i18n: require('./i18n'),
    data() {
        return {
            data,
            columns,
            advanced: true,
            loading: false,
            depart_id: '',
            organizeID: '',
            combo_department: [],
            combo_organize: [],
            combo_post: [],
            combo_country: [],
            departmen_for_check: [],
            keypost: '',
            post_id: '',
            country_id: '0',
            loadingBtn: true,
            personNo: '',
            personName: '',
            phone: '',
            status: '0'
        };
    },
    methods: {
        customRow(record) {
            return {
                on: {
                    click: event => {
                        if (event.target['innerHTML'] == this.$t('sync')) {
                            if (record.type) {
                                updatePerson({
                                    personNo: record.personNo,
                                    personName: record.personName,
                                    sex: record.sex,
                                    phone: record.phone,
                                    image: record.image
                                }).then(() => {
                                    message.success("同步人员成功");
                                })
                            } else {

                                insertPerson({
                                        personNo: record.personNo,
                                        personName: record.personName,
                                        sex: record.sex,
                                        phone: record.phone,
                                        image: record.image
                                    }).then(() => {
                                        message.success("同步人员成功");
                                    })
                                    
                                // if (record.phone == null) {

                                //     this.$error({
                                //         title: '信息不够',
                                //         content: '手机号码没有请先输入手机号码！',
                                //     });
                                // } else {
                                //     insertPerson({
                                //         personNo: record.personNo,
                                //         personName: record.personName,
                                //         sex: record.sex,
                                //         phone: record.phone,
                                //         image: record.image
                                //     }).then(() => {
                                //         message.success("同步人员成功");
                                //     })
                                // }

                            }
                            this.check();


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
        changeDepartment(value) {
            if (value == '') {
                this.keypost = this.organizeID;
                console.log(this.keypost)
            } else {
                this.keypost = value
            }
            getPost(this.keypost).then((res) => {
                var arrpost = [{
                    PostID: '',
                    PostName: '全部'
                }];
                res.data.response.map((e) => {
                    arrpost.push({
                        PostID: e.PostID,
                        PostName: e.PostName
                    })
                })
                this.combo_post = arrpost;
            })
            this.post_id = ''
        },
        check() {
            const data = {
                "personNO": this.personNo,
                "personName": this.personName,
                "imageType": this.status,
                "department": this.depart_id,
                "organize": this.organizeID,
                "post": this.post_id,
                "arrayPost": (this.organizeID != '' || this.depart_id != '') ? this.combo_post : [],
                "country": this.country_id,
                "listOrganize": this.departmen_for_check,
                "phone": this.phone
            }
            console.log(data)
            this.loading = true;
            getPersonList(data).then((res) => {
                var arr = [];
                res.data.response.map((e, i) => {
                    const info = getRootFromTree(this.departmen_for_check, e.PostID);
                    arr.push({
                        key: i + 1,
                        personNo: e.PER_ID,
                        personName: e.PER_NAME,
                        phone: e.CALL,
                        image: e.image,
                        postName: e.postName,
                        department: info.Organize,
                        organize: info.Organize,
                        type: e.type,
                        sex: e.SEX_ID
                    })
                })
                this.data = arr;
                this.loading = false;

            })
        },

        changeOrganize(value) {
            this.combo_department = [];
            this.depart_id = '';
            getDepartment(value).then((res) => {
                const dep = [{
                    derpartment_id: '',
                    departmentName: "全部"
                }];

                res.data.response.map(e => {
                    dep.push({
                        derpartment_id: e.derpartment_id,
                        departmentName: e.departmentName
                    })
                });
                this.combo_department = dep;
            })

            getPost(value).then((res) => {

                var arrpost = [{
                    PostID: '',
                    PostName: '全部'
                }];
                res.data.response.map((e) => {
                    arrpost.push({
                        PostID: e.PostID,
                        PostName: e.PostName
                    })
                })
                this.combo_post = arrpost;
            })
            this.post_id = '';
        },
    },
    async mounted() {
        // this.loading = true;

        getcontry().then((res) => {
            const arrCountry = [{
                CodeID: '0',
                CodeName: '全部'
            }];
            res.data.response.map((e) => {
                arrCountry.push({
                    CodeID: e.CodeID,
                    CodeName: e.CodeName
                })
            })
            this.combo_country = arrCountry;
        })

        getPost(this.keypost).then((res) => {
            var arrpost = [{
                PostID: '',
                PostName: '全部'
            }];
            res.data.response.map((e) => {
                arrpost.push({
                    PostID: e.PostID,
                    PostName: e.PostName
                })
            })
            this.combo_post = arrpost;
        })

        getOrganize().then((res) => {
            var arrposts = [];
            const dep = [];
            const combo = [{
                UCML_OrganizeOID: '',
                OrgName: "全部"
            }]

            res.data.response.map(e => {
                if (e.OrgName != '空') {
                    combo.push({
                        UCML_OrganizeOID: e.UCML_OrganizeOID,
                        OrgName: e.OrgName
                    })
                }
            });

            this.combo_organize = combo;

            Promise.all(this.combo_organize.map(async (e, i) => {

                if (i != 0) {
                    dep.push({
                        organize: e.OrgName,
                        derpartment_id: e.UCML_OrganizeOID,
                        departmentName: e.OrgName,
                    });
                    await getDepartment(e.UCML_OrganizeOID).then((res) => {
                        res.data.response.map(l => {
                            dep.push({
                                organize: e.OrgName,
                                derpartment_id: l.derpartment_id,
                                departmentName: (l.departmentName == '') ? e.OrgName : l.departmentName,
                            })
                        })
                    })
                }

            })).then(() => {

                const getPostFromDep = dep.map(async (e) => {
                    await getPost(e.derpartment_id).then((res) => {

                        res.data.response.map((l) => {
                            arrposts.push({
                                organize: e.organize,
                                departmentName: e.departmentName,
                                PostID: l.PostID,
                            })
                        })
                    })
                });

                Promise.all(getPostFromDep).then(() => {
                    const finalData = JSON.parse(JSON.stringify(arrposts));
                    this.departmen_for_check = finalData;
                    this.departmen_for_check.map(e => {

                        if (e.PostID == '10184') {
                            console.log(e)
                        }
                    })
                    console.log('DS organize', this.departmen_for_check.length)
                })
            })

        });

        // await getDepartment(this.organizeID).then((res) => {

        //     const dep = [{
        //         derpartment_id: '',
        //         departmentName: "全部"
        //     }]
        //     res.data.response.map(e => {
        //         dep.push({
        //             derpartment_id: e.derpartment_id,
        //             departmentName: e.departmentName,
        //             children: []
        //         })
        //     });
        //     this.combo_department = JSON.parse(JSON.stringify(dep));
        // })
        this.loadingBtn = false;
    }
}

</script>
<style>
</style>