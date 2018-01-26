/* eslint-disable no-undef */

import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Home from '../../src/pages/Home'

configure({ adapter: new Adapter() })

describe('Home Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Home />)
  })

  it('should exist', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should have one heading', () => {
    expect(wrapper.find('#heading').type()).toEqual('h2')
  })
})