import React, {
  useEffect,
} from "react";

import { useFormik } from "formik";

import * as Yup from "yup";

import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  registerAPI,
} from "../../services/users/userService";

import AlertMessage from "../Alert/AlertMessage";

const schema =
  Yup.object({
    username:
      Yup.string()
        .required(
          "Username required"
        ),

    email:
      Yup.string()
        .email(
          "Invalid email"
        )
        .required(
          "Email required"
        ),

    password:
      Yup.string()
        .min(
          6,
          "Minimum 6 characters"
        )
        .required(
          "Password required"
        ),

    confirmPassword:
      Yup.string()
        .oneOf(
          [
            Yup.ref(
              "password"
            ),
          ],
          "Passwords must match"
        )
        .required(
          "Confirm password"
        ),
  });

export default function RegisterForm() {
  const navigate =
    useNavigate();

  const {
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
  } =
    useMutation({
      mutationFn:
        registerAPI,
    });

  const formik =
    useFormik({
      initialValues:
        {
          username:
            "",
          email:
            "",
          password:
            "",
          confirmPassword:
            "",
        },

      validationSchema:
        schema,

      onSubmit:
        async (
          values
        ) => {
          try {
            await mutateAsync(
              values
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

  // redirect AFTER success alert
  useEffect(() => {
    let timer;

    if (
      isSuccess
    ) {
      timer =
        setTimeout(
          () => {
            navigate(
              "/login"
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

  const errorText =
    "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-5">

      <form
        onSubmit={
          formik.handleSubmit
        }
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-lg
          border
          border-gray-100
          p-8
        "
      >

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">

            Create Account

          </h1>

          <p className="text-gray-500 mt-2">

            Start tracking your expenses

          </p>

        </div>

        {/* ALERTS */}

        {isPending && (
          <AlertMessage
            type="loading"
            message="Creating account..."
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
              "Registration failed"
            }
          />
        )}

        {isSuccess && (
          <AlertMessage
            type="success"
            message="Account created successfully"
          />
        )}

        <div className="space-y-5">

          {/* USERNAME */}

          <div>

            <label className="font-medium flex gap-2 items-center">

              <FaUser />

              Username

            </label>

            <input
              className={
                input
              }
              placeholder="Enter username"
              {...formik.getFieldProps(
                "username"
              )}
            />

            {formik
              .touched
              .username &&
              formik
                .errors
                .username && (
                <p className={errorText}>
                  {
                    formik
                      .errors
                      .username
                  }
                </p>
              )}

          </div>

          {/* EMAIL */}

          <div>

            <label className="font-medium flex gap-2 items-center">

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

            {formik
              .touched
              .email &&
              formik
                .errors
                .email && (
                <p className={errorText}>
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

            <label className="font-medium flex gap-2 items-center">

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

            {formik
              .touched
              .password &&
              formik
                .errors
                .password && (
                <p className={errorText}>
                  {
                    formik
                      .errors
                      .password
                  }
                </p>
              )}

          </div>

          {/* CONFIRM */}

          <div>

            <label className="font-medium flex gap-2 items-center">

              <FaLock />

              Confirm Password

            </label>

            <input
              type="password"
              className={
                input
              }
              placeholder="Confirm password"
              {...formik.getFieldProps(
                "confirmPassword"
              )}
            />

            {formik
              .touched
              .confirmPassword &&
              formik
                .errors
                .confirmPassword && (
                <p className={errorText}>
                  {
                    formik
                      .errors
                      .confirmPassword
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
              ? "Creating..."
              : "Create Account"}
          </button>

          <p className="text-center text-gray-600">

            Already have account?

            <Link
              to="/login"
              className="text-purple-600 ml-2 font-medium"
            >

              Login

            </Link>

          </p>

        </div>

      </form>

    </div>
  );
}