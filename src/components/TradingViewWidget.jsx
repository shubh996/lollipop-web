import React, { useEffect, useRef, useState, memo } from 'react';

// Adjusted the TradingViewWidget to dynamically fit the available space
function TradingViewWidget({ symbol , compareSymbol, isChatExpanded , theme, onError }) {
  const container = useRef();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = compareSymbol
      ? `{
         "autosize": true,
  "symbol": "${symbol}",
  "timezone": "Etc/UTC",

  "style": "2",
  "locale": "en",
  "withdateranges": true,
  "range": "YTD",
        "allow_symbol_change": true,
  
         "compareSymbols": [
          {
            "symbol": "${compareSymbol}",
            "position": "SameScale"
          }
        ],
     "details": true,
  "support_host": "https://www.tradingview.com"
        
      }`
      : `{
          "autosize": true,
  "symbol": "${symbol}",
  "timezone": "Etc/UTC",
  "theme": "${theme}",
  "style": "2",
  "locale": "en",
  "withdateranges": true,
  "range": "YTD",
        "allow_symbol_change": true,
        "details": true,
  "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);

    // Error detection: TradingView widget does not provide a direct error event,
    // so we use a timeout to check if the widget loaded. If not, trigger error.
    const timeout = setTimeout(() => {
      // If the widget did not render an iframe, it's likely an error
      const iframe = container.current.querySelector('iframe');
      if (!iframe) {
        setHasError(true);
        if (onError) {
          onError({ symbol, compareSymbol });
        }
      }
    }, 3500); // 3.5s is enough for TradingView to load

    return () => clearTimeout(timeout);
  }, [symbol, compareSymbol, onError]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{
        height: '100%',
        width:  '100%',
      }}
    >
      {hasError && (
        <div style={{ color: 'red', padding: 16, textAlign: 'center', fontWeight: 600 }}>
          Failed to load TradingView chart. Please check the stock symbol(s).
        </div>
      )}
    </div>
  );
}

export default memo(TradingViewWidget);