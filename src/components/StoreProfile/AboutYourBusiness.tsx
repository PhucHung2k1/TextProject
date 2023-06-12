import { Button } from "@mui/material";
import { TextField } from "@mui/material";
const AboutYourBusiness = () => {
  return (
    <div className="flex justify-center pt-[90px]">
      {/* <LinearProgressWithLabel value={progress} /> */}
      <div className=" w-[568px]  rounded-2xl bg-white p-8 shadow-md">
        <p className="text-center text-[32px] font-semibold text-text-title">
          About your business
        </p>
        <p className="text-center text-mango-text-gray-2">
          Tell us about your business
        </p>

        <form className="mt-6 flex flex-wrap justify-center gap-2">
          <div className="relative w-[186px] h-[186px] rounded-full bg-[#F2F2F5] flex justify-center items-center">
            {" "}
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.3333 4.66667V37.3333H4.66667V4.66667H37.3333ZM37.3333 0H4.66667C2.1 0 0 2.1 0 4.66667V37.3333C0 39.9 2.1 42 4.66667 42H37.3333C39.9 42 42 39.9 42 37.3333V4.66667C42 2.1 39.9 0 37.3333 0ZM25.9933 20.6733L18.9933 29.7033L14 23.66L7 32.6667H35L25.9933 20.6733Z"
                fill="#CBCBDB"
              />
            </svg>
            <input
              className="hidden"
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
            />
            <label className="flex justify-center items-center w-[59px] h-[59px] mb-0 rounded-full bg-[#00BDD6] absolute bottom-0 right-0 h-16 w-16">
              <svg
                width="33"
                height="31"
                viewBox="0 0 33 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.1823 9.15617V6.02075H24.0469V3.83325H27.1823V0.661377H29.3698V3.83325H32.5417V6.02075H29.3698V9.15617H27.1823ZM2.42712 30.0833C1.84379 30.0833 1.33337 29.8645 0.895874 29.427C0.458374 28.9895 0.239624 28.4791 0.239624 27.8958V9.19263C0.239624 8.6336 0.458374 8.12926 0.895874 7.67961C1.33337 7.22995 1.84379 7.00513 2.42712 7.00513H7.7865L10.448 3.83325H20.6563V6.02075H11.4688L8.80733 9.19263H2.42712V27.8958H27.2188V12.5833H29.4063V27.8958C29.4063 28.4791 29.1815 28.9895 28.7318 29.427C28.2822 29.8645 27.7778 30.0833 27.2188 30.0833H2.42712ZM14.8047 24.7603C16.5669 24.7603 18.0434 24.1649 19.2344 22.9739C20.4254 21.7829 21.0209 20.3063 21.0209 18.5442C21.0209 16.782 20.4254 15.3116 19.2344 14.1327C18.0434 12.9539 16.5669 12.3645 14.8047 12.3645C13.0426 12.3645 11.5721 12.9539 10.3933 14.1327C9.21445 15.3116 8.62504 16.782 8.62504 18.5442C8.62504 20.3063 9.21445 21.7829 10.3933 22.9739C11.5721 24.1649 13.0426 24.7603 14.8047 24.7603ZM14.8047 22.5728C13.6502 22.5728 12.6962 22.19 11.9427 21.4244C11.1893 20.6588 10.8125 19.6987 10.8125 18.5442C10.8125 17.3897 11.1893 16.4357 11.9427 15.6822C12.6962 14.9287 13.6502 14.552 14.8047 14.552C15.9592 14.552 16.9193 14.9287 17.6849 15.6822C18.4506 16.4357 18.8334 17.3897 18.8334 18.5442C18.8334 19.6987 18.4506 20.6588 17.6849 21.4244C16.9193 22.19 15.9592 22.5728 14.8047 22.5728Z"
                  fill="white"
                />
              </svg>
            </label>
          </div>
          <p className="text-center text-mango-text-gray-2 w-full pt-[16px] ">
            Upload your business profile picture
          </p>
          <div className="h-[56px] w-full mt-[40px] mb-1">
            <input
              className={`border-mango-gray-light-3 border h-full w-full text-left text-[16px] pl-4 rounded placeholder:text-mango-text-gray-2
              `}
              placeholder="Your business name"
            />
          </div>
          <div className="flex justify-between w-full">
            <TextField
              id="outlined-username-input"
              label="Preifx"
              type="text"
              className="w-[128px]"
            />
            <div className="h-[56px] w-[352px] ">
              <input
                className={`border-mango-gray-light-3 border h-full w-full text-left text-[16px] pl-4 rounded placeholder:text-mango-text-gray-2
              `}
                placeholder="Your business name"
              />
            </div>
          </div>
        </form>
        <Button
          className="mt-12 h-12 w-full bg-mango-primary-blue font-bold capitalize"
          variant="contained"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default AboutYourBusiness;
