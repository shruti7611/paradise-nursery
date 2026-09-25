import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  {
    name: "Snake Plant",
    category: "Air Purifying Plants",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee"
  },
  {
    name: "Peace Lily",
    category: "Air Purifying Plants",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee"
  },
  {
    name: "Spider Plant",
    category: "Air Purifying Plants",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1572688484438-313a6e50c333"
  },
  {
    name: "Aloe Vera",
    category: "Medicinal Plants",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1596547609652-9cf5d8f8c542"
  },
  {
    name: "Lavender",
    category: "Aromatic Plants",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec"
  },
  {
    name: "Rosemary",
    category: "Aromatic Plants",
    price: 13,
    image:
      "https://images.unsplash.com/photo-1515586000433-45406d8e6662"
  },
  {
    name: "Jade Plant",
    category: "Indoor Plants",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1597055181300-ae627c4a4ab4"
  },
  {
    name: "Monstera",
    category: "Indoor Plants",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b"
  },
  {
    name: "Pothos",
    category: "Indoor Plants",
    price: 17,
    image:
      "https://images.unsplash.com/photo-1614594576371-7e2b2e8a5f4a"
  }
];

function ProductList({
  onHomeClick,
  onCartClick,
  totalItems
}) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const categories = [
    ...new Set(plants.map((plant) => plant.category))
  ];

  const isInCart = (name) =>
    cart.some((item) => item.name === name);

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          background: "#2e7d32",
          color: "white"
        }}
      >
        <h2>Paradise Nursery</h2>

        <div>
          <button onClick={onHomeClick}>Home</button>

          <button onClick={onCartClick}>
            🛒 Cart ({totalItems})
          </button>
        </div>
      </nav>

      <main style={{ padding: "30px" }}>
        <h1>Our Plants</h1>

        {categories.map((category) => (
          <section key={category}>
            <h2>{category}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "40px"
              }}
            >
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <div
                    key={plant.name}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      padding: "15px",
                      background: "white"
                    }}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />

                    <h3>{plant.name}</h3>

                    <p>Price: ${plant.price}</p>

                    <button
                      disabled={isInCart(plant.name)}
                      onClick={() =>
                        dispatch(
                          addItem({
                            name: plant.name,
                            image: plant.image,
                            cost: plant.price,
                            category: plant.category
                          })
                        )
                      }
                    >
                      {isInCart(plant.name)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
