import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import {
  listTransactionsAPI,
  deleteTransactionAPI,
  updateTransactionAPI,
} from "../../services/transactions/transactionService";

import { listCategoriesAPI } from "../../services/category/categoryService";

const TransactionList = () => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    id: "",
    amount: "",
    description: "",
    type: "",
    category: "",
    date: "",
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  //! Categories
  const { data: categoriesData } = useQuery({
    queryKey: ["list-categories"],
    queryFn: listCategoriesAPI,
  });

  //! Transactions
  const { data: transactions, isLoading } =
    useQuery({
      queryKey: [
        "list-transactions",
        filters,
      ],

      queryFn: () =>
        listTransactionsAPI(filters),
    });

  //! DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteTransactionAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "list-transactions",
        ],
      });
    },
  });

  //! UPDATE
  const updateMutation = useMutation({
    mutationFn: updateTransactionAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "list-transactions",
        ],
      });

      setIsModalOpen(false);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (transaction) => {
    setEditData({
      id: transaction._id,
      amount:
        transaction.amount,
      description:
        transaction.description,
      type:
        transaction.type,
      category:
        transaction.category?._id,
      date:
        transaction.date.split(
          "T"
        )[0],
    });

    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateMutation.mutate(
      editData
    );
  };

  if (isLoading)
    return (
      <h2>
        Loading...
      </h2>
    );

  return (
    <div className="my-4 p-4 bg-white rounded shadow">

      {/* FILTERS */}

      <div className="grid md:grid-cols-4 gap-4">

        <input
          type="date"
          name="startDate"
          value={
            filters.startDate
          }
          onChange={
            handleFilterChange
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={
            filters.endDate
          }
          onChange={
            handleFilterChange
          }
          className="border p-2 rounded"
        />

        <div className="relative">

          <select
            name="type"
            value={
              filters.type
            }
            onChange={
              handleFilterChange
            }
            className="w-full border p-2 rounded appearance-none"
          >
            <option value="">
              All Types
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>

          </select>

          <ChevronDownIcon className="w-5 absolute right-2 top-3" />

        </div>

        <div className="relative">

          <select
            name="category"
            value={
              filters.category
            }
            onChange={
              handleFilterChange
            }
            className="w-full border p-2 rounded appearance-none"
          >
            <option value="">
              All Categories
            </option>

            {categoriesData?.map(
              (
                category
              ) => (
                <option
                  key={
                    category._id
                  }
                  value={
                    category.name
                  }
                >
                  {
                    category.name
                  }
                </option>
              )
            )}

          </select>

          <ChevronDownIcon className="w-5 absolute right-2 top-3" />

        </div>

      </div>

      {/* TRANSACTIONS */}

      <div className="mt-5">

        {transactions?.map(
          (
            transaction
          ) => (
            <div
              key={
                transaction._id
              }
              className="flex justify-between border p-3 rounded mb-3"
            >

              <div>

                <p className="font-semibold text-gray-800">
                  {transaction.category?.name}
                </p>

                <p
                  className={`inline-block px-2 py-1 rounded text-sm mt-1 ${transaction.type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {transaction.type}
                </p>

                <p className="mt-2 text-gray-700">
                  Amount: ₹{transaction.amount}
                </p>

                <p className="text-gray-600">
                  Description: {transaction.description}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    handleEdit(
                      transaction
                    )
                  }
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      transaction._id
                    )
                  }
                  className="text-red-500"
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          )
        )}

      </div>

      {/* EDIT MODAL */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-[450px]">

            <h2 className="text-xl font-bold mb-5">
              Edit Transaction
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-3"
            >

              <input
                type="number"
                name="amount"
                value={
                  editData.amount
                }
                onChange={
                  handleEditChange
                }
                className="w-full border p-2"
              />

              <input
                type="text"
                name="description"
                value={
                  editData.description
                }
                onChange={
                  handleEditChange
                }
                className="w-full border p-2"
              />

              <input
                type="date"
                name="date"
                value={
                  editData.date
                }
                onChange={
                  handleEditChange
                }
                className="w-full border p-2"
              />

              <select
                name="type"
                value={
                  editData.type
                }
                onChange={
                  handleEditChange
                }
                className="w-full border p-2"
              >
                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>

              </select>

              <select
                name="category"
                value={
                  editData.category
                }
                onChange={
                  handleEditChange
                }
                className="w-full border p-2"
              >
                {categoriesData?.map(
                  (
                    cat
                  ) => (
                    <option
                      key={
                        cat._id
                      }
                      value={
                        cat._id
                      }
                    >
                      {
                        cat.name
                      }
                    </option>
                  )
                )}

              </select>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(
                      false
                    )
                  }
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    updateMutation.isPending
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {updateMutation.isPending
                    ? "Updating..."
                    : "Update"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default TransactionList;