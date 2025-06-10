# 🌬️ AirWatch CPH

A modern, interactive timeline web application tracking air pollution-related news, scientific studies, government reports, and expert opinions about **ultrafine particles and environmental impact** at **Københavns Lufthavn** (Copenhagen Airport).

🌐 **[View Live Site](https://martinpries.github.io/AirWatchCPH)** 

> **Development Environment**: This project is developed on **Windows 11** using **Visual Studio Code**. All scripts and commands are optimized for **PowerShell** and Windows file systems.

## 🎯 Project Overview

AirWatch CPH provides a comprehensive chronological visualization of environmental issues, ultrafine particle studies, and air quality discussions related to Copenhagen Airport. The application helps citizens, researchers, and policymakers track the ongoing dialogue about aviation's environmental impact on local communities, particularly in Tårnby Kommune and Amager area.

## 👥 For End Users

### How to Use AirWatch CPH

1. **Browse the Timeline**: Scroll through the chronological timeline to see events, studies, and news articles
2. **Filter Content**: Use the filter panel to narrow down content by type:
   - 📰 **News**: Media coverage and news articles
   - 🔬 **Scientific Study**: Research papers and academic studies
   - 📄 **Report**: Official reports and assessments
   - 🏛️ **Government**: Government statements and decisions
   - 🏢 **Company**: Statements from Copenhagen Airport and airlines
   - 🗳️ **Political**: Political discussions and party positions
   - 🤝 **Organization**: NGO and organization statements
   - 👨‍🔬 **Expert**: Expert analysis and professional opinions
   - 💬 **Social**: Social media discussions and community voices

3. **Search**: Use the search bar to find specific topics or keywords
4. **Language**: Switch between English and Danish using the language toggle
5. **Navigate Years**: Jump to specific years using the year navigation
6. **Read More**: Click "Read More" on any timeline item for detailed information
7. **Visit Sources**: Click "Visit Source" to read the original article or document

### Key Features for Users
- **Community-Driven Updates**: New content is added by community contributors as events unfold
- **Mobile Responsive**: Works seamlessly on phones, tablets, and desktop
- **Bilingual Support**: Available in both English and Danish
- **Direct Links**: Access to original sources for fact-checking
- **Chronological Context**: Understand how the environmental discussion has evolved over time

## ✨ Features

- **Interactive Timeline**: Vertical timeline with alternating left/right layout
- **Dynamic Data Loading**: YAML-based modular data structure
- **Content Filtering**: Filter by type (news, scientific, reports, opinions, etc.)
- **Multi-language Support**: English and Danish localization
- **Responsive Design**: Mobile-first, modern UI with smooth animations
- **GitHub Integration**: Submit new data points via GitHub Issues
- **Auto-deployment**: GitHub Actions for seamless deployment

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0 + Vite 6.3.5
- **Language**: TypeScript 5.8.3
- **Styling**: TailwindCSS 4.1.8 with Typography plugin
- **Animations**: Framer Motion 12.16.0
- **Data Format**: YAML files parsed with js-yaml
- **Build Tool**: Vite (ES modules, fast HMR)
- **Code Quality**: ESLint 9.25.0 with TypeScript support
- **Package Manager**: npm
- **Deployment**: GitHub Pages with GitHub Actions
- **Development Environment**: Windows 11 + PowerShell + VS Code

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **Windows PowerShell** (recommended for Windows users)

### Setup Instructions

1. **Clone the Repository**
   ```powershell
   git clone https://github.com/martinpries/AirWatchCPH.git
   cd AirWatchCPH
   ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Start Development Server**
   ```powershell
   npm run dev
   ```
   - Opens at `http://localhost:5173`
   - Hot reload enabled for instant updates

4. **Build for Production**
   ```powershell
   npm run build
   ```
   - Creates optimized build in `dist/` folder

5. **Preview Production Build**
   ```powershell
   npm run preview
   ```
   - Preview the production build locally

6. **Lint Code** (optional)
   ```powershell
   npm run lint
   ```
   - Check for code quality issues

### Development Tips
- The development server supports hot module replacement (HMR)
- TypeScript errors will show in the terminal and browser
- TailwindCSS classes are available immediately
- YAML data files are watched for changes

## 📁 Project Structure

```
AirWatchCPH/
├── public/                    # Static assets
│   └── favicon.svg
├── src/
│   ├── components/           # React components
│   │   ├── AddDataInfo.tsx   # Data submission info
│   │   ├── Filters.tsx       # Content filtering
│   │   ├── Footer.tsx        # Page footer
│   │   ├── Header.tsx        # Page header
│   │   ├── LangSwitcher.tsx  # Language toggle
│   │   ├── Timeline.tsx      # Main timeline component
│   │   ├── TimelineItem.tsx  # Individual timeline entry
│   │   └── YearNav.tsx       # Year navigation
│   ├── lang/                 # Internationalization
│   │   ├── en.yaml          # English translations
│   │   └── da.yaml          # Danish translations
│   ├── types/                # TypeScript definitions
│   │   └── timeline.d.ts    # Timeline data types
│   ├── utils/                # Utility functions
│   │   ├── i18n.ts          # Internationalization logic
│   │   ├── loadData.ts      # YAML data loading
│   │   └── typeConfig.ts    # Content type configuration
│   ├── assets/               # Static assets
│   │   └── logo.jpg
│   ├── App.tsx              # Main app component
│   ├── App.css              # App-specific styles
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── vite-env.d.ts        # Vite environment types
├── data/                     # YAML data files
│   ├── 2024/                # 2024 timeline entries
│   └── 2025/                # 2025 timeline entries
├── .github/
│   ├── workflows/           # GitHub Actions
│   └── ISSUE_TEMPLATE/      # Issue templates
├── eslint.config.js         # ESLint configuration
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript config
├── tsconfig.node.json       # Node-specific TypeScript config
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies and scripts
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # MIT License
└── README.md               # This file
```

## 📊 Data Schema

Each YAML file in `/data/YYYY/` follows this naming convention: `YYYY-MM-DD-descriptive-title.yaml`

**File Naming Examples:**
- `2024-03-15-copenhagen-airport-air-quality-assessment.yaml`
- `2025-01-18-expert-analysis-aviation-emissions-impact.yaml`

**Content Schema:**
```yaml
title: "Article or Report Title"
date: "YYYY-MM-DD"                    # ISO date format
publisher: "Organization Name"         # News outlet, institution, etc.
author: "Author Name"                 # Individual author or team
short_description: "Brief summary"    # Displayed in timeline
long_description: "Detailed content"  # Full description when expanded
type: "news|scientific|report|government|company|political|organization|expert|social"
reference: "Reference information"    # Additional context or citations
link: "https://example.com"          # Link to original source
```

**Supported Content Types:**
- `news` - Media coverage and journalism
- `scientific` - Academic studies and research papers  
- `report` - Official reports and assessments
- `government` - Government statements and decisions
- `company` - Corporate statements (airport, airlines)
- `political` - Political discussions and party positions
- `organization` - NGO and advocacy group statements
- `expert` - Expert analysis and professional opinions
- `social` - Social media discussions and community voices

## 🤝 How to Contribute

We welcome contributions from researchers, journalists, citizens, and anyone interested in tracking environmental issues at Copenhagen Airport.

### Contributing Data (Easy Method)

1. **Use GitHub Issues Template**
   - Go to the [Issues](https://github.com/martinpries/AirWatchCPH/issues) page
   - Click "New Issue"
   - Select "New Data Point" template
   - Fill in all required information:
     - Title, Date, Publisher, Author
     - Short and long descriptions
     - Content type and source link
   - Submit the issue
   - Our GitHub Actions will automatically create the YAML file

### Contributing Data (Advanced Method)

1. **Fork the Repository**
   ```powershell
   git clone https://github.com/[your-username]/AirWatchCPH.git
   cd AirWatchCPH
   ```

2. **Create a New Branch**
   ```powershell
   git checkout -b add-data-[topic-name]
   ```

3. **Add Your Data File**
   - Create a new YAML file in the appropriate `/data/YYYY/` folder
   - Follow the naming convention: `YYYY-MM-DD-descriptive-title.yaml`
   - Use the data schema above
   - Ensure Danish characters are properly encoded (UTF-8)

4. **Test Locally**
   ```powershell
   npm run dev
   # Verify your data appears correctly in the timeline
   ```

5. **Submit Pull Request**
   ```powershell
   git add .
   git commit -m "Add: [Brief description of the content]"
   git push origin add-data-[topic-name]
   ```
   - Open a Pull Request on GitHub
   - Include a clear description of what you're adding

### Contributing Code

1. **Setup Development Environment**
   - Follow the "How to Run" instructions above
   - Ensure you have Node.js 18+ and npm installed

2. **Code Standards**
   - Use TypeScript for all new code
   - Follow existing code style and patterns
   - Run `npm run lint` before committing
   - Use meaningful commit messages

3. **Component Development**
   - Place new components in `src/components/`
   - Use functional components with TypeScript
   - Follow React hooks patterns
   - Add proper type definitions

4. **Styling Guidelines**
   - Use TailwindCSS utility classes
   - Follow mobile-first responsive design
   - Maintain consistency with existing design
   - Test on multiple screen sizes

5. **Translation Updates**
   - Add new text strings to both `src/lang/en.yaml` and `src/lang/da.yaml`
   - Use descriptive keys in the YAML structure
   - Ensure Danish translations are accurate

### Quality Guidelines

- **Accuracy**: Verify all information and sources
- **Neutrality**: Present information objectively
- **Relevance**: Focus on ultrafine particles and Copenhagen Airport environmental impact
- **Sources**: Always include links to original sources
- **Dates**: Use ISO format (YYYY-MM-DD) for consistency
- **Language**: Provide both English and Danish when possible

### Getting Help

- **Technical Issues**: Open a GitHub Issue with the "bug" label
- **Data Questions**: Contact maintainers via GitHub Discussions
- **Feature Requests**: Use GitHub Issues with "enhancement" label
- **General Questions**: Check existing Issues and Discussions first

## 🚀 Deployment & Development

### Automatic Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

- **Live Site**: `https://martinpries.github.io/AirWatchCPH`
- **Deployment**: GitHub Actions workflow
- **Build Command**: `npm run build`
- **Build Output**: `dist/` folder

### Local Development Workflow

1. **Make Changes**: Edit components, styles, or data files
2. **Test Locally**: `npm run dev` - changes appear instantly
3. **Check Types**: TypeScript will show errors in terminal
4. **Lint Code**: `npm run lint` to check code quality
5. **Build Test**: `npm run build` to ensure production build works
6. **Commit Changes**: Follow conventional commit messages

### Performance Considerations
- **Static Site**: All content is pre-built for fast loading
- **Lazy Loading**: Timeline items load progressively
- **Mobile Optimized**: Responsive design with touch interactions
- **SEO Friendly**: Static HTML generation for search engines

## 🔧 Advanced Development

### Adding New Features
- **Components**: Create in `src/components/` with TypeScript
- **Utilities**: Add helper functions to `src/utils/`
- **Types**: Define interfaces in `src/types/`
- **Styles**: Use TailwindCSS utility classes

### Internationalization
- **Add Languages**: Create new YAML files in `src/lang/`
- **Update Components**: Use the i18n utility for text
- **Test Translations**: Switch languages to verify completeness

### Data Processing
- **YAML Loading**: Handled automatically by `loadData.ts`
- **Type Safety**: All data is typed via `timeline.d.ts`
- **Error Handling**: Invalid YAML files are logged but don't break the app

### Customization
- **Styling**: Modify `tailwind.config.js` for theme changes
- **Content Types**: Update `typeConfig.ts` to add new content categories
- **Timeline Layout**: Adjust `Timeline.tsx` and `TimelineItem.tsx` components

## 📄 License

This project is open source and available under the [MIT License](LICENSE).