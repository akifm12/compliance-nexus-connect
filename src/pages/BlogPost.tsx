import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Calendar } from "lucide-react";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select(`
            id, title, content, created_at, updated_at,
            profiles:author_id (
              first_name, last_name
            )
          `)
          .eq("slug", slug)
          .eq("is_published", true)
          .single();

        if (error) throw error;
        
        // Ensure we have valid data before setting the state
        if (data) {
          // Make sure profiles is a valid object with the expected structure or null
          const authorData = data.profiles ? 
            (typeof data.profiles === 'object' && !('error' in data.profiles) ? 
              data.profiles : null) : null;
          
          // Format the data structure
          setPost({
            ...data,
            author: authorData,
          });
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        // Redirect to blog page if post not found
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAuthorName = () => {
    if (!post?.author) return "CompliancePro Team";
    
    const firstName = post.author.first_name || "";
    const lastName = post.author.last_name || "";
    
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    
    return "CompliancePro Team";
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="flex items-center space-x-2 mb-8">
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-500 mb-8 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {post && formatDate(post.created_at)}
            </div>
            <div>By {getAuthorName()}</div>
          </div>
          
          {isAdmin && post && (
            <div className="mb-8">
              <Link to={`/admin/blog/edit/${post.id}`}>
                <Button variant="outline">Edit Post</Button>
              </Link>
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post?.content || '' }}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
