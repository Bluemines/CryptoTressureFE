import { useState } from "react";

const SecurityTab = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const Button = ({
    children,
    className = "",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="bg-[#1A1A1D] rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Security</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Current Password</label>
          {/* <Input
            type="password"
            placeholder="Enter your current password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="bg-[#1E1E22] border-gray-700"
          /> */}
          <input
            type="text"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            placeholder="Enter your price"
            className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">New Password</label>
            {/* <Input
              type="password"
              placeholder="Enter your new password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="bg-[#1E1E22] border-gray-700"
            /> */}
            <input
              type="text"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              placeholder="Enter your price"
              className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Confirm Password</label>
            {/* <Input
              type="password"
              placeholder="Confirm your new password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="bg-[#1E1E22] border-gray-700"
            /> */}
            <input
              type="text"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              placeholder="Enter your price"
              className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
      </div>

      <Button className="bg-[#7367f0] hover:bg-purple-700 w-20 h-7 text-white">
        Update
      </Button>
    </div>
  );
};

export default SecurityTab;
