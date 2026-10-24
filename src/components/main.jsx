import {useState,useEffect} from "react";
export default function Main(){

    const [username,setUsername] = useState('');
    const [searchTerm,setSearchTerm] = useState("octocat");  //default user
    const [userData,setUserData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const handleChange = ((e) => {
        setUsername(e.target.value);
    });
    const handleSearchTerm = ((e)=>{
        setSearchTerm(e.target.value);
    });

    const handleSubmit = ((e)=>{
        e.preventDefault()
        console.log(userData);
    })
    
    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await fetch("https://api.github.com/")
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.message || "Invalid Username. Please try again");
                    userData(null);
                }
                const data = await response.json();
                userData(data);                               //state update kare
            } catch(err){
                console.log("Error Fetching Data:",err)
            } 
        };
        setLoading(true);
        fetchData()
        setLoading(false);
    },[searchTerm])

    if (loading) {
           return <div> Loading... </div>;
        }
        if(error) {
            return <p> Error: {error} </p>
        }
        if(userData){
            return <div>{userData}</div>
        }
        
    return (
        <div>
            <h2>Input Form:</h2>
            <form onSubmit ={handleSubmit}>
                <div className = "form-group">
                    <label>userName : </label>
                    <input 
                    type = "text"
                    value = {username}
                    onChange = {handleChange}/>
                </div>

                <div>
                    <label>searchTerm:</label>
                    <input
                    type = "text"
                    placeholder = "Search"
                    value = {searchTerm}
                    onChange = {handleSearchTerm}/>
                </div>

            </form>
        </div>
    )
}



