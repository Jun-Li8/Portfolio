import React, { useState } from 'react';
import {Home,Briefcase,AppWindow,ChevronLeft,ChevronRight} from 'lucide-react'
import logo from '/please.gif'

interface NavItem {
    label: string;
    icon: React.ReactNode;
    href: string;
}


const navItems: NavItem[] = [
    { label: 'Home', icon: <Home size={20} />, href: '/' },
    { label: 'Work', icon: <Briefcase size={20} />, href: '/work' },
    { label: 'Projects', icon: <AppWindow size={20} />, href: '/projects' },
];



interface SideBarProps{
    isExpanded: boolean; 
    setIsExpanded: (expanded: boolean) => void
}

const SideBar: React.FC<SideBarProps> = ({isExpanded,setIsExpanded}) => {

    return (
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col
            ${isExpanded ? 'w-52' : 'w-16'}`}
      >
        {/* Header section with logo and toggle */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-800">
          {isExpanded &&<div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={logo}
                alt="Cat Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 
              className={`font-bold text-white whitespace-nowrap transition-opacity duration-300 text-xl`}
            >
              Jun Li
            </h1>
          </div>}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronLeft size={25} /> : <ChevronRight size={25} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
            <ul className="space-y-2">
            {navItems.map((item) => (
                <li
                key={item.label}
                className="relative"
                >
                <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 hover:bg-gray-800 transition-colors rounded-lg mx-2
                    ${isExpanded ? 'justify-start gap-4' : 'justify-center'}`}
                >
                    {item.icon}
                    {isExpanded && <span>{item.label}</span>}
                </a>
                </li>
            ))}
            </ul>
        </nav>
      </div>
  );
}

export default SideBar;

