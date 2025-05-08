
"use client";
import { StatsCard } from "@/app/components/cards/StatsCard";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import AdminTable from "@/app/components/ui/tables/AdminTable";
import { useRouter } from "next/navigation";
import useWallet from "./hooks";

const page = () => {
  const router = useRouter();


  const statsData = [
    {
      value: "4,235",
      label: "Total Users",
      color: "bg-[#7C3AED]",
      //   image: Image,
    },
    {
      value: "3,312",
      label: "Verified Users",
      color: "bg-[#50BB25]",
      //   image: Image,
    },
    {
      value: "20",
      label: "Suspended Users",
      color: "bg-[#EC1E2D]",
      //   image: Image,
    },
  ];

  const columns = [
    { id: "username", label: "User" },
    { id: "balance", label: "Amount" },
    { id: "date", label: "Date" },
    { id: "paymentMethod", label: "Payment Method" },
    { id: "status", label: "Status" },
  ];


  
  const walletHistoryColumns = [
    { id: "username", label: "User" },
    { id: "balance", label: "Balance" },
    { id: "totalWithdrawn", label: "Total Withdrawn" },
    { id: "lastActivity", label: "Last Activity" },
  ];
  const { wallet } = useWallet();
 
  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-xl">Wallet Management</div>
        <div className="flex gap-2 items-center">
          <div className="bg-[#2B2B2B] py-2 px-4 rounded">
            Easypaisa account *******1234 is connected
          </div>
          <div>
            <PrimaryButton
              onClick={() =>
                router.push("/admin/wallet-management/add-new-wallet")
              }
              bgColor="#7367F0"
              className="!text-white !border-none !font-medium"
            >
              Add new Wallet
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {statsData.map((stat, index) => (
          <StatsCard
            //   image={stat.image}
            key={index}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
      </div>

      <div className="font-semibold text-xl my-3">Pending Withdrawal</div>
      {wallet.length > 0 && (
        <AdminTable
          data={wallet}
          columns={columns}
          actions={true}
          showHeader={true}
          icon2={false}
          showButton={false}
        />
      )}
      <div className="font-semibold text-xl my-3">Wallet History</div>
      {wallet.length > 0 && (
        <AdminTable
          data={wallet}
          columns={walletHistoryColumns}
          actions={false}
          showHeader={true}
          showButton={false}
        />
      )}

    </div>
  );
};

export default page;
