//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = 'http://192.168.5.1:99/api'

module.exports = {
  LOGIN: `${BASE_URL}/user/login`,
  ROUTES: `${BASE_URL}/user/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,

  DATA: {
    QUERY: `${BASE_URL}/data/query`,
    CALCULATE: `${BASE_URL}/data/calculate`,
    DETAIL: `${BASE_URL}/data/detail`,
    DETAILFP: `${BASE_URL}/data/detailFP`,
    PERSON: `${BASE_URL}/person/person`,
    PERSONADD: `${BASE_URL}/person/add`,
    PERSONDEL: `${BASE_URL}/person/delete`,
    PERSONLISTADD: `${BASE_URL}/person/personcanadd`,
    EXPORT: `${BASE_URL}/data/downloadExcels`,
    PER_SHIFT: `${BASE_URL}/data/personShift`,
    DEVICES: `${BASE_URL}/data/devices`,
    CARD_OFFSET: `${BASE_URL}/data/cardoffset`,
    LIST_OFFSET: `${BASE_URL}/data/listoffset`,
    DELETE_OFFSET: `${BASE_URL}/data/deleteoffset`,
    VIEW_JIMU: `${BASE_URL}/data/viewjimu`,
    EXPORT_ADD: `${BASE_URL}/data/downloadExcel`,
    EDIT_TIME: `${BASE_URL}/data/editActionTime`,
    DEPARTMENT: `${BASE_URL}/data/getdepartment`,
    DEPARTMENTS: `${BASE_URL}/data/department`,
    ORGANIZE: `${BASE_URL}/data/getorganize`,
    POST: `${BASE_URL}/data/getpost`,
    COUNTRY: `${BASE_URL}/data/getcontry`,
  },


  PERSON_VIEW: {
    GETLIST: `${BASE_URL}/person/getPersonSync`,
    UPDATE: `${BASE_URL}/person/updateSync`,
    CREATE: `${BASE_URL}/person/createSync`,
  },
  PERSON_ERP: {
    GETLIST: `${BASE_URL}/personERP/`,
    UPDATE: `${BASE_URL}/person/updateSync`,
    CREATE: `${BASE_URL}/person/createSync`,
    DEPARTMENT: `${BASE_URL}/personERP/department`,
    PER: `${BASE_URL}/personERP/PersonList`,
    CONNECT: `${BASE_URL}/personERP/changeperson`,
    INSERT: `${BASE_URL}/personERP/insertNewPerson`,
    LIST_SYNC: `${BASE_URL}/personERP/getlistsync`,
  },
  FP: {
    YEAR: `${BASE_URL}/FPData/year`,
    MONTH: `${BASE_URL}/FPData/month`,
    DEPARTMENT: `${BASE_URL}/FPData/department`,
    QUERY_MONTH: `${BASE_URL}/FPData/queryMonth`,
    QUERY_DATE: `${BASE_URL}/FPData/queryDate`
  }
}

