import React, { Component } from 'react';
import { render } from 'react-dom';

import Dialog from './Dialog'

import 'bulma'
import './style.css'

class App extends Component {
  render() {
    return (
      <div>
        <div style={{
          height : '240px',
          width: '240px',
          background: 'red',
          overflow: 'hidden',
          transform: 'scale(1)',
        }}>
          이 컴포넌트 아래에 Dialog가 위치합니다.
          <Dialog
            header={<div>반가워요!</div>}
            body={<div style={{width:'300px', height:'50px'}}>리액트 부트캠프에 오신 것을 환영합니다.</div>}
            footer={<button class="button">확인</button>}
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
