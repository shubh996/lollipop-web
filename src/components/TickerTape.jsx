import React, { useEffect, useRef } from 'react';

const TickerTape = () => {
  const container = useRef();

  useEffect(() => {
    // Clear the container before appending the script
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `{
      "symbols": [
       {
         "description": "",
         "proName": "BSE:ADANIPORTS"
       },
       {
         "description": "",
         "proName": "BSE:APOLLOHOSP"
       },
       {
         "description": "",
         "proName": "BSE:ASIANPAINT"
       },
       {
         "description": "",
         "proName": "BSE:AXISBANK"
       },
       {
         "description": "",
         "proName": "BSE:BAJAJ_AUTO"
       },
       {
         "description": "",
         "proName": "BSE:BAJFINANCE"
       },
       {
         "description": "",
         "proName": "BSE:BAJAJFINSV"
       },
       {
         "description": "",
         "proName": "BSE:BPCL"
       },
       {
         "description": "",
         "proName": "BSE:BRITANNIA"
       },
       {
         "description": "",
         "proName": "BSE:CIPLA"
       },
       {
         "description": "",
         "proName": "BSE:COALINDIA"
       },
       {
         "description": "",
         "proName": "BSE:DRREDDY"
       },
       {
         "description": "",
         "proName": "BSE:EICHERMOT"
       },
       {
         "description": "",
         "proName": "BSE:GRASIM"
       },
       {
         "description": "",
         "proName": "BSE:HCLTECH"
       },
       {
         "description": "",
         "proName": "BSE:HDFCBANK"
       },
       {
         "description": "",
         "proName": "BSE:HDFCLIFE"
       },
       {
         "description": "",
         "proName": "BSE:HEROMOTOCO"
       },
       {
         "description": "",
         "proName": "BSE:HINDALCO"
       },
       {
         "description": "",
         "proName": "BSE:HINDUNILVR"
       },
       {
         "description": "",
         "proName": "BSE:ICICIBANK"
       },
       {
         "description": "",
         "proName": "BSE:ICICIGI"
       },
       {
         "description": "",
         "proName": "BSE:ICICIPRULI"
       },
       {
         "description": "",
         "proName": "BSE:INDUSINDBK"
       },
       {
         "description": "",
         "proName": "BSE:INFY"
       },
       {
         "description": "",
         "proName": "BSE:ITC"
       },
       {
         "description": "",
         "proName": "BSE:JSWSTEEL"
       },
       {
         "description": "",
         "proName": "BSE:KOTAKBANK"
       },
       {
         "description": "",
         "proName": "BSE:LT"
       },
       {
         "description": "",
         "proName": "BSE:M&M"
       },
       {
         "description": "",
         "proName": "BSE:MARUTI"
       },
       {
         "description": "",
         "proName": "BSE:NESTLEIND"
       },
       {
         "description": "",
         "proName": "BSE:NTPC"
       },
       {
         "description": "",
         "proName": "BSE:ONGC"
       },
       {
         "description": "",
         "proName": "BSE:POWERGRID"
       },
       {
         "description": "",
         "proName": "BSE:RELIANCE"
       },
       {
         "description": "",
         "proName": "BSE:SBICARD"
       },
       {
         "description": "",
         "proName": "BSE:SBIN"
       },
       {
         "description": "",
         "proName": "BSE:SUNPHARMA"
       },
       {
         "description": "",
         "proName": "BSE:TCS"
       },
       {
         "description": "",
         "proName": "BSE:TATAMOTORS"
       },
       {
         "description": "",
         "proName": "BSE:TATASTEEL"
       },
       {
         "description": "",
         "proName": "BSE:TECHM"
       },
       {
         "description": "",
         "proName": "BSE:TITAN"
       },
       {
         "description": "",
         "proName": "BSE:ULTRACEMCO"
       }
     ],
     "showSymbolLogo": true,
     "colorTheme": "light",
     "isTransparent": false,
     "displayMode": "regular",
     "locale": "en"
     }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: -7.5,
        width: '150%',
        scale: '0.75',
        marginLeft: '-25%',
      }}
      ref={container}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TickerTape;
