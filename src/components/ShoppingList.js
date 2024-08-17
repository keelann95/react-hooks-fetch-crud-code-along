import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await fetch("http://localhost:4000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setItems((prevItems) => [...prevItems, data]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleToggleInCart = async (id) => {
    const itemToUpdate = items.find((item) => item.id === id);
    const updatedItem = { ...itemToUpdate, isInCart: !itemToUpdate.isInCart };

    try {
      const response = await fetch(`http://localhost:4000/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      const data = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? data : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`http://localhost:4000/items/${id}`, { method: "DELETE" });
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="Items">
          {itemsToDisplay.map((item) => (
            <Item
              key={item.id}
              item={item}
              onToggleInCart={handleToggleInCart}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;
