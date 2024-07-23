import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <span onClick={() => navigate('/about')}>About</span>
    </footer>
  );
};

export default Footer;
