# Chat Client Application

A simple chat client that allows users to join channels, send messages, and interact with a TensorFlow.js model for various functionalities.

## Features

- **Channel Management**: Create and select channels for different topics of discussion.
- **Message Handling**: Send messages in selected channels, with unread message tracking.
- **TensorFlow.js Integration**: Load a pre-trained model to analyze or generate responses based on user input.
- **Responsive Design**: User-friendly interface with a modern layout.

## Getting Started

### Prerequisites

Make sure you have `Node.js` and `npm` installed on your machine. You can download and install them from [Node.js Official Site](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/monikamunusamy/Chat-client.git
   cd Chat-client```

2. Install the dependencies:
  
 ´´´npm install´´´

3.Start the development server:

´´´npm start´´´
The app will run on http://localhost:3000.

###Setting Up the Backend
If you want to run the Flask backend:

1. Navigate to the chat-backend directory:
   ´´´cd chat-backend´´´

2.Create a virtual environment:

´´´python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# OR 
venv\Scripts\activate  # Windows´´´

3.Install flask

´´´pip install Flask´´´

4. pip install Flask

´´´python app.py´´´

The server will run on http://127.0.0.1:5000.

Usage

Creating a Channel: Enter a name in the "Create new channel" input and click the "Create" button.
Sending Messages: Select a channel and type your message in the input box below. Click "Send" to submit.
TensorFlow.js Model

This application includes a TensorFlow.js model located in the models directory. Ensure that the model files are properly hosted in the GitHub repository for the app to load them correctly.







