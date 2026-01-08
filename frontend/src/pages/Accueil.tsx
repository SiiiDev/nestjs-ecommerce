import React from 'react'

const Accueil = () => {
  return (
    <body className="bg-cream text-dark font-sans leading-relaxed">

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

    <section className="relative bg-gray-900 text-white py-32 text-center px-6 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"}}>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl font-black mb-6 leading-tight">Find your next great escape.</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">Discover the best new releases, curated classics, and hidden gems delivered to your door.</p>
            <a href="#" className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md">
                Shop New Arrivals
            </a>
        </div>
    </section>

    <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
                <i className="fas fa-shipping-fast text-3xl text-primary"></i>
                <div>
                    <h4 className="font-bold text-dark mb-1">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">Order by 2PM for same-day dispatch.</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <i className="fas fa-book-open text-3xl text-primary"></i>
                <div>
                    <h4 className="font-bold text-dark mb-1">Curated Selection</h4>
                    <p className="text-sm text-gray-600">Hand-picked titles by human readers.</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <i className="fas fa-shield-alt text-3xl text-primary"></i>
                <div>
                    <h4 className="font-bold text-dark mb-1">Secure Checkout</h4>
                    <p className="text-sm text-gray-600">Worry-free encrypted payments.</p>
                </div>
            </div>
        </div>
    </section>

    <section className="py-20 px-6">
        <div className="max-w-container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark">Trending Right Now</h2>
                <a href="#" className="font-semibold text-primary flex items-center gap-2 hover:underline">
                    View All Bestsellers <i className="fas fa-arrow-right"></i>
                </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                <div className="group transition-transform hover:-translate-y-1">
                    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all mb-4 aspect-[2/3]">
                        <img src="https://via.placeholder.com/300x450/333/FFF?text=The+Midnight+Library" alt="Book Title" className="w-full h-full object-cover" />
                        <button className="absolute bottom-0 left-0 w-full py-3 bg-white/95 text-dark font-semibold hover:bg-primary hover:text-white transition-all translate-y-full group-hover:translate-y-0">
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        <a href="#" className="block font-serif font-bold text-lg truncate mb-1 hover:text-primary">The Midnight Library</a>
                        <a href="#" className="block text-sm text-gray-500 mb-2 hover:underline">Matt Haig</a>
                        <div className="font-bold text-primary-dark">$14.99 <span className="text-gray-400 line-through font-normal text-sm ml-2">$18.00</span></div>
                    </div>
                </div>
                 <div className="group transition-transform hover:-translate-y-1">
                    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all mb-4 aspect-[2/3]">
                        <img src="https://via.placeholder.com/300x450/4a5/FFF?text=Project+Hail+Mary" alt="Book Title" className="w-full h-full object-cover" />
                        <button className="absolute bottom-0 left-0 w-full py-3 bg-white/95 text-dark font-semibold hover:bg-primary hover:text-white transition-all translate-y-full group-hover:translate-y-0">
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        <a href="#" className="block font-serif font-bold text-lg truncate mb-1 hover:text-primary">Project Hail Mary</a>
                        <a href="#" className="block text-sm text-gray-500 mb-2 hover:underline">Andy Weir</a>
                        <div className="font-bold text-primary-dark">$16.50</div>
                    </div>
                </div>
                 <div className="group transition-transform hover:-translate-y-1">
                    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all mb-4 aspect-[2/3]">
                        <img src="https://via.placeholder.com/300x450/667/FFF?text=Klara+and+the+Sun" alt="Book Title" className="w-full h-full object-cover" />
                        <button className="absolute bottom-0 left-0 w-full py-3 bg-white/95 text-dark font-semibold hover:bg-primary hover:text-white transition-all translate-y-full group-hover:translate-y-0">
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        <a href="#" className="block font-serif font-bold text-lg truncate mb-1 hover:text-primary">Klara and the Sun</a>
                        <a href="#" className="block text-sm text-gray-500 mb-2 hover:underline">Kazuo Ishiguro</a>
                        <div className="font-bold text-primary-dark">$15.20</div>
                    </div>
                </div>
                 <div className="group transition-transform hover:-translate-y-1">
                    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all mb-4 aspect-[2/3]">
                        <img src="https://via.placeholder.com/300x450/822/FFF?text=Dune" alt="Book Title" className="w-full h-full object-cover" />
                        <button className="absolute bottom-0 left-0 w-full py-3 bg-white/95 text-dark font-semibold hover:bg-primary hover:text-white transition-all translate-y-full group-hover:translate-y-0">
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        <a href="#" className="block font-serif font-bold text-lg truncate mb-1 hover:text-primary">Dune</a>
                        <a href="#" className="block text-sm text-gray-500 mb-2 hover:underline">Frank Herbert</a>
                        <div className="font-bold text-primary-dark">$12.99</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="py-20 px-6 bg-cream-dark">
        <div className="max-w-container mx-auto">
            <div className="text-center mb-10">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Browse by Genre</h2>
                <p className="text-gray-600">Dive into your favorite category.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <a href="#" className="group relative h-56 rounded-lg overflow-hidden bg-cover bg-center flex items-center justify-center" style={{backgroundImage: "url('https://source.unsplash.com/random/400x300?fantasy')"}}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 group-hover:scale-105 transition-all duration-300"></div>
                    <h3 className="relative z-10 text-white font-serif font-bold text-2xl text-shadow">Fantasy & Sci-Fi</h3>
                </a>
                 <a href="#" className="group relative h-56 rounded-lg overflow-hidden bg-cover bg-center flex items-center justify-center" style={{backgroundImage: "url('https://source.unsplash.com/random/400x300?history')"}}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 group-hover:scale-105 transition-all duration-300"></div>
                    <h3 className="relative z-10 text-white font-serif font-bold text-2xl text-shadow">Biography & History</h3>
                </a>
                 <a href="#" className="group relative h-56 rounded-lg overflow-hidden bg-cover bg-center flex items-center justify-center" style={{backgroundImage: "url('https://source.unsplash.com/random/400x300?crime')"}}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 group-hover:scale-105 transition-all duration-300"></div>
                    <h3 className="relative z-10 text-white font-serif font-bold text-2xl text-shadow">Mystery & Thriller</h3>
                </a>
                 <a href="#" className="group relative h-56 rounded-lg overflow-hidden bg-cover bg-center flex items-center justify-center" style={{backgroundImage: "url('https://source.unsplash.com/random/400x300?cooking')"}}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 group-hover:scale-105 transition-all duration-300"></div>
                    <h3 className="relative z-10 text-white font-serif font-bold text-2xl text-shadow">Cookbooks</h3>
                </a>
            </div>
        </div>
    </section>

    <section className="py-20 px-6 bg-dark text-center text-white">
        <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Stay in the loop.</h2>
            <p className="text-gray-300 mb-8">Sign up for our weekly newsletter to get book recommendations, author interviews, and an exclusive 10% off your next order.</p>
            <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
                <input type="email" placeholder="Enter your email address" className="flex-1 py-3 px-5 rounded text-dark focus:outline-none" />
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded transition-all hover:-translate-y-1">Subscribe</button>
            </form>
        </div>
    </section>

    <footer className="bg-white pt-20 pb-8 px-6 border-t border-gray-200">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
                <a href="#" className="font-serif text-2xl font-black text-dark tracking-tight mb-5">Chapter & Verse.</a>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">Your independent online bookstore. Connecting readers with stories since 2023.</p>
            </div>
            <div>
                <h4 className="font-bold text-dark mb-5">Shop</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-primary transition-colors">Bestsellers</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Sale</a></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-dark mb-5">Help</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start">
                <h4 className="font-bold text-dark mb-5">Follow Us</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-cream-dark flex items-center justify-center rounded-full text-dark hover:bg-primary hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="w-10 h-10 bg-cream-dark flex items-center justify-center rounded-full text-dark hover:bg-primary hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="w-10 h-10 bg-cream-dark flex items-center justify-center rounded-full text-dark hover:bg-primary hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
                </div>
            </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-200 text-gray-500 text-sm">
            <p>© 2023 Chapter & Verse Bookstore. All rights reserved.</p>
        </div>
    </footer>

</body>
  )
}

export default Accueil
