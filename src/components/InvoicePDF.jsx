import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  heading: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  row: { marginBottom: 8 }
});

const InvoicePDF = ({ payment }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.heading}>Payment Invoice</Text>

      <View style={styles.row}>
        <Text>Invoice ID: {payment._id}</Text>
      </View>
      <View style={styles.row}>
        <Text>User: {payment.userEmail}</Text>
      </View>
      <View style={styles.row}>
        <Text>Amount: ${payment.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text>Date: {new Date(payment.date).toLocaleString()}</Text>
      </View>
      <View style={styles.row}>
        <Text>Status: {payment.status}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
