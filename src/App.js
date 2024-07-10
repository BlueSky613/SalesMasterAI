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
import Users from './pages/Users';
import Groups from './pages/Groups';
import NewGroup from './pages/NewGroup';
import EditGroup from './pages/EditGroup';
import DetailGroup from './pages/DetailGroup';
import Share from './pages/Share';
import Import from './pages/Import';

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
          <Route path='chat' element={<Chat />} >
          </Route>
          <Route path='users' element={<Users />} />
          <Route path='groups' element={<Groups />}>
          </Route>
          <Route path='groups/new' element={<NewGroup />}/>
          <Route path='groups/edit/:group_id' element={<EditGroup />}>
          </Route>
          <Route path='chat/:product_id' element={<ChatDetail />} >
          </Route>
          <Route path='group' element={<Group />} />
          <Route path='group/:user_id' element={<DetailGroup />} />
          <Route path='share/:uuid' element={<Share />} />
          <Route path='import/:share_link' element={<Import/>}/>

          <Route path='feedback/:product_id' element={<Feedback />}>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
