import { useState, useEffect } from "react";

const ItemForm = ({ onSubmit, itemToEdit = null, onCancel }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  // Populate form fields if editing an item
  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setCategory(itemToEdit.category);
      setQuantity(itemToEdit.quantity);
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && category && quantity) {
      const newItem = {
        id: itemToEdit ? itemToEdit.id : Date.now(),
        name,
        category,
        quantity: parseInt(quantity, 10),
      };
      onSubmit(newItem);
      setName("");
      setCategory("");
      setQuantity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Grocery">Grocery</option>
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">{itemToEdit ? "Update Item" : "Add Item"}</button>
      {itemToEdit && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default ItemForm;
