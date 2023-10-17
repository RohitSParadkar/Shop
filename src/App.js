import { ToastContainer } from 'react-toastify';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import AddShop from './components/AddShop';
import EditShop from './components/EditShop';

const App = () => {
  return (
    <>
      <div className="App">

        <ToastContainer />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route exact path='/add' element={<AddShop />} />

          <Route exact path='/edit/:id' element={<EditShop />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
