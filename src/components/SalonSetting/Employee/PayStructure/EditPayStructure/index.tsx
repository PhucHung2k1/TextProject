import LayoutDrawer from '@/common/LayoutDrawer';
import {
  StyledTabs,
  AntTab,
} from '@/components/SalonSetting/ConfigurationSetting';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Box, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AssignEmployeePayStructure from '../AddPayStructure/AssignEmployeePayStructure';
import FormControlComponent from '@/common/Input/FormControlComponent';
import { sxTextField } from '@/utils/helper/styles';
import { useAppSelector } from '@/store/hook';
import type { IPayStructureById } from '@/services/payStructure.service/payStructure.interface';
import AllowHoldCash from '../AddPayStructure/AllowHoldCash';
import CheckCardPercentage from '../AddPayStructure/CheckCardPercentage';
import DailySurchargeComponent from '../AddPayStructure/DailySurchargeComponent';
import PayStructureSettingComponent from '../AddPayStructure/PayStructureSettingComponent';
import ProductChargeComponent from '../AddPayStructure/ProductChargeComponent';
import ProductCommissionComponent from '../AddPayStructure/ProductCommissionComponent';
import TipOnCCComponent from '../AddPayStructure/TipOnCCComponent';

interface Props {
  idPayStructure: string;
  handleCloseDrawer: Function;
}
const EditPayStructure = ({ idPayStructure, handleCloseDrawer }: Props) => {
  // const dispatch = useAppDispatch();
  const [activeKey, setActiveKey] = React.useState<number>(0);
  const payStructureById = useAppSelector(
    (state) => state.payStructureSlice.payStructureById
  );
  const [payStructureData, setPayStructureData] =
    useState<IPayStructureById>(payStructureById);
  const itemsTab = [
    {
      id: 0,
      label: 'Assign Employee ',
      key: 'assignEmployee',
      children: <AssignEmployeePayStructure />,
    },
    {
      id: 1,
      label: 'Settings',
      key: 'settings',
      children: (
        <Grid container className="my-4">
          {/* Pay Structure settings */}
          <PayStructureSettingComponent
            payStructureSettingsData={
              payStructureData.Configuration.PayStructureSettings
            }
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Tip on cc */}
          <TipOnCCComponent
            tipOnCCData={payStructureData.Configuration.TipOnCC}
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Daily Surcharge */}
          <DailySurchargeComponent
            dailySurchargeData={payStructureData.Configuration.DailySurcharge}
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Charge */}
          <ProductChargeComponent
            productChargeData={payStructureData.Configuration.ProductCharge}
            setPayStructureData={setPayStructureData}
          />
          {/* Under line */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Product Commission */}
          <ProductCommissionComponent
            productCommissionData={
              payStructureData.Configuration.ProductCommission
            }
            setPayStructureData={setPayStructureData}
          />
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Allow Hold Cash */}
          <AllowHoldCash
            allowHoldCashData={payStructureData.Configuration.HoldCash}
            setPayStructureData={setPayStructureData}
          />
          {/* Divider */}
          <Grid xs={12} item>
            <Divider />
          </Grid>
          {/* Check/ Card percentage */}
          <CheckCardPercentage
            checkCashPercentageData={
              payStructureData.Configuration.CheckCashPercentage
            }
            setPayStructureData={setPayStructureData}
          />
        </Grid>
      ),
    },
  ];
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveKey(newValue);
  };
  const handleChangeName = (Name: string) => {
    setPayStructureData((prev: any) => ({
      ...prev,
      PayStructure: {
        Name,
      },
    }));
  };
  useEffect(() => {
    setPayStructureData(payStructureById);
  }, [payStructureById, idPayStructure]);

  const handleOnSave = () => {};
  return (
    <LayoutDrawer
      disable={false}
      showProgress={false}
      content={
        <Grid container>
          <FormControlComponent
            label="Pay Structure Group Name"
            sx={sxTextField}
            type="text"
            name="Name"
            value={payStructureData.PayStructure.Name}
            onChange={(e: any) => handleChangeName(e.target.value)}
            required
            className="mb-8 !rounded-sm border border-mango-text-gray-1 !outline-none"
          />

          <Grid xs={12} item>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <StyledTabs value={activeKey} onChange={handleChangeTab}>
                  {itemsTab.map((item) => (
                    <AntTab key={item.key} label={item.label} />
                  ))}
                </StyledTabs>
              </Box>
              <div>
                {itemsTab.find((item) => item.id === activeKey)?.children}
              </div>
            </Box>
          </Grid>
        </Grid>
      }
      handleBack={handleCloseDrawer}
      handleCloseDrawer={handleCloseDrawer}
      handleNext={handleOnSave}
      iconHeader={<CloseIcon fontSize="large" />}
      titleHeader="Edit Pay Structure"
    />
  );
};

export default EditPayStructure;
