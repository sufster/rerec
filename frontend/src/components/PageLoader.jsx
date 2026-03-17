import { Loader } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <Loader className="animate-spin w-10 h-10 text-white" />
    </div>
  );
};

export default PageLoader;