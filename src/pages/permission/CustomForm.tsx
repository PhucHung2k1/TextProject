// import React from "react";
// import { Button, Form, Input, InputNumber, Avatar } from "antd";
// const layout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 20,
//   },
// };
// /* eslint-disable no-template-curly-in-string */

// const validateMessages = {
//   required: "${label} is required!",
//   types: {
//     email: "${label} is not a valid email!",
//     number: "${label} is not a valid number!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };
// /* eslint-enable no-template-curly-in-string */

// const CustomForm = () => {
//   const onFinish = (values) => {
//     console.log(values);
//   };

//   return (
//     <div>
//       <div className=" flex items-center">
//         <Avatar
//           src={`https://manage2.mangoforsalon.com/Upload/employee/avatar_3400005_20221125091733.png`}
//           size={100}
//         />
//         <div className=" ml-3">
//           <p className=" text-lg font-bold">Employee info</p>
//           <p className=" text-sm font-bold">Change profile photo</p>
//           <div className=" w-28 h-5 rounded bg-purple-500">
//             <p className=" text-center text-white">#9D46DE</p>
//           </div>
//         </div>
//       </div>
//       <div className="">
//         <Form
//           className="form"
//           {...layout}
//           name="nest-messages"
//           onFinish={onFinish}
//           validateMessages={validateMessages}
//         >
//           <div className="flex items-end ml-7 mb-4">
//             <p>Group profile:</p>
//             <div className="w-32 h-9 ml-2 rounded border-2 flex items-center justify-center border-gray-400">
//               <p className="">No group</p>
//             </div>
//           </div>
//           <Form.Item name={["user", "name"]} label="Job title">
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "name"]}
//             label="First Name"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "lastName"]}
//             label="Last Name"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "nickName"]}
//             label="Nick Name"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "email"]}
//             label="Email"
//             rules={[
//               {
//                 type: "email",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "email"]}
//             label="Password"
//             rules={[
//               {
//                 type: "email",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "age"]}
//             label="Age"
//             rules={[
//               {
//                 type: "number",
//                 min: 0,
//                 max: 99,
//               },
//             ]}
//           >
//             <InputNumber />
//           </Form.Item>
//           <Form.Item name={["user", "Address"]} label="Address">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "Phone"]} label="Phone">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "Social security"]} label="Social">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "start date"]} label="Start date">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "Status"]} label="Status">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "Turn Bonus"]} label="Turn Bonus">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "website"]} label="Website">
//             <Input />
//           </Form.Item>
//           <Form.Item name={["user", "introduction"]} label="Introduction">
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CustomForm;

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Button from '@mui/material/Button';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { sxTextField, sxSelect } from '@/utils/helper/styles';
import TextField from '@mui/material/TextField';

export default function CustomForm() {
  const [age, setAge] = useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  const categories = [
    'science',
    'sports',
    'business',
    'politics',
    'entertainment',
    'technology',
    'world',
    'all',
  ];
  return (
    <>
      <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
        <Box sx={{ padding: 5 }}>
          {/* <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Krunch Media
          </Typography> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Title
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                sx={sxTextField}
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Content
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                fullWidth
                rows={4}
              />
            </Grid> */}
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Artist
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                sx={sxTextField}
                required
                id="artist"
                name="artist"
                label="Artist"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            {/*  */}
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Category
              </InputLabel>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  sx={{ sxSelect }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  {categories.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Author
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                sx={sxTextField}
                required
                id="author"
                name="author"
                label="Author"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                Img Upload
              </InputLabel>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Button>
                <UploadFileIcon />
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  sx={{ sxSelect }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  {categories.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" sx={{ color: '#ff781f' }}>
                Save
              </Button>
            </Grid>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}

            <Grid item xs={12} sm={5}>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">Weekdays</FormLabel> */}
                {/* <FormGroup aria-label="position">
          <FormControlLabel
            value=""
            control={<Input />}
            label="Title"
            labelPlacement="bottom"
          />

          <FormControlLabel
            value=""
            control={<Input />}
            label="Artist"
            labelPlacement="bottom"
          />
        </FormGroup> */}
                <FormControlLabel
                  value="tuesday"
                  control={<Checkbox />}
                  label="Tuesday"
                  labelPlacement="bottom"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
