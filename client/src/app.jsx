import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      renderDropzone: true,
    };
  }

  onDrop = (files) => {
    // window.URL.revokeObjectURL(file.preview); // mem leaks
    const body = new FormData();
    body.append('file', files[0]);
    fetch('http://localhost:3002/upload', {
      method: 'POST',
      body,
    }).then(res => res.json())
      .then((json) => {
        // console.log(json);
        if (json.status === 'OK') {
          this.setState({ renderDropzone: false });
        }
      });
  }

  render() {
    const { renderDropzone } = this.state;
    let view = <div />;
    if (renderDropzone === true) {
      view = (<Dropzone className="dropzone" onDrop={this.onDrop} >
        <span className="center-vertical">Drop me a file dawg</span>
        </Dropzone>);
    }
    return (<div className="app">
      {view}
    </div>);
  }
}

export default App;
