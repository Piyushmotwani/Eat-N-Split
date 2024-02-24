import React from "react";
import { useState } from "react";
import Button from "./Button";

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmitAdd(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`, // 👈 Add a unique query string to the image URL
      balance: 0,
    };
    // console.log(newFriend);
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");

    // 👇 Add the new friend to the list of friends
    // setFriends([...friends, newFriend]);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmitAdd}>
      <label>👨🏻‍🤝‍👨🏻 Friend's Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🏖 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

export default FormAddFriend;
