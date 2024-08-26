import React, { useState,useEffect } from "react";
import "./home.css";
import axios from "axios";
import "./loader.css";
import ContextEg from "./useContextEG";
import {Chart} from "react-google-charts";
import ThemeContext from "./ThemeContext";
const employeeImage = "./images/employee.png";
let initialTheme = {
  color: 'white',
  backgroundColor: 'green'
}
const Home = () => {
  const [theme, setTheme] = useState(initialTheme)
  const [empCount,setEmpCount]=useState("");
  const [internCount,setInternCount]=useState("");
  const [juniorCount,setJuniorCount]=useState("");
  const [seniorCount,setSeniorCount]=useState("");
useEffect(() => {
  getTotalEmpCount();
  getInternCount();
  getJuniorCount();
  getSeniorCount();
}, []);
const getTotalEmpCount = () => {
  axios
    .get("https://localhost:7106/api/Employee/total")
    .then((result) => {
      setEmpCount(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getInternCount = async () => {
  try {
    const position = 'intern';
    const response = await axios.get(`https://localhost:7106/api/Employee/position/${position}`);
    setInternCount(response.data);
  } catch (error) {
    console.log(error);
  }
};
const getJuniorCount = () => {
  let position='junior';
  axios
    .get(`https://localhost:7106/api/Employee/position/${position}`)
    .then((result) => {
      setJuniorCount(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getSeniorCount = () => {
  let position='senior';
  axios
    .get(`https://localhost:7106/api/Employee/position/${position}`)
    .then((result) => {
      setSeniorCount(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const Countdata = [
  ["Task", "Hours per Day"],
  ["Interns", internCount],
  ["Juniors", juniorCount],
  ["Seniors", seniorCount]
];
  return (
    <>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="responsive.css" />
      <div class="main-container">
        <div class="main">
          <div class="box-container">
            <div class="box box1">
              <div class="text">
                <h2 class="topic-heading">{empCount}</h2>
                <h2 class="topic">Total Employees</h2>
              </div>
              <img src={employeeImage} alt="Views" />
            </div>
            {/* <ThemeContext.Provider value={{ theme, setTheme }}>
            <ContextEg/>
            </ThemeContext.Provider> */}
            <div class="box box2">
              <div class="text">
                <h2 class="topic-heading">{internCount}</h2>
                <h2 class="topic">Total Interns</h2>
              </div>
              <img
                src={employeeImage}
                alt="likes"
              />
            </div>
            <div class="box box3">
              <div class="text">
                <h2 class="topic-heading">{juniorCount}</h2>
                <h2 class="topic">Total Juniors</h2>
              </div>
              <img
                src={employeeImage}
                alt="comments"
              />
            </div>
            
            <div class="box box4">
              <div class="text">
                <h2 class="topic-heading">{seniorCount}</h2>
                <h2 class="topic">Total Seniors</h2>
              </div>
              <img
                src={employeeImage}
                alt="published"
              />
            </div>
            <Chart
              chartType="PieChart"
              data={Countdata}
              width={"100%"}
              height={"500px"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
