import { createClient } from "@/utils/supabase/server";

// @ts-ignore
export async function GET(req: Request, {params} : { params: { id: string } }) {
    const supabase = await createClient();
    const id = (await params).id;;

    if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

    const { data, error } = await supabase.from('todos').select('*').eq('id', id).single();

    if (error) return new Response(JSON.stringify({ error: 'Todo not found' }), { status: 404 });

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

// @ts-ignore
export async function PUT(req: Request, {params} : { params: { id: string } }) {
    const supabase = await createClient();
    const body = await req.json();
    const id = (await params).id;;
    const {title, description, completed } = body;

    if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

    const { data, error } = await supabase
        .from('todos')
        .update({ title, description, completed })
        .eq('id', id)
        .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

// @ts-ignore
export async function DELETE(req: Request, {params} : { params: { id: string } }) {
    const supabase = await createClient()
    const {id} = await params;

    if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(null, { status: 204 });
}