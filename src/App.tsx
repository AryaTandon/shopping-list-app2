import React, { useState } from 'react';
import './App.css';

function App() {

  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [list, setList]: any = useState([[]]);
  const [unit, setUnit] = useState("kilo");
  const [error, setError] = useState('');
  const [itemsLeft, setItemsLeft] = useState(0);
  const purchased = false;

  function handleChange( event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) {
    const {name, value} = event.target
    name === "Item" ? setItem(value)
    : name === "Quantity" ? setQuantity(value)
    : setUnit(value)
  }

  function addItem () {
    if (parseInt(quantity) > 100) {
      setError("Quantity can't be greater than 100!");
    }
    else {
      setError("");
      const addInfo = [item, quantity, unit, purchased];
      setList([...list, addInfo]);
      setItemsLeft(itemsLeft + 1);
    }
  }

  function deleteItem (index: number) {
    let list2 = list;
    list2.splice(index, 1);
    setList([...list2]);
    setItemsLeft(itemsLeft - 1);
  }

  function itemsLeftToPurchase (event: any, index: number) {
    const list2 = list;
    list2[index][3] = !(list2[index][3]);
    setList([...list2]);
    if (event.target.checked) {
      setItemsLeft(itemsLeft - 1);
    } else {
     setItemsLeft(itemsLeft + 1)
    }
  }

  function showList ( [ item, quantity, unit ]: string[], index: number ) {
    
    return ( 
    (item && quantity && unit) ? 
    <div>
      <p>{item}</p>
      <p>{quantity}</p>
      <p>{unit}</p>
      <button onClick = {() => deleteItem(index)}> Delete item </button>
      <p>
      <label>
        Purchased?
        <input 
        type="checkbox" 
        value="purchased"
        onClick={(event) => itemsLeftToPurchase(event, index)} /> 
      </label>
      </p>
      <hr />
    </div>
    : null
    )
  }

  let mappedList = list.map(showList);
  const listNotPurchased = list.filter(([ , , , purchased]: [null, null, null, boolean]) => {
    return (purchased === false) 
  } )
  let mappedListNotPurchased = listNotPurchased.map(showList);

  let successMessage = ""
  if (itemsLeft === 0 && list.length > 1) {
    successMessage = "Congrats, you have purchased all your items!"
  } else {
    successMessage = ""
  }

  return (
    <div>
      <form>
        <label>
          Item:
          <input
            name="Item"
            type="string"
            onChange={handleChange} />
        </label>
        <br />
        <label>
          Quantity:
          <input
            name="Quantity"
            type="number"
            onChange={handleChange} />
        </label>
        <br />
        <p>{error}</p>
        <label>
          Pick a unit:
            <select name="Dropdown" onChange={handleChange}>
                <option value="kilo" selected>Kilograms</option>
                <option value="litres" >Litres</option>
            </select>
        </label>
      </form>
      <button onClick = {() => addItem()}> Add item </button>
      <p>The number of items left to purchase is: {itemsLeft}</p>
      {successMessage}
      {mappedList}
      <hr />
      <hr />
      <p>List of items not purchased:</p>
      <br />
      {mappedListNotPurchased}
    </div>
  )
}

// function renderApp() {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// renderApp()

export default App;
