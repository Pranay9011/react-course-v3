import React, { useState, useReducer } from "react";
import { data } from "../../../data"

const defaultState = {
  people: data,
  isLoading: false
};

const UserChallenge = () => {
  // const [data1, setData1] = useState(data)
  const [name, setName] = useState("")
  const [nextID, setNextID] = useState(data.length + 1)
  const CLEAR_LIST = 'CLEAR_LIST'
  const RESET_LIST = 'RESET_LIST'
  const REMOVE_USER = 'REMOVE_USER'
  const ADD_USER = 'ADD_USER'


  const reducer = (state, action) => {
    switch (action.type) {
      case CLEAR_LIST:
        return { ...state, people: [] }
        break;
      case RESET_LIST:
        return { ...state, people: data }
        break;
      case REMOVE_USER:
        const newPeople = state.people.filter((person) => person.id !== action.payload.id)
        return { ...state, people: newPeople }
        break;
      case ADD_USER:
        return { ...state, people: [...state.people, action.payload.newObj] }
        break;
      default:
        throw new Error(`No matching "${action.type}" - action type`);
        break;
    }
  }

  const resetList = () => {
    dispatch({ type: RESET_LIST })
  }

  const clearList = () => {
    dispatch({ type: CLEAR_LIST })
  }
  const addUser = (name) => {
    debugger
    if (!name) {
      alert("Please enter name")
      return;
    }
    const newObj = { id: nextID, name: name };
    dispatch({ type: ADD_USER, payload: { newObj } })
    setNextID(nextID + 1);
    setName("");
  };
  const removeUser = (id) => {
    dispatch({ type: REMOVE_USER, payload: { id } })
  }

  const [state, dispatch] = useReducer(reducer, defaultState)
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
        {state.people.map((item) => (
          <div className="row" key={item.id}>
            <div className="col-6"><h5>{item.name}</h5></div>
            <div className="col-3"><button type="button" className="btn" style={{ marginLeft: '50px' }} onClick={() => removeUser(item.id)}>X</button></div>
            <hr />
          </div>
        ))}
        {state.people?.length < 1 ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><button className='btn' style={{ marginTop: '2rem' }} onClick={resetList}>reset items
        </button></div> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><button className='btn' style={{ marginTop: '2rem' }} onClick={clearList}>clear items
        </button></div>}
      </div>
    </div>
  );
};
export default UserChallenge;
