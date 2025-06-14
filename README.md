# Courtly

A modern mobile application built with React Native and Expo, featuring real-time chat functionality and Firebase integration.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)
- Firebase account
- Firebase Admin SDK Setup
   1. Go to Firebase Console > Project Settings > Service Accounts
   2. Click "Generate New Private Key"
   3. Save the downloaded JSON file as `admin-sdk.json`
   4. Place the file in the `back_end` directory

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd courtly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Realtime Database
   - Set up Firebase Authentication
   - Configure your database rules:
   ```json
   {
     "rules": {
       ".read": "true",
       ".write": "false"
     }
   }
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory with your Firebase configuration:
   ```
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_DATABASE_URL=your_database_url
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

6. **Run on your device or simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Project Structure

```
courtly/
├── app/                    # Main application code
│   ├── (protected)/       # Protected routes
│   └── (public)/          # Public routes
├── assets/                # Static assets
├── libs/                  # Shared libraries and utilities
│   ├── chat/             # Chat-related components
│   ├── commons/          # Common utilities
│   └── storage/          # Storage utilities
├── back_end/             # Backend services
└── scripts/              # Build and utility scripts
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run reset-project` - Reset project configuration
- `npm test` - Run tests
- `npm run lint` - Run linting

## Dependencies

### Core Dependencies
- React Native
- Expo
- Firebase
- React Navigation
- React Query
- Zustand (State Management)
- React Native Paper (UI Components)

### Development Dependencies
- TypeScript
- Jest
- Babel

## Features

- Real-time chat functionality
- Firebase Authentication
- Secure data storage
- Modern UI with React Native Paper
- Type-safe development with TypeScript

## Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify your Firebase configuration
   - Check your internet connection
   - Ensure Firebase services are enabled

2. **Build Errors**
   - Clear metro bundler cache: `expo start -c`
   - Reset project: `npm run reset-project`
   - Check for conflicting dependencies

3. **iOS/Android Specific Issues**
   - For iOS: Ensure Xcode is properly configured
   - For Android: Check Android SDK installation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or open an issue in the repository.

# Welcome to your Expo app 👋 (Front End)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Welcome to your Golang-MF 👋 (Back End)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## MakeFile

Run build make command with tests
```bash
make all
```

Build the application
```bash
make build
```

Run the application
```bash
make run
```
Create DB container
```bash
make docker-run
```

Shutdown DB Container
```bash
make docker-down
```

DB Integrations Test:
```bash
make itest
```

Live reload the application:
```bash
make watch
```

Run the test suite:
```bash
make test
```

Clean up binary from the last build:
```bash
make clean
```
