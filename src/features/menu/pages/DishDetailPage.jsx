import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch("/menu.json");
  if (isLoading) {
    return <p>Loading dish...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  const dish = dishes.find((d) => d.id === Number(id));
  if (!dish) {
    return (
      <div>
        <h2>Dish not found</h2>
        <Link to="/">← Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-details">
      <h1>{dish.name}</h1>
      <p>
        <strong>Price:</strong> Rs. {dish.price.toFixed(2)}
      </p>
      <p>
        <strong>Category:</strong> {dish.category}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {dish.available ? "Available ✅" : "Sold Out ❌"}
      </p>
      <br />
      <Link to="/">← Back to Menu</Link>
    </div>
  );
}

export default DishDetailPage;
