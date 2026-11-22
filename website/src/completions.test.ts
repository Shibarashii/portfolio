import assert from 'node:assert/strict'
import { test } from 'node:test'
import { listCompletions, parseCompletion } from './completions.ts'

const COURSES = '../../../completions/Course Certificates/'
const SPECIALIZATIONS = '../../../completions/Specialization Certificates/'

test('parses a course', () => {
  assert.deepEqual(parseCompletion(COURSES + '2026-01-31. IBM Developing Back-End Apps with Node.js and Express.pdf', '/a.pdf'), {
    date: '2026-01-31',
    issuer: 'IBM',
    title: 'Developing Back-End Apps with Node.js and Express',
    kind: 'course',
    url: '/a.pdf',
  })
})

test('parses a specialization', () => {
  assert.deepEqual(parseCompletion(SPECIALIZATIONS + '2026-08-08. Google Prompting Essentials.pdf', '/b.pdf'), {
    date: '2026-08-08',
    issuer: 'Google',
    title: 'Prompting Essentials',
    kind: 'specialization',
    url: '/b.pdf',
  })
})

test('rejects a name with only one word after the date', () => {
  assert.equal(parseCompletion(COURSES + '2026-10-02. APIs.pdf', '/c.pdf'), null)
})

test('rejects a bad date', () => {
  assert.equal(parseCompletion(COURSES + '2026-13-01. Meta APIs.pdf', '/d.pdf'), null)
  assert.equal(parseCompletion(COURSES + '2026-02-30. Meta APIs.pdf', '/d.pdf'), null)
  assert.equal(parseCompletion(COURSES + '26-10-02. Meta APIs.pdf', '/d.pdf'), null)
  assert.equal(parseCompletion(COURSES + 'Meta APIs.pdf', '/d.pdf'), null)
})

test('rejects a non-PDF file', () => {
  assert.equal(parseCompletion(COURSES + '2026-10-02. Meta APIs.docx', '/e.docx'), null)
})

test('rejects a file outside the two certificate folders', () => {
  assert.equal(parseCompletion('../../../completions/2026-10-02. Meta APIs.pdf', '/f.pdf'), null)
})

test('lists newest first', () => {
  const list = listCompletions({
    [COURSES + '2025-06-28. Cisco AI Fundamentals.pdf']: '/old.pdf',
    [COURSES + '2026-11-19. Google Technical Support Fundamentals.pdf']: '/new.pdf',
    [SPECIALIZATIONS + '2026-02-23. Google AI Essentials.pdf']: '/mid.pdf',
  })
  assert.deepEqual(list.map((c) => c.url), ['/new.pdf', '/mid.pdf', '/old.pdf'])
})

test('skips a badly named file with a warning', (t) => {
  const warn = t.mock.method(console, 'warn', () => {})
  const list = listCompletions({
    [COURSES + 'scan.pdf']: '/bad.pdf',
    [COURSES + '2026-10-02. Meta APIs.pdf']: '/good.pdf',
  })
  assert.deepEqual(list.map((c) => c.url), ['/good.pdf'])
  assert.equal(warn.mock.callCount(), 1)
  assert.match(String(warn.mock.calls[0].arguments[0]), /scan\.pdf/)
})
