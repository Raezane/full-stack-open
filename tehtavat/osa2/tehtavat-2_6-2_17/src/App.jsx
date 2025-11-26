import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Person = (props) => 
  <li>
    {props.name + ' '} 
    {props.number + ' '}
    <button onClick={() => props.removal(props.name)}>delete</button>
  </li>

const PersonForm = (props) => 
  <form onSubmit={props.handlePersonAdding}>
    <div>
      name: 
      <input 
      onChange={(event) => props.handleInput(event, props.setNewName)}
      value={props.newName}/>
    </div>
    <div>
      number: 
      <input 
      type='tel'
      onChange={(event) => props.handleInput(event, props.setNewNumber)}
      value={props.newNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Filter = (props) => 
  <div>
    filter shown with 
    <input 
    onChange={(event) => {
      props.handleInput(event, props.setFiltered)
      props.filterPersons(event.target.value)
    }}/>
  </div>

const App = () => {
  const [persons, setPersons] = useState([
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getPersons()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])


  const checkIfPersonExists = (newName) => {
    for (let person of persons) {
      if (person.name == newName) return person
    }
    return false
  }  

  const handlePersonAdding = (event) => {
    event.preventDefault()

    if (newName == '') {
      alert("Can't add empty field")
      emptyInputFields()
      return
    }

    let existingPerson = checkIfPersonExists(newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumPerson = {...existingPerson, number: newNumber}

        personService
          .updateNumber(existingPerson.id, changedNumPerson)
            .then(personService.getPersons)
            .then(personsData => {
              setPersons(personsData)
              messageHandler(existingPerson.id, 'was succesfully updated!')
            })
            .catch(error => {
              messageHandler(existingPerson.id, 'has already been removed from the server')
            })
      }
    } else {

      const personObject = {
        name: newName,
        number: newNumber,
        id: newName
      }

      personService
        .addPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          messageHandler(returnedPerson.name, 'was succesfully added!')
        })
      }

    emptyInputFields()
      
  }

  const emptyInputFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const messageHandler = (name, restOfMessage) => {
    setMessage(`${name} ${restOfMessage}`)
    setTimeout(() => {
      setMessage('')
    }, 3000);
  }

  const handlePersonRemoval = (name) => {
    personService
      .deletePerson(name)
        .then(personService.getPersons)
          .then(personsData => {
            if (window.confirm(`Delete ${name} ?`)) {
              setPersons(personsData)
              messageHandler(name, 'was succesfully removed!')
            }
          })
  }

  const filterPersons = (inputvalue) => {

    if (inputvalue.length == 0) {
      setShowAll(true)
      return
      
    } else {
      let filteredList = persons.filter(person => 
      person.name.toLowerCase().includes(inputvalue.toLowerCase()))

    setFiltered(filteredList)
    setShowAll(false)
    }
  }

  const personsToShow = showAll ? persons : filtered
  
  const handleInput = (event, stateFunc) => {
    stateFunc(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
        <Filter 
          handleInput={handleInput} 
          setFiltered={setFiltered} 
          filterPersons={filterPersons}
        />
      <h2>Add a new</h2>
        <PersonForm 
          handlePersonAdding={handlePersonAdding}
          newName={newName}
          newNumber={newNumber}
          handleInput={handleInput}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
        />
      <h2>Numbers</h2>
        {personsToShow.map(person => 
          <Person key={person.name} name={person.name} number={person.number} removal={handlePersonRemoval}/>
      )}
    </div>
  )

}

export default App