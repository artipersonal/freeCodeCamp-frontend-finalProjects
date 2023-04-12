import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

const App = () => {

  const [quote, setQuote] = useState(0);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0f0a03f54dmshc4335d85a0cc2c3p12db2djsn4b26c6a34e59',
      'X-RapidAPI-Host': 'quotes-villa.p.rapidapi.com'
    }
  };

  const getQuote = () => {
    setTimeout(function () {
      console.log("making animation...");
      fetch('https://quotes-villa.p.rapidapi.com/quotes/inspirational', options)
        .then(response => response.json())
        .then(response => {
          let nquote = response[Math.floor(Math.random() * 2999)];
          while (nquote.text.length >= 250) {
            nquote = response[Math.floor(Math.random() * 2999)];
          }
          nquote.text = nquote.text.replace("\“", "");
          nquote.text = nquote.text.replace("\”", "");
          nquote.author = nquote.author.replace(",", "");
          setQuote(nquote);
        })
        .catch(err => console.error(err));
    }, 1500);
  }

  useEffect(() => {
    getQuote();
  }, []);

  const newColor = {
    color1: Math.floor(Math.random() * 255),
    color2: Math.floor(Math.random() * 255),
    color3: Math.floor(Math.random() * 255)
  }
  const styleApp = {
    backgroundColor: `rgb(${newColor.color1}, ${newColor.color2}, ${newColor.color3})`,
    color: `rgb(${newColor.color1}, ${newColor.color2}, ${newColor.color3})`
  };

  const styleButtons = {
    backgroundColor: `rgb(${newColor.color1}, ${newColor.color2}, ${newColor.color3})`,
  };
  return (
    <div className="App" style={styleApp}>
      <div id="container">
        <div id="quote-box">
          <div id="text"><span id="quotes"></span><span id="text-quote">{quote.text}</span></div>
          <div id="author-container"><div id="author">{quote.author}</div></div>
          <div id="buttons-container">
            <div id="social-icons">
              <a id="tweet-quote" href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22The%20most%20common%20way%20people%20give%20up%20their%20power%20is%20by%20thinking%20they%20don%E2%80%99t%20have%20any.%22%20Alice%20Walker" target="_blank" style={styleButtons} className="ref-buttons"><i className="fa-brands fa-twitter"></i></a>
              <a id="tumblr-quote" href="https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Alice%20Walker&content=The%20most%20common%20way%20people%20give%20up%20their%20power%20is%20by%20thinking%20they%20don%E2%80%99t%20have%20any.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button" target="_blank" style={styleButtons} className="ref-buttons"><i className="fa fa-tumblr" aria-hidden="true"></i></a>
            </div>
            <button className="buttons" id="new-quote" style={styleButtons} onClick={() => getQuote()}>New quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
