import {useEffect, useState} from 'react'
import Persons from './components/Persons.jsx'
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import personsService from "./services/persons"

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name === newName) !== undefined) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            }
            personsService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
        }

        setNewName('')
        setNewNumber('')
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