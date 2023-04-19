import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { marked } from 'marked';
import 'highlight.js/styles/monokai.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


function Reviewer(props) {

  useEffect(() => {
    hljs.highlightAll();
  }, [props.input]);

  return (
    <div className="container" id="reviewer-container">
      <div className="header-container">
        <div className="header-left">
          <i className="fa-brands fa-free-code-camp"></i>
          <header className="header">Reviewer</header>
        </div>
        <div className="header-right">
          <i className="fas fa-expand" id="reviewer-button"></i>
        </div>
      </div>
      <div id="preview">{parse(marked.parse(props.input, { breaks: true, langPrefix: "hljs language-javascript" }, hljs.initHighlightingOnLoad()))}</div>
    </div>
  );
}

export default Reviewer;