
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, AlertCircle, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Issue Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track, manage, and resolve issues efficiently. Keep your projects organized 
            with our simple and powerful issue tracking system.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader>
              <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
              <CardTitle>Track Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create and organize issues with detailed descriptions and status tracking.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Clock className="w-8 h-8 text-yellow-500 mb-2" />
              <CardTitle>Monitor Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track issue progress from open to in-progress to closed status.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Resolve Efficiently</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage your workflow and mark issues as resolved when completed.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Personal Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access your personal dashboard with all your issues in one place.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get organized?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who trust our issue tracker for their projects.
          </p>
          <Button asChild size="lg">
            <Link to="/signup">Start Tracking Issues</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
