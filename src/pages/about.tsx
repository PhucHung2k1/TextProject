import { Meta } from "@/layouts/Meta";
import { useAppDispatch } from "@/store/hook";
import { Main } from "@/templates/Main";
import { Button } from "antd";
import { showToast } from "@/store/toast/toastSlice";

const About = () => {
  const dispatch = useAppDispatch();

  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
        recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
        labore voluptatibus distinctio recusandae autem esse explicabo molestias
        officia placeat, accusamus aut saepe.
      </p>
      <Button
        onClick={() => {
          dispatch(showToast());
        }}
      >
        aaaa
      </Button>
    </Main>
  );
};

export default About;
