import LayoutHeader from '@/components/Authentication/LayoutHeader';
import { SalonSettingComponent } from '@/components/SalonSetting/SalonSetting';
import { lookupData } from '@/store/common/commonAction';
import { getAllRole } from '@/store/customerRole/customerRoleAction';
import { useAppDispatch } from '@/store/hook';
import { getAllPermission } from '@/store/permission/permissionAction';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SalonSetting = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (router.pathname === '/salon-setting') {
        dispatch(
          getAllPermission({
            Appointments: true,
            Marketings: true,
            ClientManagements: true,
            CreateCharges: true,
            TicketManagers: true,
            SalonExchanges: true,
            SalonCenters: true,
            SalonSettings: true,
            NeedHelps: true,
            TechPortals: true,
            GiftCards: true,
          })
        );
        dispatch(getAllRole({}));
        dispatch(lookupData({}));
      }
    }
    // cleanup side effects before unmounting
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <LayoutHeader>
      <SalonSettingComponent />
    </LayoutHeader>
  );
};
export default SalonSetting;
