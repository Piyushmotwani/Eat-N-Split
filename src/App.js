import React, { useState } from "react";
import Button from "./components/Button";
import FriendList from "./components/FriendList";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriendForm() {
    setShowAddFriendForm((showAddFriendForm) => !showAddFriendForm);
    setSelectedFriend(null); // so the selected friend is unselected when the form is opened
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    handleShowAddFriendForm();
  }

  function handleSelection(friend) {
    setSelectedFriend((selectedFriend) =>
      selectedFriend && selectedFriend.id === friend.id ? null : friend
    );
    setShowAddFriendForm(false); // so the form is closed when a friend is selected
  }

  function handleSpiltBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSpiltBill}
        />
      )}
    </div>
  );
}
