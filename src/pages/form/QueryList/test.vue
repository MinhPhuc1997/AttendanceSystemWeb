<template>
  <a-card>
    <div>
      <a-modal v-model="visible" title="补考勤信息" @ok="handleOk" width="60vh">

        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">

          <a-form-item :label="$t('deviceName')" has-feedback>
            <a-select v-model="device" name="device" validate-status="warning">
              <a-select-option v-for="d in devices" :value='d.DeviceID' :key="d.DeviceID">{{ d.DeviceName }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label="$t('date')" has-feedback>
            <a-date-picker style="width: 100%" v-model="offset_date" name="offset_date" :disabled="true" />
          </a-form-item>

          <a-form-item :label="$t('personName')">
            <a-input :disabled="true" v-model="offset_name" name="offset_name" />
          </a-form-item>

          <a-form-item :label="$t('time')" has-feedback :help="offset_help" :validate-status="validateStatus">
            <a-time-picker style="width: 100%" :value="offset_time" @change="onChangeOffsetTime" />
          </a-form-item>
        </a-form>

      </a-modal>
    </div>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null : 'fold'">
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('department')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-select default-value="全部" v-model="depart_id" name="depart_id">
                  <template v-for="item in department">
                    <a-select-option v-bind:key="item.UCML_OrganizeOID" :value="item.UCML_OrganizeOID">{{ item.OrgName
                    }}
                    </a-select-option>
                  </template>

                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('daystart')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期" v-model="daystart" name="daystart" />
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('dayend')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期" v-model="dayend" name="dayend" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('shiftName')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-select v-model="shift" name="shift">
                  <a-select-option value='' key="">全部</a-select-option>
                  <a-select-option v-for="per in per_shift" :value='per.CodeID' :key="per.CodeID">{{ per.CodeName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('personNo')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-input placeholder="请输入" v-model="PersonID" name="PersonID" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('personName')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
                <a-input placeholder="请输入" v-model="personName" name="personName" />
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="24">
              <a-form-item :label="$t('credentialType')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
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
          <a-row>
            <a-col :md="8" :sm="24">

            </a-col>
            <a-col :span="24" :style="{ textAlign: 'right' }">

              <a-button @click="calculate" type="primary" :style="{ marginLeft: '8px' }" icon="search">{{
                  $t('check')
              }}</a-button>

            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
   
    <div>
      <a-table :columns="columns" :data-source="dataSource" :customRow="customRow" size="small" :loading="loading"
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
        <span slot="startwork1"> {{ $t('startwork1') }}</span>
        <span slot="endwork1"> {{ $t('endwork1') }}</span>
        <span slot="startwork2"> {{ $t('startwork2') }}</span>
        <span slot="endwork2"> {{ $t('endwork2') }}</span>
        <span slot="status"> {{ $t('status') }}</span>
        <span slot="shiftName"> {{ $t('shiftName') }}</span>
        <span slot="Day"> {{ $t('Day') }}</span>
        <!-- <div slot="shiftName" slot-scope="text" class="font-weight-black">{{ text }}</div>
        <div slot="no" slot-scope="text" class="font-weight-black">{{ text }}</div>
        <div slot="PersonName" slot-scope="text" class="font-weight-black">{{ text }}</div>
        <div slot="PersonNO" slot-scope="PersonNO" class="font-weight-black">{{ PersonNO }}</div>
        <div slot="date" slot-scope="date" class="font-weight-black">{{ date }}</div>
        <div slot="Time1" slot-scope="Time1" class="font-weight-black">{{ Time1 }}</div>
        <div slot="Time2" slot-scope="Time2" class="font-weight-black">{{ Time2 }}</div>
        <div slot="Time3" slot-scope="Time3" class="font-weight-black">{{ Time3 }}</div>
        <div slot="Time4" slot-scope="Time4" class="font-weight-black">{{ Time4 }}</div> -->
        <span slot="status" slot-scope="status">
          <a-tag :color="status === '正常' ? 'Green' : 'red'">
            {{ status.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="Time1" slot-scope="Time1">
          <a-tag :color="Time1 !== '' ? '' : '#e98074'">
            {{ (Time1.toUpperCase() !== '') ? Time1.toUpperCase() : $t('offsset') }}
          </a-tag>
        </span>
        <span slot="Time2" slot-scope="Time2">
          <a-tag :color="Time2 !== '' ? '' : '#e98074'">
            {{ (Time2.toUpperCase() !== '') ? Time2.toUpperCase() : $t('offsset') }}
          </a-tag>
        </span>
        <span slot="Time3" slot-scope="Time3">
          <a-tag :color="Time3 !== '' ? '' : '#e98074'">
            {{ (Time3.toUpperCase() !== '') ? Time3.toUpperCase() : $t('offsset') }}
          </a-tag>
        </span>
        <span slot="Time4" slot-scope="Time4">
          <a-tag :color="Time4 !== '' ? '' : '#e98074'">
            {{ (Time4.toUpperCase() !== '') ? Time4.toUpperCase() : $t('offsset') }}
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
import { getDataFromCalculate, getPersonShift, getDevices, setCardOffset, setActionTime } from '@/services/data';
import { getKeepTimeSart, getKeepTimeEnd, convertTimeToMinutes } from '../../../utils/tool';
import { message } from 'ant-design-vue';
import { getDepartment } from '../../../services/data';

const columns = [

  {
    key: 'No',
    dataIndex: 'no',
    slots: { title: 'no' },
  },
  {
    key: 'date',
    slots: { title: 'date' },
    dataIndex: 'date',
  },
  {
    key: 'Day',
    slots: { title: 'Day' },
    dataIndex: 'Day',
    scopedSlots: { customRender: 'Day' },
  },
  {
    key: "PersonNO",
    slots: { title: 'personNo' },
    dataIndex: 'PersonNO',
    // scopedSlots: { customRender: 'PersonNO' },
  },
  {
    key: 'PersonName',
    slots: { title: 'fullname' },
    dataIndex: 'PersonName',
    // scopedSlots: { customRender: 'PersonName' }
  },
  {
    key: 'Department',
    slots: { title: 'Department' },
    dataIndex: 'Department',

  },
  {
    key: 'shiftName',
    slots: { title: 'shiftName' },
    dataIndex: 'shiftName',

  },
  {
    key: 'Type',
    slots: { title: 'credentialType' },
    dataIndex: 'Type',
    scopedSlots: { customRender: 'Type' },
  },
  {
    key: 'Time1',
    slots: { title: 'startwork1' },
    dataIndex: 'Time1',
    scopedSlots: { customRender: 'Time1' },
  },
  {
    slots: { title: 'endwork1' },
    dataIndex: 'Time2',
    scopedSlots: { customRender: 'Time2' },
  },
  {
    slots: { title: 'startwork2' },
    dataIndex: 'Time3',
    scopedSlots: { customRender: 'Time3' },
  },
  {
    slots: { title: 'endwork2' },
    dataIndex: 'Time4',
    scopedSlots: { customRender: 'Time4' },
  },

  {
    slots: { title: 'status' },
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  }
]
const dataSource = []

export default {
  name: 'QueryList',
  i18n: require('./i18n'),
  data() {

    return {
      moment,
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
      PersonID: '',
      daystart: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      dayend: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      Status: '',
      Type: '2',
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      table: [],
      visible: false,
      reportdata: '',
      reporttype: 0,
      per_shift: [],
      shift: '',
      personName: "",
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
      department: [],
      depart_id: "全部",
      loading: true
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
            this.calculate();
          });
        } else {
          setCardOffset(dataRequest).then((res) => {
            (res.data.success == true) ? message.success('补考勤成功！') : message.error(res.data.message);
            this.calculate();
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

            const listIndexTime = [8, 9, 10, 11];
            const cellIndex = event.path[2].cellIndex;

            if (listIndexTime.includes(cellIndex)) {

              this.offset_name = record.PersonName;
              this.offset_PersonNo = record.PersonNO
              this.offset_date = record.date;

              if (event.target.innerText != this.$t('offsset')) {
                this.offset_request_type = 1;
                this.validateStatus = 'success';
                this.offset_keepstart = getKeepTimeSart(record, cellIndex);
                this.offset_keepend = getKeepTimeEnd(record, cellIndex);
                this.offset_time = moment(event.target.innerHTML, 'HH:mm:ss');
                this.offset_oldtime = moment(event.target.innerHTML, 'HH:mm:ss').format('HH:mm:ss');
                this.offset_help = "您已经有考勤了是否想改时间吗？"

              } else {
                this.offset_request_type = 0;
                this.offset_time = null;
                this.validateStatus = 'error';
                this.offset_keepstart = getKeepTimeSart(record, cellIndex);
                this.offset_keepend = getKeepTimeEnd(record, cellIndex);
                var title = (cellIndex == 7) ? this.$t('startwork1') : (cellIndex == 8) ? this.$t('endwork1') : (cellIndex == 9) ? this.$t('startwork2') : this.$t('endwork2');

                this.offset_help = `注意:${title}考勤时间是从${this.offset_keepstart}到${this.offset_keepend}`
              }
              this.visible = true;
            }
          }
        }
      };
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
        "department": this.depart_id,
        "type": this.Type,
        "shift": this.shift
      }).then((res) => {
        this.table = res.data.response
        this.table.filter((value, index) => {
          var arrType = [];
          (value.Type == 2) ? arrType.push('人脸') : (value.Type == 3) ? arrType.push('刷卡') : (arrType.push('人脸'), arrType.push('刷卡'));
          var d = new Date(value.Date);
          var Day = d.getDay();
          console.log(value);
          dataSource.push({
            key: index,
            no: index + 1,
            date: value.Date,
            Day: Day,
            PersonNO: value.PersonNO,
            PersonName: value.PersonName,
            shiftName: value.shiftName,
            Department: value.Department,
            Time1: value.Time1,
            Time2: value.Time2,
            Time3: value.Time3,
            Time4: value.Time4,
            IS_CrossDay1: value.IS_CrossDay1,
            IS_CrossDay2: value.IS_CrossDay2,
            IS_CrossDay3: value.IS_CrossDay3,
            TimeKeepStart1: value.TimeKeepStart1,
            TimeKeepStart2: value.TimeKeepStart2,
            TimeKeepStart3: value.TimeKeepStart3,
            TimeKeepStart4: value.TimeKeepStart4,
            TimeKeepStart5: value.TimeKeepStart5,
            TimeKeepStart6: value.TimeKeepStart6,
            TimeKeepEnd1: value.TimeKeepEnd1,
            TimeKeepEnd2: value.TimeKeepEnd2,
            TimeKeepEnd3: value.TimeKeepEnd3,
            TimeKeepEnd4: value.TimeKeepEnd4,
            TimeKeepEnd5: value.TimeKeepEnd5,
            TimeKeepEnd6: value.TimeKeepEnd6,
            Type: arrType,
            status: (value.Status == 1) ? "异常" : (value.late1 || value.late2) ? "迟到" : "正常",
          })
        })
        this.loading = false;
      })
    },
  },
  mounted() {
    // this.dataSource=[];
    this.$t('pageDesc');
    getDevices().then((res) => this.devices = res.data.response);
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
    const dateTime = date

    getDepartment().then((res) => {
      const combo = [{
        UCML_OrganizeOID: 1,
        OrgName: "全部"
      }]
      console.log(res)
      res.data.response.map(e => {
        combo.push({
          UCML_OrganizeOID: e.UCML_OrganizeOID,
          OrgName: e.OrgName
        })
      });
      this.department = combo;
      console.log(this.department)
    });

    getDataFromCalculate({
      "daystart": dateTime,
      "dayend": dateTime,
      "department": this.depart_id,
      "personNO": '',
      "personName": '',
      "status": '',
      "shift": '',
      "type": this.Type
    }).then((res) => {
      this.table = res.data.response
      this.table.filter((value, index) => {
        var arrType = [];
        (value.Type == 2) ? arrType.push('人脸') : (value.Type == 3) ? arrType.push('刷卡') : (arrType.push('人脸'), arrType.push('刷卡'));
        var d = new Date(value.Date);
        var Day = d.getDay();
        dataSource.push({
          key: index,
          no: index + 1,
          date: value.Date,
          Day: Day,
          PersonNO: value.PersonNO,
          PersonName: value.PersonName,
          shiftName: value.shiftName,
          Department: value.Department,
          Time1: value.Time1,
          Time2: value.Time2,
          Time3: value.Time3,
          Time4: value.Time4,
          IS_CrossDay1: value.IS_CrossDay1,
          IS_CrossDay2: value.IS_CrossDay2,
          IS_CrossDay3: value.IS_CrossDay3,
          Type: arrType,
          status: (value.Status == 1) ? "异常" : (value.late1 || value.late2) ? "迟到" : "正常",
          TimeKeepStart1: value.TimeKeepStart1,
          TimeKeepStart2: value.TimeKeepStart2,
          TimeKeepStart3: value.TimeKeepStart3,
          TimeKeepStart4: value.TimeKeepStart4,
          TimeKeepStart5: value.TimeKeepStart5,
          TimeKeepStart6: value.TimeKeepStart6,
          TimeKeepEnd1: value.TimeKeepEnd1,
          TimeKeepEnd2: value.TimeKeepEnd2,
          TimeKeepEnd3: value.TimeKeepEnd3,
          TimeKeepEnd4: value.TimeKeepEnd4,
          TimeKeepEnd5: value.TimeKeepEnd5,
          TimeKeepEnd6: value.TimeKeepEnd6,

        })
      })
      this.loading = false;
    })

    getPersonShift().then(res => {
      console.log(res.data.response);
      this.per_shift = res.data.response;
    })
  }
}
</script>


<style lang="less" scoped>
.font-weight-black {
  color: rgb(0, 0, 0);
}
</style>
