# Marlowby

**Explore your city, one box at a time.**

Marlowby is a subscription box website. Each month, members receive products and cultural experiences made by independent businesses in one featured U.S. city. This repository is the front end for the site, built as an entry for the Business Professionals of America Website Design and Development Team event.

Live site: https://marlowby-11c55.web.app

## Features

- **City boxes:** Browse featured cities with a photo, description, and a list of every item in the box, grouped by type and with a maker for each.
- **Filter and search:** Filter cities by region and search cities and items with typo-tolerant search.
- **Subscription plans:** Silver, Gold, and Platinum plans with a comparison table and a questions section.
- **Accounts:** Sign up, log in, and log out. A welcome page confirms the plan, previews the first box, and saves a shipping address.
- **Partner form:** Local businesses can send their details from the About page.
- **Accessibility:** Skip link, labeled form fields, visible keyboard focus, readable contrast, screen reader messages for form results, and reduced motion support. See the Accessibility page on the site.

## Tech stack

| Part | Tool |
| --- | --- |
| Interface | React 19 |
| Build tool | Vite |
| Routing | React Router |
| Styling | Tailwind CSS v4 |
| Search | Fuse.js |
| Accounts and hosting | Firebase Authentication and Firebase Hosting |

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```
git clone https://github.com/ScrewVolt/Marlowby.git
cd Marlowby
npm install
npm run dev
```

Open the address that the terminal prints, usually http://localhost:5173.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the site locally with live reload |
| `npm run build` | Builds the finished site into the `dist` folder |
| `npm run preview` | Serves the built site locally so you can test it |

## Accounts: demo mode and Firebase

The site works with no setup. Without Firebase settings it runs in **demo mode**, where accounts are stored in your own browser. A yellow notice on the sign-up page tells you when demo mode is on. To try it quickly, log in with:

- Email: `demo@marlowby.test`
- Password: `Marlowby2026!`

### Turning on Firebase

1. Create a project at the [Firebase console](https://console.firebase.google.com).
2. Open Project settings, then register a web app, and copy its config values.
3. Under Authentication, open Sign-in method and enable **Email/Password**.
4. Copy `.env.example` to a new file named `.env` and fill in the values:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

5. Restart `npm run dev`. The demo mode notice disappears.

The `.env` file is ignored by Git. Firebase web keys are not secret, but keep the file out of the repository anyway.

## Deploying to Firebase Hosting

```
npm install -g firebase-tools
firebase login
firebase use <your-project-id>
npm run build
firebase deploy --only hosting
```

Run the build with your `.env` file in place, or the live site will fall back to demo mode. After deploying, replace the domain in `public/sitemap.xml` and `public/robots.txt` with your own.

## Project structure

```
public/            Files copied as they are: logo, favicons, city photos, robots.txt, sitemap.xml
src/
  main.jsx         Starts the app and turns on page routing
  App.jsx          The list of pages and their web addresses
  index.css        Colors, fonts, and shared styles for buttons, forms, and cards
  auth.js          Sign up, log in, log out (demo mode or Firebase)
  data/
    cities.js      All city and box content, in one place
    plans.js       The three plans, their prices, and their perks
  components/      Pieces used on many pages: Layout, Header, Footer, SearchBox, CityPhoto
  pages/           One file per page: Home, Cities, CityDetail, Plans, SignUp, Welcome,
                   About, Accessibility, NotFound
```

To change a price, perk, city, or item, edit the files in `src/data/`. Every page reads from them.

## Content notes

- City names and photos are real places. The businesses, products, and makers shown in each box are fictional examples created for this project.
- Plan perks such as early city announcements and city voting describe the planned service. They are not built features in this version.
- There is no payment step. A production version would add a payment provider.

## Credits

- Fonts: Fraunces and Inter, served by Google Fonts under the SIL Open Font License.
- Libraries: React, Vite, React Router, Tailwind CSS, Fuse.js, and Firebase, each under its own license.
- Photographs and logo: credited in the project's Works Cited.
