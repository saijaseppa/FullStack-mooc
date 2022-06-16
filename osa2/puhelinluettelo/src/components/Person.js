
const Person = ({ person, deleteClick }) => {

    return (
        <>
        <div>{person.name} {person.number} <button onClick={deleteClick}>delete</button>
        </div>
        
        </>
    )
}

export default Person;
