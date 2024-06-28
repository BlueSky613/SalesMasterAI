import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './login/Login';
import Dashboard from './main/Dashboard';
import Home from './pages/Home';
import ChatNew from './pages/ChatNew';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import Group from './pages/Group';
import Feedback from './pages/Feedback';
import ChatDetail from './pages/ChatDetail';
import Register from './login/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/" element={<Dashboard/>}>
          <Route path='dashboard' element={<Home />} />
          <Route path='chat_new' element = {<ChatNew />} />
          <Route path='settings' element = {<Settings />} />
          <Route path='chat' element={<Chat />} />
          <Route path='group' element={<Group />} />

          <Route path='feedback' element={<Feedback />}/>
          <Route path='chatdetail' element={<ChatDetail />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
