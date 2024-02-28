import request from "umi-request"

export const getStocksInfoByID = (id: string) => {
    return request(`https://api.finmindtrade.com/api/v4/data?data_id=${id}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wMi0yNyAyMjo1Mzo0NSIsInVzZXJfaWQiOiI4MTQ3OTI2NDdAZ21haWwuY29tIiwiaXAiOiIxMjMuMTgzLjIyOC4yMzAifQ.IuVElOkD6qjFtP341aL7u_x9DyP6m-G6bWlmOuUb1f4&dataset=TaiwanStockInfo`)
}

export const getStocksDataByIDAndTime = (id: string, startYear: number) => {
    return request(`/demo/api/v2/fundamentals/${id}/${startYear}/2024`)
}