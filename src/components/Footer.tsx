import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export const Footer = () => (
    <footer>
        <p>Copyright tudoaqui 2025.</p>
        <div className="social-icons">
            <a href="https://www.instagram.com/tudoaqui.click/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </a>
            <a href="https://x.com/tudoaquiclick" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
            </a>
        </div>
    </footer>
)