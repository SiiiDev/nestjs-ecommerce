const Header = () => {
  return (
    <>
      <div className="bg-dark text-white text-center py-2 text-sm font-medium px-4">
        <p>🎉 Free shipping on orders over $50! Use code: READMORE</p>
    </div>

    <header className="bg-white border-b border-gray-200 py-5 sticky top-0 z-50">
        <div className="max-w-container mx-auto px-6 flex flex-wrap items-center justify-between gap-4 md:gap-8">
            
            <a href="#" className="font-serif text-2xl font-black text-dark tracking-tight whitespace-nowrap">
                Chapter & Verse.
            </a>

            <div className="relative flex-grow max-w-xl order-last md:order-none w-full md:w-auto mt-3 md:mt-0">
                <input type="text" placeholder="Search by title, author, or ISBN..." 
                       className="w-full py-3 pl-5 pr-12 border border-gray-200 rounded-full bg-cream-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary text-lg">
                    <i className="fas fa-search"></i>
                </button>
            </div>

            <nav className="flex items-center gap-6 font-semibold text-dark">
                <a href="#" className="hidden md:block hover:text-primary transition-colors">Genres</a>
                <a href="#" className="hidden md:block hover:text-primary transition-colors">Bestsellers</a>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                    <i className="far fa-user"></i> <span className="hidden sm:inline">Sign In</span>
                </a>
                <a href="#" className="relative hover:text-primary transition-colors">
                    <i className="fas fa-shopping-bag text-xl"></i> 
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
                </a>
            </nav>
        </div>
    </header>
    </>
  )
}

export default Header
