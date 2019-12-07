import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import '@babel/polyfill';
import Provider from '../../provider';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {JssProvider} from 'react-jss';

const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;


configure({ adapter: new Adapter() });

import TextField, {FilledTextField, OutlinedTextField, MultiTextField} from './textField';

const props = {
  label: 'test'
}

describe('Simplified TextField', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  })

  afterAll(() => {
    mount.cleanUp();
  })

  it('Matches snapshot', () => {
    const component = mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <TextField {...props}/>
        </Provider>
      </JssProvider>
    );

    expect(component).toMatchSnapshot();
  })
})

describe('Simplified FilledTextField', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  })

  afterAll(() => {
    mount.cleanUp();
  })

  it('Matches snapshot', () => {
    const component =mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <FilledTextField {...props}/>
        </Provider>
      </JssProvider>
    );

    expect(component).toMatchSnapshot();
  })
})

describe('Simplified OutlinedTextField', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  })

  afterAll(() => {
    mount.cleanUp();
  })

  
  it('Matches snapshot', () => {
    const component =mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <OutlinedTextField {...props}/>
        </Provider>
      </JssProvider>
    );

    expect(component).toMatchSnapshot();
  })
})

describe('Simplified MultiTextField', () => {
  let mount;

  beforeAll(() => {
    mount = createMount();
  })

  afterAll(() => {
    mount.cleanUp();
  })

  it('Matches snapshot', () => {
    const component =mount(
      <JssProvider generateClassName={generateClassName}>
        <Provider>
          <MultiTextField {...props}/>
        </Provider>
      </JssProvider>
    );

    expect(component).toMatchSnapshot();
  })
})