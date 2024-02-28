
"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'
import { getStocksDataByIDAndTime, getStocksInfoByID } from './api'
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import ReactEcharts from 'echarts-for-react';
import { Select, Option, Button } from '@mui/joy'

type Props = {}

export default function page({ }: Props) {

    const { id } = useParams();
    const [stocksInfo, setStocksInfo] = useState<any>({});
    const [stocksData, setStocksData] = useState<any>({});
    const [startYear, setStartYear] = useState(new Date().getFullYear() - 5);

    const revenue = useMemo(() => {
        const revenueArr = stocksData?.monthly?.Revenue?.data.map((item: Array<number>) => item[1]) ?? [];
        return revenueArr;
    }, [stocksData])

    const tableMonth = useMemo(() => {
        const year = [
        ]

        const difference = new Date().getFullYear() - startYear;
        const newYear = new Date().getFullYear();
        const newMonth = new Date().getMonth() + 1;


        for (let i = startYear; i <= startYear + difference; i++) {
            for (let o = 1; o <= 12; o++) {

                if (i === newYear && o >= newMonth) {
                    break;
                }

                let yearMouth = `${i}${("0" + o).slice(-2)}`
                year.push(yearMouth)
            }
        }

        return year
    }, [startYear])

    const tableRateIncrease = useMemo(() => {
        const rate = stocksData?.monthly?.RevenueMOM?.data.map((item: Array<number>) => item[1]) ?? [];
        rate.pop();
        return rate;
    }, [stocksData])

    const monthlyAverage = useMemo(() => {
        const average = stocksData?.monthly?.Price?.data.map((item: Array<string>) => parseFloat(item[1])) ?? []
        average.pop();
        return average;
    }, [stocksData])

    const option = useMemo(() => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['每月营收', '月均值']
        },
        xAxis: [
            {
                type: 'category',
                data: tableMonth,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    interval: 11,
                    formatter: function (value: string) {
                        return value.substring(0, 4)
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '千元',
                min: 0,
                max: Math.max(...revenue) + 10000000,
            },
            {
                type: 'value',
                name: '股价',
                min: 0,
                max: Math.max(...monthlyAverage) + 50,
            }
        ],
        series: [
            {
                name: '每月营收',
                type: 'bar',
                data: revenue
            },
            {
                name: '月均值',
                type: 'line',
                yAxisIndex: 1,
                data: monthlyAverage
            }
        ],
        grid: {
            containLabel: true,
            left: 10,
            right: 10,
            bottom: 0
        }
    }), [revenue, tableRateIncrease, monthlyAverage]);

    const getInfo = async () => {
        const res = await getStocksInfoByID(id as string)
        if (res.status === 200) {
            setStocksInfo(res.data[0])
        }
    }

    const getData = async (startYear: number) => {
        const res = await getStocksDataByIDAndTime(id as string, startYear);
        setStocksData(res);
        res.monthly.Revenue.data.pop();
    }

    const onSelectTime = (value: number | null) => {
        setStocksData({});
        setStartYear(new Date().getFullYear() - (value ?? 0));
    }

    useEffect(() => {
        getInfo()
    }, [])

    useEffect(() => {
        getData(startYear)
    }, [startYear])

    return (
        <div>
            <div className={styles.card}>{`${stocksInfo.stock_name ?? ""} (${id})`}</div>
            <div className={styles.card}>
                <div className={styles.flex}>
                    <Button>每月营收</Button>
                    <Select defaultValue={5} onChange={(_e, value) => onSelectTime(value)}>
                        <Option value={3}>近3年</Option>
                        <Option value={5}>近5年</Option>
                        <Option value={8}>近8年</Option>
                    </Select>
                </div>
                <ReactEcharts style={{ width: "100%", height: 400 }} option={option} />
            </div>
            <div className={styles.card}>
                <div className={styles.flex}>
                    <Button>详细数据</Button>
                </div>
                <Sheet variant="outlined"
                    sx={{
                        overflow: "auto"
                    }}
                >
                    <Table
                        borderAxis="bothBetween"
                        sx={{
                            '& tr > *:first-child': {
                                position: 'sticky',
                                left: 0,
                                bgcolor: '#fff',
                            },
                        }}
                    >
                        <tbody>
                            <tr>
                                <td style={{ width: 180 }}>月份</td>
                                {tableMonth.map(item => <td style={{ width: 100 }} key={item}>{item}</td>)}
                            </tr>
                            <tr>
                                <td style={{ width: 180 }}>每月營收</td>
                                {revenue.map((item: any) => <td style={{ width: 100 }} key={item}>{item}</td>)}
                            </tr>
                            <tr>
                                <td style={{ width: 180 }}>單月營收月增率(%)</td>
                                {tableRateIncrease.map((item: any, index: number) => <td style={{ width: 100 }} key={index}>{item}</td>)}
                            </tr>
                        </tbody>
                    </Table>
                </Sheet>
            </div>
        </div>
    )
}