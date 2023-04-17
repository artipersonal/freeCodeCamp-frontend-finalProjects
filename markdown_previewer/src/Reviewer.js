import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { marked } from 'marked';

function Reviewer(props) {

  const changeText = (str) => {
    return str.replaceAll(/<code>(?<code>[\w\s\W]*?)<\/code>/g, (match, code) => {
      return code.replaceAll(/(?<!\'|\")(?<func>function|if|else|return)(?!\'|\")/g, "<span className='blue'>$<func></span>")
        .replaceAll(/(function<\/span> )(?<name>\w*)( ?\((?!\'|\"))/g, "$1<span className='red'>$<name></span>$3")
        .replaceAll(/(?<comm>\/\/[\w\s\W]*?)\n/g, "<span className='green'>$<comm><br/></span>")
        .replaceAll(/(?<comma>&amp;&amp;|\|\||==)/g, "<span className='gold'>$<comma></span>");
    });
  }

  let [resultText, setResultText] = useState("");
  useEffect(() => {
    const html = marked.parse(props.input);
    //setResultText(changeText(props.input));
    setResultText(changeText(html));
  })

  //<div id="reviwer-container">{parse(resultText)}</div>
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
      <div id="preview">{(parse(resultText))}</div>
    </div>
  );
}

export default Reviewer;