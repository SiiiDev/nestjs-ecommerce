import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import api from '../lib/axios'

export type CartItem = {
  id: string
  bookId: string
  title: string
  price: number
  cover?: string | null
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  loading: boolean
  open: () => void
  close: () => void
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>, qty?: number) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clear: () => Promise<void>
  total: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      try {
        const res = await api.get('/cart')
        const cartItems = (res.data || []).map((it: any) => ({
          id: it.id,
          bookId: it.bookId,
          title: it.book.title,
          price: it.book.price,
          cover: it.book.cover,
          quantity: it.quantity,
        }))
        setItems(cartItems)
      } catch (err) {
        console.error('Failed to load cart:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const addItem = async (item: Omit<CartItem, 'quantity' | 'id'>, qty = 1) => {
    try {
      await api.post('/cart', { bookId: item.bookId, quantity: qty })
      // Refresh cart from backend
      const res = await api.get('/cart')
      const cartItems = (res.data || []).map((it: any) => ({
        id: it.id,
        bookId: it.bookId,
        title: it.book.title,
        price: it.book.price,
        cover: it.book.cover,
        quantity: it.quantity,
      }))
      setItems(cartItems)
      setIsOpen(true)
    } catch (err) {
      console.error('Failed to add item:', err)
    }
  }

  const removeItem = async (id: string) => {
    try {
      await api.delete(`/cart/${id}`)
      setItems((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Failed to remove item:', err)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id)
      return
    }
    try {
      await api.patch(`/cart/${id}`, { quantity })
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)))
    } catch (err) {
      console.error('Failed to update quantity:', err)
    }
  }

  const clear = async () => {
    try {
      await api.delete('/cart')
      setItems([])
    } catch (err) {
      console.error('Failed to clear cart:', err)
    }
  }

  const total = () => items.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <CartContext.Provider value={{ items, isOpen, loading, open, close, addItem, removeItem, updateQuantity, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
