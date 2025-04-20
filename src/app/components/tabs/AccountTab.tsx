import Image from "next/image";
import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

const AccountTab = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    username: "john-doe1594",
    email: "johndoe21@example.com",
    phone: "0000-0000-000",
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
      <h2 className="text-xl font-semibold mb-4">Profile Details</h2>

      <div className="flex items-start gap-4">
        <Image alt="profile" src={require("../../assets/Images/profile.png")} />
        <div className="flex flex-row gap-5 mt-4">
          {/* <Button
            // onClick={onClick}
            className="w-full h-10 mt-6 bg-purple-600 hover:bg-purple-700"
          >
            Upload new photo
          </Button> */}
          <div className="bg-[#242330] cursor-pointer hover:bg-white hover:text-black text-[#7367f0] text-center pt-2 rounded-lg h-10 w-44">
            Upload new Photo
          </div>
          <div className="bg-[#323233] cursor-pointer hover:bg-purple-700 hover:text-white text-[#a8aaad] text-center pt-2 rounded-lg h-10 w-30">
            Reset
          </div>
          {/* <Button
            //    onClick={onClick}
            className="w-full h-10 mt-6 bg-purple-600 hover:bg-purple-700"
          >
            Reset
          </Button> */}
        </div>
      </div>
      <p className="text-sm text-gray-400">
        Allowed JPG, GIF or PNG. Max size of 800K
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Name</label>
          {/* <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#1E1E22] border-gray-700"
          /> */}
          <input
            type="number"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your price"
            className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">User Name</label>
          {/* <Input 
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="bg-[#1E1E22] border-gray-700"
          /> */}
          <input
            type="number"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Enter your price"
            className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          {/* <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-[#1E1E22] border-gray-700"
          /> */}
          <input
            type="number"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your price"
            className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Phone Number</label>
          {/* <Input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-[#1E1E22] border-gray-700"
          /> */}
          <input
            type="number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Enter your price"
            className="w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>

      <Button className="bg-[#7367f0] hover:bg-purple-700 w-20 h-7 text-white">
        Update
      </Button>
    </div>
  );
};

export default AccountTab;
