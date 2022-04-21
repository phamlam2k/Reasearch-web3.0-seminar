import HomeScreen from "../screens";
import Header from "./header";
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <HomeScreen />
    </div>
  );
};

export default HomeLayout;
