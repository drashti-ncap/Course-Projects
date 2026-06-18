import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaWallet,
  FaArrowRight,
} from "react-icons/fa";

import { SiDatabricks } from "react-icons/si";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  useNavigate,
} from "react-router-dom";

import {
  addCategoryAPI,
} from "../../services/category/categoryService";

import AlertMessage from "../Alert/AlertMessage";

const validationSchema =
  Yup.object({
    name:
      Yup.string().required(
        "Category name is required"
      ),

    type:
      Yup.string()
        .required(
          "Category type is required"
        )
        .oneOf([
          "income",
          "expense",
        ]),
  });

const AddCategory = () => {
  const navigate =
    useNavigate();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn:
      addCategoryAPI,
  });

  const formik =
    useFormik({
      initialValues: {
        type: "",
        name: "",
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
                  "/categories"
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">

            Add Category

          </h1>

          <p className="text-gray-500 mt-2">

            Create categories to organize transactions

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
                "Something went wrong"
              }
            />
          )}

          {isPending && (
            <AlertMessage
              type="loading"
              message="Creating category..."
            />
          )}

          {isSuccess && (
            <AlertMessage
              type="success"
              message="Category created successfully"
            />
          )}

        </div>

        <form
          onSubmit={
            formik.handleSubmit
          }
          className="space-y-6"
        >

          {/* Category Type */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <FaWallet className="text-purple-600" />

              Category Type

            </label>

            <select
              className={input}
              {...formik.getFieldProps(
                "type"
              )}
            >

              <option value="">
                Select category type
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>

            </select>

            {formik.touched
              .type &&
              formik.errors
                .type && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    formik
                      .errors
                      .type
                  }
                </p>
              )}

          </div>

          {/* Category Name */}

          <div>

            <label className="flex items-center gap-2 font-medium text-gray-700">

              <SiDatabricks className="text-blue-600" />

              Category Name

            </label>

            <input
              type="text"
              placeholder="Ex: Salary, Food, Shopping"
              className={input}
              {...formik.getFieldProps(
                "name"
              )}
            />

            {formik.touched
              .name &&
              formik.errors
                .name && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    formik
                      .errors
                      .name
                  }
                </p>
              )}

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={
              isPending
            }
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white py-4 font-semibold flex items-center justify-center gap-2 transition"
          >

            {isPending ? (
              "Creating..."
            ) : (
              <>
                Add Category
                <FaArrowRight />
              </>
            )}

          </button>

        </form>

      </div>

    </div>
  );
};

export default AddCategory;