const { Translate } = require('@google-cloud/translate').v2;
const cheerio = require('cheerio');
require('dotenv').config();


const translateText = async (text, lang) => {
    const translate = new Translate();
    if(!text){
        throw new Error("Text not provided.")
    }
    if(!lang){
        throw new Error("No language provided.");
    }

    try {
        const [translation] = await translate.translate(text, lang);
        return translation;
    } catch (error) {
        throw new Error("Translation failed: " + error.message); 
    }
};

const translateHtmlContent = async (html, lang) => {
    if(!html){
        throw new Error("HTML content missing question or answer.")
    }
     
    try {
        const $ = cheerio.load(html);
        const textNodes = [];

    
        $('*').contents().each((index, node) => {
        if (node.type === 'text' && !$(node).parent().is('script, style')) {
            textNodes.push({
            element: $(node),
            text: $(node).text().trim()
            });
        }
        });

        
        await Promise.all(textNodes.map(async ({ element, text }) => {
            if (text) {
              const translated = await translateText(text, lang);
              element.replaceWith(translated);
            }
          }));
      
          return $.html();
    } catch (error) {
        throw new Error(error.message); 
    }
};

module.exports = {
    translateText,
    translateHtmlContent
};
