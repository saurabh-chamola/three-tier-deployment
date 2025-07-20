import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Eye, Pencil, Trash } from "lucide-react";
import { fetchPost } from '../features/actions/post';
import { useForm } from "react-hook-form";

const Post = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const data = useSelector((state) => state.post);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (modalData && showModal) {
      reset({
        topic: modalData?.topic || '',
        categories: modalData?.categories?.join(", ") || '',
        description: modalData?.message || ''
      });
    }
  }, [modalData, showModal, reset]);

  const onSubmit = (formData) => {
    console.log("Submitted form data:", formData);
    setShowModal(false);
  };

  return (
    <>
      {!showModal ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">S.NO</th>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    LOADING!!!!!!!!
                  </td>
                </tr>
              ) : Array.isArray(data.postData) && data.postData.length > 0 ? (
                data.postData.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item?.topic}</td>
                    <td className="px-6 py-4">{item?.categories?.join(", ")}</td>
                    <td className="px-6 py-4">{item?.categories?.join(", ")}</td>
                    <td className="px-6 py-4">{item?.message?.slice(0, 10)}...</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Eye
                        size={18}
                        className="cursor-pointer"
                        onClick={() => {
                          setModalData(item);
                          setShowModal(true);
                        }}
                      />
                      <Trash size={18} className="cursor-pointer text-red-500" />
                      <Pencil size={18} className="cursor-pointer text-blue-500" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Posts!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  {...register("topic", { required: true })}
                  placeholder="Enter topic"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.topic && <p className="text-red-500 text-xs mt-1">Topic is required</p>}
              </div>

              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                  Categories
                </label>
                <input
                  type="text"
                  id="categories"
                  {...register("categories", { required: true })}
                  placeholder="Enter categories"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.categories && <p className="text-red-500 text-xs mt-1">Categories are required</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  {...register("description", { required: true })}
                  placeholder="Enter description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">Description is required</p>}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
