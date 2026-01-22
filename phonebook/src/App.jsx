import {useState} from 'react'
import Persons from './components/Persons.jsx'
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name === newName) !== undefined) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1),
            }

            setPersons(persons.concat(personObject))
        }

        setNewName('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    const filteredPersons = persons.filter(person => person.name.includes(newFilter))

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter
                handleFilterChange={handleFilterChange}
                newFilter={newFilter}
            />

            <h2>add a new</h2>
            <PersonForm
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />

            <h2>Numbers</h2>
            <Persons persons={filteredPersons}/>
        </div>
    )
}

export default App