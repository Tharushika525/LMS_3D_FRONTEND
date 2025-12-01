"use client";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                FS
              </div>
              <div>
                <div className="font-bold text-xl text-white">FutureSkills</div>
                <div className="text-sm text-gray-400">Learn. Grow. Succeed.</div>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering learners worldwide with high-quality education. Master new skills, advance your career, and achieve your goals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Learn</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Browse Courses</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Become an Instructor</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex items-center justify-between text-gray-400">
          <div>© 2025 FutureSkills. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
