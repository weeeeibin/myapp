import { Suspense } from "react";
import SecMenu from "../components/SecMenu";
import styles from "./layout.module.css";

export default function FinancialStatementsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const menuItems: Array<ISecMenuItems> = [
        {
            title: "每月營收",
            url: "/financialStatements/stocks/2033"
        },
        {
            title: "每股盈餘",
            url: ""
        },
        {
            title: "損益表",
            url: ""
        },
        {
            title: "總資產",
            url: ""
        }
    ]

    return (
        <Suspense fallback="loading...">
            <div className={styles.wrapper}>
                <SecMenu items={menuItems} />
                {children}
            </div>
        </Suspense>
    )
}