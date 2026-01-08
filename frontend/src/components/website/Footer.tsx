const Footer = () => {
  return (
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
  )
}

export default Footer
