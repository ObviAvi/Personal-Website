# Avi Aggarwal’s Personal Website

- Link: [aviggarwal.org](https://www.aviaggarwal.org/)  
A Next.js–powered portfolio and blog showcasing my projects, skills, and extracurricular activities.

## 🚀 Features

- **Home Page** with dark-academia theme and animated Origami component  
- **About Section** describing background, skills, and experience  
- **Projects Gallery** with screenshots and links to GitHub demos  
- **Extracurriculars & Involvement** (PSSC, Purdue Rock Climbing Club, etc.)  
- **Contact Icons** linking to GitHub, LinkedIn, Email, and Instagram  
- **Responsive** design with Tailwind CSS, mobile-first layouts  

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) (App Router)  
- React & Tailwind CSS  
- Lottie animations 
- Deployed on [Vercel](https://vercel.com/) with automatic CI/CD  


### Installation

```bash
# Clone this repo
git clone https://github.com/ObviAvi/avi-website.git
cd avi-website

# Install dependencies
npm install
```

### Development

```bash
# Start the Next.js dev server
npm run dev
```

Open your browser at `http://localhost:3000` to see your site. Changes hot-reload automatically.

### Building & Deployment

```bash
# Create a production build
npm run build

# Preview locally
npm run start
```

## ⚙️ Customization

- **Title & Meta**: In `app/head.js` or `layout.js` via the `metadata` export  
- **Favicon**: Replace `/public/A.ico` (and related entries in `metadata.icons`)  
- **Fonts**: Tweak Google Font imports in `layout.js`  
- **Theme**: Modify colors and spacing in `globals.css` or Tailwind config  

## 📫 Contact

- GitHub: [ObviAvi](https://github.com/ObviAvi)  
- LinkedIn: [avi-aggarwal-75275828b](https://www.linkedin.com/in/avi-aggarwal-75275828b/)  
- Email: aggarwal.avi@gmail.com  
- Instagram: [aviaggarwall](https://www.instagram.com/aviaggarwall/)  

---
