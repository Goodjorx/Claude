export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: "1px solid #1e2433" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">
            JS<span className="text-indigo-400">.</span>
          </span>
          <span className="text-gray-600 text-sm">
            © {year} Jordi Segura Pons
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/jordisegurapons"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/jordisegurap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition-colors text-sm"
          >
            Instagram
          </a>
          <a
            href="https://centeia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition-colors text-sm"
          >
            CenteIA
          </a>
        </div>
      </div>
    </footer>
  );
}
