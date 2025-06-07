import React, { useState } from "react";

// Пример списка товаров
const productsData = [
  {
    id: 1,
    name: "Ноутбук ASUS",
    category: "Электроника",
    price: 150000,
    rating: 4.5,
    dateAdded: "2023-05-01",
    popularity: 120,
    image: "https://via.placeholder.com/150",
    description: "Мощный ноутбук для работы и игр.",
  },
  {
    id: 2,
    name: "Смартфон Samsung",
    category: "Электроника",
    price: 80000,
    rating: 4.7,
    dateAdded: "2023-04-15",
    popularity: 200,
    image: "https://via.placeholder.com/150",
    description: "Современный смартфон с отличной камерой.",
  },
  {
    id: 3,
    name: "Книга 'JavaScript для начинающих'",
    category: "Книги",
    price: 3000,
    rating: 4.9,
    dateAdded: "2023-03-10",
    popularity: 150,
    image: "https://via.placeholder.com/150",
    description: "Отличная книга для изучения JavaScript.",
  },
  // Добавь больше товаров при необходимости
];

export default function ProductCatalog() {
  const [products, setProducts] = useState(productsData);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Все");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [sortKey, setSortKey] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Фильтрация товаров
  const filteredProducts = products
    .filter((p) => {
      // Фильтр по категории
      if (categoryFilter !== "Все" && p.category !== categoryFilter) return false;
      // Фильтр по цене
      if (priceFilter.min && p.price < Number(priceFilter.min)) return false;
      if (priceFilter.max && p.price > Number(priceFilter.max)) return false;
      // Фильтр по поиску
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    // Сортировка
    .sort((a, b) => {
      if (sortKey === "priceAsc") return a.price - b.price;
      if (sortKey === "priceDesc") return b.price - a.price;
      if (sortKey === "dateNew") return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (sortKey === "popularity") return b.popularity - a.popularity;
      return 0;
    });

  return (
    <div style={{ padding: 20 }}>
      <h2>Каталог товаров</h2>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, padding: 5, width: 200 }}
      />

      {/* Фильтры */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Категория:{" "}
          <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
            <option>Все</option>
            <option>Электроника</option>
            <option>Книги</option>
            {/* Добавляй категории */}
          </select>
        </label>

        <label style={{ marginLeft: 20 }}>
          Цена от:{" "}
          <input
            type="number"
            value={priceFilter.min}
            onChange={(e) => setPriceFilter({ ...priceFilter, min: e.target.value })}
            style={{ width: 80 }}
          />
        </label>

        <label style={{ marginLeft: 10 }}>
          до:{" "}
          <input
            type="number"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter({ ...priceFilter, max: e.target.value })}
            style={{ width: 80 }}
          />
        </label>

        {/* Сортировка */}
        <label style={{ marginLeft: 20 }}>
          Сортировать:{" "}
          <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
            <option value="">Без сортировки</option>
            <option value="priceAsc">Цена ↑</option>
            <option value="priceDesc">Цена ↓</option>
            <option value="dateNew">Новинки</option>
            <option value="popularity">Популярность</option>
          </select>
        </label>
      </div>

      {/* Список товаров */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} width="100%" style={{ borderRadius: 4 }} />
            <h3>{product.name}</h3>
            <p style={{ fontWeight: "bold" }}>{product.price.toLocaleString()} ₸</p>
            <p>{product.description.substring(0, 60)}...</p>
            <p>Рейтинг: {product.rating}</p>
          </div>
        ))}
      </div>

      {/* Детальная информация (модалка) */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              maxWidth: 500,
              width: "90%",
            }}
          >
            <h2>{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <p><b>Цена:</b> {selectedProduct.price.toLocaleString()} ₸</p>
            <p><b>Категория:</b> {selectedProduct.category}</p>
            <p><b>Рейтинг:</b> {selectedProduct.rating}</p>
            <p>{selectedProduct.description}</p>
            <button onClick={() => setSelectedProduct(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
