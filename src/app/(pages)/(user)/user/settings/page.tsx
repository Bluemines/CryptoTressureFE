"use client";

import AccountTab from "@/app/components/tabs/AccountTab";
import SecurityTab from "@/app/components/tabs/SecurityTab";
import WalletTab from "@/app/components/tabs/WalletTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { User, Shield, Wallet } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white py-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-[#1A1A1D] border-b border-gray-800">
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="wallet" className="gap-2">
              <Wallet className="h-4 w-4" />
              Wallet
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="account">
              <AccountTab />
            </TabsContent>
            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>
            <TabsContent value="wallet">
              <WalletTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
