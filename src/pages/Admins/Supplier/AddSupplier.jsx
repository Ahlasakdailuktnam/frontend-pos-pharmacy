import React from "react";
import {
  MdArrowBack,
  MdSave,
  MdClose,
  MdBusiness,
  MdPerson,
  MdCloudUpload,
  MdCheckCircle,
  MdCategory,
} from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import useSupplierForm from "../../../hook/useSupplierForm";

const AddSupplier = () => {
  const {
    formData,
    previewLogo,
    showSuccess,
    saving,
    handleChange,
    handleSubmit,
  } = useSupplierForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/supplier"
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MdArrowBack size={20} className="text-gray-600" />
            </a>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                បន្ថែមអ្នកផ្គត់ផ្គង់ថ្មី
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                បញ្ចូលព័ត៌មានអ្នកផ្គត់ផ្គង់ថ្មីក្នុងប្រព័ន្ធ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success */}
      {showSuccess && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 shadow-lg">
            <MdCheckCircle className="text-green-600 text-2xl" />

            <div>
              <p className="font-semibold text-green-800">
                បញ្ចូលទិន្នន័យជោគជ័យ!
              </p>
              <p className="text-sm text-green-600">
                អ្នកផ្គត់ផ្គង់ត្រូវបានបន្ថែមក្នុងប្រព័ន្ធ
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Upload */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {previewLogo ? (
                    <img
                      src={previewLogo}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border-2 border-teal-200"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                      <FaBuilding className="text-teal-600 text-3xl" />
                    </div>
                  )}

                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition-colors shadow-md">
                    <MdCloudUpload size={14} className="text-white" />
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    ស្លាកសញ្ញាអ្នកផ្គត់ផ្គង់
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    JPG, PNG ទំហំមិនលើស 2MB
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <MdBusiness className="text-teal-600" />
                  ព័ត៌មានមូលដ្ឋាន
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ឈ្មោះអ្នកផ្គត់ផ្គង់
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="company_name_kh"
                      value={formData.company_name_kh}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="បញ្ចូលឈ្មោះអ្នកផ្គត់ផ្គង់"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ឈ្មោះជាអង់គ្លេស
                    </label>

                    <input
                      type="text"
                      name="company_name_en"
                      value={formData.company_name_en}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="English name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="pt-4 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <MdPerson className="text-teal-600" />
                  ព័ត៌មានទំនាក់ទំនង
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អ្នកទំនាក់ទំនង
                    </label>

                    <input
                      type="text"
                      name="contact_person"
                      value={formData.contact_person}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="ឈ្មោះអ្នកទំនាក់ទំនង"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      លេខទូរស័ព្ទ
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="012345678"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អ៊ីមែល
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អាសយដ្ឋាន
                    </label>

                    <textarea
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="បញ្ចូលអាសយដ្ឋាន"
                    />
                  </div>
                </div>
              </div>

              {/* Business */}
              <div className="pt-4 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <MdCategory className="text-teal-600" />
                  ព័ត៌មានអាជីវកម្ម
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ស្ថានភាព
                    </label>

                    <select
                      name="status"
                      value={formData.status ? 1 : 0}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: "status",
                            value: e.target.value == 1,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                    >
                      <option value="1">កំពុងដំណើរការ</option>
                      <option value="0">បិទប្រើ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      កំណត់ចំណាំ
                    </label>

                    <textarea
                      name="note"
                      rows="3"
                      value={formData.note}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                      placeholder="បញ្ចូលកំណត់ចំណាំ..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <a
                href="/supplier"
                className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <MdClose size={18} />
                បោះបង់
              </a>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 flex items-center gap-2 disabled:opacity-50"
              >
                <MdSave size={18} />
                {saving ? "កំពុងរក្សាទុក..." : "រក្សាទុកអ្នកផ្គត់ផ្គង់"}
              </button>
            </div>
          </div>
        </form>
      </div>

     <style>{`
@keyframes slide-in {
  from { transform: translateX(100%); opacity:0; }
  to { transform: translateX(0); opacity:1; }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
`}</style>
    </div>
  );
};

export default AddSupplier;