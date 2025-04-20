const WalletTab = () => {
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
      <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
      <p className="text-gray-400">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint.
        <br />
        Velit officia consequat duis enim velit mollit.
      </p>

      <div className="max-w-sm p-6 border border-gray-800 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/lovable-uploads/fa83a6d5-2ba0-4c7e-9799-7ad1024f3979.png"
            alt="Easypaisa"
            className="w-20 h-20"
          />
          <span className="text-lg font-medium">Easypaisa</span>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Connect Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletTab;
