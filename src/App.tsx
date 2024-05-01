import { Footer } from "./stucture/Footer"
import { Header } from "./stucture/Header"
import { Main } from "./stucture/Main"

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
