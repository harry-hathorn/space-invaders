# Space Invaders Game

This project is a Space Invaders game implementation with a React frontend and ASP.NET Core backend.

## Prerequisites

- .NET 8.0 SDK
- Node.js and npm
- SQL Server

## Running the Application

### Backend (ASP.NET Core)

1. Navigate to the SpaceInvadersGame directory:
   ```
   cd SpaceInvadersGame
   ```

2. Run the following command to start the backend server with HTTPS:
   ```
   dotnet run --launch-profile "https"
   ```

   The API will be available at `https://localhost:7186`.

Note: Make sure you have a valid HTTPS certificate. If you encounter any certificate errors, you may need to trust the development certificate by running:
```
dotnet dev-certs https --trust
```

### Frontend (React)

1. Open a new terminal window and navigate to the space-invaders-ui directory:
   ```
   cd space-invaders-ui
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Playing the Game

1. Open your web browser and go to `http://localhost:3000`.
2. Use the left and right arrow keys to move the player.
3. Press the spacebar to shoot.
4. Destroy the enemies before they reach the bottom of the screen.
5. When the game is over, you can submit your score and view the high scores.

Enjoy playing Space Invaders!
