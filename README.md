# TaskFlow - Modern Task Management Application

A comprehensive task management application built with Vue.js 3, TypeScript, and Tailwind CSS. This application provides a complete solution for organizing, prioritizing, and managing tasks with a modern and intuitive interface.

## 🚀 Features

### Core Functionality
- **Complete CRUD Operations**: Create, read, update, and delete tasks
- **Advanced Filtering**: Filter tasks by status, priority, and search terms
- **Smart Sorting**: Sort tasks by due date, priority, or creation date
- **Tag System**: Organize tasks with custom tags
- **Overdue Detection**: Automatic highlighting of overdue tasks
- **Real-time Updates**: Instant UI updates when tasks are modified

### User Interface
- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Color-coded Priority**: Visual indicators for task priority levels
- **Status Badges**: Clear status indicators for task progress
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Error Handling**: Comprehensive error states with retry functionality

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Pinia Store**: Centralized state management
- **Component Testing**: Unit tests for critical components
- **Form Validation**: Client-side validation with error feedback
- **Mock API**: Simulated backend for development and testing

## 🛠️ Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Build Tool**: Vite
- **Testing**: Vitest + Vue Test Utils
- **Icons**: Heroicons
- **Date Handling**: date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm run test
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── TaskList.vue    # Main task list with v-for
│   ├── TaskItem.vue    # Individual task display
│   ├── TaskForm.vue    # Task creation/editing form
│   ├── FilterBar.vue   # Filtering and search controls
│   └── TaskStats.vue   # Task statistics dashboard
├── stores/             # Pinia stores
│   └── taskStore.ts    # Task state management
├── services/           # API services
│   └── taskService.ts  # Task CRUD operations
├── types/              # TypeScript definitions
│   └── task.ts         # Task-related types
├── tests/              # Component tests
│   ├── TaskForm.test.ts
│   └── TaskList.test.ts
├── App.vue             # Main application component
├── main.ts             # Application entry point
└── style.css           # Global styles
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### Tailwind Configuration
The application uses a custom Tailwind configuration with:
- Extended color palette for priority and status indicators
- Custom animations for smooth transitions
- Responsive breakpoints optimized for task management layouts

## 🧪 Testing

The application includes comprehensive testing coverage:

### Component Tests
- **TaskForm.test.ts**: Tests form validation, editing modes, and user interactions
- **TaskList.test.ts**: Tests list rendering, loading states, and error handling

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test:watch
```

## 📱 Usage Guide

### Creating Tasks
1. Click the "New Task" button in the header
2. Fill in the task details:
   - **Title**: Required field for task identification
   - **Description**: Optional detailed description
   - **Due Date**: Required deadline for the task
   - **Priority**: Low, Medium, or High priority level
   - **Status**: Open, In Progress, or Done
   - **Tags**: Comma-separated tags for organization

### Managing Tasks
- **Edit**: Click the pencil icon on any task card
- **Delete**: Click the trash icon (with confirmation dialog)
- **Status Updates**: Use the task form to change status
- **Priority Changes**: Modify priority levels as needed

### Filtering and Search
- **Search**: Use the search bar to find tasks by title or description
- **Status Filter**: Filter tasks by their current status
- **Priority Filter**: Show only tasks with specific priority levels
- **Quick Filters**: Use preset filters for overdue, today's tasks, and high priority
- **Sorting**: Sort by due date, priority, or creation date (ascending/descending)

### Task Organization
- **Tags**: Add multiple tags to categorize tasks
- **Priority Levels**: 
  - 🔴 High Priority (Red)
  - 🟡 Medium Priority (Orange)
  - 🟢 Low Priority (Green)
- **Status Tracking**:
  - 🔵 Open (Blue)
  - 🟡 In Progress (Yellow)
  - 🟢 Done (Green)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Navigation and primary actions
- **Success**: Green (#22C55E) - Completed tasks and success states
- **Warning**: Orange (#F59E0B) - Medium priority and warning states
- **Error**: Red (#EF4444) - High priority and error states
- **Neutral**: Gray shades for text and backgrounds

### Typography
- **Font Family**: Inter (system fallback)
- **Headings**: 120% line height, bold weight
- **Body Text**: 150% line height, normal weight
- **Small Text**: 140% line height for better readability

### Spacing System
- **Base Unit**: 8px
- **Consistent Spacing**: All margins, paddings, and gaps use multiples of 8px
- **Component Spacing**: Standardized spacing between related elements

## 🚀 Deployment

### Frontend Deployment (Render)
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Render**
   - Connect your GitHub repository to Render
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Configure environment variables in Render dashboard

### Environment Configuration
- **Production**: Set `NODE_ENV=production`
- **API URL**: Configure backend API endpoint
- **CDN**: Enable static asset caching

## 🔒 Security Considerations

- **No Sensitive Data**: All credentials stored in environment variables
- **Client-side Validation**: Input validation with proper error handling
- **XSS Prevention**: Proper data sanitization and Vue.js built-in protections
- **CSRF Protection**: Implemented when connecting to backend APIs

## 📈 Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Efficient Rendering**: Vue.js reactivity optimizations
- **Debounced Search**: Prevents excessive API calls during typing
- **Optimized Animations**: Hardware-accelerated transitions
- **Bundle Splitting**: Automatic code splitting with Vite

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow Vue.js 3 Composition API best practices
- Use TypeScript for all new code
- Write tests for new components and features
- Follow the existing code style and conventions
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js Team**: For the excellent frontend framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Heroicons**: For the beautiful icon set
- **Vite**: For the fast build tool and development server

## 📞 Support

For questions, issues, or contributions:
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: [Your email address]

---

**TaskFlow** - Streamline your productivity with modern task management.