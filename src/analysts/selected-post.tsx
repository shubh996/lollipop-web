import { useLocation, useNavigate } from "react-router-dom";
import TradingViewWidget from "../components/TradingViewWidget";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { text } from "stream/consumers";

export default function SelectedPost({post}) {
  const location = useLocation();
  const navigate = useNavigate();
  // Expect post data to be passed via location.state



    {console.log("MAIN FILE ---- Selected Post Data:", post);}

  if (!post) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <div>No post data found.</div>
        <Button onClick={() => navigate(-1)} style={{ marginTop: 24 }}>Back</Button>
      </div>
    );
  }



  return (
    <div style={{ height:"90vh", border: '8px solid #eee', borderRadius: 18, marginLeft:0, margin:0, background: '#fff', display: 'flex', flexDirection: 'column' }}>
      
      {/* 2-column layout */}
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 0, padding:15, paddingBottom:0 }}>
        
        
        {/* Left: Post details */}
        <div style={{margin:8, height:"82.5vh" ,border: '1px solid #eee', borderRadius: 1, flex: 1, width: '30vw', background: '#FFF', paddingLeft: -22, paddingRight: -12, paddingTop:10, borderRight: '1px solid #eee', overflowY: 'auto' }}>
          <Table>
            <TableBody>
              {post.symbol && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Symbol</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.symbol}</TableCell>
                </TableRow>
              )}
              {post.compared && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Compared</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.compared}</TableCell>
                </TableRow>
              )}
              {post.strategy && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Strategy</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.strategy}</TableCell>
                </TableRow>
              )}
              {post.sector && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Sector</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.sector}</TableCell>
                </TableRow>
              )}
              {post.sentiment && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Sentiment</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.sentiment}</TableCell>
                </TableRow>
              )}
              {post.holding && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Holding</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.holding}</TableCell>
                </TableRow>
              )}
              {post.risk && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Risk</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.risk}</TableCell>
                </TableRow>
              )}
              {post.conviction && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Conviction</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.conviction}</TableCell>
                </TableRow>
              )}
              {post.target_duration && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Target Duration</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.target_duration}</TableCell>
                </TableRow>
              )}
              {post.catalyst && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Catalyst</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.catalyst}</TableCell>
                </TableRow>
              )}
              {post.valuation && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Valuation</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.valuation}</TableCell>
                </TableRow>
              )}
              {post.technical && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Technical</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.technical}</TableCell>
                </TableRow>
              )}
              {post.confidence && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Confidence</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.confidence}</TableCell>
                </TableRow>
              )}
              {post.diversification && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Diversification</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.diversification}</TableCell>
                </TableRow>
              )}
              {post.liquidity && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Liquidity</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.liquidity}</TableCell>
                </TableRow>
              )}
              {post.expected_return && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Expected Return</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.expected_return}</TableCell>
                </TableRow>
              )}
              {post.performance && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Performance</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.performance}</TableCell>
                </TableRow>
              )}
              {post.created_at && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>Created</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move'}}>{new Date(post.created_at).toLocaleString()}</TableCell>
                </TableRow>
              )}
              {post.name && (
                <TableRow>
                  <TableHead style={{  color:"#A9A9A9", fontFamily: 'Uber Move' }}>By</TableHead>
                  <TableCell style={{  color:"#333", fontFamily: 'Uber Move', textAlign:"right"}}>{post.name}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        
        {/* Right: TradingViewWidget */}
        <div style={{ marginLeft: 32, borderRadius: 8,flex: 1.2,  background: '#fff',margin:8,  display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ borderRadius: 8, width: '35vw', height:"82.5vh"}}>
            <TradingViewWidget
              symbol={post.symbol}
              compareSymbol={post.compared}
              width="35vw"
              height="80vh"
            />
          </div>
        </div>



      </div>

    </div>
  );
}
