export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav className="navbar">
      <h2>RestoPi <span>Cloud POS</span></h2>
      <button className="cart-btn" onClick={onOpenCart}>
        🛒 Order Cart ({cartCount})
      </button>
    </nav>
  );
}