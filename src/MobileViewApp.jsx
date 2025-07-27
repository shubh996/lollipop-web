import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import TradingViewWidget from './components/TradingViewWidget';

function MobileViewApp({ newsItems = [] }) {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-start p-2">
      <Carousel className="w-full max-w-md mx-auto">
        <CarouselContent>
          {newsItems.map((news, idx) => (
            <CarouselItem key={news.id || idx} className="p-0">
              <Card className="w-full shadow-md rounded-xl overflow-hidden">
                <CardHeader className="p-0">
                  {/* TradingViewWidget at the top */}
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <TradingViewWidget symbol={news.stock1} compareSymbol={news.stock2} />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col gap-2">
                  <CardTitle className="text-lg font-bold mb-1">{news.headline}</CardTitle>
                  <div className="text-sm text-muted-foreground mb-2">{news.summary}</div>
                  <div className="bg-accent rounded-md px-3 py-2 text-sm font-medium text-accent-foreground">
                    {news.investmentTip}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default MobileViewApp; 