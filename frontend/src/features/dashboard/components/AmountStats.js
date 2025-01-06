import TitleCard from "../../../components/Cards/TitleCard"

const userSourceData = [
    {
        reference: "DI_2112",
        customer: "Nanda Kharisma S",
        warehouse: "Warehouse 1",
        status: "Pending",
        grandTotal: "$1735",
        paid: "$1735",
        due: "$0.00",
        paymentStatus: "Paid",
    },
    {
        reference: "DI_2113",
        customer: "Budi Santoso",
        warehouse: "Warehouse 2",
        status: "Completed",
        grandTotal: "$1450",
        paid: "$1450",
        due: "$0.00",
        paymentStatus: "Paid",
    },
    {
        reference: "DI_2114",
        customer: "Siti Aisyah",
        warehouse: "Warehouse 3",
        status: "Pending",
        grandTotal: "$2100",
        paid: "$1500",
        due: "$600.00",
        paymentStatus: "Partial",
    },
    {
        reference: "DI_2115",
        customer: "Rina Marlina",
        warehouse: "Warehouse 1",
        status: "Cancelled",
        grandTotal: "$980",
        paid: "$0.00",
        due: "$980.00",
        paymentStatus: "Unpaid",
    },
    {
        reference: "DI_2116",
        customer: "Agus Wijaya",
        warehouse: "Warehouse 2",
        status: "Completed",
        grandTotal: "$1200",
        paid: "$1200",
        due: "$0.00",
        paymentStatus: "Paid",
        
    },

    {
        reference: "DI_2116",
        customer: "Ari Tawa",
        warehouse: "Warehouse 2",
        status: "Unpaid",
        grandTotal: "$111",
        paid: "$$0.00",
        due: "$111.00",
        paymentStatus: "Paid",
        
    },
];

function UserChannels(){
    const renderStatusButton = (status) => {
        let buttonClass = "btn btn-outline btn-xs";

        switch (status) {
            case "Pending":
                buttonClass += " btn-primary";  // Yellow for Pending
                break;
            case "Completed":
                buttonClass += " btn-success";  // Green for Completed
                break;
            case "Cancelled":
                buttonClass += " btn-error";  // Red for Cancelled
                break;
            default:
                buttonClass += " btn-primary";  // Default blue
        }

        return <button className={buttonClass}>{status}</button>;
    };

    const renderPaymentButton = (paymentStatus) => {
        let buttonClass = "btn btn-outline btn-xs";

        switch (paymentStatus) {
            case "Paid":
                buttonClass += " btn-success";  // Green for Paid
                break;
            case "Partial":
                buttonClass += " btn-primary";  // Yellow for Partial
                break;
            case "Unpaid":
                buttonClass += " btn-error";  // Red for Unpaid
                break;
            default:
                buttonClass += " btn-primary";  // Default blue
        }

        return <button className={buttonClass}>{paymentStatus}</button>;
    };

    return (
        <TitleCard title={"Recenct Sales"}>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th className="normal-case">Reference</th>
                            <th className="normal-case">Customer</th>
                            <th className="normal-case">Warehouse</th>
                            <th className="normal-case">Status</th>
                            <th className="normal-case">Grand Total</th>
                            <th className="normal-case">Paid</th>
                            <th className="normal-case">Due</th>
                            <th className="normal-case">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userSourceData.map((u, k) => (
                            <tr key={k}>
                                <th>{k + 1}</th>
                                <td>{u.reference}</td>
                                <td>{u.customer}</td>
                                <td>{u.warehouse}</td>
                                <td>{renderStatusButton(u.status)}</td>
                                <td>{u.grandTotal}</td>
                                <td>{u.paid}</td>
                                <td>{u.due}</td>
                                <td>{renderPaymentButton(u.paymentStatus)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </TitleCard>
    );
}

export default UserChannels