import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login', () => {
  test('should render', () => {
    render(<Login/>)
  })
})