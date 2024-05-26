import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAndStoreInRedux } from './reducers/dataReducer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, NotFound404 } from "./pages/index";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchDataAndStoreInRedux());
  }, [dispatch]);

  useEffect(() => {
    console.log('Data from Redux:', data);
  }, [data]);

  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Header data={data} />
        <Routes>
          {/* Home Page Route */}
          <Route exact path="/" element={<Home />} />
          {/* 404 Page */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer data={data} />
      </Router>
    </div>
  );
}

export default App;
