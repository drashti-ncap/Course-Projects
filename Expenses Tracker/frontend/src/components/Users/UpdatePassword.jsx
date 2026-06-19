import React, { useState } from "react";
import {
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";

import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  password: Yup.string()
    .min(
      5,
      "Password must be at least 5 characters"
    )
    .required(
      "Password is required"
    ),
});

const UpdatePassword = () => {
  const dispatch =
    useDispatch();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn:
      changePasswordAPI,

    mutationKey: [
      "change-password",
    ],
  });

  const formik =
    useFormik({
      initialValues: {
        password: "",
      },

      validationSchema,

      onSubmit:
        async (
          values
        ) => {
          try {
            await mutateAsync(
              values.password
            );

            dispatch(
              logoutAction()
            );

            localStorage.removeItem(
              "userInfo"
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">

          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">

            <AiOutlineLock className="text-white text-5xl" />

          </div>

          <h1 className="text-3xl font-bold text-white">
            Security Settings
          </h1>

          <p className="text-indigo-100 mt-2">
            Update your password to keep your account secure
          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          {/* Alerts */}

          <div className="mb-6">

            {isPending && (
              <AlertMessage
                type="loading"
                message="Updating password..."
              />
            )}

            {isError && (
              <AlertMessage
                type="error"
                message={
                  error?.response
                    ?.data?.message
                }
              />
            )}

            {isSuccess && (
              <AlertMessage
                type="success"
                message="Password updated successfully"
              />
            )}

          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-8"
          >

            {/* Password */}

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700">

                New Password

              </label>

              <div className="relative">

                <AiOutlineLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your new password"
                  {...formik.getFieldProps(
                    "password"
                  )}
                  className="w-full pl-14 pr-14 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                >

                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-xl" />
                  ) : (
                    <AiOutlineEye className="text-xl" />
                  )}

                </button>

              </div>

              {formik.touched
                .password &&
                formik.errors
                  .password && (
                  <p className="mt-2 text-sm text-red-500">

                    {
                      formik.errors
                        .password
                    }

                  </p>
                )}

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-lg transition"
            >

              {isPending
                ? "Updating..."
                : "Update Password"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}



export default UpdatePassword;
