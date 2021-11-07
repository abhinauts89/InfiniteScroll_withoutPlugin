import '../App.css';


export default function User(props){

    const {user} = props;

    return (
        <div className="user-container">
            <h3>{user.first_name} {user.last_name}</h3>
            <h3>{user.email}</h3>
            <img src={user.avatar}  alt={"Nothing to display"}/>

        </div>
    )
}