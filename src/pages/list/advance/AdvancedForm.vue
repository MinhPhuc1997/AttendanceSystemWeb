<template>
  <div>
    <div>

    </div>
    <a-card class="card" :title="$t('table')" :bordered="false">
      <a slot="extra">
        <a-button type="primary" @click="showModal">
          {{ $t('add') }}
        </a-button>
      </a>
      <a-row>
        <a-input-search style="width: 40vh" @search="onSearch" :placeholder="$t('find')" @change="onChange"
          v-model="findkey" />
      </a-row>
      <a-table :columns="columns" :data-source="data">
        <span slot="No"> {{ $t('No') }}</span>
        <span slot="PersonNo"> {{ $t('PersonNo') }}</span>
        <span slot="PersonName"> {{ $t('PersonName') }}</span>
        <span slot="Gender"> {{ $t('Gender') }}</span>
        <span slot="Birthday"> {{ $t('Birthday') }}</span>
        <span slot="Address"> {{ $t('Address') }}</span>
        <span slot="Mobile"> {{ $t('Mobile') }}</span>
        <span slot="Action"> {{ $t('Action') }}</span>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <a slot="action" @click="DeleteRow(record)" slot-scope="text, record">
          {{ $t('Delete') }}
        </a>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { getPersonList, deletePerson, getPersonCanAddList, addPersonToList } from '@/services/person'
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
    key: 'Gender',
    dataIndex: 'Gender',
    slots: { title: 'Gender' },

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
const data = [];

const temp = [];

const columnsAdd = [
  {
    key: 'PersonNO',
    dataIndex: 'PersonNO',
    slots: { title: 'PersonNO' }
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


];
const dataAdd = [];
const dataAddTemp = [];


export default {

  name: 'Repair',
  i18n: require('./i18n'),
  data() {
    return {
      loading: false,
      data,
      columns,
      temp,
      findkey: '',
      visible: false,
      confirmLoading: false,
      delResult: false,
      visibles: false,
      condition: false,
      dataAdd,
      columnsAdd,
      dataAddTemp,
      findkeyadd: '',
      selected: [],
    }
  },
  methods: {
    validate() {
      this.$refs.repository.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
      this.$refs.task.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onSearch(val) {
      (val != '') ?
        this.data = this.data.filter(e => e.PersonName.toLowerCase().includes(val.toLowerCase())) :
        this.data = this.temp;
    },
    onChange() {
      (this.findkey != '') ?
        this.data = this.temp.filter(e => e.PersonName.toLowerCase().includes(this.findkey.toLowerCase()) || e.PersonNo.toLowerCase().includes(this.findkey.toLowerCase())) :
        this.data = this.temp;
    },
    onChangeAdd() {

      this.dataAdd = [];


      (this.findkeyadd != '') ?
        this.dataAdd = this.dataAddTemp.filter(e => e.PersonName.toLowerCase().includes(this.findkeyadd.toLowerCase())
          || e.PersonNO.toLowerCase().includes(this.findkeyadd.toLowerCase())
        ) :
        this.dataAdd = this.dataAddTemp;
    },
    showModal() {

      getPersonCanAddList().then((res) => {
        var arrPerson = [];
        res.data.response.map((e, i) => {
          arrPerson.push({
            key: i,
            PersonNO: e.PersonNO,
            PersonName: e.PersonName,
            Birthday: e.Birthday,
            Address: e.Address,
            Mobile: e.Mobile
          })
        })
        this.dataAddTemp = this.dataAdd = arrPerson;
      })
      this.visible = true;
    },
    handleOk() {
      if (this.selected.length > 0) {
        this.selected.map((e) => {
          addPersonToList(e.PersonNO).then((res) => {
            console.log(res);
            (res.data.success) ? message.success('Bạn đã thêm thành công') : message.error(res.data.message);
          }).then(
            getPersonList().then((res) => {
              var arrPerson = [];
              res.data.response.map((e, i) => {
                arrPerson.push({
                  id: e.id,
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
              this.temp = this.data = arrPerson;
            })
          )
        })
      }
      this.visible = false;

    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = false;
    }, DeleteRow(e) {
      if (confirm("Do you really want to delete?")) {
        deletePerson(e.id).then((res) => {
          (res.data.success == 200) ? message.success('Bạn đã xóa thành công') : message.error(res.data.message);
        }).then(() => {
          getPersonList().then((res) => {
            var arrPerson = [];
            res.data.response.map((e, i) => {
              arrPerson.push({
                id: e.id,
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
            this.temp = this.data = arrPerson;
          })
        });
      }
    }
  },
  computed: {
    desc() {
      return this.$t('desc')
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

          this.selected = selectedRows;
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
  mounted() {
    getPersonList().then((res) => {
      var arrPerson = [];
      res.data.response.map((e, i) => {
        arrPerson.push({
          id: e.id,
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
      this.temp = this.data = arrPerson;
    })
  }
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
</style>
