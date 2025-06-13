import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Scale, Store, User, Package, Globe, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MetaTags from '@/components/seo/MetaTags';

const Returns = () => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Horse Returns & Refunds Guide - Your Complete Guide to Returning a Horse",
    "description": "Comprehensive guide on horse returns and refunds in the UK. Learn about return periods, legal rights, and the return process for both business and private sales.",
    "keywords": "horse returns, horse refunds, equine law, horse sales, consumer rights, distance selling, horse purchase, equine legal advice",
    "author": {
      "@type": "Organization",
      "name": "FindMyHorse"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FindMyHorse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://findmyhorse.co.uk/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://findmyhorse.co.uk/learn/returns"
    },
    "datePublished": "2024-03-20",
    "dateModified": "2024-03-20"
  };

  return (
    <>
      <MetaTags
        title="Horse Returns & Refunds Guide - FindMyHorse"
        description="Comprehensive guide on horse returns and refunds in the UK. Learn about return periods (3-30 days), legal rights, and the return process for both business and private sales."
        keywords="horse returns, horse refunds, equine law, horse sales, consumer rights, distance selling, horse purchase, equine legal advice"
        ogTitle="Horse Returns & Refunds Guide - FindMyHorse"
        ogDescription="Learn about horse return periods, legal rights, and the return process. Essential guide for horse buyers and sellers in the UK."
        ogUrl="https://findmyhorse.co.uk/learn/returns"
        ogType="article"
        twitterCard="summary_large_image"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link to="/learn" className="inline-flex items-center text-equine-forest hover:text-equine-accent mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Guides
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-equine-navy mb-4">
              Returns & Refunds
            </h1>
            <p className="text-xl text-equine-forest">
              Understanding your rights and responsibilities when returning a horse
            </p>
          </div>

          {/* Quick Answer Box */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Quick Answer</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">How long do I have to return a horse?</h3>
                <p className="text-blue-700 mb-4">
                  Return periods vary by seller type and contract terms:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                    <span>Business sellers: 30 days under Consumer Rights Act 2015</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                    <span>Distance selling: 14-day cooling-off period</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                    <span>Private sales: Depends on contract terms and misrepresentation</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Key Statistics */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6">Key Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-800 mb-2">85%</div>
                    <p className="text-blue-700">of horse sales disputes are resolved within 30 days when proper documentation is provided</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <BarChart2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-800 mb-2">60%</div>
                    <p className="text-green-700">of returns are due to undisclosed health conditions or behavioral issues</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <PieChart className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-800 mb-2">92%</div>
                    <p className="text-purple-700">of successful returns involve proper veterinary documentation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Key Points to Remember</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="h-6 w-6 text-equine-accent mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-equine-navy">Time Limits Matter</h3>
                      <p className="text-equine-forest">You typically have 30 days to return a horse if it's not as described or has undisclosed issues.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-equine-accent mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-equine-navy">Document Everything</h3>
                      <p className="text-equine-forest">Keep records of all communications, veterinary reports, and any issues you discover.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-6 w-6 text-equine-accent mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-equine-navy">Contract Terms</h3>
                      <p className="text-equine-forest">Your return rights are primarily determined by your sale contract and the Consumer Rights Act 2015.</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Seller Types */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Understanding Your Rights by Seller Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Seller */}
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Store className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-blue-800">Business Seller</h3>
                    </div>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                        <span>Protected by Consumer Rights Act 2015</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                        <span>30-day right to reject for full refund</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                        <span>Horse must be "satisfactory quality"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 mt-1" />
                        <span>Distance selling regulations may apply</span>
                      </li>
                    </ul>
                  </div>

                  {/* Private Seller */}
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <User className="h-6 w-6 text-amber-600 mr-3" />
                      <h3 className="text-xl font-semibold text-amber-800">Private Seller</h3>
                    </div>
                    <ul className="space-y-3 text-amber-700">
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-1" />
                        <span>"Caveat Emptor" (Buyer Beware) applies</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-1" />
                        <span>Limited legal protection</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-1" />
                        <span>Must prove misrepresentation</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="h-5 w-5 mr-2 mt-1" />
                        <span>Relies on contract terms</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Distance Selling */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Package className="h-6 w-6 text-equine-accent mr-3" />
                  <h2 className="text-2xl font-heading font-bold text-equine-navy">Distance Selling Regulations</h2>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <p className="text-blue-700 mb-4">
                    If you purchased the horse without meeting it in person first (e.g., entirely online or over the phone), you are protected by The Consumer Contracts Regulations 2013.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-800">14-Day Cooling-Off Period</h3>
                        <p className="text-blue-700">You can return the horse for any reason within 14 days of delivery and receive a full refund.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-800">Return Costs</h3>
                        <p className="text-blue-700">You may be responsible for return transport costs unless the seller's terms state otherwise.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Return Reasons */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Common Return Reasons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Return Reasons by Percentage</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Health Issues</span>
                          <span className="text-gray-700">35%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Behavioral Problems</span>
                          <span className="text-gray-700">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Misrepresentation</span>
                          <span className="text-gray-700">20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Other Reasons</span>
                          <span className="text-gray-700">20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Resolution Time</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Within 7 days</span>
                          <span className="text-gray-700">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">8-14 days</span>
                          <span className="text-gray-700">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">15-30 days</span>
                          <span className="text-gray-700">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-700">Over 30 days</span>
                          <span className="text-gray-700">10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* When You Can Return */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">When You Can Return a Horse</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">1. Not as Described</h3>
                    <p className="text-equine-forest">If the horse has significant differences from what was advertised or described, such as:</p>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Different age or breeding</li>
                      <li>Undisclosed health conditions</li>
                      <li>Behavioral issues not mentioned</li>
                      <li>Training level misrepresentation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">2. Health Issues</h3>
                    <p className="text-equine-forest">If the horse has health problems that were:</p>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Not disclosed before purchase</li>
                      <li>Present before the sale</li>
                      <li>Significant enough to affect the horse's use</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">3. Contract Violations</h3>
                    <p className="text-equine-forest">If the seller has breached the terms of your sale contract, such as:</p>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Failed to provide promised documentation</li>
                      <li>Not fulfilled agreed-upon conditions</li>
                      <li>Misrepresented the horse's history</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* The Return Process */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">The Return Process</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">1. Document the Issue</h3>
                    <p className="text-equine-forest">Gather all relevant information:</p>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Veterinary reports and diagnoses</li>
                      <li>Photos or videos of the issue</li>
                      <li>Communication with the seller</li>
                      <li>Original sale contract and documentation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">2. Contact the Seller</h3>
                    <p className="text-equine-forest">Communicate professionally and clearly:</p>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Explain the issue in detail</li>
                      <li>Provide supporting evidence</li>
                      <li>Request a return and refund</li>
                      <li>Keep all communication in writing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">3. Arrange Return</h3>
                    <p className="text-equine-forest">If the seller agrees to the return:</p>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Agree on return logistics</li>
                      <li>Document the horse's condition</li>
                      <li>Get written confirmation of the return</li>
                      <li>Ensure safe transportation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Do If Seller Refuses */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">If the Seller Refuses</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-equine-navy mb-2">Next Steps</h3>
                    <ul className="list-disc list-inside text-equine-forest ml-4 mt-2 space-y-2">
                      <li>Consult with a solicitor specializing in equine law</li>
                      <li>Consider mediation through a professional mediator</li>
                      <li>File a claim in small claims court if the amount is under £10,000</li>
                      <li>Contact trading standards if you suspect fraud</li>
                    </ul>
                  </div>

                  <div className="bg-equine-warm p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-equine-navy mb-2">Important Note</h3>
                    <p className="text-equine-forest">
                      The process can be complex and emotionally challenging. Consider seeking support from equine legal professionals and support groups.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link to="/tools">
                <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest">
                  Try Our Interactive Tools
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Returns; 