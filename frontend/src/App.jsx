import Topbar from './components/Dashboard/Topbar';
import Sidebar from './components/Dashboard/Sidebar';
import Home from './components/Dashboard/Home';
import Rightbar from './components/Dashboard/RIghtbar';
import Addpost from './components/Dashboard/Addpost';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landingpage/Landing';
import Signup from './components/Landingpage/Signup';
import Login from './components/Landingpage/Login';
import Vroom from './components/Dashboard/Vrooms';

function Display() {
    const [clicked, setClicked] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const handleClick = (index) => {
    setClicked({
      ...Object.fromEntries(Object.keys(clicked).map((key) => [key, false])), 
      [index]: true,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar clicked={clicked} handleClick={handleClick} />
        {clicked[0] && <Home />}
        {clicked[3] && <Addpost />}
        {clicked[1] && <Vroom />}
         <Rightbar />
      </div>
    </div>
  );
}

export default function App(){
  return(
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/Login' element={<Login/>}/>
       <Route path='/dashboard' element={<Display/>}/>
    </Routes>
  )
}
