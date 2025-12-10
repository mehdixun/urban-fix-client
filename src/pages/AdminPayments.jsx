import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/InvoicePDF";

const AdminPayments = ({ payments }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Payments</h1>

      {payments.map((p) => (
        <div key={p._id} className="border p-4 rounded mb-3">
          <h2 className="font-bold">User: {p.userEmail}</h2>
          <p>Amount: ${p.amount}</p>

          <PDFDownloadLink
            document={<InvoicePDF payment={p} />}
            fileName={`Invoice-${p._id}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="btn btn-sm">Generating...</button>
              ) : (
                <button className="btn btn-primary btn-sm mt-2">
                  Download Invoice
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      ))}
    </div>
  );
};

export default AdminPayments;
