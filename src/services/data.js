import { request, METHOD } from '@/utils/request'
import {DATA } from "./api";

export async function getDataFromQuery(data) {
    return request(DATA.QUERY, METHOD.POST, data)
}

export async function getDataFromCalculate(data) {
    return request(DATA.CALCULATE, METHOD.POST, data)
}

export async function getDataDetail(PersonNO, date, valDate) {
    return request(DATA.DETAIL, METHOD.POST, { PersonNO: PersonNO, date: date, valDate: valDate })
}

export async function getDataDetailFP(PersonNO, date, valDate) {
    return request(DATA.DETAILFP, METHOD.POST, { PersonNO: PersonNO, date: date, valDate: valDate })
}

export async function exportDataToExcel(data_) {
    return request(DATA.EXPORT, METHOD.POST, data_)
}

export async function getPersonShift() {
    return request(DATA.PER_SHIFT, METHOD.GET, {})
}

export async function getDevices() {
    return request(DATA.DEVICES, METHOD.GET)
}

export async function setCardOffset(data) {
    return request(DATA.CARD_OFFSET, METHOD.POST, { data })
}

export async function getListDataOffset(data) {
    return request(DATA.LIST_OFFSET, METHOD.POST, data)
}

export async function onDeleteOneOffset(data) {
    return request(DATA.DELETE_OFFSET, METHOD.POST, data)
}

export async function getViewJimuData(data) {
    return request(DATA.VIEW_JIMU, METHOD.POST, data)
}

export async function setActionTime(data) {
    return request(DATA.EDIT_TIME, METHOD.POST, data)
}

export async function getOrganize() {
    return request(DATA.ORGANIZE, METHOD.GET)
}


export async function getDepartment(key) {
    return request(DATA.DEPARTMENT, METHOD.POST, { Organize: key })
}

export async function getDepartments(key) {
    return request(DATA.DEPARTMENTS, METHOD.GET, { orgID: key })
}

export async function getPost(key) {
    return request(DATA.POST, METHOD.POST, { Post: key })
}

export async function getcontry() {
    return request(DATA.COUNTRY, METHOD.GET)
}



