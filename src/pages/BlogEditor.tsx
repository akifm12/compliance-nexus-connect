import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";

const blogFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(200, "Excerpt cannot exceed 200 characters").nullable(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  is_published: z.boolean().default(false),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = !!id;

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      is_published: false,
    },
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      // Redirect non-admin users
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        form.reset({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          is_published: data.is_published,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Failed to load blog post");
        navigate("/admin/blog");
      }
    };

    if (isAdmin && isEditMode) {
      fetchPost();
    }
  }, [id, isAdmin, authLoading, navigate, form]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  const onTitleBlur = () => {
    const title = form.getValues("title");
    const currentSlug = form.getValues("slug");
    
    // Only auto-generate slug if it's empty or unchanged
    if (!currentSlug && title) {
      form.setValue("slug", generateSlug(title));
    }
  };

  const onSubmit = async (values: BlogFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      if (isEditMode) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: values.content,
            is_published: values.is_published,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
          
        if (error) throw error;
        toast.success("Blog post updated successfully");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert({
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: values.content,
            is_published: values.is_published,
            author_id: user.id,
          });
          
        if (error) throw error;
        toast.success("Blog post created successfully");
      }
      
      navigate("/admin/blog");
    } catch (error: any) {
      console.error("Error saving post:", error);
      
      // Handle unique constraint error specifically
      if (error.code === "23505") {
        toast.error("A post with this slug already exists. Please use a different slug.");
        form.setError("slug", { type: "validate", message: "This slug is already taken" });
      } else {
        toast.error("Failed to save blog post");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the blog post title" {...field} onBlur={onTitleBlur} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="enter-url-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the post (displayed in blog listings)"
                        className="resize-none h-24"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content here..."
                        className="resize-none min-h-[400px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Publish post
                      </FormLabel>
                      <div className="text-sm text-gray-500">
                        When enabled, the post will be visible to all visitors
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/blog")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : isEditMode ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default BlogEditor;
