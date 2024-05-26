import "./App.css";
import { useEffect } from "react";
import createDataInFirestore from "./utils/dataCreate";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAndStoreInRedux } from './reducers/dataReducer';

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
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nulla
          perspiciatis autem eveniet dignissimos incidunt temporibus saepe
          dolores sapiente porro. Voluptatem eligendi quidem excepturi deserunt
          molestiae a veniam unde neque.
        </p>
      </div>
    </div>
  );
}

export default App;
