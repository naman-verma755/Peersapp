import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import CodeArea from './components/CodeArea/CodeArea';
import Home from './components/Home/Home';
import CodeEditor from './components/CodeEditor/CodeEditor';
import UsersGuide from './components/UsersGuide/UsersGuide'
import Login from './components/Login/Login';
import CreateJoin from './components/CreateJoin/CreateJoin';
// import CreateRoom from './components/CreateRoom/CreateRoom'
// import JoinRoom from './components/JoinRoom/JoinRoom';
import Signup from './components/Signup/Signup';

const App = () => (
   
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/coding" component={CodeEditor}/>
      <Route path="/login" component={Login} />
      <Route path="/codearea" component={CodeArea} />
      <Route path="/usersguide" component={UsersGuide}/>
      <Route path="/createjoin" component={CreateJoin}/>
  
      <Route path="/signup" component={Signup}/>
      
    </Router>
);

export default App;

