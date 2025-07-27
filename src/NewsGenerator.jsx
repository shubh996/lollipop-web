import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGeminiResponse } from "./services/gemini";

function HeadlineToNews() {
  const [headline, setHeadline] = useState("");
  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState("");
  const [investmentTip, setInvestmentTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary("");
    setInvestmentTip("");
    try {
      const prompt = `Summarize the following headline in 60 words and provide a one-sentence investment tip.\nHeadline: ${headline}`;
      const result = await getGeminiResponse(prompt);
      if (result.success && result.data) {
        // Expecting Gemini to return summary and tip separated by a delimiter
        const [summaryText, tipText] = result.data.split("Investment Tip:");
        setSummary(summaryText?.trim() || "");
        setInvestmentTip(tipText?.trim() || "");
      } else {
        setError(result.error || "Failed to get response from Gemini.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
    }}>
      <Card style={{
        width: 480,
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        fontFamily: 'Uber Move',
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Create News Summary</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Input
            type="text"
            placeholder="Enter headline..."
            value={headline}
            onChange={e => setHeadline(e.target.value)}
            required
            style={{ fontSize: 16, padding: 12 }}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ fontSize: 16, padding: 12 }}
          />
          <Button type="submit" disabled={loading || !headline || !image} style={{ fontWeight: 600, fontSize: 16 }}>
            {loading ? "Generating..." : "Generate Summary & Tip"}
          </Button>
        </form>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {summary && (
          <div style={{ marginTop: 24, width: '100%' }}>
            <h4 style={{ fontWeight: 700, fontSize: 18 }}>Summary</h4>
            <div style={{ marginBottom: 12 }}>{summary}</div>
            <h4 style={{ fontWeight: 700, fontSize: 18 }}>Investment Tip</h4>
            <div>{investmentTip}</div>
            {image && (
              <div style={{ marginTop: 16 }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }}
                />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default HeadlineToNews;
