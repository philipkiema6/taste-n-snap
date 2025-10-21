import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuItemType } from "./MenuItem";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartProps) => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setCustomerEmail(session.user.email || "");
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", session.user.id)
          .single();
        
        if (profile) {
          setCustomerName(profile.full_name || "");
          setCustomerPhone(profile.phone || "");
        }
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (!isOpen || paypalLoaded || items.length === 0) return;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
    script.addEventListener("load", () => setPaypalLoaded(true));
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isOpen, paypalLoaded, items.length]);

  useEffect(() => {
    if (!paypalLoaded || !window.paypal || items.length === 0) return;

    const container = document.getElementById("paypal-button-container");
    if (!container) return;

    container.innerHTML = "";

    window.paypal
      .Buttons({
        createOrder: (_data: any, actions: any) => {
          if (!customerEmail || !customerName) {
            toast.error("Please fill in your contact information");
            return;
          }

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: subtotal.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (_data: any, actions: any) => {
          setProcessing(true);
          try {
            const details = await actions.order.capture();
            
            const { data: orderData, error: orderError } = await supabase
              .from("orders")
              .insert({
                user_id: user?.id || null,
                customer_email: customerEmail,
                customer_name: customerName,
                customer_phone: customerPhone || null,
                total_amount: subtotal,
                paypal_transaction_id: details.id,
                paypal_payer_id: details.payer.payer_id,
                status: "pending",
              })
              .select()
              .single();

            if (orderError) throw orderError;

            const orderItems = items.map((item) => ({
              order_id: orderData.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            }));

            const { error: itemsError } = await supabase
              .from("order_items")
              .insert(orderItems);

            if (itemsError) throw itemsError;

            onCheckout();
            onClose();
            navigate(`/order-confirmation?orderId=${orderData.id}`);
          } catch (error: any) {
            console.error("Error saving order:", error);
            toast.error("Failed to save order. Please contact support.");
          } finally {
            setProcessing(false);
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err);
          toast.error("Payment failed. Please try again.");
          setProcessing(false);
        },
      })
      .render("#paypal-button-container");
  }, [paypalLoaded, items, customerEmail, customerName, customerPhone, user, navigate, onCheckout, onClose, subtotal]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-card shadow-2xl z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-card-foreground">Your Cart</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-2">Add some delicious items to get started!</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-background rounded-lg p-4 shadow-card animate-scale-up"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-card-foreground mb-1">
                            {item.name}
                          </h3>
                          <p className="text-primary font-bold">
                            ${item.price.toFixed(2)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Information & Checkout */}
                <div className="border-t border-border pt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="customer-name">Full Name *</Label>
                        <Input
                          id="customer-name"
                          type="text"
                          placeholder="John Doe"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="customer-email">Email *</Label>
                        <Input
                          id="customer-email"
                          type="email"
                          placeholder="you@example.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="customer-phone">Phone (optional)</Label>
                        <Input
                          id="customer-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal:</span>
                    <span className="text-primary">${subtotal.toFixed(2)}</span>
                  </div>

                  {processing ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">Processing payment...</p>
                    </div>
                  ) : (
                    <>
                      <div id="paypal-button-container"></div>
                      {!import.meta.env.VITE_PAYPAL_CLIENT_ID && (
                        <Button
                          className="w-full"
                          onClick={() => {
                            toast.error("PayPal is not configured yet. Please add your PayPal Client ID in the project secrets.");
                          }}
                        >
                          Checkout with PayPal
                        </Button>
                      )}
                    </>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment powered by PayPal
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
