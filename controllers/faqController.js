const faqService = require('../service/faqService');
const mongoose = require('mongoose');
const validateFAQInput = require('../Middleware/ValidateFAQInput');
const sanitizeHtml = require('sanitize-html');

const handleErrorResponse = (res, err)=>{
    if(err.name === 'ValidationError'){
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }

    if(err.name === 'CastError'){
        return res.status(400).json({
            success: false,
            message: "Invalid FAQ ID provided (castError)."
        })
    }
    if(err.message){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    return res.status(500).json({
        success: false,
        message: "An unexpected error occured. Please try again.",
    })
}


const getFaqs = async (req,res) => {
    const lang = req.query.lang || "en";
    try{
        const faqs = await faqService.getFaqs(lang);
        if(!faqs || faqs.length === 0){
            return res.status(404).json({
                success: false,
                message: "No FAQs found."
            })
        }
        res.status(200).json({
            success: true,
            message: "FAQs fetched successfully.",
            faq: faqs
        });
    }catch(err){
        handleErrorResponse(res,err);
    }
};

const createFaq = async (req,res) =>{
    const { question, answer } = req.body;
    const validation = validateFAQInput(question, answer);
    if(validation.error){
        return res.status(400).json({
            success: false,
            message: validation.error,
        })
    }
    try{
        const sanitizedQuestion = sanitizeHtml(question, {
            allowedTags: ['b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'p', 'strong', 'em','span'],
            allowedAttributes: {
                'a': ['href'],
            }
        });
        const sanitizedAnswer = sanitizeHtml(answer, {
            allowedTags: ['b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'p', 'strong', 'em','span'],
            allowedAttributes: {
                'a': ['href'],
            }
        });
        const createdFAQ = await faqService.createFaq(sanitizedQuestion, sanitizedAnswer,
        );
        res.status(201).json({
            success: true,
            message: "FAQs created successfully.",
            faq: createdFAQ
        });
    }catch(err){
        handleErrorResponse(res,err);
    }
};

const updateFaq = async (req, res) =>{
    const { id } = req.params;
    const { question, answer } = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success: false,
            message: "FAQ ID is Invalid."
        });
    }
    const validation = validateFAQInput(question,answer);
    if(validation.error){
        return res.status(400).json({
            success: false,
            message: validation.error,
        })
    }
    try{
        const sanitizedQuestion = sanitizeHtml(question, {
            allowedTags: ['b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'p', 'strong', 'em','span'],
            allowedAttributes: {
                'a': ['href'],
            }
        });
        const sanitizedAnswer = sanitizeHtml(answer, {
            allowedTags: ['b', 'i', 'u', 'a', 'ul', 'ol', 'li', 'p', 'strong', 'em','span'],
            allowedAttributes: {
                'a': ['href'],
            }
        });
        const updatedFAQ = await faqService.updateFaq({
            id: id,
            question: sanitizedQuestion,
            answer: sanitizedAnswer,
        });
        res.status(200).json({
            success: true,
            message: "FAQs updated successfully.",
            faq: updatedFAQ,
        });
    }catch(err){
        handleErrorResponse(res,err);
    }
};

const deleteFaq = async (req, res) =>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(req.params)){
        return res.status(400).json({
            success: false,
            message: "Invalid FAQ ID format."
        })
    };
    try{
        const deletedFAQ = await faqService.deleteFaq(id);
        res.status(200).json({
            success: true,
            message: "FAQs deleted successfully.",
            faq: deleteFaq,
        })
    }catch(err){
        handleErrorResponse(res, err);
    }
}

module.exports = { getFaqs, createFaq, updateFaq, deleteFaq};
