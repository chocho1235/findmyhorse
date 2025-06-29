import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { User, Search, AlertTriangle } from 'lucide-react';

const SCAMMER_NAMES = [
  "Golden field stables",
  "Hannah Rees",
  "Colby's crew rescue",
  "Lonnie jay",
  "Chris Henry",
  "Woodfarm livery",
  "Leonal Williams",
  "Jess Nikkie",
  "Aitthne Enya",
  "Callaway horse services",
  "George pets",
  "Kristy madisson",
  "Tania Begum",
  "Debbie Leigh",
  "Michelle noble",
  "Sandra Charlotte",
  "Melissa Stuart",
  "New farm stables",
  "Lulu Sharpe",
  "Handleby equestrian centre",
  "Mercy capper",
  "Kate Gibson",
  "Mia's horses for rehoming",
  "Emily McKinney",
  "Sara cox (Stolen name)",
  "Henrietta somers",
  "Prestwick mill stables (stolen name from a genuine seller, I've linked the scam page....https://www.facebook.com/share/16Wy2dUwMY/)",
  "Woodlands stables",
  "Richard Wilson",
  "Preet kahlon",
  "Luciano guerra",
  "Royal stables",
  "Caroline Scott",
  "James rugal",
  "Royal stable",
  "Kindred hooves stables",
  "Keith Wilson (Stolen name from a genuine honest dealer, check which one your talking to)",
  "Lenette broer",
  "Blue stone riding lodge",
  "New farm livery",
  "Trevor langlay",
  "Angelia R Madison",
  "Miles Wentworth Harrington",
  "Woodland stables",
  "Miller Selena Jayde",
  "Catherine can",
  "Lenette Gloria",
  "Mary Mcbryde (stolen a honest sellers name)",
  "Fiona Anderson",
  "John Williams",
  "Charlotte banks",
  "Anna wyatt",
  "Favour robson",
  "Laura Adrian James",
  "Annie Murphy",
  "Flannigan mary",
  "Horses for sale under 2000",
  "Lisa Jenkins Coleman",
  "Emily Johnson",
  "Jeffery madison",
  "Geywood acres stables",
  "Anna wyatt",
  "Melissa porter",
  "Amy Anderson",
  "Whitney V Centaur",
  "Valerie olson",
  "Sophia Emmanuel",
  "Bruce carol Curtis",
  "Equestrian UK",
  "Kira Griffiths",
  "Stephen Townsend",
  "Eleanor stewart",
  "Petersham farm stables",
  "Natasha Dyson",
  "Equine expressions emporium",
  "Elizabeth Nora",
  "Horses for new 🏠 home UK only",
  "Karina Perrin",
  "Alicia Jennifer Pam's",
  "Alicia Jenny Pam's (now Jenny Pam's)",
  "Talia bylner",
  "Fixed Daniel",
  "Lorraine Greaves coakley",
  "Olivia zox",
  "Kathleen fia",
  "Gabon lakata",
  "Second chance stables",
  "Andrea Dean",
  "Amy hogg",
  "Spring valley stables (stolen name)",
  "Lynne rockss (stolen name)",
  "Emilie Maury",
  "Rogers Whittaker Johnson (now miles Wentworth Harrington)",
  "Amelia Riley",
  "Florence Mia Amelia (now Emily Claire)",
  "Bethany Busby Heidi",
  "Samantha Kim Payne",
  "Helen dolman",
  "Caroline pearce",
  "Another Spring valley stables so that's 2 scammers using the same name",
];

export default function ScammerDatabase() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const filtered = SCAMMER_NAMES.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md w-full mx-auto text-center p-8">
            <CardTitle>Account Required</CardTitle>
            <CardContent>
              <p className="mb-4">You must be logged in to access the Scammer Database.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <section className="max-w-2xl mx-auto text-center mb-10">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full mb-2">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-equine-navy mb-2">Scammer Database</h1>
            <p className="text-lg text-equine-forest mb-2">Search a list of known scammer names and stables. <span className='font-semibold text-red-700'>Always verify before buying!</span></p>
            <span className="text-sm text-gray-500">Total scammers in database: <span className="font-bold text-red-700">{SCAMMER_NAMES.length}</span></span>
          </div>
        </section>
        <section className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Search className="h-5 w-5 text-equine-accent" />
                <Input
                  placeholder="Search for a name or stable..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="mb-0 flex-1"
                />
              </div>
              <div className="text-sm text-gray-500">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
              </div>
            </CardHeader>
            <CardContent>
              {filtered.length === 0 ? (
                <div className="text-red-600 text-center py-8">
                  <AlertTriangle className="inline h-6 w-6 mr-2 align-text-bottom" />
                  No matches found.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filtered.map((name, idx) => (
                    <li
                      key={idx}
                      className={`py-3 px-2 flex items-center gap-3 transition-colors duration-200 ${idx % 2 === 0 ? 'bg-red-50' : 'bg-white'}`}
                    >
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-200 text-red-800 mr-2">
                        <User className="h-4 w-4 mr-1" />
                        Scammer
                      </span>
                      <span className="text-lg font-medium text-red-900 break-words">{name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
} 