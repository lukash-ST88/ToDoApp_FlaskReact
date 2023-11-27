import './App.css';
import Footer from './components/Footer/Footer';
import Tasks from './components/Tasks/Tasks';
import Top from './components/Top/Top';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='component color-theme mx-20 my-0'>
       <div className="container py-5 px-5">
        <Top/>
      </div>
      <div className="container py-5 px-5">
        <Tasks/>
      </div>
      <div className="container px-5 mx-auto xl:px-5 py-5 lg:py-8 mt-10 border-t border-gray-100 dark:border-gray-800">
        <Footer/>
      </div>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </div>
  );
}

export default App;
