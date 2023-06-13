import LayoutAddMember from './LayoutAddEmployee/LayoutAddEmployee';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AddYourEmployee = () => {
  return (
    <LayoutAddMember
      icon="back"
      subTitle="Invite employees to join your salon"
      title="Add your employee"
      process={100}
      skip
      disableBtn
    >
      <div className=" my-5 flex h-40 w-full ">
        <div
          className=" flex w-full cursor-pointer items-center justify-center
        gap-2 rounded-lg  border border-border-light bg-blue-gray text-blue-gray-900"
        >
          <PersonAddIcon fontSize="medium" />
          <div className="mt-1 text-base font-semibold">Add employee</div>
        </div>
      </div>
    </LayoutAddMember>
  );
};
export default AddYourEmployee;
