import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Router/Routes/Routes';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { StorageContext } from './contexts/StorageProvider';


function App() {

  return (
    <div className="App">
      <Toaster toastOptions={{ success: { duration: 5000 }, error: { duration: 8000 } }}></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </div >
  );
}

export default App;
