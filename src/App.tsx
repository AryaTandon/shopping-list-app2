import React, { useState } from 'react';
import './App.css';

let mappedList: any;

function App() {

  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [list, setList] = useState([['']]);
  const [unit, setUnit] = useState("kilo");
  const [error, setError] = useState('');

  function handleChange( event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) {
    console.log(event);
    const {name, value} = event.target
    console.log({name, value});
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
      const addInfo = [item, quantity, unit];
      setList([...list, addInfo]);
    }
  }

  function deleteItem (index: number) {
    let list2 = list;
    list2.splice(index, 1);
    setList([...list2]);
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
        value="purchased" /> 
      </label>
      </p>
      <hr />
    </div>
    : null
    )
  }

  mappedList = list.map(showList);

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
      {mappedList}
    </div>
  )
}

// function renderApp() {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// renderApp()

export default App;
