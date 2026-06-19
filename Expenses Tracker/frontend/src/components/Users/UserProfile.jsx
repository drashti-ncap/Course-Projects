import React from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["change-password"],
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    //Submit
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });
  return (
    <>
      <div className=" bg-gray-50 py-10 px-4">

        <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">

          {/* Header */}

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">

            <FaUserCircle className="mx-auto text-white text-7xl mb-4" />

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-indigo-100 mt-2">
              Update your profile information
            </p>

          </div>

          {/* Form */}

          <div className="p-8">

            {/* Alerts */}

            <div className="mb-6">

              {isPending && (
                <AlertMessage
                  type="loading"
                  message="Updating profile..."
                />
              )}

              {isError && (
                <AlertMessage
                  type="error"
                  message={
                    error?.response?.data
                      ?.message
                  }
                />
              )}

              {isSuccess && (
                <AlertMessage
                  type="success"
                  message="Profile updated successfully"
                />
              )}

            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
            >

              {/* Username */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">

                  Username

                </label>

                <div className="relative">

                  <FaUserCircle
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    {...formik.getFieldProps(
                      "username"
                    )}
                    type="text"
                    placeholder="Enter username"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />

                </div>

                {formik.touched
                  .username &&
                  formik.errors
                    .username && (
                    <p className="mt-2 text-sm text-red-500">
                      {
                        formik.errors
                          .username
                      }
                    </p>
                  )}

              </div>

              {/* Email */}

              <div>

                <label className="block mb-2 text-sm font-semibold text-gray-700">

                  Email

                </label>

                <div className="relative">

                  <FaEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    {...formik.getFieldProps(
                      "email"
                    )}
                    placeholder="Enter email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />

                </div>

                {formik.touched
                  .email &&
                  formik.errors
                    .email && (
                    <p className="mt-2 text-sm text-red-500">
                      {
                        formik.errors
                          .email
                      }
                    </p>
                  )}

              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-semibold py-4 rounded-xl transition duration-300 shadow-lg"
              >

                {isPending
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </form>

          </div>

        </div>

      </div>


      <UpdatePassword />
    </>
  );
};

export default UserProfile;