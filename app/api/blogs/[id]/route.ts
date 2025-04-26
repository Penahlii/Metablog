import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (blogError || !blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Blog deleted successfully" });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // 1. Get the currently logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch the blog and check if the user owns it
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("id, author") // only fetch id and owner info
    .eq("id", id)
    .single();

  if (blogError || !blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  if (blog.author !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Continue to update
  const body = await req.json();

  const { data, error } = await supabase
    .from("blogs")
    .update(body)
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Blog updated successfully", data });
}
