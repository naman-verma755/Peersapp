import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import JoinCreate from './components/JoinCreate/JoinCreate';
import CodeArea from './components/CodeArea/CodeArea';
import Home from './components/Main/Home';

const App = () => (
   
    <Router>
      <Route path="/" exact component={Home} />
      <Route path='/join' component={JoinCreate} />
    
      <Route path="/codearea" component={CodeArea} />
    </Router>
);

export default App;

