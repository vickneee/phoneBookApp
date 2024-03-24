const PersonForm = ({
                      newName,
                      newNumber,
                      handleNameChange,
                      handleNumberChange,
                      handleSubmit,
                    }) => (
  <form onSubmit={handleSubmit}>
    <div>
      Name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      Number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">Add New</button>
    </div>
  </form>
);

export default PersonForm;