import React, { useState } from "react";
import { data } from "../../../data"


const UserChallenge = () => {
  const [data1, setData1] = useState(data)
  const [name, setName] = useState("")
  const [nextID, setNextID] = useState(data.length + 1)

  const addUser = (name) => {
    debugger
    if (!name) {
      alert("Please enter name")
      return;
    }
    const newObj = { id: nextID, name: name };
    setData1([...data1, newObj]);
    setNextID(nextID + 1);
    setName("");
  };
  const removeUser = (id) => {
    const updateddata1 = data1.filter((item) => item.id !== id)
    setData1(updateddata1);
  }
  return (
    <div>
      <form className='form'>
        <h4>Add User</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input type='text' className='form-input' id='name' value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
        </div>

        <button type='button' className='btn btn-block' onClick={() => addUser(name)}>
          submit
        </button>
      </form>
      {/* render data1 below */}
      <div className="row form">
        {data1.map((item) => (
          <div className="row" key={item.id}>
            <div className="col-6"><h5>{item.name}</h5></div>
            <div className="col-6"><button type="button" className="btn" style={{ marginLeft: '50px' }} onClick={() => removeUser(item.id)}>X</button></div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserChallenge;
