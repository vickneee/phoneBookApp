import {useState, useEffect} from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from "./services/personServices.jsx";
import Notification from "./components/Notifications.jsx";

// Frontend Deployment to Render is Successful Exercise 3.11

// Modify the application such that the initial state of the data
// is fetched from the server using the axios-library.
// Complete the fetching with an Effect hook.

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name && person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

// Handle the submission of new names and numbers
  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    const newPerson = {
      id: existingPerson.id,
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("New PERSON!", newPerson);
        console.log("EXISTING PERSON!", existingPerson);
        console.log("EXISTING PERSON ID!", existingPerson.id);
        console.log("NEW PERSON ID!", newPerson.id);
        console.log("NEW PERSON NAME!", newPerson.name)
        console.log("NEW PERSON NUMBER!", newPerson.number);
        personService.update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(persons.map((person) => person.id !== existingPerson.id ? person : updatedPerson));
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`Updated number of ${newName}`);
          })
          .catch((error) => {
            console.log("This is ERROR!", error);
            setErrorMessage(`An error occurred ${error.message}`);
          });
      }
    } else {
      personService.create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`Added ${newName}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Be patient! Connecting to MongoDB could take a few moments.</p>
      <Notification message={notificationMessage} type="success"/>
      <Notification message={errorMessage} type="error"/>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      <h2>Add a new Name and Number</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
