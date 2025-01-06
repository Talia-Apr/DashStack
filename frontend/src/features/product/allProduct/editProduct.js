import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import TitleCard from "../../../components/Cards/TitleCard"; // Import TitleCard
import InputText from "../../../components/Input/InputText"; // Input components
import TextAreaInput from "../../../components/Input/TextAreaInput"; // TextArea component

function EditProduct({ productId }) {
  const dispatch = useDispatch();
  const dummyProductData = {
    name: "Product Example",
    image: "https://via.placeholder.com/150",
    barcodeSymbology: "EAN-13",
    barcode: "1234567890123",
    category: "Fruits",
    brand: "Brand Example",
    description: "This is a detailed description of the product.",
    price: "20.00",
    cost: "15.00",
    stockAlert: "5",
    unit: "Kilogram",
  };

  const [product, setProduct] = useState(dummyProductData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productId) {
      setProduct(dummyProductData);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
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
          message: "Product updated successfully!",
          status: 1, // 1 untuk sukses, 0 untuk error
        })
      );
    }, 1000);
  };

  return (
    <>
      <TitleCard
        title="Edit Product"
        description="Edit product details and save changes"
        topMargin="mt-2"
        padding="8"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              labelTitle="Name"
              name="name"
              defaultValue={product.name}
              updateFormValue={handleChange}
            />
            <div className="flex flex-col">
              <label className="label">Product Image</label>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto mb-2"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
            <InputText
              labelTitle="Barcode Symbology"
              name="barcodeSymbology"
              defaultValue={product.barcodeSymbology}
              updateFormValue={handleChange}
            />
            <InputText
              labelTitle="Barcode"
              name="barcode"
              defaultValue={product.barcode}
              updateFormValue={handleChange}
            />
            <InputText
              labelTitle="Category"
              name="category"
              defaultValue={product.category}
              updateFormValue={handleChange}
            />
            <InputText
              labelTitle="Brand"
              name="brand"
              defaultValue={product.brand}
              updateFormValue={handleChange}
            />
            <TextAreaInput
              labelTitle="Description"
              name="description"
              defaultValue={product.description}
              updateFormValue={handleChange}
            />
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputText
                  labelTitle="Product Price"
                  name="price"
                  defaultValue={product.price}
                  updateFormValue={handleChange}
                />
              </div>
              <div className="flex-1">
                <InputText
                  labelTitle="Product Cost"
                  name="cost"
                  defaultValue={product.cost}
                  updateFormValue={handleChange}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputText
                  labelTitle="Stock Alert"
                  name="stockAlert"
                  defaultValue={product.stockAlert}
                  updateFormValue={handleChange}
                />
              </div>
              <div className="flex-1">
                <InputText
                  labelTitle="Product Unit"
                  name="unit"
                  defaultValue={product.unit}
                  updateFormValue={handleChange}
                />
              </div>
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

export default EditProduct;
