import React, { useEffect, useState } from 'react';
import { X, Upload, Image } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../../lib/axios';

export const BookModal = ({ categories, isOpen, setIsOpen, setEditedProduct, editedProduct }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const {register, reset, handleSubmit} = useForm();

  useEffect(() => {
  if (editedProduct) {
    reset({
      title: editedProduct.title,
      description: editedProduct.description,
      price: editedProduct.price,
      stock: editedProduct.stock,
      categoryId: editedProduct.category?.id || '',
    });
  }else {
    reset({
      title: '',
      description: '',
      price: '',
      stock: '',
      categoryId: '',
    });
  }
}, [editedProduct, reset]);


  const onSubmit = async(data) => {
   const formData = new FormData();

  // append all fields
  formData.append('title', data.title);
  formData.append('description', data.description || '');
  formData.append('price', data.price.toString());
  formData.append('stock', data.stock.toString());
  if (data.categoryId) formData.append('categoryId', data.categoryId);

  // append the file if exists
  if (data.cover && data.cover.length > 0) {
    formData.append('cover', data.cover[0]);
  }

    if(!editedProduct){
      const response = await api.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
        console.log(response.data);
    }else {
        const response = await api.patch('/books/' + editedProduct.id , data);
        console.log(response.data);
    }
  }

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const onClose = function(){
    reset();
    setIsOpen(false);
    setEditedProduct(null);
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <form onSubmit={handleSubmit(onSubmit)} 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-3 border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Add New Book</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Image
            </label>
            <div className="flex items-start gap-3">
              {/* Image Preview */}
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Image className="text-gray-400" size={32} />
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <Upload className="text-gray-400 mb-1" size={24} />
                  <span className="text-xs text-gray-600 font-medium">Click to upload</span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                  <input {...register('cover')} type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>

          {/* Book Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register('title')}  
              type="text"
              placeholder="Enter book name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="3"
              {...register('description')}
              placeholder="Enter book description"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select {...register('categoryId')} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
             
            </select>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                    {...register('price', { valueAsNumber: true })}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('stock', { valueAsNumber: true })}
                placeholder="0"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-3 border-t border-gray-200 rounded-b-2xl flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

