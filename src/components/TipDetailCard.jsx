import React, { useState } from 'react';
import { Candy, Star, Users, Wand2, X, ChevronLeft, ChevronRight, HeartHandshake, Smile, Rocket } from 'lucide-react';

const tourPages = [
	{
		title: 'Welcome to Lollipop',
		icon: <Candy size={40} className="text-pink-500" />,
		description:
			'Lollipop is the new way to discover, share, and act on investment tips. Built for the next generation of investors, Lollipop makes finance fun, social, and rewarding.',
	},
	{
		title: 'How Lollipop Works',
		icon: <Wand2 size={40} className="text-purple-500" />,
		description:
			'Follow top analysts, get curated tips, and swipe to save or act. Lollipop uses smart algorithms and community wisdom to surface the best ideas for you.',
	},
	{
		title: 'Social Investing',
		icon: <Users size={40} className="text-blue-500" />,
		description:
			'Connect with friends, join groups, and see what others are investing in. Share your wins, learn from the crowd, and build your own following.',
	},
	{
		title: 'Rewards & Gamification',
		icon: <Star size={40} className="text-yellow-500" />,
		description:
			'Earn badges, climb leaderboards, and unlock exclusive perks as you engage. Lollipop turns investing into a game you want to play every day.',
	},
	{
		title: 'Get Started',
		icon: <Rocket size={40} className="text-pink-500" />,
		description:
			'Sign up, explore tips, and start your journey to smarter investing. Lollipop is free, fun, and designed for everyone.',
	},
];

function TourSheet({ open, page, onPrev, onNext, onClose }) {
	const tour = tourPages[page];
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
			<div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8 relative flex flex-col items-center">
				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-pink-500"
					onClick={onClose}
				>
					<X size={28} />
				</button>
				<div className="mb-4">{tour.icon}</div>
				<h2 className="text-2xl font-bold text-pink-600 mb-2 text-center">
					{tour.title}
				</h2>
				<p className="text-base text-gray-700 mb-6 text-center">
					{tour.description}
				</p>
				<div className="flex items-center justify-center gap-8 mt-2">
					<button
						className="bg-gray-100 hover:bg-gray-200 rounded-full p-3"
						onClick={onPrev}
						disabled={page === 0}
					>
						<ChevronLeft size={28} />
					</button>
					<button
						className="bg-pink-500 hover:bg-pink-600 rounded-full p-3 text-white"
						onClick={onNext}
						disabled={page === tourPages.length - 1}
					>
						<ChevronRight size={28} />
					</button>
				</div>
				<div className="mt-6 text-xs text-gray-400">
					Page {page + 1} of {tourPages.length}
				</div>
			</div>
		</div>
	);
}

export default function LollipopTourLanding() {
	const [tourOpen, setTourOpen] = useState(false);
	const [tourPage, setTourPage] = useState(0);
	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col">
			{/* Header */}
			<header className="w-full bg-white shadow sticky top-0 z-40">
				<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
					<div className="flex items-center gap-3">
						<Candy size={32} className="text-pink-500" />
						<span className="font-extrabold text-2xl text-pink-600 tracking-tight">
							Lollipop
						</span>
					</div>
					<nav className="hidden md:flex gap-8 text-base font-semibold">
						<a href="#home" className="hover:text-pink-500">
							Home
						</a>
						<a
							href="#tour"
							className="hover:text-pink-500"
							onClick={() => setTourOpen(true)}
						>
							Tour
						</a>
						<a href="#features" className="hover:text-pink-500">
							Features
						</a>
						<a href="#signup" className="hover:text-pink-500">
							Sign Up
						</a>
					</nav>
				</div>
			</header>
			{/* Main Content */}
			<main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">
				<section className="mb-16 text-center" id="home">
					<h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 mb-4">
						Investing, Made Fun & Social
					</h1>
					<p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
						Lollipop is the playful, social platform for investment tips. Discover, share, and act on ideas with friends and top analysts. Take the tour to see how Lollipop changes the game!
					</p>
					<div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
						<button
							className="bg-pink-500 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-pink-600 transition"
							onClick={() => {
								setTourOpen(true);
								setTourPage(0);
							}}
						>
							Take the Tour
						</button>
						<a
							href="#signup"
							className="bg-white text-pink-500 font-bold py-3 px-8 rounded-xl shadow hover:bg-pink-50 border border-pink-200 transition"
						>
							Sign Up Free
						</a>
					</div>
				</section>
				<section className="mb-16" id="features">
					<h2 className="text-3xl font-bold text-pink-600 mb-6">
						Key Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="flex items-start gap-4">
							<Wand2 size={40} className="text-purple-500" />
							<div>
								<h3 className="font-semibold text-lg">Curated Tips</h3>
								<p className="text-gray-600">
									Get the best investment ideas, handpicked by experts and powered by smart algorithms.
								</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<Users size={40} className="text-blue-500" />
							<div>
								<h3 className="font-semibold text-lg">Social Investing</h3>
								<p className="text-gray-600">
									Connect, share, and learn with friends and the community. See what others are investing in.
								</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<Star size={40} className="text-yellow-500" />
							<div>
								<h3 className="font-semibold text-lg">Rewards & Badges</h3>
								<p className="text-gray-600">
									Earn badges, climb leaderboards, and unlock perks as you engage and invest.
								</p>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<Smile size={40} className="text-pink-500" />
							<div>
								<h3 className="font-semibold text-lg">Playful Experience</h3>
								<p className="text-gray-600">
									Investing is fun with Lollipop’s swipeable tips, colorful UI, and gamified features.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="mb-16 text-center" id="signup">
					<h2 className="text-3xl font-bold text-pink-600 mb-6">
						Ready to Join Lollipop?
					</h2>
					<a
						href="#signup"
						className="bg-pink-500 text-white font-bold py-4 px-12 rounded-xl shadow hover:bg-pink-600 transition text-xl"
					>
						Sign Up Free
					</a>
				</section>
			</main>
			{/* Tour Sheet */}
			<TourSheet
				open={tourOpen}
				page={tourPage}
				onPrev={() => setTourPage((p) => Math.max(0, p - 1))}
				onNext={() => setTourPage((p) => Math.min(tourPages.length - 1, p + 1))}
				onClose={() => setTourOpen(false)}
			/>
			{/* Footer */}
			<footer className="w-full bg-white border-t mt-auto py-8">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
					<div className="flex items-center gap-2 mb-4 md:mb-0">
						<Candy size={24} className="text-pink-500" />
						<span className="font-bold text-lg text-pink-600">Lollipop</span>
					</div>
					<nav className="flex gap-6 text-sm font-semibold">
						<a href="#home" className="hover:text-pink-500">
							Home
						</a>
						<a
							href="#tour"
							className="hover:text-pink-500"
							onClick={() => setTourOpen(true)}
						>
							Tour
						</a>
						<a href="#features" className="hover:text-pink-500">
							Features
						</a>
						<a href="#signup" className="hover:text-pink-500">
							Sign Up
						</a>
					</nav>
					<span className="text-gray-400 text-xs mt-4 md:mt-0">
						&copy; {new Date().getFullYear()} Lollipop. All rights reserved.
					</span>
				</div>
			</footer>
		</div>
	);
}