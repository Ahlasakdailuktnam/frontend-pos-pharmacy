// import { useState } from "react";
// import { FiCheck, FiArrowRight } from "react-icons/fi";

// const CheckoutSuccess = () => {
//   const total = 91.8;
//   const [received, setReceived] = useState(0);

//   const change = received - total;

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid grid-cols-2 overflow-hidden">

//         {/* LEFT */}
//         <div className="bg-gray-50 p-6">
//           <h2 className="text-center  font-bold text-blue-600 text-2xl">
//             លេខវិក្កយបត្រ
//           </h2>

//           <div className="mt-6 text-sm space-y-2">
//             <div className="flex justify-between font-semibold">
//               <span>សរុប</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>

//           {/* PAYMENT INPUT */}
//           <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
//             <label className="text-xs text-gray-400">
//               បញ្ចូលឈ្មោះអតិថិជន
//             </label>

//             <input
//               type="text"
//               // value={cus_name}
//               onChange={(e) => setReceived(Number(e.target.value))}
//               className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none text-lg font-semibold"
//             />
//             <label className="text-xs text-gray-400">
//               បញ្ចូលលេខទូរស័ព្ទអតិថិជន
//             </label>

//             <input
//               type="text"
//               // value={cus_name}
//               onChange={(e) => setReceived(Number(e.target.value))}
//               className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none text-lg font-semibold"
//             />
//             <label className="text-xs text-gray-400">
//               បញ្ចូលប្រាក់ដែលទទួលបាន
//             </label>

//             <input
//               type="number"
//               value={received}
//               onChange={(e) => setReceived(Number(e.target.value))}
//               className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none text-lg font-semibold"
//             />

//             <div className="flex justify-between mt-3 text-sm">
//               <span className="text-gray-400">ប្រាក់អាប់</span>
//               <span className="text-[#0D9488] font-bold">
//                 ${change > 0 ? change.toFixed(2) : "0.00"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="flex flex-col items-center justify-center p-10 text-center">

//           <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 text-[#0D9488] mb-4">
//             <FiCheck size={28} />
//           </div>

//           <h1 className="text-2xl font-bold">
//             បង់ប្រាក់ជោគជ័យ
//           </h1>

//           <p className="text-gray-400 text-sm mt-2">
//             ប្រតិបត្តិការបានបញ្ចប់
//           </p>

//           {/* RESULT */}
//           <div className="mt-6 bg-gray-50 rounded-xl p-5 w-full">
//             <div className="flex justify-between text-sm">
//               <span>ទទួលបាន</span>
//               <span>${received.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between text-sm mt-2">
//               <span>ប្រាក់អាប់</span>
//               <span className="text-[#0D9488] font-bold">
//                 ${change > 0 ? change.toFixed(2) : "0.00"}
//               </span>
//             </div>
//           </div>

//           <button className="mt-6 w-full bg-[#0D9488] text-white py-3 rounded-xl flex items-center justify-center gap-2">
//             បញ្ចប់ការលក់ <FiArrowRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSuccess;











// import React from "react";

// export default function CheckoutSuccess() {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="grid md:grid-cols-2 w-full max-w-4xl  bg-gray-100">

//         {/* REALISTIC RECEIPT */}
//         <div className="flex justify-center p-6">
//           <div className="bg-white w-[320px] rounded-md shadow p-4 font-mono text-[13px] text-gray-800">

//             {/* Header */}
//             <div className="text-center mb-4">
//               <p className="font-bold text-sm">CLINICAL PRECISION POS</p>
//               <p className="text-[11px] text-gray-500">221B Baker St</p>
//               <p className="text-[11px] text-gray-500">London, UK</p>
//               <p className="text-[11px] text-gray-500">Tel: +44 20 7946 0000</p>
//             </div>

//             <div className="border-t border-dashed my-3"></div>

//             {/* Items */}
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Amoxicillin 500mg x2</span>
//                 <span>$85.00</span>
//               </div>
//             </div>

//             <div className="border-t border-dashed my-3"></div>

//             {/* Totals */}
//             <div className="space-y-1">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>$85.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>$6.80</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>$91.80</span>
//               </div>
//             </div>

//             <div className="border-t border-dashed my-3"></div>

//             {/* Payment */}
//             <div className="space-y-1">
//               <div className="flex justify-between">
//                 <span>Cash</span>
//                 <span>$100.00</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Change</span>
//                 <span>$8.20</span>
//               </div>
//             </div>

//             <div className="border-t border-dashed my-3"></div>

//             {/* Footer */}
//             <div className="text-center text-[11px] text-gray-500 mt-4">
//               <p>Thank you for your purchase!</p>
//               <p>TRX: #CP-884920-2023</p>
//             </div>

//             {/* Fake Barcode */}
//             <div className="mt-4 flex justify-center">
//               <div className="h-10 w-40 bg-gradient-to-r from-black via-gray-700 to-black"></div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SUCCESS PANEL */}
//         <div className="bg-white shadow-sm p-8 flex flex-col items-center text-center">
//           <div className="w-20 h-20 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center mb-6">
//             <div className="w-10 h-10 bg-[#0D9488] text-white flex items-center justify-center rounded-full text-lg">
//               ✓
//             </div>
//           </div>

//           <h1 className="text-2xl font-semibold mb-2">ការទូទាត់ជោគជ័យ</h1>
//           <p className="text-gray-500 mb-6 text-sm">
//             ប្រតិបត្តិការបានបញ្ចប់ និងស្តុកបានធ្វើបច្ចុប្បន្នភាព។
//           </p>

