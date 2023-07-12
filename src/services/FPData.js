import { request, METHOD } from '@/utils/request'
import { FP } from "./api";

export async function getYear() {
    return request(FP.YEAR, METHOD.GET)
}

export async function getMonth(data) {
    return request(FP.MONTH, METHOD.GET, data)
}

export async function getDepartment() {
    return request(FP.DEPARTMENT, METHOD.GET)
}

export async function postQueryMonth(data) {
    return request(FP.QUERY_MONTH, METHOD.POST, data)
}

