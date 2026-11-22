import cv from '../../../curriculum_vitae/src/CurriculumVitae.pdf?url'

export function Header() {
  return (
    <header>
      <h1>Seanrei Valdeabella</h1>
      <p>TODO: job title</p>
      <nav aria-label="Profiles and CV">
        <ul>
          <li><a href="https://github.com/Shibarashii">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/seanrei-valdeabella">LinkedIn</a></li>
          <li><a href={cv}>CV</a></li>
        </ul>
      </nav>
    </header>
  )
}
