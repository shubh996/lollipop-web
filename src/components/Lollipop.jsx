import { Lollipop } from "lucide-react";
import React from "react";
import { Card, CardDescription } from "@/components/ui/card";

export default function LollipopIcon( {postType , tip, strategyTitle  , strategyIcons, strategyNames}) {


  const isBuy = postType === 'buy';
  const backgroundColor = isBuy ? '#E6F4EA' : '#FDEDED';
  const textColor = isBuy ? '#219653' : '#EB5757';

  return (
    <Card style={{ marginTop: 0, padding: 10, paddingLeft: 15, paddingRight: 15, width: '100%', 
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', 
      backgroundColor: textColor, position: 'relative' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', background: backgroundColor, 
        borderRadius: 8, padding: '4px 6px', fontFamily: 'inherit', fontWeight: 500, fontSize: 10, color: textColor
        , gap: 6, position: 'absolute', top: -17.5, left: '32.5%' }}>
        <Lollipop size={15} style={{marginLeft: 5}}/>
          <span style={{ color: textColor, fontWeight: 700, fontSize: 12 , marginRight: 5}}>{strategyTitle}</span>
      </div>
      <CardDescription style={{ whiteSpace: 'normal', fontFamily: 'Uber Move', color: "#FFFF", paddingTop:10,
        fontSize: 14, fontWeight: 400 }}>{tip}</CardDescription>
    </Card>
  );
}
