// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorage = (
  label, 
  initialValue = '', 
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(label);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    } 
    return initialValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(label, serialize(state));
  }, [state, label, serialize]);

  return [state, setState];
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
