import React from 'react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('@/components/Authentication/SelectStore'),
  {
    loading: () => <p>Loading...</p>, // Component hiển thị khi đang tải tệp tin
    ssr: false, // Chạy dynamic import chỉ trên phía client
  }
);
const SelectStorePage = () => {
  return (
    <div className="flex h-screen w-full items-center  justify-center bg-mango-gray-light-2  bg-cover bg-center bg-no-repeat ">
      <DynamicComponent />
    </div>
  );
};

export default SelectStorePage;
