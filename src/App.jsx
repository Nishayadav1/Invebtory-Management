import React, { useState } from "react";
import InventoryTable from "./components/InventoryTable";
import ItemForm from "./components/ItemForm";

const App = () => {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editItemId, setEditItemId] = useState(null);

  const addItem = (newItem) => {
    setInventory([...inventory, newItem]);
  };

  const editItem = (updatedItem) => {
    setInventory(
      inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItemId(null); // Reset edit mode
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const startEditing = (id) => {
    setEditItemId(id);
  };

  const cancelEditing = () => {
    setEditItemId(null);
  };

  const filteredInventory = filter
    ? inventory.filter((item) => item.category === filter)
    : inventory;

  const sortedInventory = [...filteredInventory].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="app">
      <h1>Inventory Management</h1>
      {!editItemId ? (
        <ItemForm onSubmit={addItem} />
      ) : (
        <ItemForm
          onSubmit={editItem}
          itemToEdit={inventory.find((item) => item.id === editItemId)}
          onCancel={cancelEditing}
        />
      )}
      <div className="controls">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
        </select>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort by Quantity ({sortOrder === "asc" ? "Asc" : "Desc"})
        </button>
      </div>
      <InventoryTable
        inventory={sortedInventory}
        onEdit={startEditing}
        onDelete={deleteItem}
      />
    </div>
  );
};

export default App;