//           <div className="grid grid-cols-2 gap-4 w-full mb-6">
//             <div className="bg-[#F9FAFB] rounded-xl p-4 text-left">
//               <p className="text-xs text-gray-400">ប្រាក់ទទួល</p>
//               <p className="text-xl font-semibold">$100.00</p>
//             </div>
//             <div className="bg-[#0D9488]/10 rounded-xl p-4 text-left">
//               <p className="text-xs text-[#0D9488]">ប្រាក់ត្រូវអាប់</p>
//               <p className="text-xl font-semibold text-[#0D9488]">$8.20</p>
//             </div>
//           </div>

//           <div className="w-full bg-[#F9FAFB] rounded-xl p-4 flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gray-300 rounded-full" />
//               <div className="text-left">
//                 <p className="font-medium">John Doe</p>
//                 <p className="text-xs text-gray-500">លេខអ្នកជំងឺ: #4492</p>
//               </div>
//             </div>
//             <span className="bg-[#0D9488]/10 text-[#0D9488] text-xs px-3 py-1 rounded-full">
//               ពិន្ទុអតិថិជន +12
//             </span>
//           </div>

//           <button className="w-full bg-[#0D9488] hover:bg-[#0b7f75] text-white py-3 rounded-xl font-medium mb-3 transition">
//             បញ្ចប់ & ចាប់ផ្ដើមការលក់ថ្មី →
//           </button>

//           <button className="text-sm text-gray-400 hover:text-gray-600">
//             មើលព័ត៌មានប្រតិបត្តិការ
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function CheckoutSuccess() {

  const transactionCode = "CP-884920-2023";

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="grid md:grid-cols-2 w-full max-w-4xl bg-gray-100">

        {/* REALISTIC RECEIPT */}
        <div className="flex justify-center p-6">
          <div className="bg-white w-[320px] rounded-md shadow p-4 font-mono text-[13px] text-gray-800">

            {/* Header */}
            <div className="text-center mb-4">
              <p className="font-bold text-sm">ឱសថស្ថាន អាឡាត្រឡោកបែក</p>
              <p className="text-[11px] text-gray-500">Address: St 315, Toul Kork 120408</p>
              <p className="text-[11px] text-gray-500">Cambodia, Phonm Penh</p>
              <p className="text-[11px] text-gray-500">Tel: +96 265 7233</p>
            </div>

            <div className="border-t border-dashed my-3"></div>

            {/* Items */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Amoxicillin 500mg x2</span>
                <span>$85.00</span>
              </div>
            </div>

            <div className="border-t border-dashed my-3"></div>

            {/* Totals */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$85.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$6.80</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$91.80</span>
              </div>
            </div>

            <div className="border-t border-dashed my-3"></div>

            {/* Payment */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Cash</span>
                <span>$100.00</span>
              </div>
              <div className="flex justify-between">
                <span>Change</span>
                <span>$8.20</span>
              </div>
            </div>

            <div className="border-t border-dashed my-3"></div>

            {/* Footer */}
            <div className="text-center text-[11px] text-gray-500 mt-4">
              <p>Thank you for your purchase!</p>
              <p>TRX: #{transactionCode}</p>
            </div>

            {/* 🔥 QR CODE (ADDED HERE ONLY) */}
            <div className="mt-4 flex flex-col items-center">
              <QRCodeCanvas
                value={`http://localhost:3000/receipt/${transactionCode}`}
                size={90}
              />
              <p className="text-[10px] text-gray-400 mt-1">
                ស្កេនមើលវិក្កយបត្រ
              </p>
            </div>

            {/* Fake Barcode */}
           

          </div>
        </div>

        {/* RIGHT SUCCESS PANEL */}
        <div className="bg-white shadow-sm p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center mb-6">
            <div className="w-10 h-10 bg-[#0D9488] text-white flex items-center justify-center rounded-full text-lg">
              ✓
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-2">ការទូទាត់ជោគជ័យ</h1>
          <p className="text-gray-500 mb-6 text-sm">
            ប្រតិបត្តិការបានបញ្ចប់ និងស្តុកបានធ្វើបច្ចុប្បន្នភាព។
          </p>

          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-[#F9FAFB] rounded-xl p-4 text-left">
              <p className="text-xs text-gray-400">ប្រាក់ទទួល</p>
              <p className="text-xl font-semibold">$100.00</p>
            </div>
            <div className="bg-[#0D9488]/10 rounded-xl p-4 text-left">
              <p className="text-xs text-[#0D9488]">ប្រាក់ត្រូវអាប់</p>
              <p className="text-xl font-semibold text-[#0D9488]">$8.20</p>
            </div>
          </div>

          <div className="w-full bg-[#F9FAFB] rounded-xl p-4 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="text-left">
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-gray-500">លេខអ្នកជំងឺ: #4492</p>
              </div>
            </div>
            <span className="bg-[#0D9488]/10 text-[#0D9488] text-xs px-3 py-1 rounded-full">
              ពិន្ទុអតិថិជន +12
            </span>
          </div>

          <button className="w-full bg-[#0D9488] hover:bg-[#0b7f75] text-white py-3 rounded-xl font-medium mb-3 transition">
            បញ្ចប់ & ចាប់ផ្ដើមការលក់ថ្មី →
          </button>

          <button className="text-sm text-gray-400 hover:text-gray-600">
            មើលព័ត៌មានប្រតិបត្តិការ
          </button>
        </div>
      </div>
    </div>
  );
}