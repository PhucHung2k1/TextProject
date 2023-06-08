import React from 'react';
import { Button } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
type btnProps = {
  title: string;
};

const ButtonCustom = ({ title }: btnProps) => {
  return (
    <Button
      type="button"
      onClick={() => {
        // let per1Permission = JSON.parse(Cookies.get("permissionList") || "");
        // if (per1Permission && per1Permission[0] && per1Permission[0].value)
        //   alert("has permission");
        // else {
        //   alert("no permission");
        //   Router.push("/about/");
        // }
      }}
    >
      {title || 'primary'}
    </Button>
    //  <Button>Default Button</Button>
    // <Button type="dashed">Dashed Button</Button>
    // <Button type="text">Text Button</Button>
    // <Button type="link">Link Button</Button>
  );
};

export default ButtonCustom;
