import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import '@babel/polyfill';
import Provider from '../provider';
import {JssProvider} from 'react-jss';
import { MemoryRouter } from 'react-router';

const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

import Home from './home';

describe('Home', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  })

  afterAll(() => {
    mount.cleanUp();
  })


  test('snapshot renders', () => {
    const component = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <MemoryRouter >
            <Home />
          </MemoryRouter>
        </Provider>
      </JssProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders the home view and account actions', () => {
    expect.assertions(6);

    const wrapper = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <MemoryRouter >
            <Home />
          </MemoryRouter>
        </Provider>
      </JssProvider>
    );

    expect(wrapper.find('div.homeView')).toBeTruthy();
    expect(wrapper.find('div.accountActions').length).toBe(1);
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('a').at(0).text()).toBe('Register');
    expect(wrapper.find('a').at(1).text()).toBe('Login');
  });

});
