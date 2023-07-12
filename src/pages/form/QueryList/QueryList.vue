<template>

  <a-card>
    <a-modal v-model="visible" title="补考勤信息" @ok="handleOk" width="60vh">
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-form-item :label="$t('deviceName')" has-feedback>
          <a-select v-model="device" name="device" validate-status="warning">
            <a-select-option v-for="d in devices" :value='d.DeviceID' :key="d.DeviceID">{{ d.DeviceName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('date')" has-feedback>
          <a-date-picker style="width: 100%" v-model="offset_date" name="offset_date" :disabled="true"/>
        </a-form-item>
        <a-form-item :label="$t('personName')">
          <a-input :disabled="true" v-model="offset_name" name="offset_name"/>
        </a-form-item>
        <a-form-item :label="$t('time')" has-feedback :help="offset_help" :validate-status="validateStatus">
          <a-time-picker style="width: 100%" :value="offset_time" @change="onChangeOffsetTime"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <div>
    </div>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null : 'fold'">
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item default-value="" :label="$t('organize')" :labelCol="{ span: 8 }"
                           :wrapperCol="{ span: 15, offset: 1 }">
                <a-select v-model="organizeID" name="organizeID" @change="changeOrganize">
                  <template v-for="org in combo_organize">
                    <template>
                      <a-select-option v-bind:key="org.UCML_OrganizeOID" :value="org.UCML_OrganizeOID">{{
                          org.OrgName
                        }}
                      </a-select-option>
                    </template>

                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('Department')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15, offset: 1 }">
                <a-select default-value="" v-model="depart_id" name="depart_id" @change="changeDepartment">
                  <template v-for="drp in combo_department">
                    <template>
                      <a-select-option v-bind:key="drp.derpartment_id" :value="drp.derpartment_id">{{
                          drp.departmentName
                        }}
                      </a-select-option>
                    </template>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('personNo')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15, offset: 1 }">
                <a-input placeholder="请输入" v-model="PersonID" name="PersonID"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('personName')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15, offset: 1 }">
                <a-input placeholder="请输入" v-model="personName" name="personName"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>

            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('country')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15, offset: 1 }">
                <a-select v-model="country_id" name="country_id">
                  <template v-for="ct in combo_country">
                    <template>
                      <a-select-option v-bind:key="ct.CodeID" :value="ct.CodeID">{{ ct.CodeName }}
                      </a-select-option>
                    </template>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('daystart')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15, offset: 1 }">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期" v-model="daystart" name="daystart"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('dayend')" :labelCol="{ span: 8 }" :wrapperCol="{ span: 15, offset: 1 }">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期" v-model="dayend" name="dayend"/>
              </a-form-item>
            </a-col>
          </a-row>
          <template v-if="advanced">
            <a-row>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('shiftName')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                  <a-select v-model="shift" name="shift">
                    <a-select-option value='' key="">全部</a-select-option>
                    <a-select-option v-for="per in per_shift" :value='per.CodeID' :key="per.CodeID">{{ per.CodeName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('credentialType')" :labelCol="{ span: 5 }"
                             :wrapperCol="{ span: 18, offset: 1 }">
                  <a-select default-value="2" name="Type" @change="handleChange">
                    <a-select-option value="2">{{ $t('face') }}</a-select-option>
                    <a-select-option value="3">{{ $t('card') }}</a-select-option>
                    <a-select-option value="1">{{ $t('facecard') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item :label="$t('status')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                  <a-select placeholder="请选择" v-model="Status" name="Status">
                    <a-select-option value="0">{{ $t('normal') }}</a-select-option>
                    <a-select-option value="1">{{ $t('abnormal') }}</a-select-option>
                    <a-select-option value="2">{{ $t('late') }}</a-select-option>
                    <a-select-option value="">{{ $t('all') }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="4" :sm="24" style="text-align: right">
              </a-col>
            </a-row>
          </template>

          <a-row>
            <a-col :md="8" :sm="24">

            </a-col>
            <a-col :span="24" :style="{ textAlign: 'right' }">

              <a-button @click="calculate" type="primary" :style="{ marginLeft: '8px' }" icon="compass">{{
                  $t('calculate')
                }}
              </a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? $t('less') : $t('more') }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <div>
      <a-table :columns="columns" :data-source="dataSource" :customRow="customRow" :loading="loading" size="small"
               :pagination="{
          defaultPageSize: 50,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 30, 40, 50, 100]

        }">

        <span slot="no"> {{ $t('no') }}</span>
        <span slot="date"> {{ $t('date') }}</span>
        <span slot="personNo"> {{ $t('personNo') }}</span>
        <span slot="fullname"> {{ $t('fullname') }}</span>
        <span slot="credentialType"> {{ $t('credentialType') }}</span>
        <span slot="Department"> {{ $t('Department') }}</span>
        <span slot="startwork1"> {{ $t('startwork1') }}</span>
        <span slot="endwork1"> {{ $t('endwork1') }}</span>
        <span slot="startwork2"> {{ $t('startwork2') }}</span>
        <span slot="endwork2"> {{ $t('endwork2') }}</span>
        <span slot="status"> {{ $t('status') }}</span>
        <span slot="shiftName"> {{ $t('shiftName') }}</span>
        <span slot="Post"> {{ $t('post') }}</span>
        <span slot="Organize"> {{ $t('organize') }}</span>

        <span slot="Time1" slot-scope="Time1">
          <a-tag :color="Time1 !== '' ? '' : '#7cb305'">
            {{ (Time1.toUpperCase() !== '') ? Time1.toUpperCase() : "补考勤1" }}
          </a-tag>
        </span>
        <span slot="Time2" slot-scope="Time2">
          <a-tag :color="Time2 !== '' ? '' : '#7cb305'">
            {{ (Time2.toUpperCase() !== '') ? Time2.toUpperCase() : "补考勤2" }}
          </a-tag>
        </span>
        <span slot="Time3" slot-scope="Time3">
          <a-tag :color="Time3 !== '' ? '' : '#7cb305'">
            {{ (Time3.toUpperCase() !== '') ? Time3.toUpperCase() : "补考勤3" }}
          </a-tag>
        </span>
        <span slot="Time4" slot-scope="Time4">
          <a-tag :color="Time4 !== '' ? '' : '#7cb305'">
            {{ (Time4.toUpperCase() !== '') ? Time4.toUpperCase() : "补考勤4" }}
          </a-tag>
        </span>


        <span slot="status" slot-scope="status">
          <a-tag :color="status === '正常' ? 'Green' : 'red'">
            {{ status.toUpperCase() }}
          </a-tag>
        </span>

        <span slot="Day" slot-scope="Day">
          {{
            (Day == 0) ? $t('sun') : (Day == 1) ? $t('mon') : (Day == 2) ? $t('tue') : (Day == 3) ? $t('wed') : (Day == 4)
                ? $t('thu') : (Day == 5) ? $t('fri') : $t('sat')
          }}
        </span>
        <span slot="Type" slot-scope="Type">
          <a-tag v-for="type in Type" :key="type" :color="type == '人脸' ? 'cyan' : 'Orange'">
            {{ type.toUpperCase() }}
          </a-tag>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import {
  getDataFromCalculate,
  getPersonShift,
  getOrganize,
  getcontry,
  getDevices,
  setCardOffset,
  setActionTime
}
  from '@/services/data';
import {message} from 'ant-design-vue';
import {parseTime} from '@/utils'
import {getRootFromTree} from "@/utils/tool"
import {getDepartments} from '../../../services/data';
import {getKeepTimeSart, getKeepTimeEnd, convertTimeToMinutes} from '../../../utils/tool';

const columnsdetail = [

  {
    title: '序号',
    dataIndex: 'No',
    key: 'No',
    slots: {title: 'No'},
    scopedSlots: {customRender: 'No'},
  },
  {
    title: '员工号码',
    dataIndex: 'PersonNO',
    key: 'PersonNO',
  },
  {
    title: '姓名',
    dataIndex: 'PersonName',
    key: 'PersonName',

  },
  {
    title: '日期',
    dataIndex: 'Date',
    key: 'Date',

  },
  {
    title: '星期',
    dataIndex: 'Day',
    key: 'Day',
    scopedSlots: {customRender: 'Day'},

  },
  {
    title: '时间',
    dataIndex: 'Time',
    key: 'Time',

  },
  {
    title: '考勤类型',
    dataIndex: 'Type',
    key: 'Type',

  },
  {
    title: '设备名称',
    dataIndex: 'DeviceName',
    key: 'DeviceName',
  },
];

const datadetail = [];

const columns = [

  {
    key: 'No',

    dataIndex: 'no',
    slots: {title: 'no'},
  },
  {
    key: 'date',
    slots: {title: 'date'},
    dataIndex: 'date',
  },
  {
    title: '星期',
    dataIndex: 'Day',
    key: 'Day',
    scopedSlots: {customRender: 'Day'},
  },
  {
    key: "PersonNO",
    slots: {title: 'personNo'},
    dataIndex: 'PersonNO',
    // scopedSlots: { customRender: 'PersonNO' },
  },
  {
    key: 'PersonName',
    slots: {title: 'fullname'},
    dataIndex: 'PersonName',
    // scopedSlots: { customRender: 'PersonName' }
  },
  {
    key: 'Organize',
    slots: {title: 'Organize'},
    dataIndex: 'Organize',

  },
  {
    key: 'Department',
    slots: {title: 'Department'},
    dataIndex: 'Department',

  },
  {
    key: 'Post',
    slots: {title: 'Post'},
    dataIndex: 'Post',

  },
  {
    key: 'shiftName',
    slots: {title: 'shiftName'},
    dataIndex: 'shiftName',

  },
  {
    key: 'Type',
    slots: {title: 'credentialType'},
    dataIndex: 'Type',
    scopedSlots: {customRender: 'Type'},
  },
  {
    key: 'Time1',
    slots: {title: 'startwork1'},
    dataIndex: 'Time1',
    scopedSlots: {customRender: 'Time1'},
  },
  {
    slots: {title: 'endwork1'},
    dataIndex: 'Time2',
    scopedSlots: {customRender: 'Time2'},
  },
  {
    slots: {title: 'startwork2'},
    dataIndex: 'Time3',
    scopedSlots: {customRender: 'Time3'},
  },
  {
    slots: {title: 'endwork2'},
    dataIndex: 'Time4',
    scopedSlots: {customRender: 'Time4'},
  },

  {
    slots: {title: 'status'},
    dataIndex: 'status',
    scopedSlots: {customRender: 'status'},
  }
]
const dataSource = []

export default {
  name: 'QueryList',
  i18n: require('./i18n'),
  data() {

    return {
      json_fields: {
        "Complete name": "No",
        City: "city",
        Telephone: "PersonNo",
        "Telephone 2": {
          field: "phone.landline",
          callback: (value) => {
            return `Landline Phone - ${value}`;
          },
        },
      },
      loading: false,
      PersonID: '',
      daystart: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      dayend: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      Status: '',
      Type: '2',
      advanced: false,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      table: [],
      visible: false,
      datadetail,
      columnsdetail,
      reportdata: '',
      reporttype: 0,
      per_shift: [],
      shift: '',
      personName: "",
      department: [],
      depart_id: '',
      organizeID: '',
      combo_department: [],
      combo_organize: [],
      combo_post: [],
      combo_country: [],
      departmen_for_check: [],
      keypost: '',
      post_id: '',
      country_id: '2',
      devices: [],
      device: '172582144',
      offset_name: '',
      offset_date: null,
      validateStatus: 'success',
      offset_time: null,
      offset_help: "",
      offset_PersonNo: '',
      offset_keepstart: '',
      offset_keepend: '',
      offset_request_type: 0,
      offset_oldtime: '',
      changeKey: '',
      changeColumn: ''

    }
  },

  authorize: {
    deleteRecord: 'delete'
  },
  methods: {
    onChangeOffsetTime(time) {
      console.log(convertTimeToMinutes(moment(time).format('HH:mm')))
      console.log(convertTimeToMinutes(this.offset_keepstart));
      console.log(convertTimeToMinutes(this.offset_keepend));
      if (convertTimeToMinutes(moment(time).format('HH:mm')) >= convertTimeToMinutes(this.offset_keepstart) && convertTimeToMinutes(moment(time).format('HH:mm')) <= convertTimeToMinutes(this.offset_keepend)) {
        this.validateStatus = 'success'
      } else {
        this.validateStatus = 'error'
      }
      this.offset_time = time;
    },

    changeDepartment(value) {
      this.post_id = value
    },

    changeOrganize(value) {
      this.post_id = value
      this.combo_department = [];
      let arr = [{
        derpartment_id: value,
        departmentName: "全部"
      }];
      this.depart_id = value
      if (value === "000204C6-0000-0000-0000-0000FFEB38B0") {
        this.combo_department = arr;
        return;
      }
      getDepartments(value).then(res => {
        res.data.response.map((e) => {
          arr.push({
            derpartment_id: e.UCML_OrganizeOID,
            departmentName: e.OrgName
          })
        })
      })
      this.combo_department = arr;
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      if (this.validateStatus != 'error') {
        var dataRequest = {
          PersonNo: this.offset_PersonNo,
          DateTime: this.offset_date + ' ' + moment(this.offset_time).format('HH:mm:ss'),
          DeviceID: this.device,
          Date: this.offset_date,
          Time: this.offset_oldtime
        };

        if (this.offset_request_type == 1) {

          setActionTime(dataRequest).then((res) => {
            (res.data.success == true) ? message.success('补考勤成功！') : message.error(res.data.message);
            // this.calculate();

            if (this.changeKey != '') {
              this.updateOffile(this.changeKey, this.changeColumn, moment(this.offset_time).format('HH:mm:ss'))
            }
          });
        } else {
          setCardOffset(dataRequest).then((res) => {
            (res.data.success == true) ? message.success('补考勤成功！') : message.error(res.data.message);
            //  this.calculate();

            if (this.changeKey != '') {
              this.updateOffile(this.changeKey, this.changeColumn, moment(this.offset_time).format('HH:mm:ss'))
            }
          });
        }

        this.visible = false;
      }
    },
    handleChange(value) {
      this.Type = value;
    }, customRow(record) {

      return {
        on: {
          click: event => {

            const listIndexTime = [10, 11, 12, 13];
            let cellIndex = 0

            switch (event.target.innerHTML.trim()) {
              case "补考勤1":
                cellIndex = listIndexTime[0]
                break;
              case "补考勤2":
                cellIndex = listIndexTime[1]
                break;
              case "补考勤3":
                cellIndex = listIndexTime[2]
                break;
              case "补考勤4":
                cellIndex = listIndexTime[3]
                break;
            }
            console.log(event.target.innerHTML,cellIndex)
            this.changeColumn = cellIndex;
            this.changeKey = record.key;

            if (listIndexTime.includes(cellIndex)) {
              if (record.shiftName == '') {
                message.error('请先设置班次')
                return;
              }
              this.offset_name = record.PersonName;
              this.offset_PersonNo = record.PersonNO
              this.offset_date = record.date;



              this.offset_request_type = 0;
              this.offset_time = null;
              this.validateStatus = 'success';

              this.offset_keepstart = getKeepTimeSart(record, cellIndex);
              this.offset_keepend = getKeepTimeEnd(record, cellIndex);

              var title = (cellIndex == 10) ? this.$t('startwork1') : (cellIndex == 11) ? this.$t('endwork1') : (cellIndex == 12) ? this.$t('startwork2') : this.$t('endwork2');

              if (cellIndex % 2) {
                const sTime = this.offset_keepstart.split(':');
                const S = sTime[0] * 3600 + sTime[1] * 60;

                const ramdom = Math.floor(Math.random() * ((S + 1800) - S + 1) + S)
                const RTime = this.convertIntToTime(ramdom);
                this.offset_time = moment(RTime, 'HH:mm:ss');
              } else {

                const eTime = this.offset_keepend.split(':');
                const E = eTime[0] * 3600 + eTime[1] * 60;

                const ramdom = Math.floor(Math.random() * (E - (E - 1800) + 1) + (E - 1800))
                const RTime = this.convertIntToTime(ramdom);

                this.offset_time = moment(RTime, 'HH:mm:ss');

              }

              this.offset_help = `注意:${title}考勤时间是从${this.offset_keepstart}到${this.offset_keepend}`
              this.visible = true;
            }


          }
        }
      };
    },

    convertIntToTime(value) {
      var sec_num = parseInt(value, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ':' + minutes + ':' + seconds;
    },
    updateOffile(key, index, value) {
      this.dataSource.map((e) => {
        if (e.key == key) {

          if (index == 10) {
            e.Time1 = value;
          } else if (index == 11) {
            e.Time2 = value;
          } else if (index == 12) {
            e.Time3 = value;
          } else if (index == 13) {
            e.Time4 = value;
          }
        }
      })
    },
    flush() {
      this.dataSource.splice(0);
      this.daystart = '';
      this.dayend = '';
      this.PersonID = ''
    },

    calculate() {
      this.loading = true;
      this.dataSource.splice(0);
      if (!this.daystart || !this.dayend) {
        this.$message.error('开始、结果时间不能空！');
        return
      }
      let start = new Date(this.daystart);
      let end = new Date(this.dayend)
      const m_daystart = (start.getFullYear()).toString() + '-' + (start.getMonth() + 1).toString() + '-' + start.getDate().toString();
      const m_dayend = (end.getFullYear()).toString() + '-' + (end.getMonth() + 1).toString() + '-' + end.getDate().toString();

      getDataFromCalculate({
        "daystart": m_daystart,
        "dayend": m_dayend,
        "personNO": this.PersonID,
        "personName": this.personName,
        "status": this.Status,
        "type": this.Type,
        "shift": this.shift,
        "department": this.depart_id,
        "organize": this.organizeID,
        "post": this.post_id,
        "arrayPost": (this.organizeID != '' || this.depart_id != '') ? this.combo_post : [],
        "country": this.country_id
      }).then((res) => {
        this.table = res.data.response
        this.table.filter((value, index) => {
          var arrType = [];
          (value.Type == 2) ? arrType.push('人脸') : (value.Type == 3) ? arrType.push('刷卡') : (arrType.push('人脸'), arrType.push('刷卡'));
          var d = new Date(value.Date);
          var Day = d.getDay();
          const info = getRootFromTree(this.departmen_for_check, value.PostID)
          dataSource.push({
            key: index,
            no: index + 1,
            date: value.Date,
            Day: Day,
            PersonNO: value.PersonNO,
            Organize: info.Organize,
            Department: info.Department,
            PersonName: value.PersonName,
            shiftName: value.shiftName,
            Post: value.PostName,
            Time1: value.Time1,
            Time2: value.Time2,
            Time3: value.Time3,
            Time4: value.Time4,
            IS_CrossDay1: value.IS_CrossDay1,
            IS_CrossDay2: value.IS_CrossDay2,
            IS_CrossDay3: value.IS_CrossDay3,
            Type: arrType,
            TimeKeepEnd1: value.TimeKeepEnd1,
            TimeKeepEnd2: value.TimeKeepEnd2,
            TimeKeepEnd3: value.TimeKeepEnd3,
            TimeKeepEnd4: value.TimeKeepEnd4,
            TimeKeepEnd5: value.TimeKeepEnd5,
            TimeKeepEnd6: value.TimeKeepEnd6,
            TimeKeepStart1: value.TimeKeepStart1,
            TimeKeepStart2: value.TimeKeepStart2,
            TimeKeepStart3: value.TimeKeepStart3,
            TimeKeepStart4: value.TimeKeepStart4,
            TimeKeepStart5: value.TimeKeepStart5,
            TimeKeepStart6: value.TimeKeepStart6,
            status: (value.Status == 1) ? "异常" : (value.late1 || value.late2) ? "迟到" : "正常",
          })
        })
        this.loading = false;
      })

    }
  },

  async mounted() {

    this.$t('pageDesc')
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
    const dateTime = date
    this.reportdata = {
      "daystart": dateTime,
      "dayend": dateTime,
      "personNO": '',
      "personName": '',
      "status": '',
      "shift": '',
      "type": this.Type,
      "department": '',
      "all": true
    };

    getcontry().then((res) => {
      const arrCountry = [];
      res.data.response.map((e) => {
        arrCountry.push({
          CodeID: e.CodeID,
          CodeName: e.CodeName
        })
      })
      this.combo_country = arrCountry;
    })
    getOrganize().then((res) => {
      const combo = [{
        UCML_OrganizeOID: '000204C6-0000-0000-0000-0000FFEB38B0',
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
    });
    this.organizeID = "000204C6-0000-0000-0000-0000FFEB38B0"
    getPersonShift().then(res => {
      this.per_shift = res.data.response;
    })

    getDevices().then((res) => this.devices = res.data.response);
  }
}
</script>


<style lang="less" scoped>
.font-weight-black {
  color: rgb(0, 0, 0);
}
</style>
