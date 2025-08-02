import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getCategories, createCategory } from '../../api/categories';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(token);
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, [token]);
  
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await createCategory({ name: newCategoryName }, token);
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };
return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-100 to-gray-200 p-6">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        Category Management
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleAddCategory}
        className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-4"
      >
        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">
          New Category Name
        </label>
        <input
          id="category-name"
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="e.g., Technical Support"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        <div className="text-right">
          <button
            type="submit"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-md transition-all duration-200"
          >
            Add Category
          </button>
        </div>
      </form>

      {/* Categories List */}
      <div className="mt-10 max-w-xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Categories</h2>
        {categories.length > 0 ? (
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-purple-100 transition"
              >
                {cat.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No categories added yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryManagementPage;