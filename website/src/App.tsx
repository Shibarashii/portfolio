import { Header } from './components/Header.tsx'
import { About } from './sections/About.tsx'
import { Contact } from './sections/Contact.tsx'
import { Credentials } from './sections/Credentials.tsx'
import { Experience } from './sections/Experience.tsx'
import { Projects } from './sections/Projects.tsx'

export function App() {
  return (
    <>
      <Header />
      <main id="main">
        <About />
        <Projects />
        <Experience />
        <Credentials />
        <Contact />
      </main>
    </>
  )
}
