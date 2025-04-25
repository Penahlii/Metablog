import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const author = searchParams.get("author");
  const limit = parseInt(searchParams.get("limit") || "6");
  const offset = parseInt(searchParams.get("offset") || "0");

  let query = supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) query = query.eq("category", category);
  if (author) query = query.eq("author", author);

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const reqBody = await req.json();
  const { title, body, category, thumbnail } = reqBody;

  // Get current signed-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "Unauthorized or user not found" },
      { status: 401 }
    );
  }

  const authorId = user.id;

  if (!title || !body || !category || !thumbnail) {
    return NextResponse.json(
      { error: "Missing required field" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title,
      body,
      category,
      thumbnail,
      author: authorId,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
