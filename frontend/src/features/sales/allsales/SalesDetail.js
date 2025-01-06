import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react"
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TitleCard from "../../../components/Cards/TitleCard";
import SearchBar from "../../../components/Input/SearchBar";
import DocumentChartBar from '@heroicons/react/24/outline/DocumentChartBarIcon';
import DocumentText from '@heroicons/react/24/outline/DocumentTextIcon';
import { ALLSALESDATA } from "../allsales/index";

function SalesDetail({salesId}) {
    const [salesObj, setSalesObj] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");    
    const [orderItems, setOrderItems] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [orderTax, setOrderTax] = useState(0);

    const customerInfo = [
        "Gina Maulinda",
        "gina@gmail.com",
        "0876-5310-2149",
        "Sukodono, Rt-05 RW-01",
      ];
    
      const companyInfo = [
        "DashStack",
        "admin@gmail.com",
        "0876-5310-2149",
        "Surabaya, RS-05 RW-01",
      ];
    
      const returnInfo = [
        "Reference: PR_0012",
        "Status: Ordered",
        "Warehouse: Warehouse 2",
        "Payment Status: Unpaid",
      ];

      const InfoCard = ({ title, details }) => (
        <div className="space-y-1 text-sm">
          <h3 className="font-bold">{title}</h3>
          {details.map((detail, idx) => (
            <p key={idx} className="text-gray-500">{detail}</p>
          ))}
        </div>
      );

    useEffect(() => {
        console.log("ALLSALESDATA:", ALLSALESDATA);
        console.log("salesId:", salesId);
        const sales = ALLSALESDATA.find((c) => c.id === salesId);
        if (sales) {
            console.log("Sales Found:", sales);
            setSalesObj(sales);
            setOrderItems(sales.orderItems || []);
        } else {
            setErrorMessage("Data not found.");
        }
    }, [salesId]);

  // EXCEL
  const downloadExcel = () => {
    const worksheet = utils.json_to_sheet(ALLSALESDATA); 
    const workbook = utils.book_new(); 
    utils.book_append_sheet(workbook, worksheet, "Detail Sales"); 
  
    // Buat file Excel
    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  
    // Simpan file dengan nama 'DetailSalesData.xlsx'
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "DetailSalesData.xlsx");
  };

  // PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Judul PDF
    doc.text("Sales Data", 14, 10);
  
    // Data tabel
    const tableColumn = ["Sales Id", "Customer", "Product", "Unit Price", "Quantity", "Discount", "Tax", "Grand Total" ];
    const tableRows = ALLSALESDATA.map(item => [
      item.salesId,
      item.customerName,
      item.product,
      item.unitPrice,
      item.quantity,
      item.discount,
      item.tax,
      item.subtotal,
    ]);
  
    // Menambahkan tabel ke PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Posisi awal tabel
    });
  
    // Simpan file sebagai 'AllSalesData.pdf'
    doc.save("SalesData.pdf");
  };

  const subtotal = orderItems.reduce((total, item) => {
    return total + Number(item.subtotal || 0); // Pastikan subtotal adalah angka
}, 0);

  return (
    <>
      <TitleCard title="Detail Sales">

        <div className="flex justify-between items-center mb-4">

            <div className="flex items-center space-x-2">  
            <button className="border btn-sm border-success text-success rounded-md px-4 py-2 flex items-center space-x-1 hover:bg-success hover:text-white hover:shadow-xl transition duration-200"
                onClick={downloadExcel}>
                <DocumentChartBar className="h-5 w-5" /> 
                <span>EXCEL</span>
            </button>
            <button className="border btn-sm border-error text-error rounded-md px-4 py-2 flex items-center space-x-1 hover:bg-error hover:text-white hover:shadow-xl transition duration-200"
                onClick={downloadPDF}>
                <DocumentText className="h-5 w-5" /> 
                <span>PDF</span>
            </button>         
            </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <InfoCard title="Customer Info" details={customerInfo} />
          <div className="md:ml-10">
            <InfoCard title="Company Info" details={companyInfo} />
          </div>
          <div className="md:ml-10">
            <InfoCard title="Info of Return" details={returnInfo} />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        </div>

        {/* Tabel */}
        <div className="w-full">
            {/* Order Items Table */}
            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        #
                    </th>
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        Product
                    </th>
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        Unit Price
                    </th>
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        Quantity
                    </th>
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        Discount
                    </th>
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        Tax
                    </th>
                    <th className="border border-[#D9D9D9] px-4 py-2 text-neutral text-left">
                        Subtotal
                    </th>
                </tr>
                </thead>
                <tbody>
                    {orderItems.map((item, index) => (
                        <tr key={item.salesId || index}>
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.product}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.unitPrice}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.discount}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.tax}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.subtotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Total Summary */}
        <div className="flex justify-end mb-6">
            <div className="text-sm text-right w-72">
            <div className="bg-gray-200 border-t border-b border-black p-2 flex justify-between">
                <span className="text-sm text-neutral font-bold">Grand Total:</span>
                <span className="text-sm text-neutral font-bold">${subtotal.toFixed(2)}</span>
            </div>
            </div>
        </div>

      </TitleCard>     
    </>
  );
}

export default SalesDetail;
