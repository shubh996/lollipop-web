import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function NewPostForm({ newPost, onNewPostChange, submitting, onSubmit, onSubmitAndNew, onCancel }) {
  return (
    <form style={{ width: '100%' }} onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <div style={{ marginTop: 40 }}>
        <Label style={{ marginTop: 45, marginBottom: 10 }} htmlFor="investmentTip">Investment Tip</Label>
        <Textarea id="investmentTip" placeholder="Investment Tip" value={newPost.tip} onChange={e => onNewPostChange('tip', e.target.value)} style={{ marginTop: 4, height: "100%" }} />
      </div>
      <div style={{ display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <div style={{ flex: 1 }}>
          <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="symbol1">Symbol</Label>
          <Input id="symbol1" placeholder="e.g. RELIANCE" value={newPost.symbol} onChange={e => onNewPostChange('symbol', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <Label style={{ marginTop: 20, marginBottom: 10 }} htmlFor="symbol2">Compare (optional)</Label>
          <Input id="symbol2" placeholder="e.g. TCS" value={newPost.compared} onChange={e => onNewPostChange('compared', e.target.value)} style={{ marginTop: 4, width: '100%' }} />
        </div>
      </div>
      {/* Add more dropdowns/selects as needed, similar to above */}
      <div style={{ height: 80 }} />
      <div style={{
        background: '#fff',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 24px',
        zIndex: 1000
      }}>
        <button type="button" onClick={onCancel} disabled={submitting}>Cancel</button>
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        <button type="button" onClick={onSubmitAndNew} disabled={submitting}>{submitting ? 'Submitting...' : 'Submit and New'}</button>
      </div>
    </form>
  );
}
