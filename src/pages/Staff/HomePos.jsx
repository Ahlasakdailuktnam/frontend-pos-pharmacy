import { use, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDeleteSweep } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import ProductsGrid from "../../components/pos/ProductsGrid";
import { IoIosCash } from "react-icons/io";
const HomePos = () => {
  const [activeCategory, setActiveCategory] = useState("ទំនិញទាំងអស់");
  const [check,setcheck] =useState("");

  return (
    <div className="grid grid-cols-[67%_1fr] items-start gap-5 p-5 bg-gray-100 min-h-screen">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4">
        {/* CATEGORY */}
        <div className="flex gap-3 flex-wrap">
          {[
            "ទំនិញទាំងអស់",
            "Skincare",
            "ថ្នាំទូទៅ",
            "វីតាមីន",
            "ថ្នាំបំប៉ន",
            "សម្ភារៈសម្រាប់កុមារ",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm ${
                activeCategory === cat
                  ? "bg-[#0D9488] text-white"
                  : "bg-white hover:bg-[#0D9488] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        <ProductsGrid />
      </div>

      <div className="w-full max-w-md h-[85vh] bg-white rounded-2xl shadow-sm flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-300">
          <h2 className="text-lg font-semibold">កន្ត្រកបច្ចុប្បន្ន</h2>

          <button className="flex items-center gap-1 text-red-500 text-sm">
            <MdDeleteSweep />
            លុបទាំងអស់
          </button>
        </div>

        {/* CART ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* ITEM */}
          <div className="flex justify-between items-center">
            {/* LEFT */}
            <div className="flex gap-3">
              <img
                src="https://us.sulwhasoo.com/cdn/shop/files/FCAS_Brand.com_1080_10801.jpg"
                className="w-12 h-12 rounded-lg object-cover"
                alt=""
              />

              <div>
                <p className="font-semibold text-sm">Amoxicillin 500mg</p>
                <p className="text-xs text-gray-400">ចំនួន: 2 • $12.50/មួយ</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">$25.00</p>

              <div className="flex items-center gap-2 mt-1 justify-end">
                <button className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiMinus size={12} />
                </button>

                <span className="text-sm">2</span>

                <button className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiPlus size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TOTAL SECTION */}
        <div className="p-5 border-t border-gray-300 bg-gray-50 space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>សរុបរង</span>
            <span>$33.25</span>
          </div>

          <div className="flex justify-between text-sm text-red-500">
            <span>បញ្ចុះតម្លៃ</span>
            <span>-$3.00</span>
          </div>

          <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
            <span className="font-semibold text-lg">សរុប</span>
            <span className="text-xl font-bold text-blue-600">$33.08</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <button onClick={()=> setcheck("cash")} className={` ${
              check === "cash"
              ? "bg-[#0D9488] text-white border flex flex-col items-center rounded-lg py-3 text-sm"
              : "bg-white border border-gray-300 flex flex-col items-center rounded-lg py-3 text-sm"
            }`}>
              <IoIosCash className="text-xl"/>
              <p className="text-[10px] font-bold">CASH</p>
            </button>
            <button onClick={()=> setcheck("card")} className={` ${
              check === "card"
              ? "bg-[#0D9488] text-white border flex flex-col items-center rounded-lg py-3 text-sm"
              : "bg-white border border-gray-300 flex flex-col items-center rounded-lg py-3 text-sm"
            }`}>
              <FaCreditCard className="text-xl"/>
              <p className="text-[10px] font-bold">CARD</p>
            </button>
            <button onClick={()=> setcheck("qr")} className={` ${
              check === "qr"
              ? "bg-[#0D9488] text-white border flex flex-col items-center rounded-lg py-3 text-sm"
              : "bg-white border border-gray-300 flex flex-col items-center rounded-lg py-3 text-sm"
            }`}>
              <LiaDigitalTachographSolid className="text-xl"/>
              <p className="text-[10px] font-bold">SCAN QR</p>
            </button>

           
          </div>

          {/* COMPLETE BUTTON */}
          <button className="w-full mt-4 bg-[#0D9488] hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            បញ្ចប់ការលក់
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePos;
