# Smart Finance - Personal Budget Planning Application 💰

A comprehensive personal finance management application built with React, Bootstrap, and Recharts. Track your income, expenses, savings, and plan for your wedding all in one place with industry-level responsive design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-v16+-brightgreen.svg)

## 🌟 Features

### ✅ Core Functionality
- **🔐 Authentication System** - Secure login and signup with email, password, contact number, and bank details
- **💰 Income Tracking** - Track multiple income sources with 6 categories (Salary, Freelance, Business, Investments, Bonus, Others)
- **📊 Expense Management** - Categorize expenses across 9 categories with detailed tracking
- **🎯 Savings Tracker** - Monitor your savings growth with visual progress and goal tracking
- **💍 Marriage Planner** - Complete wedding planning with expense tracking across 15 specialized categories
- **📈 Financial Dashboard** - Beautiful overview of your financial health with interactive charts

### 💡 Technical Features
- **100% Client-Side** - All data stored locally in browser (localStorage)
- **📱 Industry-Level Responsive Design** - Optimized for screens from 10px to desktop (mobile-first approach)
- **🎨 Modern UI** - Clean, professional interface using Tailwind-inspired CSS with Poppins and Inter fonts
- **📊 Interactive Charts** - Recharts integration with pie charts, bar charts, and area charts
- **⚡ Real-time Updates** - Instant data synchronization across all pages
- **🔒 No Backend Required** - Works completely offline
- **🎯 Protected Routes** - User authentication with protected dashboard access
- **PKR Currency** - All transactions in Pakistani Rupees (PKR)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-finance
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The application will automatically reload on file changes

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder, optimized and ready for deployment.

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── Navbar.jsx          # Top navigation bar with user profile
│   ├── Card.jsx            # Reusable card component
│   ├── ChartCard.jsx       # Chart wrapper component
│   └── TransactionList.jsx # Transaction listing component
├── context/                 # React Context API providers
│   ├── AuthContext.jsx     # Authentication state management
│   └── FinanceContext.jsx  # Finance data state management
├── pages/                   # Application pages
│   ├── Login.jsx           # Login page with email/password
│   ├── Signup.jsx          # Registration with full details
│   ├── Dashboard.jsx       # Main dashboard with overview
│   ├── Income.jsx          # Income tracking page
│   ├── Expenses.jsx        # Expense management page
│   ├── Savings.jsx         # Savings tracker page
│   └── MarriagePlanner.jsx # Wedding planning page
├── styles/
│   └── main.css            # Comprehensive responsive CSS
├── App.jsx                 # Main app component with routing
└── main.jsx                # Entry point
```

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework and component management |
| **React Router DOM v7** | Client-side routing |
| **Recharts 2.10** | Interactive data visualization |
| **Lucide React 0.294** | Beautiful SVG icons |
| **Bootstrap 5.3.3** | CSS framework (utility styles) |
| **Tailwind-inspired CSS** | Custom responsive design system |
| **date-fns 2.30** | Date manipulation utilities |
| **Sonner 1.2** | Toast notifications |
| **Vite 7.2** | Lightning-fast build tool |

## 💾 Data Storage

All data is stored locally in your browser using `localStorage` with automatic persistence:

### Authentication Data
- `smart_user` - User login credentials and profile information (name, email, contact, bank account)

### Financial Data (User-specific)
- `smart_expenses` - All expense transactions
- `smart_incomes` - All income transactions
- `smart_savings_goal` - Current savings target amount
- `smart_marriage_expenses` - Wedding-specific expenses
- `smart_marriage_goal` - Wedding budget and target date

**Note**: Data is stored locally in your browser and is not synced across devices. Clearing browser cache will delete all data.

## 📱 Responsive Design

The application uses a mobile-first, fluid responsive design approach:

### Breakpoints
- **320px and below** - Very small phones
- **480px** - Small phones
- **768px** - Tablets
- **1024px+** - Desktops and larger screens

### Responsive Features
- Fluid typography with `clamp()` CSS function
- Dynamic grid layouts that adapt to screen size
- Sidebar collapses on mobile
- Navigation moves to bottom on tablets/phones
- All form inputs and tables are fully responsive
- Touch-friendly button sizes
- Optimized spacing for all screen sizes

## 🔐 Authentication

The application includes a complete authentication system:

### Sign Up Requirements
- **Full Name** - Your name (required)
- **Email Address** - Valid email format (required)
- **Contact Number** - Phone number for contact (required)
- **Bank Account Number** - For financial tracking (required)
- **Password** - Minimum 6 characters (required)
- **Confirm Password** - Must match password (required)

### Security Features
- Password confirmation validation
- Email format validation
- Form field validation
- Secure local storage of credentials
- Session-based logout
- Protected route access

## 📊 Expense Categories

### Regular Expenses (9 categories)
| Icon | Category | Purpose |
|------|----------|---------|
| 🍕 | Food & Dining | Restaurant and grocery expenses |
| 🏠 | Rent & Housing | Home rent and property costs |
| 🚗 | Transport | Vehicle and travel expenses |
| 📚 | Education | School, college, and courses |
| 🛍️ | Shopping | Clothing, accessories, etc. |
| 💡 | Utilities | Electricity, water, internet bills |
| 🎬 | Entertainment | Movies, games, hobbies |
| 🏥 | Health | Medical and healthcare costs |
| 📦 | Others | Miscellaneous expenses |

### Income Categories (6 categories)
| Icon | Category | Purpose |
|------|----------|---------|
| 💼 | Salary | Primary employment income |
| 💻 | Freelance | Freelance work income |
| 🏢 | Business | Business profits |
| 📈 | Investments | Investment returns |
| 🎉 | Bonus | Bonus and incentives |
| 📦 | Others | Additional income sources |

### Wedding Expenses (15 categories)
| Icon | Category | Est. Budget |
|------|----------|------------|
| 🍽️ | Catering & Food | 15-25% |
| 👗 | Wedding Dresses | 10-15% |
| 🏛️ | Venue & Hall | 15-20% |
| 🎨 | Decoration | 8-12% |
| 📸 | Photography | 5-8% |
| 🎵 | Music & DJ | 5-8% |
| 🚗 | Transportation | 5-8% |
| 💍 | Jewelry | 5-10% |
| 💌 | Invitations | 2-3% |
| 💄 | Makeup & Salon | 3-5% |
| 🌸 | Flowers | 3-5% |
| 🎁 | Gifts & Favors | 5-8% |
| 🪑 | Equipment Rentals | 2-3% |
| 📜 | Legal & Documentation | 1-2% |
| 📋 | Other Expenses | 5-10% |

## 🎯 Key Pages & Features

### 🔑 Login Page
- Email and password authentication
- Link to signup page
- Form validation
- Secure session management

### 📝 Signup Page
- Full user registration form
- Name, email, contact, bank account fields
- Password confirmation
- Form validation
- Direct login after signup

### 📈 Dashboard
- Overview of financial health
- Stat cards showing total income, expenses, balance
- Marriage fund tracker
- Interactive pie charts for expense distribution
- Interactive pie charts for income distribution
- Bar chart comparing income vs expenses
- Progress tracking towards savings goal

### 💰 Income Tracking
- Add income from multiple sources
- Track by category
- Edit and delete transactions
- Category-wise income breakdown
- Sortable transaction list
- Real-time total income calculation

### 📊 Expense Management
- Add, edit, and delete expenses
- Categorize by 9 expense types
- Category-wise summary with amounts
- Visual expense tracking
- Date-based filtering
- Transaction history

### 🎯 Savings Tracker
- Set and update savings goals
- Visual progress bar with percentage
- Current balance tracking
- Remaining amount to save
- Monthly savings requirement
- Savings growth trend chart
- Helpful savings tips

### 💍 Marriage Planner
- Set wedding budget and target date
- 15 specialized wedding expense categories
- Budget progress tracking
- Days remaining countdown
- Monthly savings required calculation
- Expense summary by category
- Interactive pie and bar charts
- Complete expense transaction list
- Wedding timeline management

## 🎨 Design System

### Colors
- **Primary**: #10b981 (Emerald Green)
- **Secondary**: #3b82f6 (Blue)
- **Accent**: #f97316 (Orange)
- **Danger**: #ef4444 (Red)
- **Success**: #10b981 (Green)
- **Gray Scale**: 50-900 for text and backgrounds

### Typography
- **Headings**: Poppins (Bold, 700 weight)
- **Body**: Inter (Regular, 400-600 weight)
- **Responsive**: Fluid sizing with `clamp()`

### Spacing System
- XS: 4px | SM: 8px | MD: 12px | LG: 16px | XL: 24px | 2XL: 32px | 3XL: 48px

### Components
All components are fully responsive and accessible with:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states for accessibility
- High contrast ratios

## 📈 Charts & Visualizations

The application includes interactive charts using Recharts:

### Chart Types
- **Pie Charts** - Expense and income distribution
- **Bar Charts** - Category-wise comparison
- **Area Charts** - Savings growth trend
- **Line Charts** - Financial trends over time

### Features
- Responsive charts that adapt to screen size
- Interactive tooltips showing exact values
- Color-coded by category
- Legend for easy identification
- Smooth animations

## 🎮 User Guide

### Getting Started
1. Sign up with your email and bank details
2. Login with your credentials
3. View dashboard overview
4. Start adding income and expenses

### Adding Income
1. Go to Income page
2. Click "Add Income" button
3. Select category and enter amount
4. Add optional description and date
5. Click "Add Income"

### Adding Expenses
1. Go to Expenses page
2. Click "Add Expense" button
3. Select category and enter amount
4. Add optional description and date
5. Click "Add Expense"

### Tracking Savings
1. Go to Savings page
2. Set your savings goal
3. Monitor progress with visual bar
4. View savings growth trend

### Wedding Planning
1. Go to Marriage Planner page
2. Set wedding budget and date
3. Add wedding expenses by category
4. Track remaining budget
5. View expense breakdown
6. Monitor savings requirements

## 🔄 Workflow

```
Login/Signup
    ↓
