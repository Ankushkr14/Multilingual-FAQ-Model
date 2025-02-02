
const validateFAQInput = (question, answer) =>{
    if(!question || !answer){
        return {
            success: false,
            message: "Atleast provide one question or answer."
        }
    }
    
    return {
        success: true,
        error: null,
    }
}

module.exports = validateFAQInput;