export default function OrderSuccess({ orderDetails, onReset }) {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', display: 'inline-block' }}>
        <h1 style={{ color: '#059669', marginBottom: '1rem' }}>🍽️ RestoPi Order Confirmed!</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>KOT successfully sent to kitchen display system.</p>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '1.5rem 0', color: '#0f172a' }}>Order Number: {orderDetails.orderNumber}</p>
        <p style={{ marginBottom: '2rem' }}>Total Amount Verified: <strong>\${orderDetails.totalAmount?.toFixed(2)}</strong></p>
        <button className="add-btn" onClick={onReset}>New Table / Customer Order</button>
      </div>
    </div>
  );
}