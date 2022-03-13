import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../src/pages/Home'
import pretty from 'pretty'
import { act } from 'react-dom/test-utils'

describe('quiz', () => {
  let container: HTMLDivElement

  beforeEach(async () => {
    container = await document.createElement('div')
  })

  afterEach(async () => {
    unmountComponentAtNode(await container)
    jest.fn().mockClear()
  })

  it('should render Home component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      container
    )

    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })
})
