import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function PrevLoader() {
  return (
    <div className="absolute left-0 top-0 z-20 table h-screen w-screen bg-slate-100">
      <Spin
        indicator={
          <LoadingOutlined
            className=" text-center align-middle font-normal"
            spin
          />
        }
      />
    </div>
  );
}
