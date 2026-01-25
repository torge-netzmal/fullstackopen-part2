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
        const personObject = {
            name: newName,
            number: newNumber,
        }

        const existingPerson = persons.find(person => person.name === newName)

        if (existingPerson !== undefined) {
            if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService
                    .update(existingPerson.id, personObject)
                    .then((returnedPerson) => {
                        setPersons(persons.map((person) => person.id === returnedPerson.id ? returnedPerson : person))
                    })
            }
        } else {
            personsService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
        }

        setNewName('')
        setNewNumber('')
    }

    const removePerson = (id) => {
        const targetPerson = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${targetPerson.name}?`)) {
            personsService.remove(id).then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                }
            ).catch(() => {
                    alert(`${targetPerson.name} does not exist`)
                    setPersons(persons.filter(person => person.id !== id))
                }
            )
        }

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
            <Persons persons={filteredPersons} removePerson={removePerson}/>
        </div>
    )
}

export default App