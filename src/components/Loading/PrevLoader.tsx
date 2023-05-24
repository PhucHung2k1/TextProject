import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function PrevLoader() {
  return (
    <div className="h-screen w-screen absolute bg-slate-100 table z-20 top-0 left-0">
      <Spin
        indicator={
          <LoadingOutlined
            className=" font-normal align-middle text-center"
            spin
          />
        }
      />
    </div>
  );
}
