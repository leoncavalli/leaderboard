import React, { useState } from "react";
import pace from "./pace.json";
import users from "./users.json";
import { Form } from "react-bootstrap";

pace.forEach((data) => {
  users.forEach((user) => {
    if (user.userid === data.userid) {
      user.avgpace = data.total_time / (data.distance / 1000);
      user.total_time = data.total_time;
      user.distance = data.distance;
    }
  });
});

var sorted_by_avgPace = [...users].sort((a, b) => {
  return a.avgpace - b.avgpace;
});

function App() {
  const [userdata, setData] = useState(sorted_by_avgPace);
  const[active,setActive]=useState(false);


  const handleSelect = (e) => {
    console.log(e.target.value);
    setActive("");
    const grouped = sorted_by_avgPace.filter(function (user) {
      var filter;
      switch (e.target.value) {
        case "1":
          filter = user.age >= 20 && user.age <= 30;
          break;
        case "2":
          filter = user.age >= 30 && user.age <= 40;
          break;
        case "3":
          filter = user.age >= 40 && user.age <= 60;
          break;
        default:
          filter=sorted_by_avgPace;
          break;
      }
      return filter;
    });
    setData(grouped);
  };
  const sortByDistance = () => {
    const sorted = [...userdata].sort((a, b) => {
      return a.distance - b.distance;
    });
    setData(sorted);
  };
  const sortByAvgPace = () => {
    const sorted = [...userdata].sort((a, b) => {
      return a.avgpace - b.avgpace;
    });
    setData(sorted);
  };
  const sortByTotalTime = () => {
    const sorted = [...userdata].sort((a, b) => {
      return a.total_time - b.total_time;
    });
    setData(sorted);
  };

  const changeColor=(e)=>{
      setActive(e.currentTarget.id);
  }
  return (
    <>
      <div className="container">
        <div className="mx-auto w-50 p-2">
          <div className="mb-3">
            <Form.Control
              as="select"
              placeholder="LOLA"
              onChange={handleSelect}
            >
              <option>Default</option>
              <option value="1">20-30 years old</option>
              <option value="2">30-40 years old</option>
              <option value="3">40-60 years old</option>
            </Form.Control>
          </div>
          <div
            className="bg-primary p-3"
            style={{ borderRadius: "5px 5px 0px 0px" }}
          >
            <i
              className="fas fa-trophy fa-4x p-4"
              style={{ color: "#89A0F8" }}
            ></i>
            <div className="float-right p-4">
              <h2 className="lead">LEADER</h2>
              <h3>BOARD</h3>
            </div>
          </div>
          <table
            className="table table-dark"
            style={{ borderRadius: "0px 0px 5px 5px " }}
          >
            <thead>
              <tr className="text-center">
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">
                  Distance  
                  <button style={{border:0,backgroundColor:"transparent",color:"white"}} className={active==="sortbtn1" ? 'text-primary': ''} id="sortbtn1"  onClick={(event)=>{sortByDistance();changeColor(event)}}>
                    <i className="fas fa-sort"></i>
                  </button>{" "}
                </th>
                <th scope="col">
                  Pace  
                  <button style={{border:0,backgroundColor:"transparent",color:"white"}} className={active==="sortbtn2" ? 'bg-primary': ''} id="sortbtn2" onClick={(event)=>{sortByAvgPace();changeColor(event)}}>
                    <i className="fas fa-sort"></i>
                  </button>
                </th>
                <th scope="col">
                  Total Time  
                  <button style={{border:0,backgroundColor:"transparent",color:"white"}} id="sortbtn3"  className={active==="sortbtn3" ? 'bg-primary': ''}  onClick={(event)=>{sortByTotalTime();changeColor(event)}}>
                    <i className="fas fa-sort"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((value) => (
                <tr key={value.userid} className="text-center">
                  <td>{value.username}</td>
                  <td>{value.age}</td>
                  <td>{value.distance}</td>
                  <td>{value.avgpace.toFixed(2)}</td>
                  <td>{value.total_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
