"use client";

import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import Router, { useParams, usePathname, useRouter } from "next/navigation"

type Props = {
    items: Array<IMenuItems>
}

export default function Menu(props: Props) {

    const { items } = props;

    const router = useRouter();
    const pathName = usePathname();
    const [selectIndex, setSelectIndex] = useState<Number | undefined>(undefined);

    const onClick = (index: number) => {
        setSelectIndex(index);
        const { url } = items[index];
        router.push(Boolean(url) ? url : '/404')
    }

    useMemo(() => {
        items.forEach((item, index) => {
            if (pathName.includes(item.key)) {
                setSelectIndex(index);
            }
        })
    }, [])

    return (
        <ul className={styles.ul_wrapper}>
            {items.map((item: IMenuItems, index: number) => (
                <li data-isactive={selectIndex === index} onClick={() => onClick(index)} key={item.title}>
                    <div className={styles.icon} style={{ color: item.color }}>{item.iconText}</div>
                    {item.title}
                </li>
            ))}
        </ul>
    )
}