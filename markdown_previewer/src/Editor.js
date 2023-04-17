import { useEffect } from 'react';

function Editor(props) {


  function handleChange(event) {
    props.setState({ input: event.target.value });
  }

  return (
    <div className="container" id="editor-full">
      <div className="header-container">
        <div className='header-left'>
          <i className="fa-brands fa-free-code-camp"></i>
          <header className="header">Editor</header>
        </div>

        <div className='header-right'>
          <i className="fas fa-expand" id="editor-button"></i>
        </div>
      </div>
      <textarea className="area" id="editor" value={props.state.input} onChange={handleChange}></textarea>
    </div>
  );
}

export default Editor;