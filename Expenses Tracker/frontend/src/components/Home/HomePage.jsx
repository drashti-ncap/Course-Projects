import React from "react";
import {
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaSignInAlt,
  FaList,
  FaChartPie,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

import {
  FaArrowTrendUp,
  FaFilter,
} from "react-icons/fa6";

import { IoIosStats } from "react-icons/io";

import { Link } from "react-router-dom";

const features = [
  {
    icon: <FaMoneyBillWave />,
    title: "Expense Tracking",
    desc: "Track spending instantly.",
  },
  {
    icon: <FaFilter />,
    title: "Smart Filters",
    desc: "Organize by date & category.",
  },
  {
    icon: <IoIosStats />,
    title: "Analytics",
    desc: "Understand financial habits.",
  },
];

const cards = [
  {
    icon: <FaMoneyBillWave />,
    title: "Expense Management",
  },
  {
    icon: <FaArrowTrendUp />,
    title: "Income Tracking",
  },
  {
    icon: <FaRegCalendarAlt />,
    title: "Date Filtering",
  },
  {
    icon: <FaChartPie />,
    title: "Reports",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure",
  },
  {
    icon: <FaList />,
    title: "Categories",
  },
];

export default function HeroSection() {
  return (
    <div className="bg-white">

      {/* HERO */}

      <section className="bg-gradient-to-b from-purple-50 to-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-4xl mx-auto text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 text-purple-700 px-5 py-2 text-sm font-semibold">

              <FaRocket />

              Smart Expense Tracker

            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-black text-gray-900 leading-tight">

              Take Control of

              <span className="block text-purple-600">

                Your Finances

              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">

              Track expenses, monitor income,
              and make smarter financial decisions.

            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

              <Link to="/register">

                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold">

                  Get Started

                </button>

              </Link>

              <Link to="/login">

                <button className="border border-gray-300 hover:border-purple-600 hover:text-purple-600 px-8 py-4 rounded-xl font-semibold">

                  Login

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-4xl font-bold text-gray-900">

            Everything You Need

          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-8">

            {features.map((item, i) => (

              <div
                key={i}
                className="bg-white rounded-2xl border p-8 shadow-sm hover:shadow-lg transition"
              >

                <div className="text-purple-600 text-5xl mb-5">

                  {item.icon}

                </div>

                <h3 className="text-xl font-bold mb-3">

                  {item.title}

                </h3>

                <p className="text-gray-600">

                  {item.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* HOW */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-4xl font-bold">

            How It Works

          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {[
              {
                icon: <FaSignInAlt />,
                title: "Create Account",
              },

              {
                icon: <FaList />,
                title: "Add Transactions",
              },

              {
                icon: <FaChartPie />,
                title: "View Insights",
              },
            ].map((step, i) => (

              <div
                key={i}
                className="bg-white rounded-2xl p-10 text-center border"
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">

                  {step.icon}

                </div>

                <h3 className="mt-5 text-xl font-bold">

                  {step.title}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* BENEFITS */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-4xl font-bold mb-14">

            Why Choose Us

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {cards.map((item, i) => (

              <div
                key={i}
                className="border rounded-2xl p-8 hover:border-purple-500 hover:-translate-y-1 transition"
              >

                <div className="text-purple-600 text-4xl mb-4">

                  {item.icon}

                </div>

                <h3 className="font-bold text-lg">

                  {item.title}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto rounded-3xl bg-purple-600 text-white p-14 text-center">

          <h2 className="text-4xl font-bold">

            Start Tracking Today

          </h2>

          <p className="mt-4 text-purple-100">

            Build better financial habits.

          </p>

          <Link to="/register">

            <button className="mt-8 bg-white text-purple-700 px-10 py-4 rounded-xl font-semibold">

              Create Free Account

            </button>

          </Link>

        </div>

      </section>

    </div>
  );
}

