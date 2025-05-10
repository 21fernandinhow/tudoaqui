import { useState, useEffect, useRef } from 'react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { FaUser } from 'react-icons/fa'
import { useUserData } from '../context/UserDataContext'
import { HiViewGrid } from 'react-icons/hi'
import { Tooltip } from './Tooltip'

export const Navbar = () => {
    const { user } = useUserData();
    const [isMenuOpen, setMenuIsOpen] = useState(false);
    const menuRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuIsOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <nav ref={menuRef}>
            <HiViewGrid className='explore-menu-icon' onClick={() => window.location.href = '/explore'}/>
            <FaUser 
                onClick={() => setMenuIsOpen(prev => !prev)} 
                className='user-menu-icon'
            />
            {isMenuOpen && (
                <ul>
                    {user ? (
                        <>
                            <li><a href={"/config"}>Minha página</a></li>
                            <li><a href={"/premium"}>Assinatura</a></li>
                            <li className='disabled'><Tooltip text="Em breve" position='left'>Métricas</Tooltip></li>
                            <li><LogoutButton /></li>
                        </>
                    ) : (
                        <LoginButton />
                    )}
                </ul>
            )}
        </nav>
    );
}