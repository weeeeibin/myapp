'use client';
import React, { SyntheticEvent, useRef, useState } from 'react'
import styles from './index.module.css'
import { getStocksById } from './api';
import { useRouter } from 'next/navigation';

type Props = {}

export default function Search({ }: Props) {

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [stocks, setStocks] = useState([]);


    const onInputChange = async (e: SyntheticEvent) => {
        const inuptTarget = e.target as HTMLInputElement;
        if (inuptTarget.value === "") {
            setStocks([]);
            return;
        }
        const res = await getStocksById(inuptTarget.value);
        if (inuptTarget.value === "") {
            setStocks([]);
            return;
        }
        const { stocks } = res.data;
        setStocks(stocks);
    }

    const goStocks = (id: string) => {
        router.push(`/financialStatements/stocks/${id}`);
        setStocks([]);
        inputRef.current!.value = ""
    }

    return (
        <div className={styles.input_wrapper}>
            <input ref={inputRef} className={styles.input} placeholder='輸入台／美股代號，查看公司價值' onChange={onInputChange} />
            <ul className={styles.search_wrapper}>
                {
                    stocks.map((item: any) => (
                        <li key={item.ticker} onClick={() => goStocks(item.ticker)}>{item.displayContent}</li>
                    ))
                }
            </ul>
        </div>
    )
}