import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import BarcodeScannerComponent from "react-qr-barcode-scanner"; // Impor Barcode Scanner

function CreateProduct() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    barcodeSymbology: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    cost: "",
    stockAlert: "",
    unit: "",
    image: null,
  });

  const [scanning, setScanning] = useState(false); // Status untuk scanner

  const updateFormValue = ({ updateType, value }) => {
    setForm({ ...form, [updateType]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, image: file });
  };

  const handleBarcodeScan = (data) => {
    if (data) {
      updateFormValue({ updateType: "barcode", value: data.text });
      setScanning(false); // Tutup scanner setelah sukses memindai
    }
  };

  const createProduct = () => {
    const isValid = Object.keys(form).every((key) => form[key]);
    if (isValid) {
      dispatch(
        showNotification({ message: "Product Created Successfully", status: 1 })
      );
    } else {
      dispatch(
        showNotification({
          message: "Please fill all required fields",
          status: 0,
        })
      );
    }
  };

  const toggleScanner = () => {
    setScanning(!scanning); // Aktifkan/Tutup Scanner
  };

  return (
    <>
      <TitleCard title="Create Product" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <InputText
            labelTitle="Name"
            updateType="name"
            defaultValue=""
            updateFormValue={updateFormValue}
          />

          {/* Product Image */}
          <div className="flex flex-col">
            <label htmlFor="productImage" className="label">
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              onChange={handleImageUpload}
              className="input input-bordered"
            />
            <span>{form.image ? form.image.name : " "}</span>
          </div>

          {/* Barcode Symbology */}
          <InputText
            labelTitle="Barcode Symbology"
            updateType="barcodeSymbology"
            defaultValue=""
            updateFormValue={updateFormValue}
            isDropdown={true}
            options={[
              { label: "Choose Symbology", value: "" },
              { label: "Code 128", value: "code128" },
              { label: "EAN-13", value: "ean13" },
            ]}
          />

          {/* Barcode Scanner */}
          <div className="flex flex-col">
            <label htmlFor="barcode" className="label">
              Barcode
            </label>
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                id="barcode"
                placeholder="Scan or Enter Barcode"
                value={form.barcode}
                onChange={(e) =>
                  updateFormValue({ updateType: "barcode", value: e.target.value })
                }
                className="input input-bordered w-full h-12" // Pastikan tinggi input sama
              />
              <button
                type="button"
                onClick={toggleScanner}
                className="btn btn-primary h-12 px-4" // Sesuaikan tinggi dan padding tombol
              >
                Scan
              </button>
            </div>
          </div>

          {/* Scanner Camera */}
          {scanning && (
            <div className="mt-4">
              <BarcodeScannerComponent
                onUpdate={(err, result) => {
                  if (result) handleBarcodeScan(result);
                }}
                width={300}
                height={300}
              />
              <button
                type="button"
                onClick={toggleScanner}
                className="btn btn-secondary mt-2"
              >
                Close Scanner
              </button>
            </div>
          )}

          {/* Other Inputs */}
          <InputText
            labelTitle="Category"
            updateType="category"
            defaultValue=""
            updateFormValue={updateFormValue}
            isDropdown={true}
            options={[
              { label: "Choose Category", value: "" },
              { label: "Fruits", value: "fruits" },
              { label: "Shoes", value: "shoes" },
            ]}
          />
          <InputText
            labelTitle="Brand"
            updateType="brand"
            defaultValue=""
            updateFormValue={updateFormValue}
            isDropdown={true}
            options={[
              { label: "Choose Brand", value: "" },
              { label: "Adidas", value: "adidas" },
              { label: "Samsung", value: "samsung" },
            ]}
          />
          <div className="flex flex-col space-y-4">
            <div className="relative flex-grow">
              <InputText
                labelTitle="Order Tax"
                updateType=""
                defaultValue=""
                updateFormValue={updateFormValue}
              />
              <span className="absolute right-3 top-2/3 transform -translate-y-1/2 text-xl">
                %
              </span>
            </div>

            <TextAreaInput
              labelTitle="Description"
              updateType="description"
              defaultValue=""
              updateFormValue={updateFormValue}
            />
          </div>
        </div>

        {/* Line Separator */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Product Price, Cost, Stock Alert, Product Unit */}
        <div className="space-y-4">
          {/* Product Price dan Product Cost sejajar kiri-kanan */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputText
                labelTitle="Product Price"
                updateType="price"
                defaultValue=""
                updateFormValue={updateFormValue}
              />
            </div>
            <div className="flex-1">
              <InputText
                labelTitle="Product Cost"
                updateType="cost"
                defaultValue=""
                updateFormValue={updateFormValue}
              />
            </div>
          </div>

          {/* Stock Alert dan Product Unit di bawahnya */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <InputText
                labelTitle="Stock Alert"
                updateType="stockAlert"
                defaultValue=""
                updateFormValue={updateFormValue}
              />
            </div>
            <div className="flex-1">
              <InputText
                labelTitle="Product Unit"
                updateType="unit"
                defaultValue=""
                updateFormValue={updateFormValue}
                isDropdown={true}
                options={[
                  { label: "Choose Unit", value: "" },
                  { label: "Kilogram", value: "kilogram" },
                  { label: "Meter", value: "meter" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => createProduct()}
          >
            Submit
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default CreateProduct;
