import { request, METHOD } from '@/utils/request'
import { PERSON_VIEW } from "./api"

export async function getPersonList(data) {
    return request(PERSON_VIEW.GETLIST, METHOD.POST, data)
}

export async function insertPerson(data) {
    return request(PERSON_VIEW.CREATE, METHOD.POST, data)
}

export async function updatePerson(data) {
    return request(PERSON_VIEW.UPDATE, METHOD.POST, data)
}
