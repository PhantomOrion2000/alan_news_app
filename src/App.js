import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '39e3d4714999d70dd96676fd34226a222e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

  const [ newsArticles, setNewsAtrticles ] = useState([]);
  const [ activeArticle, setActiveArticle ] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
     alanBtn({
       key: alanKey,
       onCommand: ({ command, articles, number }) =>{
         if(command === 'newHeadlines' ) {
           setNewsAtrticles(articles);
           setActiveArticle(-1);
         }else if(command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1 );
         }else if(command === 'open') {
           const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
           const article = articles[parsedNumber - 1];

           if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }  
         }
       }
     })
  }, [])

  return (
    <div>
      <div className= {classes.logoContainer} >
          {newsArticles.length ? (
            <div className={classes.infoContainer}>
              <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
              <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
            </div>
          ) : null}
          <img src="https://www.conversationdesigninstitute.com/assets/images/academy/POP/cover-card-EXT-Alan@2x.png" alt="alan logo" className={classes.alanLogo} />
      </div>
      <NewsCards articles={newsArticles} activeArticle= {activeArticle} />
    </div>
  );
}

export default App;
