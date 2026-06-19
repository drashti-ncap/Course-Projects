import { useState } from "react";
import axios from "axios";

const currencies = [
  "USD",
  "INR",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
];

export default function CurrencyConverter() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    setError("");
    setResult(null);

    if (!from || !to || !amount) {
      setError("Please fill all fields");
      return;
    }

    if (from === to) {
      setError(
        "From and To currency cannot be the same"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/convert",
        {
          from,
          to,
          amount,
        }
      );

      setResult(response.data);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to convert currency"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="converter-wrapper">
      <div className="converter-card">

        <div className="currency-row">

          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">
              Select From Currency
            </option>

            {currencies.map((item) => (
              <option key={item} value={item} disabled={item === to}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">
              Select To Currency
            </option>

            {currencies.map((item) => (
              <option key={item} value={item} disabled={item === from}>
                {item}
              </option>
            ))}
          </select>

        </div>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <button
          onClick={handleConvert}
          disabled={loading}
        >
          {loading
            ? "Converting..."
            : "Convert"}
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {result?.conversionAmount && (
          <div className="result-card">

            <div className="result-header">
              ✓ Conversion Complete
            </div>

            <div className="result-body">

              <div className="currency-value">
                <span className="label">From</span>
                <h3>
                  {amount} {result.base}
                </h3>
              </div>

              <div className="arrow">
                →
              </div>

              <div className="currency-value">
                <span className="label">To</span>
                <h2>
                  {Number(
                    result.conversionAmount
                  ).toLocaleString()}
                  {" "}
                  {result.target}
                </h2>
              </div>

            </div>

            <div className="rate-box">
              Exchange Rate
              <strong>
                1 {result.base} = {result.conversionRate} {result.target}
              </strong>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}