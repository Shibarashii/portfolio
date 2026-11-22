import { Header } from './components/Header.tsx'
import { Projects } from './sections/Projects.tsx'
import { Credentials } from './sections/Credentials.tsx'

export function App() {
  return (
    <>
      <Header />
      <main>
        <Projects />
        <Credentials />
      </main>
    </>
  )
}
