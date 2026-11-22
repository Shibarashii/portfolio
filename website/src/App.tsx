import { Header } from './components/Header.tsx'
import { About } from './sections/About.tsx'
import { Contact } from './sections/Contact.tsx'
import { Credentials } from './sections/Credentials.tsx'
import { Experience } from './sections/Experience.tsx'
import { Projects } from './sections/Projects.tsx'
import { Skills } from './sections/Skills.tsx'

export function App() {
  return (
    <>
      <Header />
      <main id="main">
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <footer className="band">
        <p className="serif">Seanrei Valdeabella</p>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}
