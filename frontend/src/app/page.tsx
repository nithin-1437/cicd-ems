import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  CalendarCheck,
  FileText,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image-1');

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Employee Management',
      description: 'Centralize employee data, manage profiles, and track employment history seamlessly.',
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Payroll Processing',
      description: 'Simplify payroll with automated calculations, payslip generation, and secure distribution.',
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-primary" />,
      title: 'Leave Management',
      description: 'Streamline leave requests and approvals with an intuitive system for employees and admins.',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: 'Attendance Tracking',
      description: 'Monitor employee attendance and work hours with easy check-in/out and reporting tools.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  Streamline Your Workforce Management
                </h1>
                <p className="text-lg text-muted-foreground">
                  SynergyEMS is the all-in-one solution to manage your employees, payroll, and leaves efficiently. Empower your team and focus on what matters most: growing your business.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-2xl md:h-96">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
                Powerful Features for Modern Teams
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage your human resources in one platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
