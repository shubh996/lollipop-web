import { useEffect, useState } from 'react';

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button"


const getDeviceType = () => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const { innerWidth: width } = typeof window !== 'undefined' ? window : { innerWidth: 0 };
    
    const isMobile = /Mobi|Android/i.test(userAgent);
    const isTablet = /Tablet|iPad|PlayBook|Silk|(puffin|(?!.*(IPhone|(Mobile|PPI)))\w+\b)/i.test(userAgent);
    
    if (isMobile && width <= 768) return 'mobile';
    if (isTablet || (!isMobile && width <= 1024 && width > 768)) return 'tablet';
    if (width > 1024 && width <= 1440) return 'laptop';
    return 'desktop';
};

function RootApp() {
    const [deviceType, setDeviceType] = useState(getDeviceType());

    useEffect(() => {
        // Only run on client-side
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setDeviceType(getDeviceType());
        };

        // Set initial device type
        setDeviceType(getDeviceType());

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render iframe for all device types with a fixed button (responsive label)
    return (
        <>
            <iframe
                src="https://serious-month-566561.framer.app/"
                title="Framer App"
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', border: 'none', margin: 0, padding: 0, zIndex: 1 }}
                allowFullScreen
            />
            {deviceType === 'mobile' ? (
                <Button
                    style={{
                        position: 'fixed',
                        bottom: 12.5,
                        right: 10,
                        zIndex: 10000,
                        background: '#814AC8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '22.5px 15px',
                        fontSize: 15,
                        fontWeight: 400,
                        boxShadow: '0 4px 24px rgba(123,47,242,0.18)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}
                    onClick={() => {
                        window.open('https://play.google.com/store', '_blank');
                    }}
                >
                    Download App
                    <ArrowUpRight style={{ marginLeft: -2.6, width: 26, height: 26 }} width={50} height={50} />
                </Button>
            ) : (
                <Button
                    style={{
                        position: 'fixed',
                        bottom: 12.5,
                        right: 10,
                        zIndex: 10000,
                        background: '#814AC8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '22.5px 15px',
                        fontSize: 15,
                        fontWeight: 400,
                        boxShadow: '0 4px 24px rgba(123,47,242,0.18)',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}
                    onClick={() => {
                        window.location.href = '/dashboard';
                    }}
                >
                    RIA's Dashboard
                    <ArrowUpRight style={{ marginLeft: -2.6, width: 26, height: 26 }} width={50} height={50} />
                </Button>
            )}
        </>
    );
}



export default RootApp;
