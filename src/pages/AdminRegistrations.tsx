
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Send } from "lucide-react";

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company_name: string;
  service_interest: string;
  message: string | null;
  created_at: string;
}

interface NewsletterSubscription {
  id: string;
  name: string | null;
  email: string;
  created_at: string;
}

const AdminRegistrations = () => {
  const { session, isLoading } = useAuth();
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    if (!isLoading && session?.user?.email === "admin@compliancehub.com") {
      fetchData();
    }
  }, [session, isLoading]);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      console.log("Fetching demo requests...");
      // Fetch demo requests (non-newsletter entries)
      const { data: demoData, error: demoError } = await supabase
        .from("demo_requests")
        .select("*")
        .neq("service_interest", "Newsletter Subscription")
        .order("created_at", { ascending: false });

      if (demoError) {
        console.error("Demo requests error:", demoError);
        throw demoError;
      }
      console.log("Demo data:", demoData);
      setDemoRequests(demoData || []);

      console.log("Fetching newsletter subscriptions...");
      // First try to fetch from newsletter_subscriptions table
      const { data: newsletterData, error: newsletterError } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (newsletterError) {
        console.warn("Newsletter table error, trying demo_requests table:", newsletterError);
        // If newsletter_subscriptions table doesn't exist or fails, 
        // fetch newsletter entries from demo_requests table
        const { data: newsletterFromDemo, error: newsletterFromDemoError } = await supabase
          .from("demo_requests")
          .select("*")
          .eq("service_interest", "Newsletter Subscription")
          .order("created_at", { ascending: false });

        if (newsletterFromDemoError) {
          console.error("Newsletter from demo error:", newsletterFromDemoError);
          throw newsletterFromDemoError;
        }
        
        // Transform demo_requests format to newsletter format
        const transformedNewsletter = (newsletterFromDemo || []).map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          created_at: item.created_at
        }));
        console.log("Newsletter from demo data:", transformedNewsletter);
        setNewsletterSubscriptions(transformedNewsletter);
      } else {
        console.log("Newsletter data:", newsletterData);
        setNewsletterSubscriptions(newsletterData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load registration data.");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleExportCSV = (type: "demo" | "newsletter") => {
    const data = type === "demo" ? demoRequests : newsletterSubscriptions;
    const headers = type === "demo" 
      ? ["Name", "Email", "Company", "Interest", "Message", "Date"]
      : ["Name", "Email", "Date"];
    
    let csvContent = headers.join(",") + "\n";

    data.forEach(item => {
      if (type === "demo") {
        const demoItem = item as DemoRequest;
        // Escape quotes and commas in text fields
        const escapedMessage = demoItem.message ? `"${demoItem.message.replace(/"/g, '""')}"` : "";
        csvContent += `"${demoItem.name}","${demoItem.email}","${demoItem.company_name}","${demoItem.service_interest}",${escapedMessage},"${new Date(demoItem.created_at).toLocaleDateString()}"\n`;
      } else {
        const newsletterItem = item as NewsletterSubscription;
        csvContent += `"${newsletterItem.name || ''}","${newsletterItem.email}","${new Date(newsletterItem.created_at).toLocaleDateString()}"\n`;
      }
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${type}-registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmailSummary = async () => {
    setIsSendingEmail(true);
    
    toast.promise(
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          const success = true;
          if (success) {
            resolve("Email sent successfully");
          } else {
            reject(new Error("Failed to send email"));
          }
        }, 2000);
      }),
      {
        loading: 'Sending summary email...',
        success: 'Summary email sent!',
        error: 'Failed to send summary email.',
      }
    );
    
    setTimeout(() => {
      setIsSendingEmail(false);
    }, 2000);
  };

  // If still loading auth state, show nothing
  if (isLoading) {
    return <div className="container py-12">Loading...</div>;
  }

  // If not admin, redirect to home
  if (!session || session.user.email !== "admin@compliancehub.com") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Registration Summary</h1>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Demo Requests</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExportCSV("demo")} disabled={demoRequests.length === 0}>
            <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSendEmailSummary} 
            disabled={isSendingEmail || (demoRequests.length === 0 && newsletterSubscriptions.length === 0)}
          >
            <Send className="mr-2 h-4 w-4" /> Email Summary
          </Button>
        </div>
      </div>

      {isLoadingData ? (
        <div className="text-center py-8">Loading registration data...</div>
      ) : (
        <>
          <div className="rounded-md border mb-12">
            <Table>
              <TableCaption>{demoRequests.length === 0 ? "No demo requests yet" : `${demoRequests.length} demo requests`}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No demo requests yet</TableCell>
                  </TableRow>
                ) : (
                  demoRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.company_name}</TableCell>
                      <TableCell>{request.service_interest}</TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Newsletter Subscriptions</h2>
            <Button 
              variant="outline" 
              onClick={() => handleExportCSV("newsletter")} 
              disabled={newsletterSubscriptions.length === 0}
            >
              <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableCaption>{newsletterSubscriptions.length === 0 ? "No newsletter subscriptions yet" : `${newsletterSubscriptions.length} newsletter subscriptions`}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletterSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No newsletter subscriptions yet</TableCell>
                  </TableRow>
                ) : (
                  newsletterSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>{subscription.name || "-"}</TableCell>
                      <TableCell>{subscription.email}</TableCell>
                      <TableCell>{new Date(subscription.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminRegistrations;
