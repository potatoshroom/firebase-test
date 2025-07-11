# Firebase Test App

## 🧩 Prerequisites

- Node.js (v18 or higher recommended)
- Firebase account
- Firestore enabled in Firebase

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/potatoshroom/firebase-test.git
cd firebase-test
```

### 2. Create a Firebase project

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup steps (you can disable Google Analytics)
3. After the project is created, go to **Project settings > General**
4. Under **Your apps**, click the `</>` (Web) icon to register a new web app
5. Give your app a nickname and click "Register app"
6. Copy the Firebase config object that appears — you'll need these values for `.env.local`

### 3. Enable Firestore

1. In the left sidebar, go to **Build > Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (you can configure rules later)
4. Select a Cloud Firestore location (e.g. `asia-southeast1`) and click **Enable**
5. Wait for Firestore to finish provisioning

### 4. Create Firestore Collection and Document Structure

1. In Firestore, click **Start collection**
2. Set **Collection ID** to `users`
3. Click **Next**, then click **Auto-ID** to create a document
4. Add the following fields:

| Field Name  | Type   | Example Value        | Description                                     |
| ----------- | ------ | -------------------- | ----------------------------------------------- |
| `firstName` | string | `"John"`             | The user's first name                           |
| `lastName`  | string | `"Doe"`              | The user's last name                            |
| `email`     | string | `"john@example.com"` | The user's email address                        |
| `status`    | string | `"active"`           | User status: `active`, `inactive`, or `pending` |
| `initials`  | string | `"JD"`               | First character of first and last names         |

You can also populate users using the app’s UI after setup.

### 5. Set up environment variables

1. Copy the example env file:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and fill it with your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

All these values come from the Firebase config snippet when you registered your web app in step 2.

### 6. Install dependencies

```bash
npm install
```

### 7. Run the development server

```bash
npm run dev
```

Visit the given ip and port in your browser to view the app.

```
```