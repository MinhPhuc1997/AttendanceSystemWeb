<template>
  <a-card class="card" :title="$t('table')" :bordered="false">
    <a-row>
      <a-col :md="6" :sm="24">
        <a-form-item label="$t('personNo')"  :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
          <a-input placeholder="请输入" v-model="PersonID" name="PersonID" />
        </a-form-item>
      </a-col>
      <a-col :md="6" :sm="24">
        <a-form-item :label="$t('PersonName')" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
          <a-input placeholder="请输入" v-model="PersonName" name="PersonName" />
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
    </a-row>
    <a-row>
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button type="primary" :style="{ marginLeft: '8px' }" @click="onSearch" icon="search">
          {{ $t('check') }}</a-button>
      </a-col>
    </a-row>
    <a-table :columns="columns" :data-source="data" :pagination="{
      defaultPageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: [10, 20, 30, 40, 50, 100]
    }">
      <span slot="No"> {{ $t('No') }}</span>
      <span slot="PersonNo"> {{ $t('PersonNo') }}</span>
      <span slot="PersonName"> {{ $t('PersonName') }}</span>
      <span slot="Date"> {{ $t('Date') }}</span>
      <span slot="Time"> {{ $t('Time') }}</span>
      <span slot="DeviceName"> {{ $t('DeviceName') }}</span>
      <span slot="DoorName"> {{ $t('DoorName') }}</span>
      <span slot="Action"> {{ $t('Delete') }}</span>
      <span slot="Day"> {{ $t('Day') }}</span>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <a slot="action" @click="DeleteRow(record)" slot-scope="text, record">
        {{ $t('Delete') }}
      </a><span slot="Day" slot-scope="Day">
        {{
            (Day == 0) ? $t('sun') : (Day == 1) ? $t('mon') : (Day == 2) ? $t('tue') : (Day == 3) ? $t('wed') : (Day == 4)
              ? $t('thu') : (Day == 5) ? $t('fri') : $t('sat')
        }}
      </span>


    </a-table>
  </a-card>

</template>

<script>
import { getListDataOffset, onDeleteOneOffset } from '@/services/data'
import { message } from 'ant-design-vue';
const columns = [

  {
    key: 'No',
    dataIndex: 'No',
    slots: { title: 'No' },
  },
  {
    key: 'Date',
    dataIndex: 'Date',
    slots: { title: 'Date' },

  },
  {
    key: 'Day',
    slots: { title: 'Day' },
    dataIndex: 'Day',
    scopedSlots: { customRender: 'Day' },
  },
  {
    key: 'Time',
    dataIndex: 'Time',
    slots: { title: 'Time' },

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
    key: 'DeviceName',
    dataIndex: 'DeviceName',
    slots: { title: 'DeviceName' },

  },
  {
    key: 'DoorName',
    dataIndex: 'DoorName',
    slots: { title: 'DoorName' },

  },
  { key: 'Action', dataIndex: '123', scopedSlots: { customRender: 'action' }, slots: { title: 'Action' } },
];
const data = [];
export default {
  name: 'AdvancedForm',
  i18n: require('./i18n'),
  data() {
    return {
      data,
      columns,
      daystart: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
      dayend: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
      PersonID: '',
      PersonName: ''
    }
  },
  methods: {
    onSearch() {
      let start = new Date(this.daystart);
      let end = new Date(this.dayend)
      var m_daystart = (start.getFullYear()).toString() + '-' + (start.getMonth() + 1).toString() + '-' + start.getDate().toString();
      var m_dayend = (end.getFullYear()).toString() + '-' + (end.getMonth() + 1).toString() + '-' + end.getDate().toString();
      m_daystart = (m_daystart != '1970-1-1') ? m_daystart : '';
      m_dayend = (m_dayend != '1970-1-1') ? m_dayend : '';
      getListDataOffset({
        daystart: m_daystart,
        dayend: m_dayend,
        PersonNo: this.PersonID.toString().trim(),
        PersonName: this.PersonName.toString().trim(),
      }).then((res) => {
        var arrPerson = [];
        res.data.response.map((e, i) => {
          var d = new Date(e.Date);
          var Day = d.getDay();
          arrPerson.push({
            key: i,
            No: i + 1,
            PersonNo: e.PersonNO,
            PersonName: e.PersonName,
            Date: e.Date,
            Day: Day,
            Time: e.Time,
            DeviceName: e.DeviceName,
            DoorName: e.DoorName,
            DGUID: e.DGUID,
            RecordID: e.RecordID
          })
        })
        this.data = arrPerson;
      })
    },
    DeleteRow(record) {
      var tempdata = this.data;
      this.$confirm({
        title: this.$t('title'),
        content: this.$t('content') + record.PersonName,
        onOk() {
          onDeleteOneOffset({
            DGUID: record.DGUID,
            RecordID: record.RecordID
          }).then((res) => {
            var indexdel = 0;
            tempdata.map((e, i) => {
              if (e.RecordID == record.RecordID) {
                indexdel = i;
              }
            })
            tempdata.splice(indexdel, 1);
            (res.data.success == true) ? message.success('删除补考勤成功！') : message.error(res.data.message);
          }
          );
        },
        onCancel() { },
      });
      this.data = tempdata;
    }
  },

  mounted() {
    getListDataOffset({
      daystart: '',
      dayend: '',
      PersonNo: '',
      PersonName: '',
    }).then((res) => {
      var arrPerson = [];
      res.data.response.map((e, i) => {
        var d = new Date(e.Date);
        var Day = d.getDay();
        arrPerson.push({
          key: i,
          No: i + 1,
          PersonNo: e.PersonNO,
          PersonName: e.PersonName,
          Date: e.Date,
          Day: Day,
          Time: e.Time,
          DeviceName: e.DeviceName,
          DoorName: e.DoorName,
          DGUID: e.DGUID,
          RecordID: e.RecordID
        })
      })
      this.data = arrPerson;
    })
  }
}

</script>
<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
</style>
