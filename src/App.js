import "./App.css";
import { useEffect } from "react";
import createDataInFirestore from "./utils/dataCreate";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAndStoreInRedux } from './reducers/dataReducer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, NotFound404 } from "./pages/index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    createDataInFirestore();
  }, []); // runs only once

  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchDataAndStoreInRedux());
  }, [dispatch]);

  useEffect(() => {
    console.log('Data from Redux:', data);
  }, [data]);

  return (
    <div className="App">
      <Router>
        <Header data={data} />
        <Routes>
          {/* Home Page Routes  */}
          <Route exact path="/" element={<Home />} />
          {/* 404  Page   */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer data={data} />
      </Router>

    </div>
  );
}

export default App;
