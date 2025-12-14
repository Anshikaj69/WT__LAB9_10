# WT__LAB9_10
Installation
To run AI Resume Builder locally, follow these steps:

1️⃣ Clone the Repository

git clone https://github.com/sahidrajaansari/ai-resume-builder.git
cd ai-resume-builder


2️⃣ Create Environment Files
Before proceeding, create the necessary environment files for both frontend and backend.

🔹 Backend (Backend/.env)
Create a .env file inside the Backend/ directory and add the following:

MONGODB_URI={Your MongoDB URI} 
PORT=5001
JWT_SECRET_KEY={Your Secret Key} #example "secret"
JWT_SECRET_EXPIRES_IN="1d"
NODE_ENV=Dev
ALLOWED_SITE=http://localhost:5173


🔹 Frontend (Frontend/.env.local)
Create a .env.local file inside the Frontend/ directory and add the following:

VITE_GEMENI_API_KEY={Your Gemini API Key}
VITE_APP_URL=http://localhost:5001/

3️⃣ Setup Method

--Frontend Setup
Navigate to the frontend directory and install dependencies:

cd Frontend/
npm install
Start the frontend server:

npm run dev


--Backend Setup
Navigate to the backend directory and install dependencies:

cd Backend/
npm install
Start the backend server:

npm run dev
