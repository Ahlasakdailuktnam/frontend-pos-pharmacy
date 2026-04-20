import { FiSearch, FiCalendar } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
const InvoiceDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-5">

        {/* REVENUE */}
        <div className="col-span-2 bg-gradient-to-r from-[#0D9488] to-teal-700 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">ចំណូលប្រចាំថ្ងៃ</p>
            <h1 className="text-4xl font-bold mt-2">$12,482.50</h1>
            <p className="text-sm mt-2 opacity-80">+14.2% ពីម្សិលមិញ</p>
          </div>

          <div className="text-5xl opacity-40">
            <FaMoneyBill/>
          </div>
        </div>

        {/* TOTAL INVOICE */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center">
            <div className="text-2xl"><IoReceiptSharp/></div>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              បានធ្វើបច្ចុប្បន្នភាព
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-3">ចំនួនវិក្កយបត្រ</p>
          <h2 className="text-3xl font-bold mt-1">142</h2>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-wrap gap-3 items-center">

        {/* SEARCH */}
        <div className="relative flex-1 min-w-[250px]">
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            placeholder="ស្វែងរកលេខវិក្កយបត្រ ឬ អតិថិជន..."
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-[#0D9488]"
          />
        </div>

        {/* DATE */}
        <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
          <FiCalendar />
          កាលបរិច្ឆេទ
        </button>

        {/* STATUS */}
        <div className="flex items-center gap-2 ml-auto">
          {["ទាំងអស់", "បានបង់", "កំពុងរង់ចាំ", "បានសងវិញ"].map((s, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-lg text-sm ${
                i === 0
                  ? "bg-[#0D9488] text-white"
                  : "bg-gray-200 hover:bg-[#0D9488] hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-6 px-5 py-3 text-xs text-gray-400 border-b border-gray-200">
          <span>លេខវិក្កយបត្រ</span>
          <span>អតិថិជន</span>
          <span>ថ្ងៃ/ម៉ោង</span>
          <span>ចំនួនទំនិញ</span>
          <span>សរុប</span>
          <span>ស្ថានភាព</span>
        </div>

        {/* ROWS */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="grid grid-cols-6 items-center px-5 py-4 border-b border-gray-300 hover:bg-gray-50"
          >

            {/* INVOICE */}
            <span className="text-[#0D9488] font-semibold">
              #INV-9823{i}
            </span>

            {/* CUSTOMER */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                U{i}
              </div>
              <div>
                <p className="text-sm font-semibold">អតិថិជន {i}</p>
                <p className="text-xs text-gray-400">ID: 00{i}</p>
              </div>
            </div>

            {/* DATE */}
            <div className="text-sm">
              24 តុលា 2023 <br />
              <span className="text-xs text-gray-400">09:14 AM</span>
            </div>

            {/* ITEMS */}
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-lg w-fit">
              {i} មុខទំនិញ
            </span>

            {/* TOTAL */}
            <span className="font-semibold">$245.00</span>

            {/* STATUS */}
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                i === 2
                  ? "bg-yellow-100 text-yellow-600"
                  : i === 3
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}>
                {i === 2
                  ? "កំពុងរង់ចាំ"
                  : i === 3
                  ? "បានសងវិញ"
                  : "បានបង់"}
              </span>

              <BsThreeDotsVertical className="text-gray-400 cursor-pointer" />
            </div>

          </div>
        ))}

        {/* FOOTER */}
        <div className="flex justify-between items-center p-4 text-sm text-gray-400">
          <p>បង្ហាញ 1-10 នៃ 142</p>

          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-200 rounded">‹</button>
            <button className="px-3 py-1 bg-[#0D9488] text-white rounded">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded">3</button>
            <button className="px-3 py-1 bg-gray-200 rounded">›</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default InvoiceDashboard;