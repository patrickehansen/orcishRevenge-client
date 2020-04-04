import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import '@babel/polyfill';
import Provider from '../provider';
import { createMemoryHistory } from "history";
import {JssProvider} from 'react-jss';
import { MemoryRouter, Route } from 'react-router';

const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

import App from './App';
import { ClickAwayListener } from '@material-ui/core';

describe('App', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  })

  afterAll(() => {
    mount.cleanUp();
  })


  test('snapshot renders', () => {
    const component = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <App />
        </Provider>
      </JssProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders the inner app and home view', () => {
    expect.assertions(2);

    const wrapper = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <App />
        </Provider>
      </JssProvider>
    );

    expect(wrapper.find('div.App')).toBeTruthy();
    expect(wrapper.find('div.homeView').length).toEqual(1);
  });

  
  test('links to register page', () => {
    const component = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
            <App />
          </MemoryRouter>
        </Provider>
      </JssProvider>
    );

    component.find('a').at(0).simulate('click', { button: 0 });

    expect(component.find('.registerPage').length).toBe(1);

    mount.cleanUp();
  });

  test('links to login page', () => {
    const history = createMemoryHistory();
    const component = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <MemoryRouter initialEntries={[ '/' ]}  initialIndex={0} history={history}>
            <App />
          </MemoryRouter>
        </Provider>
      </JssProvider>
    );

    const loc = history.location.pathname;

    //expect(component.find('.registerPage').length).toBe(1);
    expect(component.find('div.homeView').length).toBe(1);
  });
});
