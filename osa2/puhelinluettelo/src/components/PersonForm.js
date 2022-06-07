

const PersonForm = ({ submitEvent, nameEvent, numberEvent, nameValue, numberValue }) => {
    
    return (
        <form onSubmit={submitEvent}>
        <div>
          name: <input value={nameValue} onChange={nameEvent}/>
        </div>
        <div>
          number: <input value={numberValue} onChange={numberEvent} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}


export default PersonForm;