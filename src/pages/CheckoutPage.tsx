import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';
// For Form, if using shadcn's Form with react-hook-form:
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// Placeholder schema for react-hook-form
// const formSchema = z.object({
//   email: z.string().email(),
//   firstName: z.string().min(1, "First name is required"),
//   // ... more fields
// });

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  // const form = useForm({ resolver: zodResolver(formSchema), defaultValues: { email: "", firstName: "" }}); // Example
  // function onSubmit(values: z.infer<typeof formSchema>) { console.log(values); }

  const orderSummaryItems = [
    { name: 'SynergyTech X1 Carbon', quantity: 1, price: 1299.99, imageUrl: 'https://source.unsplash.com/random/60x60?laptop,checkout' },
    { name: 'Wireless Pro Headphones', quantity: 2, price: 149.99, imageUrl: 'https://source.unsplash.com/random/60x60?headphones,checkout' },
  ];
  const subtotal = orderSummaryItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.00;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + taxes;


  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu cartItemCount={3} isLoggedIn={true}/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Shipping & Payment Forms - lg:col-span-2 */}
          <form className="lg:col-span-2 space-y-8"> {/* Replace with <Form {...form}> if using shadcn Form */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Replace with <FormField> if using shadcn Form */}
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="12345" />
                </div>
                 <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country"><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2 flex items-center space-x-2 pt-2">
                    <Checkbox id="saveAddress" />
                    <Label htmlFor="saveAddress" className="text-sm font-normal">Save this information for next time</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="standard" className="space-y-3">
                  <Label className="flex items-center justify-between p-4 border rounded-md has-[:checked]:border-primary cursor-pointer">
                    <div className="flex items-center space-x-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-muted-foreground">5-7 business days - $15.00</p>
                        </div>
                    </div>
                  </Label>
                  <Label className="flex items-center justify-between p-4 border rounded-md has-[:checked]:border-primary cursor-pointer">
                     <div className="flex items-center space-x-3">
                        <RadioGroupItem value="express" id="express" />
                        <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-muted-foreground">2-3 business days - $30.00</p>
                        </div>
                    </div>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Simplified Payment Fields */}
                <div className="space-y-1.5">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="•••" />
                    </div>
                </div>
                 <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="billingSameAsShipping" defaultChecked />
                    <Label htmlFor="billingSameAsShipping" className="text-sm font-normal">Billing address is same as shipping</Label>
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" size="lg" className="w-full">Place Order</Button>
          </form>

          {/* Order Summary - lg:col-span-1 */}
          <Card className="lg:col-span-1 sticky top-24"> {/* Sticky for desktop */}
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderSummaryItems.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;