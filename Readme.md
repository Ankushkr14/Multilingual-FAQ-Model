
# Multilingual FAQ API

A RESTful API for managing multilingual Frequently Asked Questions (FAQs) with automatic translation support. Built with Node.js, Express, and MongoDB. Supports English, Hindi, and Bengali (we can add as per our requirement).


## Features

- **CRUD Operations**: Create, Read, Update, and Delete FAQs

- **Multi-language Support**: Automatic translation to English (en), Hindi (hi), and Bengali (bn)

- **HTML Sanitization**: Protects against XSS attacks

- **Input Validation**: Ensures data integrity

- **Google Cloud Integration**: Powered by Google Translate API

- **CORS Support**: Ready for cross-origin requests


## Pre-Requisites

- Node.js 

- MongoDB Atlas account or local MongoDB instance

- Google Cloud account with Translation API enabled

- Basic command line knowledge


## Installation
 
#### 1. Clone Repository
```bash
  git clone https://github.com/yourusername/multilingual-faq-api.git
cd multilingual-faq-api
```
#### 2. Install Dependencies
```bash
  git clone https://github.com/yourusername/multilingual-faq-api.git
cd multilingual-faq-api
```
#### 3. Environment Setup
```bash
  git clone https://github.com/yourusername/multilingual-faq-api.git
cd multilingual-faq-api
```
#### Update .env with your credentials:
```bash
  git clone https://github.com/yourusername/multilingual-faq-api.git
cd multilingual-faq-api
```
#### 4. Start Server
```bash
  git clone https://github.com/yourusername/multilingual-faq-api.git
cd multilingual-faq-api
```

    
## API Reference

#### Get all items

```http
  GET /api/faqs?lang=hi
```

````bash
{
    "success": true,
    "message": "FAQs fetched successfully.",
    "faq": [
        {
            "_id": "679f8026e792e5a9b9838aec",
            "question": "<html><head></head><body><p>मुझे फिक्स्ड डिपॉजिट के लिए डिजिटल प्लेटफॉर्म का उपयोग क्यों करना चाहिए?</p></body></html>",
            "answer": "<html><head></head><body><p>डिजिटल प्लेटफ़ॉर्म अक्सर उच्च ब्याज दर प्रदान करते हैं, विभिन्न विकल्पों की तुलना करने के लिए अधिक सुविधाजनक होते हैं, और इनमें प्रसंस्करण समय भी तेज़ होता है। आप प्रत्येक बैंक में शारीरिक रूप से जाए बिना एक ही स्थान पर विभिन्न बैंकों से कई सावधि जमाओं का प्रबंधन कर सकते हैं।</p></body></html>"
        }
    ]
}
````

#### Create FAQ

```http
  POST /api/faqs
```

````bash
{
    "success": true,
    "message": "FAQs created successfully.",
    "faq": {
        "question": "<p>Why should I use digital platforms for fixed deposits?</p>",
        "answer": "<p>Digital platforms often offer higher interest rates, are more convenient for comparing different options, and have faster processing times. You can manage multiple fixed deposits from different banks in one place without having to visit each bank physically.</p>",
        "translations": {
            "en": {
                "question": "<p>Why should I use digital platforms for fixed deposits?</p>",
                "answer": "<p>Digital platforms often offer higher interest rates, are more convenient for comparing different options, and have faster processing times. You can manage multiple fixed deposits from different banks in one place without having to visit each bank physically.</p>",
                "_id": "679f802de792e5a9b9838af2"
            },
            "hi": {
                "question": "<html><head></head><body><p>मुझे फिक्स्ड डिपॉजिट के लिए डिजिटल प्लेटफॉर्म का उपयोग क्यों करना चाहिए?</p></body></html>",
                "answer": "<html><head></head><body><p>डिजिटल प्लेटफ़ॉर्म अक्सर उच्च ब्याज दर प्रदान करते हैं, विभिन्न विकल्पों की तुलना करने के लिए अधिक सुविधाजनक होते हैं, और इनमें प्रसंस्करण समय भी तेज़ होता है। आप प्रत्येक बैंक में शारीरिक रूप से जाए बिना एक ही स्थान पर विभिन्न बैंकों से कई सावधि जमाओं का प्रबंधन कर सकते हैं।</p></body></html>",
                "_id": "679f802de792e5a9b9838af3"
            },
            "bn": {
                "question": "<html><head></head><body><p>কেন আমি ফিক্সড ডিপোজিটের জন্য ডিজিটাল প্ল্যাটফর্ম ব্যবহার করব?</p></body></html>",
                "answer": "<html><head></head><body><p>ডিজিটাল প্ল্যাটফর্মগুলি প্রায়শই উচ্চ সুদের হার অফার করে, বিভিন্ন বিকল্পের তুলনা করার জন্য আরও সুবিধাজনক এবং দ্রুত প্রক্রিয়াকরণের সময় রয়েছে। আপনি শারীরিকভাবে প্রতিটি ব্যাঙ্কে না গিয়ে এক জায়গায় বিভিন্ন ব্যাঙ্ক থেকে একাধিক ফিক্সড ডিপোজিট পরিচালনা করতে পারেন।</p></body></html>",
                "_id": "679f802de792e5a9b9838af4"
            }
        },
        "_id": "679f802de792e5a9b9838af1",
        "__v": 0
    }
}
````

#### Update FAQ

```http
  PUT /api/faqs/:id
```

````bash
{
    "success": true,
    "message": "FAQs updated successfully.",
    "faq": {
        "_id": "679f725934cd3fd34a2f2305",
        "question": "<p>changed question</p><p></p>",
        "answer": "<p>answer changed</p><p></p>",
        "translations": {
            "en": {
                "question": "<p>changed question</p><p></p>",
                "answer": "<p>answer changed</p><p></p>",
                "_id": "679f7fffad9575e162abd422"
            },
            "hi": {
                "question": "<html><head></head><body><p>बदला हुआ प्रश्न</p><p></p></body></html>",
                "answer": "<html><head></head><body><p>जवाब बदल गया</p><p></p></body></html>",
                "_id": "679f7fffad9575e162abd423"
            },
            "bn": {
                "question": "<html><head></head><body><p>পরিবর্তিত প্রশ্ন</p><p></p></body></html>",
                "answer": "<html><head></head><body><p>উত্তর পরিবর্তিত</p><p></p></body></html>",
                "_id": "679f7fffad9575e162abd424"
            }
        },
        "__v": 0
    }
}
````

#### Delete FAQ

```http
  DELETE /api/faqs/:id
```

````bash
{
    "success": true,
    "message": "FAQs deleted successfully."
}
````

Takes two numbers and returns the sum.


## Error Handling

#### Sample Error Response

````bash
{
  "success": false,
  "message": "Invalid FAQ ID format."
}
````

##### Common Status Codes

- 400: Bad Request
- 404: FAQ Not found
- 500: Internal Server Error
- 200: success
- 201: created/ update
## Configuration

#### Environment Variables

- Variable	Description = DB_URL	MongoDB connection string
- GOOGLE_APPLICATION_CREDENTIALS =	Path to Google Cloud service account JSON
- PORT = Server port (default: 8080)

### Translation Support
 To add new languages:

###### 1. Update language array in service/faqService.js

###### 2. Ensure Google Translate supports the language

###### 3. Update FAQ model translations Map


### Security Features
- HTML sanitization using sanitize-html
- Input validation middleware
- Secure MongoDB connection
- Environment-based configuration
## Technologies Used
 
##### - Backend : Node.js, Express 
##### - Database: MongoDB
##### - Translation: Google Cloud Translate API
##### - Security: Sanitize-html, CORS

