import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variant?: string; // e.g., "Color: Blue, Size: M"
}

const CartPage = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'item1', name: 'SynergyTech X1 Carbon Laptop', price: 1299.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100?laptop,cart1', variant: '1TB SSD, 16GB RAM' },
    { id: 'item2', name: 'Wireless Pro Headphones', price: 149.99, quantity: 2, imageUrl: 'https://source.unsplash.com/random/100x100?headphones,cart2' },
    { id: 'item3', name: 'Smart Fitness Tracker X5', price: 79.00, quantity: 1, imageUrl: 'https://source.unsplash.com/random/100x100?smartwatch,cart3', variant: 'Color: Black' },
  ]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 ? 0 : 10; // Example: Free shipping over $50
  const total = subtotal + shippingCost;

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <NavigationMenu cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} isLoggedIn={true}/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
            <Card className="text-center py-12">
                <CardContent>
                    <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Button asChild>
                        <Link to="/products">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px] sm:w-auto">Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input type="number" value={item.quantity} readOnly className="w-12 h-8 text-center" />
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <hr/>
                <div className="flex justify-between font-semibold text-lg text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                 <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
                <CardHeader><CardTitle className="text-base">Special Instructions</CardTitle></CardHeader>
                <CardContent>
                    <Textarea placeholder="Add a note to your order..." />
                </CardContent>
            </Card>
          </div>
        </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;