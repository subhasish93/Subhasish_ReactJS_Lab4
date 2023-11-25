import { useEffect, useState } from "react"
import IDataList from "../models/IDataList"
import { getDataFromServer } from "../services/DataService"
import ExpenseTracker from "./ExpenseTracker"

function ShowList() {

    const [items, setItems] = useState<IDataList[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [sum, setSum] = useState<number>(0)
    const [rahulSpent, setRameshSpent] = useState<number>(0)
    const [rameshSpent, setRahulSpent] = useState<number>(0)
    const [showForm, setShowForm] = useState<boolean>(false)
    var rahulSpent1 = 0
    var rameshSpent1 = 0


    useEffect(() => {

        const fetchData = async () => {

            try {
                const data = await getDataFromServer()
                setItems(data)
                setSum(data.reduce((res, each) => res = res + each.price, 0))
                shares(data)
            }
            catch (error: any) {
                setError(error)
            }
        }
        fetchData()
    }, [])

    const shares = (data: IDataList[]) => {
        data.map(
            each => (
                each.payeeName === "Rahul" ? (
                    rahulSpent1 = rahulSpent1 + each.price
                ) : (
                    rameshSpent1 = rameshSpent1 + each.price
                )
            )
        )
        setRahulSpent(rahulSpent1)
        setRameshSpent(rameshSpent1)
    }

    const success = () => {
        setShowForm(false)
    }

    const cancel = () => {
        setShowForm(false)
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {showForm && (
                <div className="form">
                    <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
                </div>
            )}

            <div className="use-inline date header-color">Date</div>
            <div className="use-inline header-color">Product Purchased</div>
            <div className="use-inline price header-color">Price</div>
            <div className="use-inline header-color">Payee</div>
            {
                items &&
                items.map(
                    (user, ind) => (
                        <div key={ind}>
                            <div className="use-inline date">{user.setDate}</div>
                            <div className="use-inline">{user.product}</div>
                            <div className="use-inline price">{user.price}</div>
                            <div className="use-inline">{user.payeeName}</div>
                        </div>
                    )
                )
            }

            <div className="use-inline"> Total Sum</div>
            <div className="use-inline total">{sum}</div><hr />
            <div className="use-inline"> Ramesh Spent</div>
            <div className="use-inline total Ramesh">{rameshSpent}</div><hr />
            <div className="use-inline"> Rahul Spent</div>
            <div className="use-inline total Rahul">{rahulSpent}</div><hr />
            <div className="use-inline payable">{rahulSpent > rameshSpent ? "Pay Rahul" : "Pay Ramesh"}</div>
            <div className="use-inline payable price">{Math.abs((rahulSpent - rameshSpent) / 2)}</div>

            {
                error && (
                    <>
                        {error?.message}
                    </>
                )
            }
        </>
    )
}

export default ShowList