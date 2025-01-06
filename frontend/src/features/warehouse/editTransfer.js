import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import TitleCard from "../../components/Cards/TitleCard"; // Import TitleCard
import InputText from "../../components/Input/InputText"; // Input components
import TextAreaInput from "../../components/Input/TextAreaInput"; // TextArea component

function EditTransfer({ transferId }) {
  const dispatch = useDispatch();
  const dummyTransferData = {
    productName: "Pineapple",
    productCost: "1300",
    taxType: "Exclusive",
    orderTax: "0",
    discountType: "Fixed",
    discount: "0",
    note: "A few words about the transfer.",
    date: "11/06/2024",
    fromWarehouse: "Warehouse A",
    toWarehouse: "Warehouse B",
    status: "Pending",
  };

  const [transfer, setTransfer] = useState(dummyTransferData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (transferId) {
      setTransfer(dummyTransferData);
    }
  }, [transferId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransfer((prevTransfer) => ({
      ...prevTransfer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi proses submit
    setTimeout(() => {
      setIsSubmitting(false);

      // Tampilkan notifikasi setelah submit
      dispatch(
        showNotification({
          message: "Transfer updated successfully!",
          status: 1, // 1 untuk sukses, 0 untuk error
        })
      );
    }, 1000);
  };

  return (
    <>
      <TitleCard
        title="Edit Transfer"
        description="Edit transfer details and save changes"
        topMargin="mt-2"
        padding="8"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Product Cost *"
              name="productCost"
              defaultValue={transfer.productCost}
              updateFormValue={handleChange}
            />
            <div className="flex flex-col">
              <label className="label">Tax Type *</label>
              <select
                name="taxType"
                value={transfer.taxType}
                onChange={handleChange}
                className="input input-bordered"
              >
                <option value="Exclusive">Exclusive</option>
                <option value="Inclusive">Inclusive</option>
              </select>
            </div>
            <InputText
              labelTitle="Order Tax *"
              name="orderTax"
              defaultValue={transfer.orderTax}
              updateFormValue={handleChange}
              suffix="%"
            />
            <div className="flex flex-col">
              <label className="label">Discount Type *</label>
              <select
                name="discountType"
                value={transfer.discountType}
                onChange={handleChange}
                className="input input-bordered"
              >
                <option value="Fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>
            <InputText
              labelTitle="Discount *"
              name="discount"
              defaultValue={transfer.discount}
              updateFormValue={handleChange}
              suffix="%"
            />
            <TextAreaInput
              labelTitle="Note"
              name="note"
              defaultValue={transfer.note}
              updateFormValue={handleChange}
            />
          </div>

          <div className="mt-6">
            <div className="flex space-x-6 mt-4">
              <InputText
                labelTitle="Date *"
                name="date"
                defaultValue={transfer.date}
                updateFormValue={handleChange}
                type="date"
              />
              <div className="flex flex-col">
                <InputText
                  labelTitle="From Warehouse *"
                  name="fromWarehouse"
                  defaultValue={transfer.fromWarehouse}
                  updateFormValue={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <InputText
                  labelTitle="To Warehouse *"
                  name="toWarehouse"
                  defaultValue={transfer.toWarehouse}
                  updateFormValue={handleChange}
                />
              </div>
            </div>
            <div className="flex space-x-6 mt-4">
              <InputText
                labelTitle="Status *"
                name="status"
                defaultValue={transfer.status}
                updateFormValue={handleChange}
              />
            </div>
          </div>

          <div className="mt-16">
            <button
              className={`btn btn-primary float-right ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default EditTransfer;
