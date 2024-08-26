
import {Routes,Route} from 'react-router-dom'; 
import './App.css';
import CRUD from './Crud';
import SideBar from './sideBar';
import AddEmployee from './addEmployee';
import Home from './home';
import QuickAdd from './QuickAdd';
function App() {
  return (
    <div className="App">
      {/* <NavBar/> */}
      <SideBar/>
      <div>
      <Routes> 
      <Route path ={"/"} element={<Home/>} />      
      <Route path={"/addemp"}  element={<AddEmployee/>} />
      <Route path={"/emplist"}  element={<CRUD/>} />
      <Route path={"/quickadd"}  element={<QuickAdd/>} />
    </Routes>
      </div>
    </div>
  );
}

export default App;
