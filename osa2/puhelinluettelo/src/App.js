import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import service from './services/persons'
import ErrorNotification from './components/ErrorNotification'

const App = () => {

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, [])


  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
    let namesToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));
    setPersons(namesToShow);

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!persons.every(person => (person.name !== newName) && newNumber !== person.number)) {
      console.log('number change??');
      const answer = window.confirm(`Person ${newName} is already added to phonebook, replace the old number with a new one?`)
      if (answer) {
        const personModify = persons.filter(person => person.name === newName)
        console.log(personModify[0].id);

        const newObject = {
          name: personModify[0].name,
          number: newNumber
        }
        service
          .update(personModify[0].id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personModify[0].id ? person : returnedPerson))
            setMessage(`Modified ${returnedPerson.name}'s number!`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('');
            setNewNumber('');
          })
          .catch(err => {
            console.log("Updating went wrong..")
            setErrorMessage(`Information of ${personModify[0].name} has already been removed from server. `)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('');
            setNewNumber('');
          })
      }

    }
    else if (!persons.every(person => (person.name !== newName))) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    }
    else if (newName === "") {
      alert(`Empty name is not ok!!`);
      setNewName('');
      setNewNumber('');
    }

    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      service
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null)
          }, 5000);
          setNewName('');
          setNewNumber('');
        })

    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }
  const handleDeleteClick = (e, personDelete) => {
    e.preventDefault();
    console.log("delete clicked");
    const answer = window.confirm(`Delete ${personDelete.name}?`)

    if (answer) {
      service
        .deleteUser(personDelete.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== personDelete.id));
          setMessage(`Deleted ${personDelete.name} successfully!`);
          setTimeout(() => {
            setMessage(null)
          }, 5000)})


        .catch(err => {
          alert("Deleting user didn't succeed.")
        })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter
        filterValue={newFilter}
        handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        submitEvent={handleSubmit}
        nameEvent={handleNameChange}
        numberEvent={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber} />
      <h2>Numbers</h2>

      <Persons persons={persons} deleteClick={handleDeleteClick} />

    </div>
  )
}

export default App;
