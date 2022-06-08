import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      });
  }, [])


  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    let namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
    setPersons(namesToShow);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!persons.every(person => (person.name !== newName))) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterValue={newFilter} 
        handleFilterChange={handleFilterChange}/> 
      <h2>add a new</h2>
      <PersonForm 
        submitEvent={handleSubmit} 
        nameEvent={handleNameChange} 
        numberEvent={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber} />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}/>
    </div>
  )
}
 
export default App;
