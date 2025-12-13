'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';

interface SimpleHeaderProps {
	links?: Array<{ label: string; href: string }>;
}

export function SimpleHeader({ links }: SimpleHeaderProps) {
	const [open, setOpen] = React.useState(false);

	const defaultLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'عن الموقع', href: '/about' },
		{ label: 'الخدمات', href: '/services' },
		{ label: 'اتصل بنا', href: '/contact' },
		{ label: 'التوصيات اليومية', href: '/recommendations' },
	];

	const navLinks = links || defaultLinks;

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-16">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src="/logo.png"
						alt="Company Logo"
						width={200}
						height={100}
						priority
						className="object-cover"
					/>
				</Link>
				<div className="hidden items-center gap-2 lg:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
						>
							{link.label}
						</Link>
					))}
					
				</div>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button size="icon" variant="outline" className="lg:hidden">
							<MenuToggle
								strokeWidth={2.5}
								open={open}
								className="size-6"
							/>
						</Button>
					</SheetTrigger>
					<SheetContent
						className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
						showClose={false}
						side="left"
					>
						<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
						<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									className={buttonVariants({
										variant: 'ghost',
										className: 'justify-start',
									})}
									href={link.href}
									onClick={() => setOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</div>
						
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}

