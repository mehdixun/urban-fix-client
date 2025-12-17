import React, { useEffect, useState, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import InvoicePDF from "../components/InvoicePDF";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentsChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Payment Amount ($)",
        data: data.map((d) => d.amount),
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };
  return <Bar data={chartData} />;
};

const UserPayments = () => {
  const { user } = UseAuth();
  const [payments, setPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterMethod, setFilterMethod] = useState("All");
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:3000";

  // Get sessionId from URL for verification
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");

  // Fetch payments
  const fetchPayments = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/payments/${user.email}`);
      setPayments(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Verify payment on success page
  useEffect(() => {
    if (sessionId && user?.email) {
      const verify = async () => {
        try {
          await axios.post(`${API_BASE}/payments/verify`, {
            sessionId,
            email: user.email,
          });
          fetchPayments(); // reload after verification
        } catch (err) {
          console.error(err);
        }
      };
      verify();
    }
  }, [sessionId, user]);

  useEffect(() => {
    fetchPayments();
  }, [user]);

  const filteredPayments = useMemo(() => {
    return payments
      .filter((p) => (filterStatus === "All" ? true : p.status === filterStatus))
      .filter((p) => (filterMethod === "All" ? true : p.method === filterMethod));
  }, [payments, filterStatus, filterMethod]);

  const statusOptions = ["All", ...new Set(payments.map((p) => p.status))];
  const methodOptions = ["All", ...new Set(payments.map((p) => p.method).filter(Boolean))];

  const chartData = useMemo(() => {
    const grouped = filteredPayments.reduce((acc, p) => {
      const month = new Date(p.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      acc[month] = (acc[month] || 0) + p.amount;
      return acc;
    }, {});
    return Object.entries(grouped).map(([month, amount]) => ({ month, amount }));
  }, [filteredPayments]);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${API_BASE}/create-checkout-session`, {
        cost: 100,
        userEmail: user.email,
      });
      if (res.data?.url) window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Failed to create payment session.");
    }
  };

  if (!user?.email)
    return <p className="text-center py-10 text-gray-500">Please login to see your payments.</p>;
  if (loading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-600">My Payments</h2>
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          onClick={handlePayment}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition"
        >
          Pay Now
        </button>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          {statusOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          {methodOptions.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {filteredPayments.length > 0 && (
        <div className="my-8">
          <h3 className="text-2xl font-semibold text-center mb-4">Payments Timeline</h3>
          <PaymentsChart data={chartData} />
        </div>
      )}

      {filteredPayments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found 😴</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Transaction</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-2">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">${p.amount}</td>
                  <td className="px-4 py-2">{p.transactionId}</td>
                  <td className="px-4 py-2">
                    <span className="badge badge-success">{p.status}</span>
                  </td>
                  <td className="px-4 py-2">
                    <PDFDownloadLink
                      document={<InvoicePDF payment={p} />}
                      fileName={`Invoice-${p._id}.pdf`}
                    >
                      {({ loading }) => (loading ? "Generating..." : "Download")}
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPayments;
