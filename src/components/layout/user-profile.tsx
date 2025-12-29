"use client";

import React, { useEffect, useState } from 'react';
import { ChevronRight, User, Package, MapPin, CreditCard, Settings, HelpCircle, LogOut, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface User {
    name?: string;
    contact?: string;
    email?: string;
    city?: string;
    role?: string;
}

const UserProfile: React.FC = () => {
    const router = useRouter();
    const BASEURL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
    const [user, setUser] = useState<User | null>(null);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    

    const logout = async (): Promise<void> => {
        try {
            await fetch(`${BASEURL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            Cookies.remove("client_token_user", { path: "/" });
            localStorage.clear();
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleLogoutClick = () => {
        setShowLogoutDialog(true);
    };

    const handleConfirmLogout = () => {
        setShowLogoutDialog(false);
        logout();
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("userdata");
        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);
        }
    }, []);

    const menuItems = [
        { icon: User, label: 'Personal Information', onClick: () => router.push("/dashboard/user/profile/personal-info") },
        // { icon: Package, label: 'My Orders', onClick: () => console.log('My Orders') },
        { icon: BookOpen, label: 'Terms and Condition', onClick: () => router.push("/dashboard/user/profile/terms") },
        // { icon: CreditCard, label: 'Payment Methods', onClick: () => console.log('Payment Methods') },
         // { icon: Settings, label: 'Settings', onClick: () => console.log('Settings') },
        { icon: HelpCircle, label: 'Help & Support', onClick: () => router.push("/dashboard/user/profile/help") },
        { icon: LogOut, label: 'Logout', onClick: handleLogoutClick, isLogout: true },
    ];

    return (
        <div className="min-h-screen bg-pvr pb-40">
            {/* Header with Profile */}
            <div className="bg-white pt-12 pb-6 px-6 rounded-b-3xl shadow-sm">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-4 border-gray-100">
                        <img 
                            className="w-full h-full object-cover" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0a0iDtUPUzs0GFM6DSuovK0uOE4-Sc40Pg&s" 
                            alt="Profile"
                        />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">{user?.name || 'Sophia Williams'}</h1>
                    <p className="text-sm text-gray-500 mt-1">{user?.email || 'sophia@gmail.com'}</p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="mt-6 px-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className={`w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors ${
                                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`${item.isLogout ? 'text-red-500' : 'text-gray-700'}`}>
                                    <item.icon size={22} strokeWidth={1.5} />
                                </div>
                                <span className={`text-base ${item.isLogout ? 'text-red-500' : 'text-gray-900'}`}>
                                    {item.label}
                                </span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" strokeWidth={2} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to logout? You'll need to sign in again to access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setShowLogoutDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleConfirmLogout}
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserProfile;