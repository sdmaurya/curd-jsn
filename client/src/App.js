
import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name,setName] = useState("");
  
  const [age,setAge] = useState(0);
  
  const [country,setCountry] = useState("");
  
  const [position,setPosition] = useState("");
  
  const [wage,setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const displayInfo = () => {
    console.log(name + age )
  }

  const addEmployee = () => {

    Axios.post('http://localhost:3001/create',{
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    }).then(() => {
      
      setEmployeeList([
        ...employeeList,
        {
          name:name,
          age:age,
          country:country,
          position:position,
          wage:wage

        }
      ])

    })
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        // setEmployeeList(
      
        // );
        alert('update')
      }
    );
  };

  const DeleteEmp = (id) => {

    Axios.put(`http://localhost:3001/delete/${id}`).then(
      (response) => {
        setEmployeeList(employeeList.filter((val) => {

          return val.id !=id
        })
      
        );
       
      }
    );
        

  }
 


  return (
    <div className="App">
      <div className='info'>
      <label>Name:</label>
      <input
       type='text'
       onChange={(event) => {

        setName(event.target.value);
       }}
       />
      <label>Age:</label>
      <input 
      type='text'
      onChange={(event) => {

        setAge(event.target.value);
       }}
      />
      <label>Country:</label>
      <input 
      type='text'
      onChange={(event) => {

        setCountry(event.target.value);
       }}
      />
      <label>Position:</label>
      <input
       type='text'
       onChange={(event) => {

        setPosition (event.target.value);
       }}
       />
      <label>Wage (year):</label>
      <input 
      type='text'
      onChange={(event) => {

        setWage(event.target.value);
       }}
      
      />
      <button onClick = {addEmployee}>AddEmployee</button>
      </div>
     ---------------------------------------------------------------------------------------------------------
       <div className="employee">
     <button onClick={getEmployees}>ShowEmployee</button>

     {employeeList.map((val, key) => {
         
         return (
      
          <div className="employees">
        <div>
        
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
          </div>
          <div>
          <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>
                <button
                     onClick={() => {
                      DeleteEmp(val.id);
                    }}
                >
                 
                  Delete
                </button>
          </div>
          </div>
   
         );
       
       
       })}
     
        
     </div>
    </div>
  );
}

export default App;
