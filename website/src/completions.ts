export type Completion = {
  date: string
  issuer: string
  title: string
  kind: 'course' | 'specialization'
  url: string
  preview?: string
}

// .../Course Certificates/YYYY-MM-DD. Issuer Title.pdf
const NAME = /\/(Course|Specialization) Certificates\/(\d{4}-\d{2}-\d{2})\. (\S+) (\S.*)\.pdf$/

function isRealDate(date: string) {
  const d = new Date(date)
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(date)
}

export function parseCompletion(path: string, url: string): Completion | null {
  const match = NAME.exec(path)
  if (!match) return null
  const [, folder, date, issuer, title] = match
  if (!isRealDate(date)) return null
  return { date, issuer, title, kind: folder === 'Course' ? 'course' : 'specialization', url }
}

/** Newest first. Badly named files are skipped with a warning. Both maps are keyed by file path. */
export function listCompletions(files: Record<string, string>, previews: Record<string, string> = {}): Completion[] {
  return Object.entries(files)
    .flatMap(([path, url]) => {
      const completion = parseCompletion(path, url)
      if (!completion) console.warn(`Skipped badly named certificate: ${path}`)
      return completion ? { ...completion, preview: previews[path] } : []
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}
