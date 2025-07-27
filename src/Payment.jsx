import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const defaultFeatures = [
	["Unlimited access to daily news", "AI-generated insights"],
	["Priority customer support", "Exclusive market analysis"],
	["Early access to new features", "Advanced analytics"],
];

const Payment = ({
	heading = "Pricing",
	description = "Simple pricing with a free 7 day trial.",
	price = 29,
	priceSuffix = "/mo",
	features = defaultFeatures,
	buttonText = "Get Started",
}) => {
	return (
				<div
				style={{
					width: "120%", // Ensures the component takes 100% of the parent's width
					margin: "0 auto",
					padding: "1rem 0", // Reduced horizontal padding
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					boxSizing: "border-box", // Prevents overflow due to padding
					maxWidth: "600px", // Added max-width for better responsiveness
				}}
				>
					<h2 style={{ fontFamily:"Uber Move", fontSize: "1.5rem", fontWeight: "600", color: "#333" }}>
						{"PRO Plan"}
					</h2>
					<p
						style={{
							fontFamily:"Uber Move", 
							
							color: "#6c757d",
							fontSize: "1.25rem",
						}}
					>
						{"Daily 10 Free News"}
					</p>
					<div
						style={{
							fontFamily: "Uber Move",
							display: "flex",
							flexDirection: "column",
							borderRadius: "0.5rem",
							padding: "1.5rem",
							flex: "1",
							width: "100%", // Ensures full width
							boxSizing: "border-box", // Prevents overflow due to padding
						}}
					>
						<div
							style={{
								fontFamily: "Uber Move",
								display: "flex",
								justifyContent: "center",
								alignItems: "baseline",
							}}
						>
							<span style={{ fontFamily:"Uber Move", fontSize: "1.25rem", fontWeight: "600" }}>$</span>
							<span style={{  fontFamily:"Uber Move",fontSize: "3rem", fontWeight: "600" }}>{9}</span>
							<span style={{  fontFamily:"Uber Move",fontSize: "1rem", color: "#6c757d" }}>
								{priceSuffix}
							</span>
						</div>
						<div style={{ margin: "1.5rem 0"}}>
							{features.map((featureGroup, idx) => (
								<div key={idx}>
									<ul
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "0.75rem",
											padding: 0,
											listStyle: "none",
											margin: 0, // Removed default margin for better alignment
										}}
									>
										{featureGroup.map((feature, i) => (
											<li
												key={i}
												style={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													width: "100%", // Take full width
													fontSize: "0.875rem",
													fontWeight: "500",
												}}
											>
												<span style={{ textAlign: "left", flex: 1 }}>{feature}</span>
												<Check style={{ flexShrink: 0, marginLeft: "auto" }} />
											</li>
										))}
									</ul>
									{idx < features.length - 1 && (
										<Separator style={{ margin: "1.5rem 0" }} />
									)}
								</div>
							))}
						</div>
						<Button style={{ marginTop: 25, marginBottom:-10 }}>{buttonText}</Button>
					</div>
				</div>
			
	);
};

export default Payment;
