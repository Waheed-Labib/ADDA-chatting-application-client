import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Router/Routes/Routes';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="App">
      <Toaster toastOptions={{ success: { duration: 5000 }, error: { duration: 8000 } }}></Toaster>
      <RouterProvider router={router}></RouterProvider>
    </div >
  );
}

export default App;
