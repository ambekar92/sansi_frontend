// import React from 'react';  
// import './App.css';  
// import Layout  from './Layout/Layout'   
// function App() {  
//   return (  
//      <div className="App">  
//       <Layout/>   
//      </div>  
//   );  
// }  
  
// export default App;  


import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouterNav from './Router';

function App() {
  return (
    <BrowserRouter>
      <RouterNav/>
    </BrowserRouter>
  );
}
export default App;
