import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  Package,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  MoreVertical,
  Grid3x3,
  List
} from 'lucide-react';
import api from '../../lib/axios';
import Pagination from '../../components/Pagination';
import { BookModal } from '../../components/admin/BookModal';
import { IMAGE_BASE_URL } from '../../lib/constant';

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Categories' }]);
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [page, setPage] = useState(1);
  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get('/books', {
        params : {
          page : page,
          category: selectedCategory == "all" ? null : selectedCategory,
          search: searchTerm ? searchTerm : null,
        }
      });
      setProducts(res.data.data);
      setPagination(res.data.meta);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories dynamically
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories([{ id: 'all', name: 'All Categories' }, ...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page, selectedCategory, searchTerm]);

  const HandleCategorySelect = (e) => {
    setSelectedCategory(e.target.value)
    setPage(1);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(1);
  }

  

  // Calculate stats
  const lowStockItems = products?.filter(p => p.stock < 10).length;

  const stats = [
    { 
      label: 'Total Book', 
      value: pagination?.total, 
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Low Stock Alert', 
      value: lowStockItems, 
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    { 
      label: 'Categories', 
      value: categories.length - 1, 
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', class: 'bg-red-100 text-red-700' };
    if (stock < 10) return { label: 'Low Stock', class: 'bg-orange-100 text-orange-700' };
    return { label: 'In Stock', class: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Books</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory and pricing</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium">
          <Plus size={20} strokeWidth={2.5} />
          Add Book
        </button>
      </div>

    <BookModal categories={categories} isOpen={isOpen} setIsOpen={setIsOpen} editedProduct={editedProduct} setEditedProduct={setEditedProduct} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats?.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={stat.textColor} size={24} strokeWidth={2} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => HandleCategorySelect(e)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-w-[180px]"
            >
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>


          {/* View Toggle */}
          {/* <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List size={20} />
            </button>
          </div> */}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      )}

      {/* Products Grid View */}
      {!isLoading && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={IMAGE_BASE_URL + product.cover} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.class} backdrop-blur-sm`}>
                      {stockStatus.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">{product?.category?.name}</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Stock</p>
                      <p className="text-sm font-semibold text-gray-700">{product.stock} units</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => {setEditedProduct(product); setIsOpen(true)}} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button className="p-2.5 border border-gray-300 text-gray-600 rounded-xl hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2.5 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Products Table View */}
      {!isLoading && viewMode === 'table' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Product</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr 
                      key={product.id} 
                      className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.cover} 
                            alt={product.title} 
                            className="w-14 h-14 object-cover rounded-xl border border-gray-200"
                          />
                          <span className="font-semibold text-gray-900">{product.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{product?.category?.name}</td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900 text-lg">${product.price}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-700 font-medium">{product.stock} units</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${stockStatus.class}`}>
                          {stockStatus.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products?.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Package className="text-white" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
            Clear Filters
          </button>
        </div>
      )}
      <Pagination currentPage={pagination?.page} totalPages={pagination?.lastPage} setPage={setPage} />
    </div>
  );
};

export default BooksPage;