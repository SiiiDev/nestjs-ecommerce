import React, { useEffect, useState } from 'react'
import api from '../lib/axios'
import Spinner from '../components/Spinner'
import { useCart } from '../context/CartContext'

type Book = {
    id: string
    title: string
    price: number
    cover?: string | null
}

const Accueil = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { addItem } = useCart()

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await api.get('/books', { params: { page: 1, limit: 4 } })
                // Backend returns { data: Book[], meta: { ... } }
                const payload = res.data
                if (Array.isArray(payload)) {
                    setBooks(payload)
                } else if (payload && Array.isArray(payload.data)) {
                    setBooks(payload.data)
                } else {
                    setBooks([])
                }
            } catch (err: any) {
                setError(err?.response?.data?.message || err.message || 'Failed to load books')
            } finally {
                setLoading(false)
            }
        }
        fetchBooks()
    }, [])

    const baseURL = api.defaults.baseURL || ''

    return (
        <>
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
                    {loading ? (
                        <div className="col-span-2 lg:col-span-4 flex justify-center items-center py-12">
                            <Spinner size={48} />
                        </div>
                    ) : error ? (
                        <div className="col-span-2 lg:col-span-4 text-center text-red-600">{error}</div>
                    ) : (
                        books?.map((book) => {
                            const imgSrc = book.cover ? `${baseURL}/uploads/${book.cover}` : `https://via.placeholder.com/300x450?text=${encodeURIComponent(book.title)}`
                            return (
                                <div className="group transition-transform hover:-translate-y-1" key={book.id}>
                                    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all mb-4 aspect-[2/3]">
                                        <img src={imgSrc} alt={book.title} className="w-full h-full object-cover" />
                                        <button onClick={() => addItem({ bookId: book.id, title: book.title, price: book.price, cover: book.cover })} className="absolute bottom-0 left-0 w-full py-3 bg-white/95 text-dark font-semibold hover:bg-primary hover:text-white transition-all translate-y-full group-hover:translate-y-0">
                                            Add to Cart
                                        </button>
                                    </div>
                                    <div>
                                        <a href="#" className="block font-serif font-bold text-lg truncate mb-1 hover:text-primary">{book.title}</a>
                                        <a href="#" className="block text-sm text-gray-500 mb-2 hover:underline">Unknown Author</a>
                                        <div className="font-bold text-primary-dark">${book.price?.toFixed ? book.price.toFixed(2) : book.price}</div>
                                    </div>
                                </div>
                            )
                        })
                    )}
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

    </>
  )
}

export default Accueil
