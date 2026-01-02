"use client";
import { useState } from "react";

// Placeholder components - you'll need to create these or import from their actual locations
const RolePermission = () => (
  <div>
    <h1 className="text-2xl font-semibold text-black">Roles & Permissions</h1>
    <p className="mt-1 text-gray-600 text-base">Manage user roles and permissions</p>
    {/* Add roles and permissions content here */}
  </div>
);

const SystemLogs = () => (
  <div>
    <h1 className="text-2xl font-semibold text-black">System Logs</h1>
    <p className="mt-1 text-gray-600 text-base">View and monitor system activity logs</p>
    {/* Add system logs content here */}
  </div>
);

interface SecuritySettings {
  twoFactor: boolean;
  passwordExpiry: number;
  autoLogout: boolean;
  sessionTimeout: number;
  blockFailedLogins: boolean;
  maxFailedAttempts: number;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  inApp: boolean;
  promotions: boolean;
  customPrintShop: boolean;
  paymentNotifications: boolean;
}

export default function SystemSetting() {
  const [activeTab, setActiveTab] = useState("Notificatin Setting");
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactor: false,
    passwordExpiry: 60,
    autoLogout: false,
    sessionTimeout: 30,
    blockFailedLogins: false,
    maxFailedAttempts: 5,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    sms: false,
    inApp: false,
    promotions: false,
    customPrintShop: false,
    paymentNotifications: false,
  });

  const handleSecuritySettingChange = (key: keyof SecuritySettings, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveChanges = () => {
    // Implement save functionality here
    console.log("Saving settings:", { securitySettings, notificationSettings });
    // You can add API call here to save settings
  };

  const TabButton = ({ 
    tabKey, 
    label, 
    isActive 
  }: { 
    tabKey: string; 
    label: string; 
    isActive: boolean; 
  }) => (
    <button
      className={`flex-1 py-2 px-4 rounded-full hover:bg-[#f0f2f7] transition-colors ${
        isActive ? "bg-[#e6e9f2] text-[12px] font-semibold" : "text-[11px] font-normal"
      }`}
      type="button"
      onClick={() => setActiveTab(tabKey)}
    >
      {label}
    </button>
  );

  const ToggleSwitch = ({ 
    id, 
    checked, 
    onChange,
    label
  }: { 
    id: string; 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    label?: string;
  }) => (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        id={id} 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#0B0B3B] transition-all duration-1000 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-1000"></div>
      {label && <span className="ml-3 text-sm font-normal text-black">{label}</span>}
    </label>
  );

  const NumberInput = ({ 
    value, 
    onChange, 
    min = 0, 
    helperText 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    min?: number; 
    helperText?: string; 
  }) => (
    <div>
      <input 
        type="number" 
        min={min}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full max-w-[200px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" 
      />
      {helperText && (
        <p className="text-xs text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );

  const NotificationCard = ({
    title,
    description,
    checked,
    onChange,
    id
  }: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    id: string;
  }) => (
    <div className="border border-gray-300 rounded-lg bg-[#F5F8FA] p-4 mb-4 flex justify-between items-center">
      <div className="flex-1 pr-4">
        <p className="font-semibold text-black text-sm mb-1">{title}</p>
        <p className="text-gray-600 text-sm font-normal">{description}</p>
      </div>
      <ToggleSwitch
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg border border-[#d9d9d9] max-w-7xl mx-auto">
        <div className="p-6">
          {/* Header */}
          <div className="py-5 max-w-full">
            <h1 className="text-black text-2xl font-semibold leading-tight">Settings</h1>
            <p className="text-black text-base font-sans mt-1 leading-snug">
              Manage your account preferences, notifications, and security settings.
            </p>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex text-[11px] font-normal text-[#000000cc] border border-[#d9d9d9] rounded-full mx-4 my-3 overflow-hidden select-none py-1 px-1">
            <TabButton tabKey="Notificatin Setting" label="Notification Setting" isActive={activeTab === "Notificatin Setting"} />
            <TabButton tabKey="Account Privacy" label="Account Privacy" isActive={activeTab === "Account Privacy"} />
          </nav>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Notificatin Setting" && (
              <main className="mx-auto bg-[#F5F8FA] rounded-xl p-6 shadow-sm">
                <div className="mb-8">
                  <h1 className="text-black text-2xl font-semibold mb-2">Notification Settings</h1>
                </div>

                <section className="space-y-6">
                  <div>
                    <h2 className="text-black text-lg font-semibold mb-4">Order Updates</h2>

                    {/* Communication Channels */}
                    <div className="border border-gray-300 rounded-lg bg-[#F5F8FA] p-6 mb-6 col-span-12 xl:col-span-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <p className="font-semibold text-black text-base mb-1">Communication Channels</p>
                          <p className="text-gray-600 text-sm">Select how you receive order updates.</p>
                        </div>
                        <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-black text-sm font-medium">Email</span>
                          <ToggleSwitch
                            id="email-toggle"
                            checked={notificationSettings.email}
                            onChange={(checked) => handleNotificationSettingChange('email', checked)}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm font-normal">SMS</span>
                          <ToggleSwitch
                            id="sms-toggle"
                            checked={notificationSettings.sms}
                            onChange={(checked) => handleNotificationSettingChange('sms', checked)}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm font-normal pr-3">In-app</span>
                          <ToggleSwitch
                            id="inapp-toggle"
                            checked={notificationSettings.inApp}
                            onChange={(checked) => handleNotificationSettingChange('inApp', checked)}
                          />
                        </div>
                      </div>
                      </div>
                      
                      
                    </div>

                    {/* Other Notification Settings */}
                    <div className="space-y-4">
                      <NotificationCard
                        title="Promotions"
                        description="Receive news about new products and special offers."
                        checked={notificationSettings.promotions}
                        onChange={(checked) => handleNotificationSettingChange('promotions', checked)}
                        id="promotions-toggle"
                      />

                      <NotificationCard
                        title="Custom Print Shop Messages"
                        description="Get messages from print shops regarding your orders."
                        checked={notificationSettings.customPrintShop}
                        onChange={(checked) => handleNotificationSettingChange('customPrintShop', checked)}
                        id="custom-print-toggle"
                      />

                      <NotificationCard
                        title="Payment Notifications"
                        description="Receive notifications for payment events."
                        checked={notificationSettings.paymentNotifications}
                        onChange={(checked) => handleNotificationSettingChange('paymentNotifications', checked)}
                        id="payment-toggle"
                      />
                    </div>
                  </div>

                </section>
              </main>
            )}

            {activeTab === "Account Privacy" && (
            <main className="bg-[#f1f5f9] rounded-xl p-6 w-full max-w-3xl">
                <section className="mb-8">
                <h2 className="text-lg font-normal mb-4">Change Password</h2>
                <form>
                    <div className="mb-6 max-w-xs">
                    <label htmlFor="current-password" className="block mb-1 text-sm font-normal text-black">
                        Create Password
                    </label>
                    <input
                        id="current-password"
                        type="password"
                        placeholder="enter current password"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                    />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mb-6">
                    <div className="flex-1 min-w-0">
                        <label htmlFor="new-password" className="block mb-1 text-sm font-normal text-black">
                            New Password
                        </label>
                        <input
                        id="new-password"
                        type="password"
                        placeholder="enter new password"
                        className="w-full rounded-md border border-gray-300 px-3 bg-white py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <label htmlFor="confirm-password" className="block mb-1 text-sm font-normal text-black">
                            Confirm Password
                        </label>
                        <input
                        id="confirm-password"
                        type="password"
                        placeholder="Re-enter new password"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        />
                    </div>
                    </div>
                    <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#0a0a3a] text-white text-sm rounded-lg px-5 py-2.5"
                    >
                        Update Password
                    </button>
                    </div>
                </form>
                </section>

                <hr className="border-gray-300 mb-6" />

                <section>
                <h2 className="text-lg font-normal mb-4">Delete Account</h2>
                <div
                    className="border border-red-400 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                    <div>
                    <p className="text-red-500 font-semibold text-sm mb-1">Delete Account</p>
                    <p className="text-gray-600 text-sm max-w-md">
                        Permanently delete your account and all associated data.
                    </p>
                    </div>
                    <button
                    type="button"
                    className="bg-red-500 text-white text-sm rounded-lg px-5 py-2.5 flex items-center gap-2 whitespace-nowrap"
                    >
                    <i className="fas fa-trash-alt"></i> Delete Account
                    </button>
                </div>
                </section>
            </main>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
