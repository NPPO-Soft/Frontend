# UniTBv Mobile App

## Overview
This is a React Native mobile application developed for UniTBv (Transilvania University of Brașov). The app provides various features for managing recruits, crew members, interviews, and more.

## Project Structure
```
.
├── App.js                 # Main application entry point
├── config.js             # Configuration settings
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Application screens
│   ├── services/        # API and business logic services
│   ├── styles/          # Global styles and theming
│   └── utils/           # Utility functions
```

## Key Features
- **Dashboard**: Main control center for the application (DashboardBS.js)
- **Recruit Management**: Handle recruitment process and candidate data (RecruitsBS.js)
- **Crew Management**: Manage team members and assignments (CrewBS.js)
- **Interview System**: Conduct and track interviews (InterviewBS.js)
- **History Tracking**: View historical data and activities (HistoryBS.js)
- **Testimonials**: Manage and display testimonials (TestimonialsBS.js)

## Technical Details
- Built with React Native
- Uses React Navigation for routing
- Implements theme support via ThemeContext
- Custom hooks for data fetching (useFetch)
- Consistent styling with custom fonts

## Setup and Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

## Development Notes
- The application uses a modular architecture for easy maintenance
- Screen components are located in `src/screens/`
- Shared components can be found in `src/components/`
- API interactions are handled through `src/services/userService.js`
- Theme customization available through `src/context/ThemeContext.js`

## Contributing
Please follow the existing code structure and naming conventions when contributing to the project.

## Dependencies
Key dependencies include:
- React Native
- React Navigation
- Other dependencies can be found in package.json

## License
All rights reserved. This project is proprietary software.
