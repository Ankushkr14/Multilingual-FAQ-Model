const FAQ = require('../model/modelFAQ');
const {translateText, translateHtmlContent} = require('../config/translate');

const language = ['en', 'hi', 'bn'];
//Creating the translated FAQ and store in database.
const generateTranslation = async (baseQuestion, baseAnswer)=>{
    const translations = new Map();
    translations.set('en', {
        question: baseQuestion,
        answer: baseAnswer
      });
    
      for (const lang of language.filter(l => l !== 'en')) {
        try {
          const [translatedQuestion, translatedAnswer] = await Promise.all([
            translateHtmlContent(baseQuestion, lang),
            translateHtmlContent(baseAnswer, lang)
          ]);
    
          translations.set(lang, {
            question: translatedQuestion,
            answer: translatedAnswer
          });
        } catch (error) {
          translations.set(lang, translations.get('en'));
          throw new Error(error.message)
        }
    }
    return translations;
}

//Get function to fetch all FAQ.
const getFaqs = async (lang)=>{
    const faqs = await FAQ.find();

    return faqs.map((faq) => ({
        _id: faq._id,
        question: faq.translations.get(lang)?.question || faq.question,
        answer: faq.translations.get(lang)?.answer || faq.answer,
    }))
};

//Create function for new FAQ
const createFaq = async (question, answer)=>{
    const translations = await generateTranslation(question, answer);
    
    const newFaq = new FAQ({
      question,
      answer,
      translations
    });

    await newFaq.save();
    return newFaq;
};


//Updating function for existing FAQ
const updateFaq = async ({id, question, answer})=>{
    const faq = await FAQ.findById(id);
    if(!faq)
        throw new Error("FAQ not found.");

    if(question)
        faq.question = question;
    if(answer)
        faq.answer = answer;

    faq.translations = await generateTranslation(faq.question,faq.answer);
    await faq.save();
    return faq;
};


//delete function for existing FAQ
const deleteFaq = async (id)=>{
    const faq = await FAQ.findByIdAndDelete(id);

    if(!faq) 
        throw new Error("FAQ not found.");
    

    return faq;
};

module.exports = { getFaqs, createFaq, updateFaq, deleteFaq };
