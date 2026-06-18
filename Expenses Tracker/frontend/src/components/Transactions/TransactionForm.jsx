import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
  FaArrowRight,
} from "react-icons/fa";

import {
  listCategoriesAPI,
} from "../../services/category/categoryService";

import {
  addTransactionAPI,
} from "../../services/transactions/transactionService";

import AlertMessage from "../Alert/AlertMessage";

const validationSchema =
  Yup.object({
    type: Yup.string()
      .required("Transaction type is required")
      .oneOf([
        "income",
        "expense",
      ]),

    amount:
      Yup.number()
        .required(
          "Amount is required"
        )
        .positive(
          "Amount must be positive"
        ),

    category:
      Yup.string().required(
        "Category is required"
      ),

    date: Yup.date().required(
      "Date is required"
    ),

    description:
      Yup.string(),
  });

const TransactionForm = () => {
  const navigate =
    useNavigate();

  const {
    mutateAsync,
    isPending,
    isError:
      isAddTranErr,
    error: transErr,
    isSuccess,
  } = useMutation({
    mutationFn:
      addTransactionAPI,
  });

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "list-categories",
    ],
    queryFn:
      listCategoriesAPI,
  });

  const formik =
    useFormik({
      initialValues: {
        type: "",
        amount: "",
        category: "",
        date: "",
        description:
          "",
      },

      validationSchema,

      onSubmit:
        async (
          values,
          {
            resetForm,
          }
        ) => {
          try {
            await mutateAsync(
              values
            );

            resetForm();

            setTimeout(
              () =>
                navigate(
                  "/transactions"
                ),
              1000
            );
          } catch (
            err
          ) {
            console.log(
              err
            );
          }
        },
    });

  const input =
    "w-full rounded-xl border border-gray-300 px-4 py-3 mt-2 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none";

  const errorText =
    "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">

            Add Transaction

          </h1>

          <p className="text-gray-500 mt-2">

            Record income and expenses

          </p>

        </div>

        {/* Alerts */}

        <div className="mb-6">

          {isError && (
            <AlertMessage
              type="error"
              message={
                error
                  ?.response
                  ?.data
                  ?.message ||
                "Failed loading categories"
              }
            />
          )}

          {isAddTranErr && (
            <AlertMessage
              type="error"
              message={
                transErr
                  ?.response
                  ?.data
                  ?.message ||
                "Failed adding transaction"
              }
            />
          )}

          {isPending && (
            <AlertMessage
              type="loading"
              message="Saving transaction..."
            />
          )}

          {isSuccess && (
            <AlertMessage
              type="success"
              message="Transaction added"
            />
          )}

        </div>

        <form
          onSubmit={
            formik.handleSubmit
          }
          className="space-y-6"
        >

          {/* TYPE */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <FaWallet className="text-purple-600" />

              Type

            </label>

            <select
              className={input}
              {...formik.getFieldProps(
                "type"
              )}
            >
              <option value="">
                Select type
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

            </select>

            <p className={errorText}>
              {
                formik.touched
                  .type &&
                  formik.errors
                    .type
              }
            </p>

          </div>

          {/* Amount */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <FaDollarSign className="text-green-600" />

              Amount

            </label>

            <input
              type="number"
              placeholder="₹0.00"
              className={input}
              {...formik.getFieldProps(
                "amount"
              )}
            />

            <p className={errorText}>
              {
                formik.touched
                  .amount &&
                  formik.errors
                    .amount
              }
            </p>

          </div>

          {/* Category */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <FaRegCommentDots className="text-blue-600" />

              Category

            </label>

            <select
              className={input}
              {...formik.getFieldProps(
                "category"
              )}
            >

              <option value="">
                Select category
              </option>

              {data.map(
                (
                  item
                ) => (
                  <option
                    key={
                      item._id
                    }
                    value={
                      item.name
                    }
                  >
                    {
                      item.name
                    }
                  </option>
                )
              )}

            </select>

            <p className={errorText}>
              {
                formik.touched
                  .category &&
                  formik.errors
                    .category
              }
            </p>

          </div>

          {/* DATE */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <FaCalendarAlt className="text-orange-500" />

              Date

            </label>

            <input
              type="date"
              className={input}
              {...formik.getFieldProps(
                "date"
              )}
            />

            <p className={errorText}>
              {
                formik.touched
                  .date &&
                  formik.errors
                    .date
              }
            </p>

          </div>

          {/* Notes */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <FaRegCommentDots className="text-purple-600" />

              Notes

            </label>

            <textarea
              rows="4"
              className={`${input} resize-none`}
              placeholder="Add notes..."
              {...formik.getFieldProps(
                "description"
              )}
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={
              isPending ||
              isLoading
            }
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-4 font-semibold flex items-center justify-center gap-2 transition"
          >

            {isPending ? (
              "Saving..."
            ) : (
              <>
                Add Transaction
                <FaArrowRight />
              </>
            )}

          </button>

        </form>

      </div>

    </div>
  );
};

export default TransactionForm;

