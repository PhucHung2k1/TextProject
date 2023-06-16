import InputField from '@/components/FormHelper/InputField';
import type { IAllCustomerRole } from '@/services/customerRole.service/customerRole.interface';
import {
  addNewRole,
  deleteRole,
  getAllRole,
} from '@/store/customerRole/customerRoleAction';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setModalContent, showModal } from '@/store/modal/modalSlice';
import { setMessageToast, showToast } from '@/store/toast/toastSlice';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const ManageRole = () => {
  const dispatch = useAppDispatch();
  const listRole = useAppSelector((state) => state.customerRoleSlice.listRole);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleCreateRole = (values: any) => {
    const body = {
      name: values.roleName,
    };
    dispatch(addNewRole(body));
  };
  const handleUpdateRole = () => {};
  const handleGetListRole = () => {
    dispatch(getAllRole({}));
  };

  const handleShowInfoRole = (name: string) => {
    const modalContent = (
      <div>
        <h1 className="mb-4 text-center text-xl font-bold">Update Role</h1>

        <div className="my-1 flex items-center">
          {/* <input defaultValue={name} /> */}
          <InputField
            placeholder="Name Role"
            fullWidth
            register={register}
            registerOptions={{
              name: 'name',
              required: 'Enter your Role !',
              maxLength: { value: 255, message: 'over 255 characters' },
            }}
            defaultValue={name}
            className=" border border-gray-400  bg-gray-100"
            errors={errors}
          />
        </div>

        <Button
          onClick={handleUpdateRole}
          className="mx-auto my-2 flex w-full justify-center"
        >
          Update
        </Button>
      </div>
    );
    dispatch(setModalContent(modalContent));
    dispatch(showModal());
  };
  const handleShowToast = () => {
    dispatch(setMessageToast('Test'));
    dispatch(showToast());
  };

  return (
    <div className="mx-auto max-w-2xl bg-white py-16">
      <Button onClick={handleShowToast}>Test</Button>
      <form
        name="basic"
        autoComplete="off"
        onSubmit={handleSubmit(handleCreateRole)}
      >
        <InputField
          placeholder="Name Role"
          fullWidth
          register={register}
          registerOptions={{
            name: 'roleName',
            required: 'Enter your Role !',
            maxLength: { value: 255, message: 'over 255 characters' },
          }}
          className=" border border-gray-400  bg-gray-100"
          errors={errors}
        />

        <Button type="submit">Add New Role</Button>
      </form>

      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          List Role
        </h1>
        <Button
          onClick={handleGetListRole}
          className="mx-auto my-2 flex w-full justify-center"
        >
          Get List Role
        </Button>
        <table className="w-full list-inside space-y-1 px-20 pt-6">
          <thead>
            <tr>
              <th> ID </th>
              <th> Name </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {listRole?.length ? (
              <>
                {listRole?.map((role: IAllCustomerRole) => (
                  <tr key={role.Id}>
                    <td>{role.Id}</td>
                    <td>{role.Name}</td>
                    <td>
                      <Button
                        onClick={() => {
                          dispatch(deleteRole(role.Id));
                        }}
                      >
                        Delete
                      </Button>

                      <Button
                        className="ml-2"
                        onClick={() => handleShowInfoRole(role.Name)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td>No Role found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRole;
