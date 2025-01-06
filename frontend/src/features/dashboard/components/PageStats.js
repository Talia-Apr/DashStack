import TitleCard from "../../../components/Cards/TitleCard"

const stockData = [
  { code: "707815360037", product: "Sunglasses", warehouse: "Warehouse 1", quantity: 1000, alertQuantity: "Save" },
  { code: "707815360038", product: "T-shirt", warehouse: "Warehouse 2", quantity: 500, alertQuantity: "Low" },
  { code: "707815360039", product: "Jacket", warehouse: "Warehouse 3", quantity: 50, alertQuantity: "OOS" },
  { code: "707815360040", product: "Shoes", warehouse: "Warehouse 4", quantity: 150, alertQuantity: "Low" },
  { code: "707815360041", product: "Hat", warehouse: "Warehouse 5", quantity: 2000, alertQuantity: "Save" },
  { code: "707815360041", product: "Syal", warehouse: "Warehouse 5", quantity: 200, alertQuantity: "Low" },
];

function UserChannels(){
  return (
    <TitleCard title={"Stock Alert"}>
        {/** Table Data */}
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Code</th>
                        <th className="normal-case">Product</th>
                        <th className="normal-case">Warehouse</th>
                        <th className="normal-case">Quantity</th>
                        <th className="normal-case">Alert Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stockData.map((u, k) => {
                            let alertClass = '';
                            if (u.alertQuantity === "Save") alertClass = "btn-outline btn-xs btn-success";
                            if (u.alertQuantity === "Low") alertClass = "btn-outline btn-xs btn-primary";
                            if (u.alertQuantity === "OOS") alertClass = "btn-outline btn-xs btn-error";

                            return (
                                <tr key={k}>
                                    <th>{k + 1}</th>
                                    <td>{u.code}</td>
                                    <td>{u.product}</td>
                                    <td>{u.warehouse}</td>
                                    <td>{u.quantity}</td>
                                    <td><button className={`btn ${alertClass}`}>{u.alertQuantity}</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </TitleCard>
);
}

export default UserChannels