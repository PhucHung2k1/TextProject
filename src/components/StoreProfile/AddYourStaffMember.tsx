import Image from 'next/image';
import LayoutAddMember from './LayoutAddEmployee/LayoutAddEmployee';
import { Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

interface IStaff {
  avatar: string;
  name: string;
  subName: string;
  status: boolean;
}

const AddYourStaffMember = () => {
  const listStaff: IStaff[] = [
    {
      avatar: '/assets/images/StoreProfile/image_avt.png',
      name: 'Olivia Rodrigo',
      subName: 'Technician',
      status: true,
    },
    {
      avatar: '/assets/images/StoreProfile/image_avt.png',
      name: 'William Wilson',
      subName: 'Manager',
      status: false,
    },
    {
      avatar: '/assets/images/StoreProfile/image_avt.png',
      name: 'William Wilson',
      subName: 'Manager',
      status: false,
    },
    {
      avatar: '/assets/images/StoreProfile/image_avt.png',
      name: 'William Wilson',
      subName: 'Manager',
      status: false,
    },
  ];
  return (
    <LayoutAddMember
      icon="back"
      subTitle="Invite your staff member to join your business"
      title="Add your staff member"
      process={30}
    >
      <div className="flex max-h-80 w-full overflow-y-auto overflow-x-hidden ">
        <div className="flex w-full flex-col items-center gap-0 ">
          {listStaff.map((item, index) => {
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className=" flex h-20 w-full flex-row items-center justify-between border-b border-line-main py-5"
              >
                <div className="flex items-center gap-3">
                  <Image src={item.avatar} alt="logo" width={48} height={48} />
                  <div className="flex h-full flex-col justify-between">
                    <Typography
                      variant="h6"
                      className="text-base font-semibold text-primary-dark"
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.subName}
                    </Typography>
                  </div>
                </div>
                <div>
                  {item?.status === true ? (
                    <div className="flex cursor-pointer gap-1 rounded bg-bg-disable px-3 py-1 text-sm  text-text-disable">
                      <CheckIcon fontSize="small" />
                      <div>Sent</div>
                    </div>
                  ) : (
                    <div className="flex cursor-pointer gap-1 rounded bg-primary-main px-3 py-1 text-sm  text-white">
                      <div>Sent</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full cursor-pointer items-center gap-2 px-2 py-5 text-base font-semibold text-primary-main">
        <AddIcon fontSize="medium" />
        <div>Add staff member</div>
      </div>
    </LayoutAddMember>
  );
};
export default AddYourStaffMember;
