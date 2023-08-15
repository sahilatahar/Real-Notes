<h1 align='center'><a href='https://real-notes.netlify.app/'>Real-Notes</a></h1>

Real-Notes is a minimalist notes app built with React and Vite. It provides an intuitive way to manage your notes seamlessly. The app features a dark-themed user interface for enhanced readability and integrates with Firebase for user authentication and data storage.
## 📷 Screenshots
| Home Page |
| :-: |
[![real-note](https://github.com/sahilatahar/Real-Notes/assets/100127570/b4820618-9a43-41d6-9861-18296c3ac70a)]()
| Login & Signup Page |
[![real-notes-login-page](https://github.com/sahilatahar/Real-Notes/assets/100127570/c07ceea8-77cd-42ac-8bfb-db1e304b2725)]()
| Profile Page |
[![profile-page](https://github.com/sahilatahar/Real-Notes/assets/100127570/cab6e8ba-cd21-440c-b5c1-187ad515e156)]()


## Features

- **User Authentication**: Securely sign up and log in using Firebase Authentication.
- **Notes CRUD Operations**: Create, read, update, and delete your notes effortlessly.
- **Starred Notes**: Mark important notes as starred for quick access.
- **Dark Mode**: Enjoy a visually soothing and elegant dark UI.
- **Responsive Design**: Access and use the app seamlessly across various devices.

## Live Preview

Check out the live version of the app hosted on Netlify:

## 🚀 **[Live Demo](https://real-notes.netlify.app/)**

Feel free to explore the app's features and see it in action!


## Technologies Used

[![Vite](https://skillicons.dev/icons?i=css,js,vite,react,firebase)]([https://skillicons.dev](https://github.com/sahilatahar/Real-Notes))

This project was developed using a combination of modern web technologies:

- **Vite**: Fast build tool and development server.
- **React**: JavaScript library for building user interfaces.
- **CSS**: Styling the app for a visually appealing experience.
- **React Router**: Handling navigation and routing within the app.
- **React Toastify**: Displaying notifications to users.
- **Firebase Auth**: Secure user authentication.
- **Firebase Firestore**: Storing and managing app data.
- **react-unicons**: Free line icon library

## How to Use

To run Real-Notes on your local machine, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/sahilatahar/Real-Notes.git
   cd Real-Notes
   ```
2. **Install Dependencies:**

   Use your preferred package manager to install the necessary dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Firebase**  
   + **Create a Firebase project at Firebase Console:**
    Visit [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - **Obtain your Firebase configuration:**
   - In your Firebase project, navigate to Project Settings.
   - Under the "Your apps" section, select the web app you've registered.
   - Copy the configuration details (apiKey, authDomain, projectId, etc.).

4.  **Set up Firebase configuration:**
    - Goto `src/services/firebase.js`.
    - Replace the placeholder values in `firebase.js` with your Firebase configuration.

5.  Run the Development Server
    To run the development server, use the following commands:

    ```bash
    npm run dev
    # or
    yarn dev
    ```
6. Access the App
    Open your web browser and navigate to [http://localhost:5173]() to start using Real-Notes.

## Contributing

Contributions to Real-Notes are highly welcome! To contribute:

1. **Fork the Repository:** Click the "Fork" button on the repository page.
2. **Create a New Branch:** Create a feature-specific branch: `git checkout -b feature-name`.
3. **Make Changes:** Implement your feature/fix and commit changes: `git commit -m "Add your message here"`.
4. **Push to Your Fork:** Push your changes to your forked repository: `git push origin feature-name`.
5. **Open a Pull Request:** Create a pull request describing your changes.

Please ensure that your code adheres to the existing style conventions and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ using Vite, React, CSS, React Router, React Toastify, Firebase Auth, and Firebase Firestore.



