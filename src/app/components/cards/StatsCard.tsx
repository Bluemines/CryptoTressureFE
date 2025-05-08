import Image from "next/image";
import img from "../../assets/SVGs/Artwork.svg"
interface StatsCardProps {
  value: string|number;
  label: string;
  color: string;
  image?: string;
}
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  image?: string;
}) => {
  return <div className={`rounded-lg shadow-sm ${className}`}>{children}</div>;
};
export function StatsCard({
  value,
  label,
  color,
}: //  image
StatsCardProps) {
  return (
    <Card className="bg-[#2b2b2b] border-none p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${color}`}>
          {/* <Circle className="w-5 h-5 text-white" /> */}
          <Image
            alt="image"
            src={img}
            className="w-5 h-5 text-white"
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </Card>
  );
}
