import React from 'react'
import { useCart } from '../../context/CartContext'

const CartDrawer: React.FC = () => {
  const { items, isOpen, close, updateQuantity, removeItem, total, loading } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-lg z-50">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-lg">Your cart</h3>
        <button onClick={close} className="text-gray-600 hover:text-dark">✕</button>
      </div>
      <div className="p-4 overflow-auto h-[calc(100vh-160px)]">
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Your cart is empty.</div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="flex gap-3 items-center mb-4 pb-4 border-b">
              <img src={it.cover ? `http://localhost:3000/uploads/${it.cover}` : `https://via.placeholder.com/80x120?text=${encodeURIComponent(it.title)}`} alt={it.title} className="w-16 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-sm truncate">{it.title}</div>
                <div className="text-sm text-gray-500">${it.price.toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="px-2 py-1 border text-sm hover:bg-gray-100">−</button>
                  <div className="px-2 text-sm">{it.quantity}</div>
                  <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-2 py-1 border text-sm hover:bg-gray-100">+</button>
                  <button onClick={() => removeItem(it.id)} className="ml-auto text-xs text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between font-semibold mb-4"><span>Total</span><span>${total().toFixed(2)}</span></div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-primary text-white rounded hover:bg-primary-dark">Checkout</button>
          <button className="flex-1 py-2 border rounded hover:bg-gray-50" onClick={close}>Continue Shopping</button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
