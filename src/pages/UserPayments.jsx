import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/InvoicePDF"; // tumi age banano PDF component
import UseAuth from "../hooks/UseAuth";

const UserPayments = ({ payments = [] }) => {
  const { userInfo } = UseAuth(); // user info jodi proyojon hoy
  if (!userInfo) return <p>Please login to see your payments.</p>;

  const userPayments = payments.filter(p => p.userId === userInfo._id); // sudhu ei user er payments

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Payments</h2>

      {userPayments.length === 0 ? (
        <p>No payments yet 😔</p>
      ) : (
        <div className="space-y-4">
          {userPayments.map(payment => (
            <div key={payment._id} className="flex justify-between items-center p-4 bg-base-100 shadow rounded">
              <div>
                <p><strong>Amount:</strong> ${payment.amount}</p>
                <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
                <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {payment.status}</p>
                {payment.method && <p><strong>Payment Method:</strong> {payment.method}</p>}
              </div>

              <PDFDownloadLink
                document={<InvoicePDF payment={payment} />}
                fileName={`Invoice-${payment._id}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <button className="btn btn-sm">Generating...</button>
                  ) : (
                    <button className="btn btn-outline btn-sm">Download Invoice</button>
                  )
                }
              </PDFDownloadLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPayments;
