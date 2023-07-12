<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <a-form layout="horizontal">
      <a-row>
        <a-col :md="8" :sm="24">
          <a-form-item :label="$t('devices')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
            <a-select v-model="device" name="device">
              <a-select-option v-for="d in devices" :value='d.DeviceID' :key="d.DeviceID">{{ d.DeviceName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item :label="$t('date')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
            <a-date-picker style="width: 100%" placeholder="请输入更新日期" v-model="date" name="date"  />
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item :label="$t('time')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
            <a-time-picker @change="onChangeTime" :default-open-value="moment('00:00:00', 'HH:mm:ss')" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-row>
      <a-col :md="8" :sm="24">
        <a-form-item :label="$t('find')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
          <a-input-search :placeholder="$t('find')" @change="onChange" v-model="findkey" :value='findkey' />
        </a-form-item>
      </a-col>

    </a-row>
    <a-table :columns="columns" :data-source="dataSource" :pagination="{
        defaultPageSize: 20,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 40, 50, 100]
      }">
      <span slot="No"> {{ $t('No') }}</span>
      <span slot="PersonNo"> {{ $t('PersonNo') }}</span>
      <span slot="PersonName"> {{ $t('PersonName') }}</span>
      <span slot="Birthday"> {{ $t('Birthday') }}</span>
      <span slot="Address"> {{ $t('Address') }}</span>
      <span slot="Mobile"> {{ $t('Mobile') }}</span>
      <span slot="Action"> {{ $t('Action') }}</span>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="action" @click="ActionRecord(record)" slot-scope="text, record">
        补卡
      </a>
      <span slot="Gender" slot-scope="Gender">
        {{ (Gender ==1)?"男":"女"}}
       
      </span>
    </a-table>
  </a-card>
</template>

<script>
import moment from 'moment';
import { getPersonList } from '@/services/person';
import { setCardOffset,getDevices } from '@/services/data'
import { message } from 'ant-design-vue';

const columns = [

  {
    key: 'No',
    dataIndex: 'No',
    slots: { title: 'No' },
  },
  {
    key: 'PersonNo',
    dataIndex: 'PersonNo',
    slots: { title: 'PersonNo' }
  },
  {
    key: 'PersonName',
    dataIndex: 'PersonName',
    slots: { title: 'PersonName' },

  },
  {
    key: 'Birthday',
    dataIndex: 'Birthday',
    slots: { title: 'Birthday' },

  },
  {
    key: 'Address',
    dataIndex: 'Address',
    slots: { title: 'Address' },

  },
  {
    key: 'Mobile',
    dataIndex: 'Mobile',
    slots: { title: 'Mobile' },

  },
  { key: 'Action', dataIndex: '123', scopedSlots: { customRender: 'action' }, slots: { title: 'Action' } },
];

export default {
  name: 'BasicForm',
  i18n: require('./i18n'),
  data() {
    return {
      value: 1,
      dataSource: [],
      dataTemp: [],
      columns,
      date: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
      time: '',
      devices: [],
      device: '172582144',
      findkey: '',
    }
  },
  computed: {
    desc() {
      return this.$t('desc')
    }
  },
  methods: {
    moment,
    onChangeTime(time, timeString) {
      console.log(time, timeString);
      this.time = timeString;
    },
    onChange() {
      // console.log(this.device + '--' + this.date + '--' + this.time);
      (this.findkey != '') ?
        this.dataSource = this.dataTemp.filter(e => e.PersonName.toLowerCase().includes(this.findkey.toLowerCase()) || e.PersonNo.toLowerCase().includes(this.findkey.toLowerCase())) :
        this.dataSource = this.dataTemp;
    },
    ActionRecord(record) {
      console.log(record.PersonNo);

      if (this.time == '' || this.date == '') {
        return this.$notification.open({
          message: this.$t('message'),
          description:
            this.$t('description'),
          icon: <a-icon type="smile" style="color: #108ee9" />,
        });
      }
      let start = new Date(this.date);
      var m_mon =(start.getMonth() + 1).toString()
      
      if(m_mon.length==1){
        m_mon='0'+m_mon;
      }
      var m_days =start.getDate().toString()
      if(m_days.length==1){
        m_days='0'+m_days;
      }
      const m_day= (start.getFullYear()).toString() + '-' + m_mon + '-' + m_days;
      console.log(m_day);
      
      var dataRequest = {
        PersonNo: record.PersonNo,
        DateTime: m_day + ' ' + this.time,
        DeviceID: this.device,
      };
   

      this.$confirm({
        title: this.$t('title'),
        content: this.$t('content') + record.PersonName,
        onOk() {
          //console.log(dataRequest);


         setCardOffset(dataRequest).then((res) => {
           //console.log(res.data.success);
              (res.data.success == true) ? message.success('补考勤成功！') : message.error(res.data.message);
            }
            
            );
        },
        onCancel() { },
      });

    }
  },
  mounted() {

   getDevices().then((res) => this.devices = res.data.response);
    console.log(this.devices)
    getPersonList().then((res) => {
      var arrPerson = [];
      res.data.response.map((e, i) => {
        arrPerson.push({
          id: i,
          key: i,
          No: i + 1,
          PersonNo: e.PersonNo,
          PersonName: e.PersonName,
          Gender: e.Gender,
          Birthday: e.Birthday,
          Address: e.Address,
          Mobile: e.Mobile
        })
      })
      this.dataTemp = this.dataSource = arrPerson;
    })


  }
}
</script>

<style scoped>
</style>