Dashboard (Overview)
    ↓
┌─────────────────────────────────────────┐
│ ├─ Add Income                           │
│ ├─ Track Expenses                       │
│ ├─ Monitor Savings Goals                │
│ └─ Plan Wedding (15 categories)         │
│                                         │
│ ← All data synced with localStorage     │
└─────────────────────────────────────────┘
    ↓
View Reports & Charts
    ↓
Manage Budget & Financial Goals
```

## 🚀 Performance

The application is optimized for:
- **Fast Load Time**: Vite development server
- **Minimal Bundle Size**: Tree-shaking and code splitting
- **Smooth Interactions**: CSS transitions and animations
- **Efficient Rendering**: React hooks and Context API
- **Mobile Friendly**: Optimized for all devices

## 📝 Available Scripts

```bash
# Development
npm run dev           # Start dev server at localhost:5173

# Production
npm run build         # Build optimized production bundle
npm run preview       # Preview production build locally

# Code Quality
npm run lint          # Run ESLint on codebase
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit changes (`git commit -m 'Add AmazingFeature'`)
5. Push to branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) - A JavaScript library for building user interfaces
- Charts powered by [Recharts](https://recharts.org/) - Composable charting library
- Icons from [Lucide React](https://lucide.dev/) - Beautiful SVG icons
- Styling with [Bootstrap](https://getbootstrap.com/) and custom CSS
- Build tool [Vite](https://vitejs.dev/) - Next generation frontend tooling

## 👤 Author

**Amna Mohsin**

- Portfolio: [amna-mohsin.com](https://amna-mohsin.com)
- GitHub: [@amna-mohsin](https://github.com/amna-mohsin)
- LinkedIn: [amna-m98](https://linkedin.com/in/amna-m98)
- Email: amna@example.com

## ❓ FAQ

**Q: Is my data safe?**
A: Yes, all data is stored locally in your browser and never sent to any server.

**Q: Can I use this on multiple devices?**
A: Currently, each device stores its own data. Data sync across devices is not supported.

**Q: What happens if I clear my browser cache?**
A: All data stored in localStorage will be deleted.

**Q: Can I export my data?**
A: You can take screenshots of your charts and reports. Full export feature coming soon.

**Q: Is there a web version?**
A: This is a web application. Open it in any modern browser.

**Q: How do I delete my account?**
A: Clear your browser localStorage or use browser developer tools to delete the `smart_user` key.

## 📞 Support

For support, email amna@example.com or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Data export to CSV/Excel
- [ ] Multi-device sync with cloud storage
- [ ] Budget alerts and notifications
- [ ] Bill reminders
- [ ] Financial reports and insights
- [ ] Dark mode
- [ ] Multiple currencies
- [ ] Mobile app (React Native)
- [ ] Recurring transactions
- [ ] Investment tracking
- [ ] Tax calculation

## 📊 Statistics

- **Total Categories**: 30 (9 Expenses + 6 Income + 15 Wedding)
- **Responsive Breakpoints**: 5+ (320px to 1920px+)
- **Built Components**: 15+
- **API Endpoints**: 0 (100% local storage)
- **Bundle Size**: ~200KB (gzipped)

---

**Made with ❤️ for better financial management**

Last Updated: January 2026
