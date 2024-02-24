import React from "react";
import { useState } from "react";
import Button from "./Button";

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const paidByFriend = billValue ? billValue - userExpense : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmitSplit(e) {
    e.preventDefault();

    if (!billValue || !userExpense) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmitSplit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="number"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>🤵🏻 Your Expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) =>
          setUserExpense(
            Number(e.target.value) > billValue
              ? userExpense
              : Number(e.target.value)
          )
        }
      />

      <label>👨🏻‍🤝‍👨🏻 {selectedFriend.name}'s Expense</label>
      <input type="number" disabled value={paidByFriend} />

      <label>🤑 Who is paying the Bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

export default FormSplitBill;
