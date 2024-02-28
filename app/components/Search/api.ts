import request from "umi-request";

export const getStocksById = (id: string) => {
    return request(`/demo/api/v1/autocomplete/?q=${id}`)
}