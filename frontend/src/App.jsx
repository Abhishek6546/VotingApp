
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Header from './pages/Header'
import Footer from "./components/Footer"
import UserProfile from './pages/UserProfile'
import Candidate from './pages/Candidate'
import NewCandidate from './pages/NewCandidate'
import UpdateCandidate from './pages/UpdateCandidate'
import Election from './pages/Election'
import VoteCount from './pages/VoteCount'

function App() {

  return (  
       <> 
       <Navbar/>
      <Routes>
      <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/create" element={<NewCandidate/>} />
        <Route path="/candidate/:id" element={<UpdateCandidate />} />
        <Route path="/election" element={<Election />} />
        <Route path="/votecount" element={<VoteCount />} />

      </Routes>
      <Footer/>
       </>
  )
}

export default App
