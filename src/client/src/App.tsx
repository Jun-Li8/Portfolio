import {useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Work from './pages/Work'
import SideBar from './components/SideBar'


function App() {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded ? 'ml-56' : 'ml-16'}`}>
        <div className={"p-6"}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='projects' element={<Project/>}/>
            <Route path='work' element={<Work/>}/>
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
