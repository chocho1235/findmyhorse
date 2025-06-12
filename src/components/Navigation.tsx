import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { FileText, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabaseClient';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, logout, loading } = useAuth();

  const navLinks = [
    { label: 'Learn', path: '/learn' },
    { label: 'Tools', path: '/tools' },
    { label: 'News', path: '/news' },
  ];

  const authedNavLinks = [
    { label: 'Learn', path: '/learn' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string | undefined | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  }

  const renderAuthControls = () => {
    if (loading) {
      return null; // Or a loading spinner
    }

    if (user && profile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt={profile.username} />
                <AvatarFallback>{getInitials(profile.username)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{profile.username}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <nav className="space-x-2">
        <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
          Login
        </Link>
        <Link to="/signup" className={buttonVariants({ variant: "default" })}>
          Sign Up
        </Link>
      </nav>
    );
  };
  
  const renderMobileAuthControls = () => {
    if (loading) {
      return null;
    }

    if (user && profile) {
      return (
        <>
          <DropdownMenuItem asChild>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center space-x-2 cursor-pointer">
             <LogOut className="h-4 w-4" />
             <span>Logout</span>
          </DropdownMenuItem>
        </>
      );
    }

    return (
       <div className="pt-4 border-t border-equine-sage flex items-center gap-4">
        <Link to="/login" className="w-full">
          <Button variant="outline" className="w-full border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white font-semibold">
            Login
          </Button>
        </Link>
        <Link to="/signup" className="w-full">
          <Button className="w-full bg-equine-accent text-white hover:bg-equine-forest font-semibold">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-equine-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-equine-accent p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="text-equine-navy">
              <h1 className="text-xl font-heading font-bold">EquineClause</h1>
              <p className="text-xs text-equine-forest">Legal Clarity for Horse Sales</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 relative ${
                  isActive(item.path)
                    ? 'text-equine-accent'
                    : 'text-equine-navy hover:text-equine-accent'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-equine-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {renderAuthControls()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-equine-navy hover:text-equine-accent transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-equine-warm rounded-lg mx-4 mb-4 p-4 animate-scale-in">
            <div className="space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-equine-accent'
                      : 'text-equine-navy hover:text-equine-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {renderMobileAuthControls()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
