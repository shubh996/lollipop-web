
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { ArrowLeft, TrendingUp } from "lucide-react";
import LollipopSVG from '../assets/icons/lollipop.svg';
import LollipopSVGWhite from '../assets/icons/lollipop-white.svg';

export default function NewPostForm({ newPost, onNewPostChange, submitting, onSubmit, onSubmitAndNew, onCancel }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Core Tip",
      description: "Describe your investment idea, main symbol, and any comparison. This is the foundation of your tip.",
      fields: ["tip", "symbol", "compared"]
    },
    {
      title: "Position & Risk",
      description: "Specify your holding period, risk level, and conviction. This helps users understand your confidence and time horizon.",
      fields: ["holding", "risk", "conviction"]
    },
    {
      title: "Strategy & Sentiment",
      description: "Clarify your investment strategy, market sentiment, sector, and target duration.",
      fields: ["strategy", "sentiment", "sector", "target_duration"]
    },
    {
      title: "Catalyst & Technicals",
      description: "Describe catalysts, valuation, technical signals, diversification, liquidity, expected return, performance, and price targets.",
      fields: ["catalyst", "valuation", "technical", "diversification", "liquidity", "expected_return", "performance", "entry_price", "exit_price", "stop_loss"]
    },
  ];

  // Debug: log step and newPost state
  console.log('NewPostForm render, step:', step, 'newPost:', newPost);

  // Helper to render fields for each step
  const renderFields = () => {
    switch (step) {
      case 0:
        console.log('Rendering step 0: Core Tip', newPost);
        return (
          <>
            <Label htmlFor="tip">Investment Tip <span className="text-red-500">*</span></Label>
            <Textarea id="tip" value={newPost.tip} onChange={e => onNewPostChange('tip', e.target.value)} placeholder="Describe your investment idea, thesis, or recommendation." className="mb-2" />
            <Label htmlFor="symbol">Symbol <span className="text-red-500">*</span></Label>
            <Input id="symbol" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} placeholder="Stock/Asset symbol (e.g. AAPL, TSLA)" className="mb-2" />
            <Label htmlFor="compared">Compared Symbol</Label>
            <Input id="compared" value={newPost.compared} onChange={e => onNewPostChange('compared', e.target.value)} placeholder="Optional: Compare to another symbol (e.g. MSFT)" className="mb-2" />
          </>
        );
      case 1:
        console.log('Rendering step 1: Position & Risk', newPost);
        return (
          <>
            <Label>Holding Period</Label>
            <Select value={newPost.holding} onValueChange={val => onNewPostChange('holding', val)}>
              <SelectTrigger><SelectValue placeholder="Select holding period" /></SelectTrigger>
              <SelectContent>
                {["1D", "2-3D", "1W", "1-4W", "1-3M", "3-6M", "6-12M", "12+M", "Intraday", "Short-Term", "Swing", "Mid-Term", "Long-Term", "Permanent"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Risk Level</Label>
            <Select value={newPost.risk} onValueChange={val => onNewPostChange('risk', val)}>
              <SelectTrigger><SelectValue placeholder="Select risk level" /></SelectTrigger>
              <SelectContent>
                {["Very Low", "Low", "Medium", "High", "Very High", "Speculative"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Conviction</Label>
            <Select value={newPost.conviction} onValueChange={val => onNewPostChange('conviction', val)}>
              <SelectTrigger><SelectValue placeholder="Select conviction" /></SelectTrigger>
              <SelectContent>
                {["Speculative", "Low", "Moderate", "Strong", "Very Strong"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        );
      case 2:
        console.log('Rendering step 2: Strategy & Sentiment', newPost);
        return (
          <>
            <Label>Strategy</Label>
            <Select value={newPost.strategy} onValueChange={val => onNewPostChange('strategy', val)}>
              <SelectTrigger><SelectValue placeholder="Select strategy" /></SelectTrigger>
              <SelectContent>
                {["Growth", "Value", "Momentum", "Income", "Index", "Arbitrage", "Event-Driven", "Contrarian", "Quality", "Blend", "ESG", "Thematic", "Distressed", "Macro"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Sentiment</Label>
            <Select value={newPost.sentiment} onValueChange={val => onNewPostChange('sentiment', val)}>
              <SelectTrigger><SelectValue placeholder="Select sentiment" /></SelectTrigger>
              <SelectContent>
                {["Very Bullish", "Bullish", "Neutral", "Bearish", "Very Bearish"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Sector</Label>
            <Select value={newPost.sector} onValueChange={val => onNewPostChange('sector', val)}>
              <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
              <SelectContent>
                {["Tech", "Finance", "Healthcare", "Energy", "Consumer", "Industrials", "Real Estate", "Utilities", "Materials", "Telecom", "Staples", "Discretionary", "Infrastructure", "Biotech", "Clean Energy", "Aerospace", "Retail"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Target Duration</Label>
            <Select value={newPost.target_duration} onValueChange={val => onNewPostChange('target_duration', val)}>
              <SelectTrigger><SelectValue placeholder="Select target duration" /></SelectTrigger>
              <SelectContent>
                {["1W", "2W", "1M", "2M", "3M", "6M", "6-12M", "1-2Y", "2+Y", "Indefinite"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        );
      case 3:
        console.log('Rendering step 3: Catalyst & Technicals', newPost);
        return (
          <>
            <Label>Catalyst</Label>
            <Select value={newPost.catalyst} onValueChange={val => onNewPostChange('catalyst', val)}>
              <SelectTrigger><SelectValue placeholder="Select catalyst" /></SelectTrigger>
              <SelectContent>
                {["Earnings", "Fed Policy", "Mergers", "Product Launch", "Regulation", "Market Event", "Analyst Upgrade", "Buyback", "Dividend Hike", "Sector Rotation", "Geopolitical", "Innovation", "Litigation", "Supply Chain"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Valuation</Label>
            <Select value={newPost.valuation} onValueChange={val => onNewPostChange('valuation', val)}>
              <SelectTrigger><SelectValue placeholder="Select valuation" /></SelectTrigger>
              <SelectContent>
                {["Low P/E (<15x)", "Mid P/E (15–25x)", "High P/E (>25x)", "Low EV/EBITDA (<10x)", "Mid EV/EBITDA (10–15x)", "High EV/EBITDA (>15x)", "Discounted Cash Flow (10%+ IRR)", "PEG Ratio ~1.5", "Low Price/Book (<2x)", "Low Price/Sales (<2x)", "High ROE (>15%)", "Low Debt/Equity (<0.5)"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Technical Signal</Label>
            <Select value={newPost.technical} onValueChange={val => onNewPostChange('technical', val)}>
              <SelectTrigger><SelectValue placeholder="Select technical signal" /></SelectTrigger>
              <SelectContent>
                {["RSI Overbought 70", "RSI Oversold 30", "MACD Bullish", "MACD Bearish", "MA Crossover", "ADX Trend 25", "Bollinger Breakout", "Fibonacci", "Support Break", "Resistance Break", "Volume Spike", "Stochastic 80", "Stochastic 20", "Ichimoku Buy", "Ichimoku Sell", "VWAP Bounce"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Diversification</Label>
            <Select value={newPost.diversification} onValueChange={val => onNewPostChange('diversification', val)}>
              <SelectTrigger><SelectValue placeholder="Select diversification" /></SelectTrigger>
              <SelectContent>
                {["Core", "Satellite", "Hedge", "Tactical", "Diversifier", "Opportunistic", "Balanced"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Liquidity</Label>
            <Select value={newPost.liquidity} onValueChange={val => onNewPostChange('liquidity', val)}>
              <SelectTrigger><SelectValue placeholder="Select liquidity" /></SelectTrigger>
              <SelectContent>
                {["High Large Cap", "Medium Mid Cap", "Low Small Cap", "Micro Cap", "High Volume", "Low Volume", "Illiquid"].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Expected Return</Label>
            <Select value={newPost.expected_return} onValueChange={val => onNewPostChange('expected_return', val)}>
              <SelectTrigger><SelectValue placeholder="Select expected return" /></SelectTrigger>
              <SelectContent>
                {['<5%', '5-10%', '10-20%', '20-30%', '30-50%', '50%+', 'Negative'].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Performance</Label>
            <Select value={newPost.performance} onValueChange={val => onNewPostChange('performance', val)}>
              <SelectTrigger><SelectValue placeholder="Select performance" /></SelectTrigger>
              <SelectContent>
                {['Strong Underperform', 'Underperform', 'Market', 'Outperform', 'Strong Outperform', 'Flat'].map(opt => (
                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Entry Price</Label>
            <Input value={newPost.entry_price} onChange={e => onNewPostChange('entry_price', e.target.value)} placeholder="Entry price (e.g. 150.00)" className="mb-2" type="number" min="0" step="any" />
            <Label>Exit Price</Label>
            <Input value={newPost.exit_price} onChange={e => onNewPostChange('exit_price', e.target.value)} placeholder="Exit price (e.g. 180.00)" className="mb-2" type="number" min="0" step="any" />
            <Label>Stop Loss</Label>
            <Input value={newPost.stop_loss} onChange={e => onNewPostChange('stop_loss', e.target.value)} placeholder="Stop loss price (e.g. 140.00)" className="mb-2" type="number" min="0" step="any" />
          </>
        );
      default:
        return null;
    }
  };




  // Section renderers
  const renderCoreTip = () => (
    <section className="bg-white rounded-xl shadow-sm p-8 mb-8 w-full border">
      <h2 className="text-2xl font-bold mb-6">Core Tip</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Label htmlFor="tip">Investment Tip <span className="text-red-500">*</span></Label>
          <Textarea id="tip" value={newPost.tip} onChange={e => onNewPostChange('tip', e.target.value)} placeholder="Describe your investment idea, thesis, or recommendation." />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="symbol">Symbol <span className="text-red-500">*</span></Label>
          <Input id="symbol" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} placeholder="Stock/Asset symbol (e.g. AAPL, TSLA)" />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="compared">Compared Symbol</Label>
          <Input id="compared" value={newPost.compared} onChange={e => onNewPostChange('compared', e.target.value)} placeholder="Optional: Compare to another symbol (e.g. MSFT)" />
        </div>
      </div>
    </section>
  );

  const renderTechnicals = () => (
    <section className="bg-white rounded-xl shadow-sm p-8 mb-8 w-full border">
      <h2 className="text-2xl font-bold mb-6">Technicals & Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Label>Entry Price</Label>
          <Input value={newPost.entry_price} onChange={e => onNewPostChange('entry_price', e.target.value)} placeholder="Entry price (e.g. 150.00)" type="number" min="0" step="any" />
          <Label>Exit Price</Label>
          <Input value={newPost.exit_price} onChange={e => onNewPostChange('exit_price', e.target.value)} placeholder="Exit price (e.g. 180.00)" type="number" min="0" step="any" />
          <Label>Stop Loss</Label>
          <Input value={newPost.stop_loss} onChange={e => onNewPostChange('stop_loss', e.target.value)} placeholder="Stop loss price (e.g. 140.00)" type="number" min="0" step="any" />
        </div>
        <div className="flex flex-col gap-4">
          <Label>Technical Signal</Label>
          <Select value={newPost.technical} onValueChange={val => onNewPostChange('technical', val)}>
            <SelectTrigger><SelectValue placeholder="Select technical signal" /></SelectTrigger>
            <SelectContent>
              {[
                "RSI Overbought 70", "RSI Oversold 30", "MACD Bullish", "MACD Bearish", "MA Crossover", "ADX Trend 25", "Bollinger Breakout", "Fibonacci", "Support Break", "Resistance Break", "Volume Spike", "Stochastic 80", "Stochastic 20", "Ichimoku Buy", "Ichimoku Sell", "VWAP Bounce"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Catalyst</Label>
          <Select value={newPost.catalyst} onValueChange={val => onNewPostChange('catalyst', val)}>
            <SelectTrigger><SelectValue placeholder="Select catalyst" /></SelectTrigger>
            <SelectContent>
              {[
                "Earnings", "Fed Policy", "Mergers", "Product Launch", "Regulation", "Market Event", "Analyst Upgrade", "Buyback", "Dividend Hike", "Sector Rotation", "Geopolitical", "Innovation", "Litigation", "Supply Chain"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Valuation</Label>
          <Select value={newPost.valuation} onValueChange={val => onNewPostChange('valuation', val)}>
            <SelectTrigger><SelectValue placeholder="Select valuation" /></SelectTrigger>
            <SelectContent>
              {[
                "Low P/E (<15x)", "Mid P/E (15–25x)", "High P/E (>25x)", "Low EV/EBITDA (<10x)", "Mid EV/EBITDA (10–15x)", "High EV/EBITDA (>15x)", "Discounted Cash Flow (10%+ IRR)", "PEG Ratio ~1.5", "Low Price/Book (<2x)", "Low Price/Sales (<2x)", "High ROE (>15%)", "Low Debt/Equity (<0.5)"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Diversification</Label>
          <Select value={newPost.diversification} onValueChange={val => onNewPostChange('diversification', val)}>
            <SelectTrigger><SelectValue placeholder="Select diversification" /></SelectTrigger>
            <SelectContent>
              {[
                "Core", "Satellite", "Hedge", "Tactical", "Diversifier", "Opportunistic", "Balanced"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Liquidity</Label>
          <Select value={newPost.liquidity} onValueChange={val => onNewPostChange('liquidity', val)}>
            <SelectTrigger><SelectValue placeholder="Select liquidity" /></SelectTrigger>
            <SelectContent>
              {[
                "High Large Cap", "Medium Mid Cap", "Low Small Cap", "Micro Cap", "High Volume", "Low Volume", "Illiquid"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Expected Return</Label>
          <Select value={newPost.expected_return} onValueChange={val => onNewPostChange('expected_return', val)}>
            <SelectTrigger><SelectValue placeholder="Select expected return" /></SelectTrigger>
            <SelectContent>
              {['<5%', '5-10%', '10-20%', '20-30%', '30-50%', '50%+', 'Negative'].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Performance</Label>
          <Select value={newPost.performance} onValueChange={val => onNewPostChange('performance', val)}>
            <SelectTrigger><SelectValue placeholder="Select performance" /></SelectTrigger>
            <SelectContent>
              {['Strong Underperform', 'Underperform', 'Market', 'Outperform', 'Strong Outperform', 'Flat'].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );

  const renderStrategySentiment = () => (
    <section className="bg-white rounded-xl shadow-sm p-8 mb-8 w-full border">
      <h2 className="text-2xl font-bold mb-6">Strategy & Sentiment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Label>Strategy</Label>
          <Select value={newPost.strategy} onValueChange={val => onNewPostChange('strategy', val)}>
            <SelectTrigger><SelectValue placeholder="Select strategy" /></SelectTrigger>
            <SelectContent>
              {[
                "Growth", "Value", "Momentum", "Income", "Index", "Arbitrage", "Event-Driven", "Contrarian", "Quality", "Blend", "ESG", "Thematic", "Distressed", "Macro"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Sentiment</Label>
          <Select value={newPost.sentiment} onValueChange={val => onNewPostChange('sentiment', val)}>
            <SelectTrigger><SelectValue placeholder="Select sentiment" /></SelectTrigger>
            <SelectContent>
              {[
                "Very Bullish", "Bullish", "Neutral", "Bearish", "Very Bearish"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Sector</Label>
          <Select value={newPost.sector} onValueChange={val => onNewPostChange('sector', val)}>
            <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
            <SelectContent>
              {[
                "Tech", "Finance", "Healthcare", "Energy", "Consumer", "Industrials", "Real Estate", "Utilities", "Materials", "Telecom", "Staples", "Discretionary", "Infrastructure", "Biotech", "Clean Energy", "Aerospace", "Retail"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Target Duration</Label>
          <Select value={newPost.target_duration} onValueChange={val => onNewPostChange('target_duration', val)}>
            <SelectTrigger><SelectValue placeholder="Select target duration" /></SelectTrigger>
            <SelectContent>
              {[
                "1W", "2W", "1M", "2M", "3M", "6M", "6-12M", "1-2Y", "2+Y", "Indefinite"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );

  const renderPositionRisk = () => (
    <section className="bg-white rounded-xl shadow-sm p-8 mb-8 w-full border">
      <h2 className="text-2xl font-bold mb-6">Position & Risk</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Label>Holding Period</Label>
          <Select value={newPost.holding} onValueChange={val => onNewPostChange('holding', val)}>
            <SelectTrigger><SelectValue placeholder="Select holding period" /></SelectTrigger>
            <SelectContent>
              {[
                "1D", "2-3D", "1W", "1-4W", "1-3M", "3-6M", "6-12M", "12+M", "Intraday", "Short-Term", "Swing", "Mid-Term", "Long-Term", "Permanent"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Risk Level</Label>
          <Select value={newPost.risk} onValueChange={val => onNewPostChange('risk', val)}>
            <SelectTrigger><SelectValue placeholder="Select risk level" /></SelectTrigger>
            <SelectContent>
              {[
                "Very Low", "Low", "Medium", "High", "Very High", "Speculative"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <Label>Conviction</Label>
          <Select value={newPost.conviction} onValueChange={val => onNewPostChange('conviction', val)}>
            <SelectTrigger><SelectValue placeholder="Select conviction" /></SelectTrigger>
            <SelectContent>
              {[
                "Speculative", "Low", "Moderate", "Strong", "Very Strong"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );

  // Section renderers (twitter-feed style)
  const Section = ({ title, children }) => (
    <section className="w-full flex flex-col gap-6 py-8">
      <h2 className="text-xl font-bold mb-2 px-2">{title}</h2>
      <div className="flex flex-col gap-4 px-2">{children}</div>
      <hr className="border-t border-neutral-200 mt-8" />
    </section>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <form className="w-full max-w-2xl mx-auto flex flex-col gap-0 py-16 px-2">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Advisor Tip Upload</h1>

        <Section title="Core Tip">
          <Label htmlFor="tip">Investment Tip <span className="text-red-500">*</span></Label>
          <Textarea id="tip" value={newPost.tip} onChange={e => onNewPostChange('tip', e.target.value)} placeholder="Describe your investment idea, thesis, or recommendation." />
          <Label htmlFor="symbol">Symbol <span className="text-red-500">*</span></Label>
          <Input id="symbol" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} placeholder="Stock/Asset symbol (e.g. AAPL, TSLA)" />
          <Label htmlFor="compared">Compared Symbol</Label>
          <Input id="compared" value={newPost.compared} onChange={e => onNewPostChange('compared', e.target.value)} placeholder="Optional: Compare to another symbol (e.g. MSFT)" />
        </Section>

        <Section title="Technicals & Prices">
          <Label>Entry Price</Label>
          <Input value={newPost.entry_price} onChange={e => onNewPostChange('entry_price', e.target.value)} placeholder="Entry price (e.g. 150.00)" type="number" min="0" step="any" />
          <Label>Exit Price</Label>
          <Input value={newPost.exit_price} onChange={e => onNewPostChange('exit_price', e.target.value)} placeholder="Exit price (e.g. 180.00)" type="number" min="0" step="any" />
          <Label>Stop Loss</Label>
          <Input value={newPost.stop_loss} onChange={e => onNewPostChange('stop_loss', e.target.value)} placeholder="Stop loss price (e.g. 140.00)" type="number" min="0" step="any" />
          <Label>Technical Signal</Label>
          <Select value={newPost.technical} onValueChange={val => onNewPostChange('technical', val)}>
            <SelectTrigger><SelectValue placeholder="Select technical signal" /></SelectTrigger>
            <SelectContent>
              {[
                "RSI Overbought 70", "RSI Oversold 30", "MACD Bullish", "MACD Bearish", "MA Crossover", "ADX Trend 25", "Bollinger Breakout", "Fibonacci", "Support Break", "Resistance Break", "Volume Spike", "Stochastic 80", "Stochastic 20", "Ichimoku Buy", "Ichimoku Sell", "VWAP Bounce"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Catalyst</Label>
          <Select value={newPost.catalyst} onValueChange={val => onNewPostChange('catalyst', val)}>
            <SelectTrigger><SelectValue placeholder="Select catalyst" /></SelectTrigger>
            <SelectContent>
              {[
                "Earnings", "Fed Policy", "Mergers", "Product Launch", "Regulation", "Market Event", "Analyst Upgrade", "Buyback", "Dividend Hike", "Sector Rotation", "Geopolitical", "Innovation", "Litigation", "Supply Chain"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Valuation</Label>
          <Select value={newPost.valuation} onValueChange={val => onNewPostChange('valuation', val)}>
            <SelectTrigger><SelectValue placeholder="Select valuation" /></SelectTrigger>
            <SelectContent>
              {[
                "Low P/E (<15x)", "Mid P/E (15–25x)", "High P/E (>25x)", "Low EV/EBITDA (<10x)", "Mid EV/EBITDA (10–15x)", "High EV/EBITDA (>15x)", "Discounted Cash Flow (10%+ IRR)", "PEG Ratio ~1.5", "Low Price/Book (<2x)", "Low Price/Sales (<2x)", "High ROE (>15%)", "Low Debt/Equity (<0.5)"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Diversification</Label>
          <Select value={newPost.diversification} onValueChange={val => onNewPostChange('diversification', val)}>
            <SelectTrigger><SelectValue placeholder="Select diversification" /></SelectTrigger>
            <SelectContent>
              {[
                "Core", "Satellite", "Hedge", "Tactical", "Diversifier", "Opportunistic", "Balanced"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Liquidity</Label>
          <Select value={newPost.liquidity} onValueChange={val => onNewPostChange('liquidity', val)}>
            <SelectTrigger><SelectValue placeholder="Select liquidity" /></SelectTrigger>
            <SelectContent>
              {[
                "High Large Cap", "Medium Mid Cap", "Low Small Cap", "Micro Cap", "High Volume", "Low Volume", "Illiquid"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Expected Return</Label>
          <Select value={newPost.expected_return} onValueChange={val => onNewPostChange('expected_return', val)}>
            <SelectTrigger><SelectValue placeholder="Select expected return" /></SelectTrigger>
            <SelectContent>
              {['<5%', '5-10%', '10-20%', '20-30%', '30-50%', '50%+', 'Negative'].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Performance</Label>
          <Select value={newPost.performance} onValueChange={val => onNewPostChange('performance', val)}>
            <SelectTrigger><SelectValue placeholder="Select performance" /></SelectTrigger>
            <SelectContent>
              {['Strong Underperform', 'Underperform', 'Market', 'Outperform', 'Strong Outperform', 'Flat'].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Section>

        <Section title="Strategy & Sentiment">
          <Label>Strategy</Label>
          <Select value={newPost.strategy} onValueChange={val => onNewPostChange('strategy', val)}>
            <SelectTrigger><SelectValue placeholder="Select strategy" /></SelectTrigger>
            <SelectContent>
              {[
                "Growth", "Value", "Momentum", "Income", "Index", "Arbitrage", "Event-Driven", "Contrarian", "Quality", "Blend", "ESG", "Thematic", "Distressed", "Macro"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Sentiment</Label>
          <Select value={newPost.sentiment} onValueChange={val => onNewPostChange('sentiment', val)}>
            <SelectTrigger><SelectValue placeholder="Select sentiment" /></SelectTrigger>
            <SelectContent>
              {[
                "Very Bullish", "Bullish", "Neutral", "Bearish", "Very Bearish"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Sector</Label>
          <Select value={newPost.sector} onValueChange={val => onNewPostChange('sector', val)}>
            <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
            <SelectContent>
              {[
                "Tech", "Finance", "Healthcare", "Energy", "Consumer", "Industrials", "Real Estate", "Utilities", "Materials", "Telecom", "Staples", "Discretionary", "Infrastructure", "Biotech", "Clean Energy", "Aerospace", "Retail"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Target Duration</Label>
          <Select value={newPost.target_duration} onValueChange={val => onNewPostChange('target_duration', val)}>
            <SelectTrigger><SelectValue placeholder="Select target duration" /></SelectTrigger>
            <SelectContent>
              {[
                "1W", "2W", "1M", "2M", "3M", "6M", "6-12M", "1-2Y", "2+Y", "Indefinite"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Section>

        <Section title="Position & Risk">
          <Label>Holding Period</Label>
          <Select value={newPost.holding} onValueChange={val => onNewPostChange('holding', val)}>
            <SelectTrigger><SelectValue placeholder="Select holding period" /></SelectTrigger>
            <SelectContent>
              {[
                "1D", "2-3D", "1W", "1-4W", "1-3M", "3-6M", "6-12M", "12+M", "Intraday", "Short-Term", "Swing", "Mid-Term", "Long-Term", "Permanent"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Risk Level</Label>
          <Select value={newPost.risk} onValueChange={val => onNewPostChange('risk', val)}>
            <SelectTrigger><SelectValue placeholder="Select risk level" /></SelectTrigger>
            <SelectContent>
              {[
                "Very Low", "Low", "Medium", "High", "Very High", "Speculative"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Conviction</Label>
          <Select value={newPost.conviction} onValueChange={val => onNewPostChange('conviction', val)}>
            <SelectTrigger><SelectValue placeholder="Select conviction" /></SelectTrigger>
            <SelectContent>
              {[
                "Speculative", "Low", "Moderate", "Strong", "Very Strong"
              ].map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Section>

        {/* Actions at the bottom */}
        <div className="flex gap-4 justify-end py-8">
          <Button variant="outline" onClick={onCancel} disabled={submitting} className="text-lg px-8 py-3 font-semibold">Cancel</Button>
          <Button onClick={onSubmit} disabled={submitting} className="text-lg px-8 py-3 font-semibold">{submitting ? 'Submitting...' : 'Submit Tip'}</Button>
          <Button variant="secondary" onClick={onSubmitAndNew} disabled={submitting} className="text-lg px-8 py-3 font-semibold">{submitting ? 'Submitting...' : 'Submit & Add Another'}</Button>
        </div>
      </form>
    </div>
  );
}
