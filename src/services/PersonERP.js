import { request, METHOD } from '@/utils/request'
import { PERSON_ERP } from "./api"

export async function getPersonList(data) {
    return request(PERSON_ERP.GETLIST, METHOD.POST,data)
}

export async function getDepartment() {
    return request(PERSON_ERP.DEPARTMENT, METHOD.GET)
}

export async function getPerson() {
    return request(PERSON_ERP.PER, METHOD.GET)
}

export async function setPersonNo(data) {
    return request(PERSON_ERP.CONNECT, METHOD.POST,data)
}

export async function addNewPerson(data) {
    return request(PERSON_ERP.INSERT, METHOD.POST,data)
}

export async function getListSync() {
    return request(PERSON_ERP.LIST_SYNC, METHOD.GET)
}

