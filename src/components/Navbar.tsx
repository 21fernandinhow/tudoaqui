import { useState, useEffect, useRef } from 'react'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'
import { FaUser } from 'react-icons/fa'
import { useUserData } from '../contexts/UserDataContext'
import { HiViewGrid } from 'react-icons/hi'
import { IoFingerPrintSharp } from 'react-icons/io5'

export const Navbar = () => {
    const { user } = useUserData();
    const [isMenuOpen, setMenuIsOpen] = useState(false);
    const menuRef = useRef<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuIsOpen(false);
    };

    useEffect(() => {
        if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav ref={menuRef}>
            <IoFingerPrintSharp className='manifest-menu-icon' onClick={() => window.location.href = '/manifest'} />
            <HiViewGrid className='explore-menu-icon' onClick={() => window.location.href = '/explore'}/>
            <FaUser 
                onClick={() => setMenuIsOpen(prev => !prev)} 
                className='user-menu-icon'
            />
            {isMenuOpen && (
                <ul>
                    {user ? (
                        <>
                            <li><a href="/config">Minha página</a></li>
                            <li><a href="/metrics">Métricas</a></li>
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