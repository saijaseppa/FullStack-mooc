import Person from './Person'

const Persons = ({ persons, deleteClick }) => {

    return (
        <div>
            {persons.map(person =>
                <Person key={person.name} person={person} deleteClick={(e) => deleteClick(e, person)}/>
            )}
        </div>
    )

}

export default Persons;


