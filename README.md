# NoteVerse

<p align="center">
  <img src="app/favicon.ico" />
</p>

NoteVerse is a modern note-taking application that allows users to capture, organize, and collaborate on notes in real-time. Built with Next.js, TailwindCSS, and ShadCN UI components.

## Features

- 📝 Rich text editing with markdown support
- 🎨 Dark/Light mode support
- 🏷️ Tag-based organization
- 📌 Pin important notes
- 🔔 Set reminders for notes
- 👥 Real-time collaboration
- 🔐 Secure authentication
- 📱 Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com) - UI component library
- [React Quill](https://github.com/zenoamaro/react-quill) - Rich text editor
- [Headless UI](https://headlessui.com/) - Unstyled UI components

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/tranvu14/note-taker.git
cd note-taker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
frontend/
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript types
│   └── config/        # Configuration files
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.