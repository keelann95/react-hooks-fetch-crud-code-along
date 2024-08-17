import React from "react";

function Item({ item, onToggleInCart, onDeleteItem }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={() => onToggleInCart(item.id)}
      >
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button 
        className="remove"
        onClick={() => onDeleteItem(item.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Item;