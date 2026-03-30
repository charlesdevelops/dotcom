export async function onRequest(context) {
  const object = await context.env.CHARLES_BUCKET.get("westlake.hif");

  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Content-Disposition", 'attachment; filename="westlake.hif"');

  return new Response(object.body, { headers });
}
