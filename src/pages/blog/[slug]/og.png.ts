import { type CollectionEntry, getCollection } from "astro:content";
import { buildHTML, buildOG } from "../../../og.ts";
import { filenameToTitle } from "../../../filenameToTitle.ts";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

export async function GET({ props }: Props) {
  const { post } = props;
  const buffer = await buildOG(
    buildHTML(filenameToTitle(post.id), post.data.date, post.slug)
  );
  return new Response(buffer, {
    headers: { "Content-Type": "image/png" },
  });
}

// Invoke the /blog/[slug]/og.png.ts endpoint for each blog post
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post: { slug: any }) => ({
    params: { slug: post.slug },
    props: { post: post },
  }));
}
