import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import headphones from "../assets/product-headphones.svg";
import cable from "../assets/product-cable.svg";
import phoneCase from "../assets/product-case.svg";
import protector from "../assets/product-protector.svg";
import stand from "../assets/product-stand.svg";
import keyboard from "../assets/product-keyboard.svg";
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const productImages = {
    1: headphones,
    2: cable,
    3: phoneCase,
    4: protector,
    5: stand,
    6: keyboard,
  };

  const productPrices = {
    "Wireless Headphones": 89.99,
    "USB-C Cable": 12.99,
    "Phone Case": 15.99,
    "Screen Protector": 8.99,
    "Laptop Stand": 34.99,
    "Mechanical Keyboard": 65.99,
  };

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity;
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = productPrices[item.name] || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems,
      total: calculateTotal(),
      orderId: `#ORD${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString(),
      shippingAddress: {
        name: "John Doe",
        email: JSON.parse(localStorage.getItem("user"))?.email || "user@example.com",
        phone: "555-0123",
        address: "123 Main Street, City, State 12345",
      },
    };

    sessionStorage.setItem("orderData", JSON.stringify(orderData));
    sessionStorage.removeItem("cart");
    navigate("/order-confirmation");
  };

  const tax = calculateTotal() * 0.1;
  const shipping = calculateTotal() > 100 ? 0 : 9.99;
  const grandTotal = calculateTotal() + tax + shipping;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate("/products")}>
          ← Continue Shopping
        </button>
        <h1>🛒 Shopping Cart</h1>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add items from our product gallery</p>
              <button
                className="continue-shopping"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              <div className="cart-items-header">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Action</span>
              </div>
              {cartItems.map((item, index) => {
                const price = productPrices[item.name] || 0;
                return (
                  <div key={index} className="cart-item">
                    <div className="item-product">
                      <img
                        src={productImages[item.id]}
                        alt={item.name}
                        className="item-image"
                      />
                      <span className="item-name">{item.name}</span>
                    </div>
                    <span className="item-price">${price.toFixed(2)}</span>
                    <div className="item-quantity">
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(index, parseInt(e.target.value) || 0)
                        }
                      />
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="item-total">
                      ${(price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>
                Shipping
                {shipping === 0 && <span className="free-shipping">(FREE)</span>}
              </span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <div className="promo-section">
              <input type="text" placeholder="Promo code" />
              <button className="apply-btn">Apply</button>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>

            <div className="shipping-info">
              <p>✓ Free shipping on orders over $100</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
