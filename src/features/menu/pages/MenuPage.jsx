import { useState } from "react";
import "./MenuPage.css";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const {
    data: dishes,
    isLoading,
    error,
  } = useFetch("/menu.json");
  // Loading State
  if (isLoading) {
    return <p>Loading menu...</p>;
  }
  // Error State
  if (error) {
    return <p>Could not load menu: {error}</p>;
  }
  // Success State
  const filtered = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(debounced.toLowerCase())
  );
  return (
    <div className="menu-page">
      <h1 className="menu-title">CampusEats Menu</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search dishes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;