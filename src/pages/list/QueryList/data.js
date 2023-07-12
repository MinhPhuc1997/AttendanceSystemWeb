export const cbbBP = [
    {
        title:"Bảo Toàn 保全课",
        value:''
    },
    {
        title:"Công Trình 设备维修",
        value:''
    },{
        title:"Dệt 织造",
        value:''
    },{
        title:"Định Hình 整理部",
        value:''
    },{
        title:"Duyệt Màu 批色部",
        value:''
    },{
        title:"Hành Chính 行政",
        value:''
    },{
        title:"Hóa Nghiệm 化验室",
        value:''
    },{
        title:"IT 资讯部",
        value:''
    },{
        title:"Kho 仓库",
        value:''
    },{
        title:"Kiểm Phẩm QA 品管部",
        value:''
    },{
        title:"Kiểm Phẩm QC 质检部",
        value:''
    },{
        title:"Kinh Doanh 营销",
        value:''
    },{
        title:"Nhân Sự 人力资源",
        value:''
    },{
        title:"Nhuộm 漂染部",
        value:''
    },{
        title:"PCC 生控部",
        value:''
    },{
        title:"Phối sợi配 纱",
        value:''
    },{
        title:"Thu Mua 采购部",
        value:''
    },{
        title:"XLNT + Lò Hơi 能源管理",
        value:''
    },{
        title:"XNK 船务部",
        value:''
    }
]

export const pagination = {
    size: "small",
    defaultPageSize: 200,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '30', '50', '100','200'],
    showTotal: total => `Tổng cộng ${total} hàng`
}
export const columnsdetail = [

  {
    title: '序号',
    dataIndex: 'No',
    key: 'No',
    slots: { title: 'No' },
    scopedSlots: { customRender: 'No' },
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
    scopedSlots: { customRender: 'Day' },

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

export const datadetail = [
];

export const columns = [

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
    title: '星期',
    dataIndex: 'Day',
    key: 'Day',
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
    key: 'Organize',
    slots: { title: 'Organize' },
    dataIndex: 'Organize',

  },
  {
    key: 'Department',
    slots: { title: 'Department' },
    dataIndex: 'Department',

  },
  {
    key: 'Post',
    slots: { title: 'Post' },
    dataIndex: 'Post',

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
    key: 'startwork1',
    slots: { title: 'startwork1' },
    dataIndex: 'Time1',
    // scopedSlots: { customRender: 'Time1' },
  },
  {
    slots: { title: 'endwork1' },
    dataIndex: 'Time2',
    //  scopedSlots: { customRender: 'Time2' },
  },
  {
    slots: { title: 'startwork2' },
    dataIndex: 'Time3',
    // scopedSlots: { customRender: 'Time3' },
  },
  {
    slots: { title: 'endwork2' },
    dataIndex: 'Time4',
    // scopedSlots: { customRender: 'Time4' },
  },

  {
    slots: { title: 'status' },
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    slots: { title: 'note' },
    dataIndex: 'note',

  }
]
const dataSource = []

