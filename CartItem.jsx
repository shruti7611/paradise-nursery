import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice";

function CartItem({
  onContinueShopping,
  onHomeClick
}) {
  const cart = useSelector(
    (state) => state.cart.items
  );

  const dispatch = useDispatch();

  const getPrice = (cost) => {
    if (typeof cost === "number") {
      return cost;
    }

    return Number(
      String(cost).replace("$", "")
    );
  };

  const totalAmount = cart.reduce(
    (total, item) =>
      total + getPrice(item.cost) * item.quantity,
    0
  );

  const increment = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
      })
    );
  };

  const decrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      })
    );
  };

  const remove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px"
        }}
      >
        <button onClick={onHomeClick}>
          Home
        </button>

        <h1>Shopping Cart</h1>

        <button onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div>
          <h2>Your cart is empty.</h2>

          <button onClick={onContinueShopping}>
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                padding: "20px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px"
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover"
                }}
              />

              <div>
                <h2>{item.name}</h2>

                <p>
                  Unit Price: $
                  {getPrice(item.cost)}
                </p>

                <div>
                  <button
                    onClick={() =>
                      decrement(item)
                    }
                  >
                    -
                  </button>

                  <span
                    style={{
                      margin: "0 15px"
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increment(item)
                    }
                  >
                    +
                  </button>
                </div>

                <p>
                  Total: $
                  {(
                    getPrice(item.cost) *
                    item.quantity
                  ).toFixed(2)}
                </p>

                <button
                  onClick={() =>
                    remove(item)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h2>
            Total Cart Amount: $
            {totalAmount.toFixed(2)}
          </h2>

          <button
            onClick={() => alert("Coming Soon")}
          >
            Checkout
          </button>

          <button
            onClick={onContinueShopping}
            style={{ marginLeft: "10px" }}
          >
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
}

export default CartItem;
