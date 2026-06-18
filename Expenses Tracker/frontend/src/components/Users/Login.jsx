import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import {
  loginAPI,
} from "../../services/users/userService";

import AlertMessage from "../Alert/AlertMessage";

import {
  loginAction,
} from "../../redux/slice/authSlice";

const validationSchema =
  Yup.object({
    email: Yup.string()
      .email(
        "Invalid email"
      )
      .required(
        "Email required"
      ),

    password: Yup.string()
      .min(
        5,
        "Minimum 5 characters"
      )
      .required(
        "Password required"
      ),
  });

export default function LoginForm() {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
  } =
    useMutation({
      mutationFn:
        loginAPI,
    });

  const formik =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      validationSchema,

      onSubmit:
        async (
          values
        ) => {
          try {
            const res =
              await mutateAsync(
                values
              );

            dispatch(
              loginAction(
                res
              )
            );

            localStorage.setItem(
              "userInfo",
              JSON.stringify(
                res
              )
            );
          } catch (err) {
            console.log(
              err
            );
          }
        },
    });

  // Wait before redirect
  useEffect(() => {
    let timer;

    if (
      isSuccess
    ) {
      timer =
        setTimeout(
          () => {
            navigate(
              "/profile"
            );
          },
          2000
        );
    }

    return () =>
      clearTimeout(
        timer
      );
  }, [
    isSuccess,
    navigate,
  ]);

  const input =
    `
      w-full
      mt-2
      rounded-xl
      border
      border-gray-300
      px-4
      py-3
      outline-none
      focus:border-purple-500
      focus:ring-2
      focus:ring-purple-200
    `;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">

      <form
        onSubmit={
          formik.handleSubmit
        }
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
      >
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        {/* ALERTS */}

        {isPending && (
          <AlertMessage
            type="loading"
            message="Signing in..."
          />
        )}

        {isError && (
          <AlertMessage
            type="error"
            message={
              error
                ?.response
                ?.data
                ?.message ||
              "Invalid email or password"
            }
          />
        )}

        {isSuccess && (
          <AlertMessage
            type="success"
            message="Login successful"
          />
        )}

        <div className="space-y-5">

          {/* EMAIL */}

          <div>

            <label className="flex gap-2 items-center font-medium">

              <FaEnvelope />

              Email

            </label>

            <input
              type="email"
              className={
                input
              }
              placeholder="Enter email"
              {...formik.getFieldProps(
                "email"
              )}
            />

            {formik.touched
              .email &&
              formik.errors
                .email && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    formik
                      .errors
                      .email
                  }
                </p>
              )}

          </div>

          {/* PASSWORD */}

          <div>

            <label className="flex gap-2 items-center font-medium">

              <FaLock />

              Password

            </label>

            <input
              type="password"
              className={
                input
              }
              placeholder="Enter password"
              {...formik.getFieldProps(
                "password"
              )}
            />

            {formik.touched
              .password &&
              formik.errors
                .password && (
                <p className="text-red-500 text-sm mt-1">
                  {
                    formik
                      .errors
                      .password
                  }
                </p>
              )}

          </div>

          <button
            type="submit"
            disabled={
              isPending
            }
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              disabled:bg-purple-400
              text-white
              py-3
              rounded-xl
              font-semibold
            "
          >
            {isPending
              ? "Signing In..."
              : "Sign In"}
          </button>

          <p className="text-center text-gray-600">

            No account?

            <Link
              to="/register"
              className="text-purple-600 font-medium ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </form>

    </div>
  );
}