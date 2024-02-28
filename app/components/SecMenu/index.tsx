"use client"
import React, { useState } from 'react'
import styles from './index.module.css'
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    items: Array<ISecMenuItems>
}

export default function SecMenu(props: Props) {

    const { items } = props;
    const router = useRouter();

    const [selectIndex, setSelectIndex] = useState(0);

    const onClick = (index: number) => {
        setSelectIndex(index)
        router.push(items[index].url)
    }

    return (
        <ul className={styles.ul}>
            {items.map((item: ISecMenuItems, index: number) => (
                <li onClick={() => onClick(index)} data-isactive={selectIndex === index} key={item.title}>{item.title}</li>
            ))}
        </ul>
    )
}